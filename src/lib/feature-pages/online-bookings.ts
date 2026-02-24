import type { FeaturePageData } from "./types";

export const onlineBookings: FeaturePageData = {
  slug: "online-bookings",
  title: "Online Bookings",
  tagline: "Capture leads while you sleep",
  description:
    "An embeddable multi-step booking form that lets customers request quotes and book moves directly from your website. Enquiries land straight in VanMan — no copy-pasting from email.",
  heroImage: "Online booking form on a customer's website",
  benefits: [
    {
      icon: "Globe",
      title: "Capture enquiries 24/7",
      description:
        "Your booking form works around the clock. Customers submit enquiries from your website any time — even at midnight.",
    },
    {
      icon: "Zap",
      title: "Convert bookings to jobs in one click",
      description:
        "When you're ready to confirm a booking, convert it to a full job with one click. All the customer's details carry over automatically.",
    },
    {
      icon: "Shield",
      title: "Never lose a lead",
      description:
        "Every enquiry is tracked in a pipeline: new, contacted, quoted, confirmed, or declined. Follow up at the right time, every time.",
    },
  ],
  detailSections: [
    {
      title: "Multi-step booking form",
      description:
        "A clean, mobile-friendly form guides customers through the booking process step by step — move details, addresses (with Google Places autocomplete), dates, and contact info. Turnstile bot protection keeps spam out.",
      imagePlaceholder: "Public booking form steps on mobile",
    },
    {
      title: "Booking management pipeline",
      description:
        "All bookings land in a management pipeline where operators can review details, contact the customer, send a quote, and confirm or decline. Track every booking's status at a glance.",
      imagePlaceholder: "Operator booking management page",
    },
    {
      title: "One-click job conversion",
      description:
        "Once a booking is confirmed, convert it to a scheduled job with one click. Customer details, addresses, and move requirements all transfer automatically — no re-entry needed.",
      imagePlaceholder: "Booking to job conversion flow",
    },
  ],
  integrationCallout: {
    title: "From booking to invoice",
    description:
      "Bookings flow seamlessly into jobs, then into your calendar and invoicing. The whole workflow is connected.",
    features: [
      "job-management",
      "calendar-scheduling",
      "customer-communications",
      "invoicing-xero",
    ],
  },
  relatedFeatures: [
    "job-management",
    "customer-communications",
    "dashboard-analytics",
  ],
  seo: {
    title: "Online Booking Form for Moving Companies | VanMan",
    description:
      "Capture moving enquiries 24/7 with an embeddable booking form. Google Places lookup, bot protection, and one-click conversion to jobs.",
  },
};
