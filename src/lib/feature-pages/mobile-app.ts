import type { FeaturePageData } from "./types";

export const mobileApp: FeaturePageData = {
  slug: "mobile-app",
  title: "Mobile App",
  tagline: "Your business in your pocket",
  description:
    "iOS and Android apps for your entire team. Drivers see today's jobs and track time. Operators create jobs and process payments. Admins manage everything — all from their phone.",
  heroImage: "Mobile app showing driver job list and operator dashboard",
  benefits: [
    {
      icon: "Users",
      title: "Your whole team in one app",
      description:
        "Drivers, operators, and admins each get a role-based view tailored to what they need. One app, different experiences.",
    },
    {
      icon: "Smartphone",
      title: "Manage jobs from anywhere",
      description:
        "Drivers track time and update status. Operators create jobs with a 3-step wizard. Send invoices, process payments, and manage your calendar — all on mobile.",
    },
    {
      icon: "Wifi",
      title: "Works even with patchy signal",
      description:
        "Cached data means the app works offline. Updates sync automatically when you're back online — nothing gets lost.",
    },
  ],
  detailSections: [
    {
      title: "Driver view: today's jobs at a glance",
      description:
        "Drivers see a clean list of today's assigned jobs with customer name, address, and time. Tap to call the customer, tap to navigate via Google Maps, and tap to start tracking delivery time.",
      imagePlaceholder: "Driver job list on mobile",
    },
    {
      title: "Operator view: full job management",
      description:
        "Operators can create new jobs with a 3-step wizard (General, Delivery, Tally), process payments (cash, POS, credit card), send invoices via SMS or email, and view the full calendar with truck filters.",
      imagePlaceholder: "Operator job creation wizard",
    },
    {
      title: "Time tracking with background timer",
      description:
        "Drivers start a timer when they arrive and stop it when the job's done. The timer runs in the background so they can navigate away. Delivery times are recorded automatically on the job.",
      imagePlaceholder: "Time tracking screen with running timer",
    },
    {
      title: "Navigation and customer contact",
      description:
        "Tap an address to open turn-by-turn navigation in Google Maps. Tap a phone number to call the customer directly. Everything a driver needs is one tap away.",
      imagePlaceholder: "Google Maps navigation from job detail",
    },
    {
      title: "Invoicing and payments on the go",
      description:
        "Operators can generate invoices from the tally screen, accept cash or card payments, and send the invoice via SMS or email — all without going back to the office.",
      imagePlaceholder: "Tally and invoicing screen on mobile",
    },
  ],
  integrationCallout: {
    title: "Everything syncs with the web app",
    description:
      "The mobile app is a full extension of VanMan. Jobs, messages, invoices, and calendar all sync in real time between mobile and web.",
    features: [
      "calendar-scheduling",
      "job-management",
      "invoicing-xero",
      "team-chat",
    ],
  },
  relatedFeatures: ["calendar-scheduling", "job-management", "team-chat"],
  seo: {
    title: "Mobile App for Moving Companies — iOS & Android | VanMan",
    description:
      "iOS and Android app for drivers, operators, and admins. Track time, create jobs, process payments, and navigate to jobs — all from your phone.",
  },
};
