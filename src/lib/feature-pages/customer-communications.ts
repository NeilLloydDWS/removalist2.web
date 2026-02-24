import type { FeaturePageData } from "./types";

export const customerCommunications: FeaturePageData = {
  slug: "customer-communications",
  title: "Customer Communications",
  tagline: "Keep customers in the loop",
  description:
    "Send automated SMS and email updates to customers at every stage of their move. Use templates with smart variables to save hours on repetitive messages.",
  heroImage: "Messaging panel with SMS and email templates",
  benefits: [
    {
      icon: "MessageSquare",
      title: "Send booking confirmations in seconds",
      description:
        "Pre-built templates with variables like customer name, date, and address. Hit send and the right details fill in automatically.",
    },
    {
      icon: "Search",
      title: "Track every message",
      description:
        "Every SMS and email is logged against the job. See delivery status, open rates, and the full conversation history.",
    },
    {
      icon: "Clock",
      title: "Templates save hours",
      description:
        "Create templates for confirmations, reminders, follow-ups, and review requests. Stop typing the same message over and over.",
    },
  ],
  detailSections: [
    {
      title: "Smart message templates",
      description:
        "Build templates with variable placeholders — customer name, move date, pickup address, driver name. When you send, VanMan fills in the details automatically. Create templates for every stage of the job lifecycle.",
      imagePlaceholder: "Message template editor with variables",
    },
    {
      title: "Messaging from inside the job",
      description:
        "Send SMS or email directly from the job page. The full message history is right there — every message sent, received, and its delivery status. No switching to another app.",
      imagePlaceholder: "Messaging panel on job detail page",
    },
    {
      title: "Delivery tracking and incoming SMS",
      description:
        "Track whether messages were delivered and read. When customers reply by SMS, their responses appear in the job — so your whole team can see the conversation.",
      imagePlaceholder: "Delivery status indicators and incoming messages",
    },
  ],
  integrationCallout: {
    title: "Messages tied to every job",
    description:
      "Communications are linked directly to jobs. Your team always has context when talking to customers.",
    features: ["job-management", "online-bookings", "mobile-app"],
  },
  relatedFeatures: ["job-management", "online-bookings", "mobile-app"],
  seo: {
    title: "SMS & Email for Moving Companies | VanMan",
    description:
      "Send automated SMS and email to customers at every stage. Smart templates, delivery tracking, and two-way messaging built for moving companies.",
  },
};
