export interface Feature {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  href: string;
  bullets: string[];
}

export const features: Feature[] = [
  {
    slug: "calendar-scheduling",
    name: "Calendar & Scheduling",
    tagline: "See your week at a glance",
    description:
      "Drag-and-drop calendar to schedule jobs, assign crews, and manage your entire week from one view.",
    icon: "Calendar",
    href: "/features/calendar-scheduling",
    bullets: [
      "Drag-and-drop job scheduling across days and crews",
      "Colour-coded jobs by status, truck, or team",
      "Daily, weekly, and monthly calendar views",
      "Automatic conflict detection for double-booked trucks or staff",
    ],
  },
  {
    slug: "job-management",
    name: "Job Management",
    tagline: "Track every job from quote to completion",
    description:
      "Manage the full lifecycle of every moving job — from initial enquiry through to completion and invoicing.",
    icon: "ClipboardList",
    href: "/features/job-management",
    bullets: [
      "Full job lifecycle tracking from enquiry to invoiced",
      "Attach photos, inventory lists, and notes to each job",
      "Custom job statuses and workflow stages",
      "Job templates for recurring or standard moves",
    ],
  },
  {
    slug: "fleet-management",
    name: "Fleet Management",
    tagline: "Know where your trucks are",
    description:
      "Keep track of your trucks, trailers, and equipment — availability, maintenance schedules, and assignments.",
    icon: "Truck",
    href: "/features/fleet-management",
    bullets: [
      "Vehicle availability and assignment tracking",
      "Maintenance schedules and service reminders",
      "Capacity planning across your fleet",
      "Equipment and asset tracking per vehicle",
    ],
  },
  {
    slug: "online-bookings",
    name: "Online Bookings",
    tagline: "Capture leads while you sleep",
    description:
      "An embeddable booking form that lets customers request quotes and book moves directly from your website.",
    icon: "Globe",
    href: "/features/online-bookings",
    bullets: [
      "Embeddable booking widget for your website",
      "Instant email notifications for new enquiries",
      "Custom fields to capture move details upfront",
      "Automatic lead-to-job conversion",
    ],
  },
  {
    slug: "customer-communications",
    name: "Customer Communications",
    tagline: "Keep customers in the loop",
    description:
      "Send automated SMS and email updates to customers at every stage — confirmations, reminders, and follow-ups.",
    icon: "MessageSquare",
    href: "/features/customer-communications",
    bullets: [
      "Automated SMS and email at key job milestones",
      "Customisable message templates",
      "Two-way SMS so customers can reply directly",
      "Post-move review request automation",
    ],
  },
  {
    slug: "invoicing-xero",
    name: "Invoicing & Xero",
    tagline: "Get paid faster",
    description:
      "Generate invoices from completed jobs and sync them straight to Xero — no double entry.",
    icon: "Receipt",
    href: "/features/invoicing-xero",
    bullets: [
      "One-click invoice generation from job data",
      "Xero integration for automatic sync",
      "Track payment status and overdue invoices",
      "Branded invoice templates with your logo",
    ],
  },
  {
    slug: "dashboard-analytics",
    name: "Dashboard & Analytics",
    tagline: "See how your business is tracking",
    description:
      "Real-time dashboards showing revenue, job volume, crew utilisation, and business health at a glance.",
    icon: "BarChart3",
    href: "/features/dashboard-analytics",
    bullets: [
      "Revenue and job volume tracking over time",
      "Crew and truck utilisation reports",
      "Lead conversion and booking pipeline metrics",
      "Exportable reports for accounting and planning",
    ],
  },
  {
    slug: "mobile-app",
    name: "Mobile App",
    tagline: "Your business in your pocket",
    description:
      "iOS and Android apps for drivers, operators, and admins — update jobs, capture photos, and communicate on the go.",
    icon: "Smartphone",
    href: "/features/mobile-app",
    bullets: [
      "Native iOS and Android apps for field crews",
      "Update job status and add photos from the truck",
      "Turn-by-turn navigation to job sites",
      "Offline mode for areas with poor coverage",
    ],
  },
  {
    slug: "team-chat",
    name: "Team Chat",
    tagline: "Talk to your team in real time",
    description:
      "Built-in real-time messaging for your whole team — no more juggling WhatsApp groups and texts.",
    icon: "MessagesSquare",
    href: "/features/team-chat",
    bullets: [
      "Real-time staff-to-staff messaging",
      "Job-linked chat threads for context",
      "Group channels for teams, trucks, or offices",
      "Push notifications so nothing gets missed",
    ],
  },
];
