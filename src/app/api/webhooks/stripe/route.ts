import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        // Update subscription status in Clerk org metadata
        // const clerkOrgId = subscription.metadata.clerkOrgId;
        // await clerkClient.organizations.updateOrganization(clerkOrgId, {
        //   publicMetadata: {
        //     subscriptionStatus: subscription.status,
        //     currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
        //   },
        // });
        console.log(
          `Subscription updated: ${subscription.id} — status: ${subscription.status}`
        );
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        // Update account state to cancelled in Clerk org metadata
        // const clerkOrgId = subscription.metadata.clerkOrgId;
        // await clerkClient.organizations.updateOrganization(clerkOrgId, {
        //   publicMetadata: {
        //     subscriptionStatus: "cancelled",
        //   },
        // });
        console.log(`Subscription cancelled: ${subscription.id}`);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        // Set payment_failed flag in Clerk org metadata
        // const customerId = invoice.customer as string;
        // Look up org by Stripe customer ID and update metadata
        console.log(
          `Payment failed for invoice: ${invoice.id}, customer: ${typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id}`
        );
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
