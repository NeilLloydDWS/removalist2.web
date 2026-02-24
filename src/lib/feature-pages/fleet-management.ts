import type { FeaturePageData } from "./types";

export const fleetManagement: FeaturePageData = {
  slug: "fleet-management",
  title: "Fleet Management",
  tagline: "Know where your trucks are",
  description:
    "Keep track of your trucks, trailers, and equipment. See which vehicles are available, assign team leaders, and colour-code your calendar by truck.",
  heroImage: "Fleet management dashboard with truck list",
  benefits: [
    {
      icon: "Truck",
      title: "Know which trucks are free",
      description:
        "See availability across your fleet at a glance. Never double-book a truck or leave one sitting idle.",
    },
    {
      icon: "Layers",
      title: "Colour-code your fleet",
      description:
        "Each truck gets its own colour on the calendar. Instantly see which truck is assigned to which job.",
    },
    {
      icon: "Target",
      title: "Track capacity",
      description:
        "Record truck capacity, equipment, and specifications. Match the right truck to the right job every time.",
    },
  ],
  detailSections: [
    {
      title: "Truck profiles and specifications",
      description:
        "Create a profile for each vehicle with capacity, equipment, registration, and assigned team leader. Keep all your fleet information organised and accessible.",
      imagePlaceholder: "Truck list view with details",
    },
    {
      title: "Colour-coded calendar integration",
      description:
        "Trucks show up as coloured lanes on your scheduling calendar. Drag jobs between trucks and see availability at a glance — no separate fleet dashboard needed.",
      imagePlaceholder: "Calendar with colour-coded truck lanes",
    },
    {
      title: "Availability at a glance",
      description:
        "The dashboard shows which trucks are booked and which are free on any given day. Plan ahead and maximise your fleet utilisation.",
      imagePlaceholder: "Fleet availability dashboard widget",
    },
  ],
  integrationCallout: {
    title: "Your fleet powers the calendar",
    description:
      "Trucks and the calendar work together seamlessly. Assign, reschedule, and track — all from one system.",
    features: ["calendar-scheduling", "job-management", "dashboard-analytics"],
  },
  relatedFeatures: [
    "calendar-scheduling",
    "job-management",
    "dashboard-analytics",
  ],
  seo: {
    title: "Moving Company Fleet Management | VanMan",
    description:
      "Track your trucks, trailers, and equipment in one place. Colour-coded calendar integration and availability tracking for moving companies.",
  },
};
