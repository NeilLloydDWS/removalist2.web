import type { FeaturePageData } from "./types";

export const calendarScheduling: FeaturePageData = {
  slug: "calendar-scheduling",
  title: "Calendar & Scheduling",
  tagline: "See your week at a glance",
  description:
    "A drag-and-drop calendar built for moving companies. Schedule jobs, assign trucks and crews, and manage your entire week from a single view that updates in real time.",
  heroImage: "Calendar with colour-coded jobs across the week",
  benefits: [
    {
      icon: "Calendar",
      title: "See your whole week at a glance",
      description:
        "A clear weekly time-grid view shows every job, every truck, and every crew member. No more whiteboards or spreadsheets.",
    },
    {
      icon: "RefreshCw",
      title: "Reschedule in seconds",
      description:
        "Drag and drop jobs between days and trucks. Changes sync instantly for all operators and drivers.",
    },
    {
      icon: "Users",
      title: "Multiple operators, one calendar",
      description:
        "Everyone sees the same live calendar. No conflicting bookings, no double-ups, no surprises.",
    },
  ],
  detailSections: [
    {
      title: "Colour-coded jobs at a glance",
      description:
        "Each truck gets its own colour, making it easy to see who’s doing what at a glance. Jobs are shown as time blocks on the calendar with customer name, address, and status — so you never need to click to get the basics.",
      imagePlaceholder: "Calendar view with colour-coded job blocks",
    },
    {
      title: "Drag-and-drop rescheduling",
      description:
        "Need to move a job? Just drag it to a new time slot or a different truck. The calendar updates in real time for everyone — drivers included, via the mobile app.",
      imagePlaceholder: "Drag interaction moving a job between trucks",
    },
    {
      title: "Mobile day view for drivers",
      description:
        "Drivers see a simplified day view on their phone showing today’s jobs in order. Tap any job for full details, customer contact, and navigation.",
      imagePlaceholder: "Mobile app showing driver’s day view",
    },
  ],
  integrationCallout: {
    title: "Connected to your whole workflow",
    description:
      "The calendar pulls data from across VanMan — jobs, trucks, crews, and bookings — so everything stays in sync.",
    features: ["job-management", "fleet-management", "mobile-app", "online-bookings"],
  },
  relatedFeatures: ["job-management", "fleet-management", "mobile-app"],
  seo: {
    title: "Moving Company Scheduling Software | VanMan",
    description:
      "Drag-and-drop calendar scheduling built for moving companies. Assign trucks, manage crews, and see your whole week at a glance with VanMan.",
  },
};
