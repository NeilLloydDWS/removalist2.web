import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST() {
  try {
    // In production, get the Stripe customer ID from the authenticated user's
    // Clerk organization metadata:
    // const { orgId } = auth();
    // const org = await clerkClient.organizations.getOrganization({ organizationId: orgId });
    // const stripeCustomerId = org.publicMetadata.stripeCustomerId;

    const stripeCustomerId = "cus_placeholder";

    const session = await getStripe().billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://app.vanman.app"}/settings/billing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Billing portal error:", error);
    return NextResponse.json(
      { error: "Failed to create billing portal session" },
      { status: 500 }
    );
  }
}
