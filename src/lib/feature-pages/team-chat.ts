import type { FeaturePageData } from "./types";

export const teamChat: FeaturePageData = {
  slug: "team-chat",
  title: "Team Chat",
  tagline: "Talk to your team in real time",
  description:
    "Built-in real-time messaging for your whole team. Direct messages, group conversations, photo sharing, and a staff directory — no more juggling WhatsApp groups and texts.",
  heroImage: "Team chat interface with conversation threads",
  benefits: [
    {
      icon: "MessagesSquare",
      title: "Keep your team connected on every job",
      description:
        "Direct messages and group channels mean your team can coordinate in real time — whether they're in the office, on the road, or at a job site.",
    },
    {
      icon: "Camera",
      title: "Share photos from the field instantly",
      description:
        "Drivers can snap photos of items, access issues, or parking problems and share them with the team instantly. Everyone stays informed.",
    },
    {
      icon: "Bell",
      title: "No more missed messages or phone tag",
      description:
        "Push notifications ensure important messages get seen. Message history is persisted and searchable, so nothing gets lost in the scroll.",
    },
  ],
  detailSections: [
    {
      title: "Direct messages and group conversations",
      description:
        "Message anyone on your team directly, or create group channels for specific trucks, teams, or offices. Conversations are organised and easy to find — not buried in a noisy group chat.",
      imagePlaceholder: "Chat list showing conversations and groups",
    },
    {
      title: "Photo and media sharing",
      description:
        "Share photos directly in conversations. Drivers can capture and send images of items for quoting, access problems at pickup, or parking restrictions — giving the office instant visibility.",
      imagePlaceholder: "Conversation thread with shared photos",
    },
    {
      title: "Staff directory with quick-dial",
      description:
        "A built-in staff directory shows everyone on your team with their role and contact details. Tap to message or call — no searching through your phone contacts.",
      imagePlaceholder: "Staff directory with contact actions",
    },
    {
      title: "Available on mobile and web",
      description:
        "Team Chat works on the mobile app and the web dashboard. Messages sync across both, so you can start a conversation on your phone and continue it at your desk.",
      imagePlaceholder: "Chat on mobile and desktop side by side",
    },
  ],
  integrationCallout: {
    title: "Your team, always connected",
    description:
      "Team Chat sits alongside jobs, the calendar, and the mobile app — so communication is always in context.",
    features: ["mobile-app", "job-management", "calendar-scheduling"],
  },
  relatedFeatures: [
    "mobile-app",
    "job-management",
    "customer-communications",
  ],
  seo: {
    title: "Team Chat for Moving Companies | VanMan",
    description:
      "Real-time team messaging built for moving companies. Direct messages, group channels, photo sharing, and push notifications.",
  },
};
