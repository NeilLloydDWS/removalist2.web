# Stripe Setup Guide for VanMan

This guide walks you through configuring Stripe from scratch so that VanMan can accept payments, run free trials, and charge customers in multiple currencies (NZD, AUD, GBP, USD).

By the end you will have:

- A Stripe account connected to VanMan
- Products and prices for each region
- A 14-day free trial that requires no credit card
- Webhooks that keep subscription status in sync
- A customer billing portal for self-service management
- Test mode configured so you can verify everything before going live

---

## Table of Contents

1. [Create a Stripe Account](#1-create-a-stripe-account)
2. [Get Your API Keys](#2-get-your-api-keys)
3. [Create the Product](#3-create-the-product)
4. [Create Prices for Each Region](#4-create-prices-for-each-region)
5. [Set Up the Customer Billing Portal](#5-set-up-the-customer-billing-portal)
6. [Set Up Webhooks](#6-set-up-webhooks)
7. [Configure Environment Variables](#7-configure-environment-variables)
8. [Test the Integration Locally](#8-test-the-integration-locally)
9. [Go Live Checklist](#9-go-live-checklist)
10. [How It All Fits Together](#10-how-it-all-fits-together)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. Create a Stripe Account

1. Go to https://dashboard.stripe.com/register
2. Enter your email, full name, and a password.
3. Verify your email address by clicking the link Stripe sends you.
4. You will land on the Stripe Dashboard. By default you are in **Test mode** (indicated by the orange "Test mode" badge in the top-right). Stay in test mode for now.

> **Important:** Do NOT switch to live mode until you have tested everything end-to-end.

---

## 2. Get Your API Keys

1. In the Stripe Dashboard, click **Developers** in the left sidebar.
2. Click the **API keys** tab.
3. You will see two keys:
   - **Publishable key** — starts with `pk_test_...` (not needed for VanMan's server-side integration, but keep it noted).
   - **Secret key** — starts with `sk_test_...`. Click **Reveal test key** to see it.
4. Copy the **Secret key**. You will need this for the `STRIPE_SECRET_KEY` environment variable.

> **Security:** Never commit your secret key to git. Never share it in Slack, email, or any public channel. It goes in your `.env` file only.

---

## 3. Create the Product and Prices

VanMan uses a single product ("VanMan") with multiple regional prices. Stripe requires you to add at least one price when creating a product, so we will create the product and the first price together, then add the remaining prices afterwards.

### 3a. Create the product with the first price (NZD Monthly)

1. In the Stripe Dashboard, go to **Product catalog** in the left sidebar (or navigate to https://dashboard.stripe.com/test/products).
2. Click **+ Add product**.
3. Fill in the product details:
   - **Name:** `VanMan`
   - **Description:** `Moving company management software — scheduling, job management, invoicing, and more.`
4. In the **Price** section (which Stripe shows on the same page):
   - Select **Recurring**.
   - Set the **Currency** to **NZD**.
   - Enter the **Amount:** `99.00`
   - Set the **Billing period** to **Monthly**.
   - Leave everything else as default.
5. Click **Save product**.

This creates the product and your first price (NZD $99/month) at the same time.

> **Tip:** Copy the price ID for this first price (starts with `price_...`). You can find it by clicking into the product and expanding the price row. This will be your `STRIPE_PRICE_ID` environment variable.

### 3b. Add the remaining prices

Now open the VanMan product you just created and add the rest of the prices one at a time. For each price below, click **+ Add another price** in the Pricing section.

**Remaining monthly prices:**

| Region          | Currency | Amount | Billing period |
|-----------------|----------|--------|----------------|
| Australia       | AUD      | $89    | Monthly        |
| United Kingdom  | GBP      | £49    | Monthly        |
| United States   | USD      | $59    | Monthly        |

**Annual prices (all regions):**

| Region          | Currency | Total per year | Billing period |
|-----------------|----------|---------------|----------------|
| New Zealand     | NZD      | $948          | Yearly         |
| Australia       | AUD      | $828          | Yearly         |
| United Kingdom  | GBP      | £468          | Yearly         |
| United States   | USD      | $564          | Yearly         |

**Steps for each additional price:**

1. Click **+ Add another price**.
2. Select **Recurring**.
3. Set the **Currency** (e.g. AUD).
4. Enter the **Amount** (e.g. 89.00 for monthly, or 828.00 for annual).
5. Set the **Billing period** to **Monthly** or **Yearly**.
6. Click **Save price**.

> **Note:** For annual prices, enter the **total annual amount** (e.g. $948 for NZ, not $79). Stripe charges the full yearly amount upfront. The per-month figure ($79/mo) is just how we display it on the pricing page.

When you are done you should have **8 prices** on the VanMan product (4 monthly + 4 annual).

### 3c. Copy the default Price ID

The app currently uses a single `STRIPE_PRICE_ID` environment variable. Use the **NZD monthly price** you created in step 3a. If you later want region-specific pricing at signup, the code can be extended to look up the correct price ID by region — but for now one default price is sufficient.

> **Tip:** You can find all price IDs by clicking into your product and expanding each price row.

---

## 5. Set Up the Customer Billing Portal

The billing portal lets customers update their payment method, switch between monthly/annual billing, and cancel their subscription — all without you needing to build custom UI.

1. In the Stripe Dashboard, go to **Settings** (gear icon, bottom-left).
2. Under **Billing**, click **Customer portal**.
3. Enable the following features:
   - **Payment methods** — Allow customers to update their payment method.
   - **Subscriptions** — Allow customers to cancel subscriptions.
   - **Switch plans** — Allow customers to switch between monthly and annual pricing. Add all your prices from step 4 so they appear as options.
   - **Invoices** — Allow customers to view invoice history.
4. Under **Business information**, add:
   - **Business name:** VanMan
   - **Terms of service URL:** `https://vanman.app/legal/terms`
   - **Privacy policy URL:** `https://vanman.app/legal/privacy`
5. Under **Appearance** (optional), you can add your logo and brand color.
6. Click **Save changes**.

---

## 6. Set Up Webhooks

Webhooks tell VanMan when something changes in Stripe (e.g. a subscription is cancelled, a payment fails). Without webhooks, the app would not know about changes that happen outside your code.

### For Local Development (using Stripe CLI)

1. Install the Stripe CLI:
   - **macOS:** `brew install stripe/stripe-cli/stripe`
   - **Windows:** Download from https://docs.stripe.com/stripe-cli
   - **Linux:** Download from https://docs.stripe.com/stripe-cli
2. Log in to your Stripe account:
   ```
   stripe login
   ```
   This opens a browser window. Confirm the connection.
3. Forward webhook events to your local server:
   ```
   stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
   ```
4. The CLI will print a **webhook signing secret** that starts with `whsec_...`. Copy this — it is your `STRIPE_WEBHOOK_SECRET` for local development.

> **Important:** You must keep the `stripe listen` command running in a terminal while developing. If you restart it, the signing secret changes and you need to update your `.env` file.

### For Production (Stripe Dashboard)

1. In the Stripe Dashboard, go to **Developers** > **Webhooks**.
2. Click **+ Add endpoint**.
3. Enter your endpoint URL:
   ```
   https://vanman.app/api/webhooks/stripe
   ```
4. Under **Select events to listen to**, click **+ Select events** and add:
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
5. Click **Add endpoint**.
6. On the endpoint detail page, click **Reveal** under **Signing secret**. Copy this value — it is your production `STRIPE_WEBHOOK_SECRET`.

### What Each Webhook Event Does

| Event | What VanMan does |
|-------|-----------------|
| `customer.subscription.updated` | Updates the subscription status (trialing, active, past_due, paused, etc.) and billing period end date in Clerk org metadata. |
| `customer.subscription.deleted` | Marks the subscription as cancelled in Clerk org metadata. |
| `invoice.payment_failed` | Sets a `paymentFailed` flag on the Clerk org so the app can show a warning to the customer. |

---

## 7. Configure Environment Variables

Add the following to your `.env` file (copy from `.env.example` if you haven't already):

```bash
# Stripe Billing
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_signing_secret_here
STRIPE_PRICE_ID=price_your_default_price_id_here
STRIPE_PRODUCT_ID=prod_your_product_id_here
```

### Where to Find Each Value

| Variable | Where to find it |
|----------|-----------------|
| `STRIPE_SECRET_KEY` | Stripe Dashboard > Developers > API keys > Secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe CLI output (local) or Dashboard > Developers > Webhooks > your endpoint > Signing secret (production) |
| `STRIPE_PRICE_ID` | Stripe Dashboard > Product catalog > VanMan > click the price row > copy the ID (starts with `price_`) |
| `STRIPE_PRODUCT_ID` | Stripe Dashboard > Product catalog > VanMan > copy the product ID (starts with `prod_`). Used to fetch regional prices at build time for the pricing page. If not set, the pricing page falls back to hardcoded defaults. |

### Production vs Test Keys

- **Test mode** keys start with `sk_test_` and `pk_test_`.
- **Live mode** keys start with `sk_live_` and `pk_live_`.
- Always use test keys during development. Switch to live keys only when deploying to production.
- Webhook secrets are different for test and live mode — you will have separate secrets for each.

---

## 8. Test the Integration Locally

### Start the Dev Server

```bash
npm run dev
```

The app runs on http://localhost:3001.

### Start the Stripe CLI Listener

In a separate terminal:

```bash
stripe listen --forward-to http://localhost:3001/api/webhooks/stripe
```

### Test a Signup

1. Go to http://localhost:3001/signup.
2. Fill in the form and submit.
3. Check the Stripe Dashboard > **Customers** — you should see a new customer.
4. Check **Subscriptions** — you should see a subscription in `trialing` status with a 14-day trial.

### Test Stripe Card Numbers

Stripe provides test card numbers. Use these at the billing portal when testing payment:

| Card Number | Scenario |
|------------|----------|
| `4242 4242 4242 4242` | Successful payment |
| `4000 0000 0000 3220` | Requires 3D Secure authentication |
| `4000 0000 0000 0002` | Card declined |
| `4000 0000 0000 9995` | Insufficient funds |

For all test cards:
- **Expiry:** Any future date (e.g. 12/34)
- **CVC:** Any 3 digits (e.g. 123)
- **ZIP:** Any 5 digits (e.g. 10001)

### Test Webhook Events

You can manually trigger webhook events with the Stripe CLI:

```bash
# Simulate a subscription update
stripe trigger customer.subscription.updated

# Simulate a payment failure
stripe trigger invoice.payment_failed

# Simulate a subscription cancellation
stripe trigger customer.subscription.deleted
```

Check your terminal running `npm run dev` for log output confirming the webhook was received and processed.

### Test the Billing Portal

1. After creating a test subscription, call the billing portal API:
   ```bash
   curl -X POST http://localhost:3001/api/billing/portal
   ```
2. This returns a URL. Open it in your browser to see the Stripe-hosted billing portal where customers can manage their subscription.

---

## 9. Go Live Checklist

When you are ready to accept real payments:

- [ ] **Activate your Stripe account.** In the Stripe Dashboard, click the banner to complete your account setup. Stripe will ask for business details, bank account info, and identity verification.
- [ ] **Switch to live API keys.** Replace `sk_test_...` with `sk_live_...` in your production environment variables. Do the same for the webhook signing secret.
- [ ] **Create live prices.** Products and prices in test mode do NOT carry over to live mode. You must re-create the VanMan product and all regional prices in live mode (follow step 4 again with live mode enabled).
- [ ] **Set up the live webhook endpoint.** Add a new webhook endpoint in Stripe Dashboard pointing to your production URL. Use the live signing secret.
- [ ] **Configure the billing portal in live mode.** The portal settings are separate for test and live mode. Repeat step 5 in live mode.
- [ ] **Update `STRIPE_PRICE_ID`.** The price IDs are different in live mode. Update your production environment variable.
- [ ] **Test a real transaction.** Make a small real purchase to confirm everything works end-to-end. You can refund it immediately after.
- [ ] **Enable Stripe Tax (optional).** If you need to collect GST/VAT, enable Stripe Tax in Settings > Tax. Configure it for the regions you operate in (NZ, AU, GB, US).

---

## 10. How It All Fits Together

Here is the complete flow from signup to ongoing billing:

```
User signs up on /signup
        |
        v
Server action (src/app/actions/signup.ts)
        |
        ├── Creates Clerk user (with region metadata)
        ├── Creates Clerk organization (user as admin)
        ├── Creates Stripe customer (linked to Clerk IDs via metadata)
        ├── Creates Stripe subscription
        |       - 14-day trial
        |       - No credit card required
        |       - Pauses if no payment method after trial
        |       - clerkOrgId stored in subscription metadata
        └── Stores Stripe IDs in Clerk org publicMetadata
                - stripeCustomerId
                - stripeSubscriptionId
                - trialEndsAt
        |
        v
User enters /onboarding (protected by Clerk middleware)
        |
        v
14 days pass...
        |
        v
Trial ends — Stripe pauses the subscription (no card on file)
        |
        v
Stripe sends webhook: customer.subscription.updated (status: "paused")
        |
        v
Webhook handler (src/app/api/webhooks/stripe/route.ts)
        └── Updates Clerk org metadata: subscriptionStatus = "paused"
        |
        v
User adds payment method via Billing Portal
        |
        v
Stripe reactivates subscription, sends webhook: status = "active"
        |
        v
Webhook handler updates Clerk org metadata: subscriptionStatus = "active"
```

### Key Architecture Decisions

- **Clerk org `publicMetadata`** is the single source of truth for subscription state within the app. The webhook handler keeps it in sync with Stripe.
- **Stripe subscription `metadata`** stores the `clerkOrgId` so webhooks can find the right organization to update.
- **Stripe customer `metadata`** stores both `clerkUserId` and `clerkOrgId` for traceability.
- **No database table for subscriptions.** Stripe is the system of record. Clerk metadata caches the current state for fast access. If they ever drift, the next webhook corrects it.

### Metadata Reference

**Clerk org `publicMetadata`** (set during signup, updated by webhooks):

```json
{
  "stripeCustomerId": "cus_abc123",
  "stripeSubscriptionId": "sub_xyz789",
  "trialEndsAt": "2026-03-10T00:00:00.000Z",
  "subscriptionStatus": "trialing",
  "currentPeriodEnd": "2026-04-10T00:00:00.000Z",
  "paymentFailed": false
}
```

**Stripe customer `metadata`:**

```json
{
  "clerkUserId": "user_abc123",
  "clerkOrgId": "org_xyz789"
}
```

**Stripe subscription `metadata`:**

```json
{
  "clerkOrgId": "org_xyz789"
}
```

---

## 11. Troubleshooting

### "Webhook signature verification failed"

- Your `STRIPE_WEBHOOK_SECRET` is wrong or stale. If using the Stripe CLI, restart `stripe listen` and copy the new secret.
- Make sure you are using the test-mode secret for test webhooks and the live-mode secret for production.

### "No such price" error on signup

- The `STRIPE_PRICE_ID` in your `.env` does not match any price in Stripe. Check that:
  - The price exists in the Stripe Dashboard.
  - You are using a test-mode price ID with test-mode API keys (and vice versa for live).
  - The price ID is copied correctly (starts with `price_`).

### Subscription created but no trial

- Confirm `trial_period_days: 14` is in the subscription creation call. The code in `src/app/actions/signup.ts` already includes this.
- If you configured a default trial period on the price itself in Stripe, it may conflict. Remove any trial settings from the price — the code handles trials explicitly.

### Customer portal shows no subscription

- The customer might not have been linked to the subscription correctly. In the Stripe Dashboard, find the customer and check their subscriptions.
- Verify that `stripeCustomerId` in Clerk org metadata matches the Stripe customer.

### Webhooks not arriving locally

- Make sure `stripe listen --forward-to http://localhost:3001/api/webhooks/stripe` is running.
- Check that your dev server is running on port 3001.
- Look at the Stripe CLI output — it logs every event it forwards and the HTTP response code.

### "Not authenticated" on billing portal

- The `/api/billing/portal` route requires an authenticated Clerk session with an active organization. Make sure the user is signed in and has selected an organization.
