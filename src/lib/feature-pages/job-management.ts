import type { FeaturePageData } from "./types";

export const jobManagement: FeaturePageData = {
  slug: "job-management",
  title: "Job Management",
  tagline: "Track every job from quote to completion",
  description:
    "Manage the full lifecycle of every moving job — from the initial enquiry through to completion and invoicing. Everything about a job lives in one place.",
  heroImage: "Job detail page showing full lifecycle view",
  benefits: [
    {
      icon: "ClipboardList",
      title: "Track every job from quote to completion",
      description:
        "Follow each job through its lifecycle: enquiry, quote, confirmed, in progress, completed, invoiced. Nothing falls through the cracks.",
    },
    {
      icon: "MapPin",
      title: "See routes and driving times",
      description:
        "Google Maps integration shows pickup and delivery locations, driving distances, and estimated times — right inside the job.",
    },
    {
      icon: "Search",
      title: "Full audit trail",
      description:
        "Every change, message, and status update is logged with timestamps. Search and filter across all your jobs instantly.",
    },
  ],
  detailSections: [
    {
      title: "Everything about a job in one place",
      description:
        "The job detail page shows customer info, addresses, inventory, costs, messages, photos, and activity history — all in one scrollable view. No more switching between tabs or systems.",
      imagePlaceholder: "Job detail page with all tabs visible",
    },
    {
      title: "Google Maps location mapping",
      description:
        "See pickup and delivery locations plotted on a map with driving times and distances. Plan routes efficiently and give drivers accurate ETAs.",
      imagePlaceholder: "Locations tab showing Google Maps with markers",
    },
    {
      title: "Powerful search and filtering",
      description:
        "Find any job instantly by customer name, address, status, date, or truck. Filter and sort your job list to focus on what matters right now.",
      imagePlaceholder: "Job search results with filters applied",
    },
  ],
  integrationCallout: {
    title: "Jobs connect everything",
    description:
      "Jobs are the heart of VanMan. They link to your calendar, customer messages, invoices, and more.",
    features: [
      "calendar-scheduling",
      "customer-communications",
      "invoicing-xero",
      "mobile-app",
    ],
  },
  relatedFeatures: [
    "calendar-scheduling",
    "customer-communications",
    "invoicing-xero",
  ],
  seo: {
    title: "Moving Job Management Software | VanMan",
    description:
      "Track every moving job from quote to completion. Google Maps integration, full audit trail, and powerful search — built for removalists.",
  },
};
