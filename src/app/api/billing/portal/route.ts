import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { getStripe } from "@/lib/stripe";

export async function POST() {
  try {
    const { orgId } = await auth();
    if (!orgId) {
      return NextResponse.json(
        { error: "Not authenticated or no organization selected" },
        { status: 401 }
      );
    }

    const clerk = await clerkClient();
    const org = await clerk.organizations.getOrganization({
      organizationId: orgId,
    });

    const stripeCustomerId = org.publicMetadata?.stripeCustomerId as
      | string
      | undefined;
    if (!stripeCustomerId) {
      return NextResponse.json(
        { error: "No billing account found for this organization" },
        { status: 400 }
      );
    }

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
