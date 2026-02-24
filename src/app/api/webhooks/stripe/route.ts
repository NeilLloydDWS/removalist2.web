import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

async function findOrgByStripeCustomerId(customerId: string) {
  const clerk = await clerkClient();
  const { data: orgs } = await clerk.organizations.getOrganizationList({
    limit: 100,
  });
  return orgs.find(
    (org) => org.publicMetadata?.stripeCustomerId === customerId
  );
}

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

  const clerk = await clerkClient();

  try {
    switch (event.type) {
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const clerkOrgId = subscription.metadata.clerkOrgId;
        if (clerkOrgId) {
          const org = await clerk.organizations.getOrganization({
            organizationId: clerkOrgId,
          });
          const periodEnd =
            subscription.items.data[0]?.current_period_end;
          await clerk.organizations.updateOrganization(clerkOrgId, {
            publicMetadata: {
              ...org.publicMetadata,
              subscriptionStatus: subscription.status,
              ...(periodEnd && {
                currentPeriodEnd: new Date(
                  periodEnd * 1000
                ).toISOString(),
              }),
            },
          });
        }
        console.log(
          `Subscription updated: ${subscription.id} — status: ${subscription.status}`
        );
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const clerkOrgId = subscription.metadata.clerkOrgId;
        if (clerkOrgId) {
          const org = await clerk.organizations.getOrganization({
            organizationId: clerkOrgId,
          });
          await clerk.organizations.updateOrganization(clerkOrgId, {
            publicMetadata: {
              ...org.publicMetadata,
              subscriptionStatus: "cancelled",
            },
          });
        }
        console.log(`Subscription cancelled: ${subscription.id}`);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId =
          typeof invoice.customer === "string"
            ? invoice.customer
            : invoice.customer?.id;
        if (customerId) {
          const org = await findOrgByStripeCustomerId(customerId);
          if (org) {
            await clerk.organizations.updateOrganization(org.id, {
              publicMetadata: {
                ...org.publicMetadata,
                paymentFailed: true,
              },
            });
          }
        }
        console.log(
          `Payment failed for invoice: ${invoice.id}, customer: ${customerId}`
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
