"use server";

import { type SignupFormData } from "@/lib/schemas";

interface SignupResult {
  error?: string;
}

export async function signup(data: SignupFormData): Promise<SignupResult> {
  // In production, this would:
  // 1. Create a Clerk user with name, email, password
  // 2. Create a Clerk organization with company name
  // 3. Add user as admin of the new organization
  // 4. Store region in Clerk user metadata
  // 5. Create Stripe customer and subscription in trialing state
  // 6. Store Stripe IDs in Clerk org metadata

  try {
    // Validate server-side (double-check)
    if (!data.fullName || !data.email || !data.password || !data.companyName) {
      return { error: "All required fields must be filled in." };
    }

    if (!data.agreedToTerms) {
      return {
        error: "You must agree to the Terms of Service and Privacy Policy.",
      };
    }

    // --- Clerk User Creation ---
    // const clerkUser = await clerkClient.users.createUser({
    //   firstName: data.fullName.split(" ")[0],
    //   lastName: data.fullName.split(" ").slice(1).join(" "),
    //   emailAddress: [data.email],
    //   password: data.password,
    //   publicMetadata: { region: data.region },
    // });

    // --- Clerk Organization Creation ---
    // const org = await clerkClient.organizations.createOrganization({
    //   name: data.companyName,
    //   createdBy: clerkUser.id,
    // });

    // --- Stripe Customer & Subscription ---
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const customer = await stripe.customers.create({
    //   email: data.email,
    //   name: data.companyName,
    //   metadata: { clerkUserId: clerkUser.id, clerkOrgId: org.id },
    // });
    // const subscription = await stripe.subscriptions.create({
    //   customer: customer.id,
    //   items: [{ price: process.env.STRIPE_PRICE_ID! }],
    //   trial_period_days: 14,
    //   payment_settings: {
    //     save_default_payment_method: "on_subscription",
    //   },
    //   trial_settings: {
    //     end_behavior: { missing_payment_method: "pause" },
    //   },
    // });

    // --- Store Stripe IDs in Clerk org metadata ---
    // await clerkClient.organizations.updateOrganization(org.id, {
    //   publicMetadata: {
    //     stripeCustomerId: customer.id,
    //     stripeSubscriptionId: subscription.id,
    //     trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    //   },
    // });

    return {};
  } catch (error: unknown) {
    // Handle known Clerk errors
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
