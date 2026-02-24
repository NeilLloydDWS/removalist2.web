"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { signupSchema, type SignupFormData } from "@/lib/schemas";
import { getStripe } from "@/lib/stripe";

interface SignupResult {
  error?: string;
}

export async function signup(data: SignupFormData): Promise<SignupResult> {
  try {
    // Validate server-side
    const parsed = signupSchema.safeParse(data);
    if (!parsed.success) {
      return { error: parsed.error.issues[0].message };
    }

    const clerk = await clerkClient();

    // 1. Create Clerk user
    const clerkUser = await clerk.users.createUser({
      firstName: data.fullName.split(" ")[0],
      lastName: data.fullName.split(" ").slice(1).join(" ") || undefined,
      emailAddress: [data.email],
      password: data.password,
      publicMetadata: { region: data.region },
    });

    // 2. Create Clerk organization with user as admin
    const org = await clerk.organizations.createOrganization({
      name: data.companyName,
      createdBy: clerkUser.id,
    });

    // 3. Create Stripe customer linked to Clerk IDs
    const stripe = getStripe();
    const customer = await stripe.customers.create({
      email: data.email,
      name: data.companyName,
      metadata: { clerkUserId: clerkUser.id, clerkOrgId: org.id },
    });

    // 4. Create Stripe subscription with 14-day trial (no card required)
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: process.env.STRIPE_PRICE_ID! }],
      trial_period_days: 14,
      payment_settings: {
        save_default_payment_method: "on_subscription",
      },
      trial_settings: {
        end_behavior: { missing_payment_method: "pause" },
      },
      metadata: { clerkOrgId: org.id },
    });

    // 5. Store Stripe IDs in Clerk org metadata
    await clerk.organizations.updateOrganization(org.id, {
      publicMetadata: {
        stripeCustomerId: customer.id,
        stripeSubscriptionId: subscription.id,
        trialEndsAt: new Date(
          Date.now() + 14 * 24 * 60 * 60 * 1000
        ).toISOString(),
      },
    });

    return {};
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message.includes("email_address_taken")
    ) {
      return { error: "An account with this email already exists." };
    }

    console.error("Signup error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}
