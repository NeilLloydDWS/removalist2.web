import type { FeaturePageData } from "./types";

export const dashboardAnalytics: FeaturePageData = {
  slug: "dashboard-analytics",
  title: "Dashboard & Analytics",
  tagline: "See how your business is tracking",
  description:
    "Real-time dashboards showing revenue, job volume, crew utilisation, and business health at a glance. Know your numbers without digging through spreadsheets.",
  heroImage: "Full dashboard view with KPI cards and charts",
  benefits: [
    {
      icon: "BarChart3",
      title: "Know your numbers at a glance",
      description:
        "KPI cards show today's key metrics — revenue, jobs, bookings, and trucks — with trend indicators so you know if you're up or down.",
    },
    {
      icon: "TrendingUp",
      title: "Track revenue trends",
      description:
        "Charts show revenue and job volume over time. Spot seasonal patterns, track growth, and plan ahead with confidence.",
    },
    {
      icon: "Target",
      title: "See booking conversion rates",
      description:
        "A visual funnel shows how many bookings convert to confirmed jobs. Identify where leads drop off and improve your process.",
    },
  ],
  detailSections: [
    {
      title: "KPI cards with trend indicators",
      description:
        "The top of your dashboard shows the numbers that matter most: revenue this month, jobs completed, new bookings, and truck utilisation. Each card includes a trend arrow showing whether you're up or down compared to last period.",
      imagePlaceholder: "Dashboard KPI cards with trends",
    },
    {
      title: "Revenue and job volume charts",
      description:
        "Interactive charts show your revenue and job volume over time — daily, weekly, or monthly. Filter by truck, job type, or date range to drill into the details.",
      imagePlaceholder: "Revenue and job volume line charts",
    },
    {
      title: "Booking conversion funnel",
      description:
        "See how many enquiries become confirmed jobs with a visual conversion funnel. Track each stage — new, contacted, quoted, confirmed — and spot where you're losing potential customers.",
      imagePlaceholder: "Booking conversion funnel visualisation",
    },
  ],
  integrationCallout: {
    title: "Powered by your real data",
    description:
      "The dashboard pulls live data from across VanMan — jobs, bookings, invoices, and fleet — so your numbers are always current.",
    features: [
      "job-management",
      "online-bookings",
      "invoicing-xero",
      "fleet-management",
    ],
  },
  relatedFeatures: [
    "fleet-management",
    "online-bookings",
    "invoicing-xero",
  ],
  seo: {
    title: "Moving Company Dashboard & Analytics | VanMan",
    description:
      "Real-time dashboard with KPI cards, revenue charts, and booking conversion funnels. Business analytics built for moving companies.",
  },
};
