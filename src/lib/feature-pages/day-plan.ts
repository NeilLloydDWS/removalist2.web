import type { FeaturePageData } from "./types";

export const dayPlan: FeaturePageData = {
  slug: "day-plan",
  title: "Day Plan",
  tagline: "Your daily operations at a glance",
  description:
    "A split-screen daily operations dashboard that combines a calendar timeline with a live Google Map. See every job, every truck route, and every crew location in one view.",
  heroImage: "Split-screen view with calendar timeline and Google Map",
  benefits: [
    {
      icon: "MapPin",
      title: "Calendar and map in one view",
      description:
        "See today's jobs as time blocks on a calendar alongside a Google Map showing every pickup, delivery, and truck location. No switching between screens.",
    },
    {
      icon: "Route",
      title: "Visualise truck routes",
      description:
        "Each truck's route is drawn on the map with driving directions between job locations. Colour-coded to match your truck colours so you can tell them apart instantly.",
    },
    {
      icon: "Radio",
      title: "Real-time updates",
      description:
        "Truck positions update in real time as drivers move between jobs. Job statuses change live on both the calendar and map as crews start and complete work.",
    },
  ],
  detailSections: [
    {
      title: "Your whole day on one screen",
      description:
        "The Day Plan splits your screen between a time-block calendar on the left and a Google Map on the right. The calendar shows every job for the selected day, grouped by truck. The map shows every job location with markers and driving routes between them.",
      imagePlaceholder: "Full Day Plan dashboard with calendar and map",
    },
    {
      title: "Cross-highlighting between calendar and map",
      description:
        "Click a job on the calendar and it highlights on the map. Click a marker on the map and the corresponding job highlights on the calendar. This makes it easy to answer questions like 'where is that truck right now?' and 'what's the next job after this one?'",
      imagePlaceholder: "Job highlighted on both calendar and map simultaneously",
    },
    {
      title: "Live truck tracking on the map",
      description:
        "When drivers have the VanMan mobile app running, their GPS position appears on the Day Plan map in real time. See exactly where each truck is, which direction it's heading, and how fast it's moving — all from your desk.",
      imagePlaceholder: "Map with live truck position markers",
    },
  ],
  integrationCallout: {
    title: "Powered by your calendar and fleet",
    description:
      "The Day Plan pulls jobs from your calendar and truck positions from the mobile app. Everything updates in real time.",
    features: ["calendar-scheduling", "fleet-management", "mobile-app"],
  },
  relatedFeatures: ["calendar-scheduling", "fleet-management", "mobile-app"],
  seo: {
    title: "Daily Operations Dashboard for Moving Companies | VanMan",
    description:
      "See your entire day on one screen — calendar timeline, Google Maps with truck routes, and real-time crew tracking. Built for moving companies.",
  },
};
