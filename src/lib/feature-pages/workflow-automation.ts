import type { FeaturePageData } from "./types";

export const workflowAutomation: FeaturePageData = {
  slug: "workflow-automation",
  title: "Workflow Automation",
  tagline: "Automate your business rules",
  description:
    "Build visual workflows that run automatically when jobs change, bookings come in, or invoices are created. Drag and drop triggers, conditions, and actions — no coding required.",
  heroImage: "Visual workflow editor with connected nodes",
  benefits: [
    {
      icon: "Zap",
      title: "Visual drag-and-drop builder",
      description:
        "Build workflows by dragging trigger, condition, and action nodes onto a canvas and connecting them. See the entire flow at a glance.",
    },
    {
      icon: "Bell",
      title: "Trigger on any event",
      description:
        "Workflows fire automatically when a job is created, a status changes, a booking comes in, a message is sent, or an invoice is generated.",
    },
    {
      icon: "FileText",
      title: "Start with templates",
      description:
        "Pre-built workflow templates for common scenarios — booking confirmation, job completion follow-up, invoice creation. Customise them or build your own from scratch.",
    },
  ],
  detailSections: [
    {
      title: "A workflow builder built for moving companies",
      description:
        "The visual editor lets you design workflows with five node types: Triggers (what starts the workflow), Conditions (branching logic), Actions (what happens), Delays (wait before continuing), and Human Approvals (pause for manual sign-off). Connect them however you need.",
      imagePlaceholder: "Workflow editor canvas with connected nodes",
    },
    {
      title: "Actions that save you hours",
      description:
        "Each action node can send an SMS, send an email, change a job status, create a Xero invoice, or call an external webhook. Chain multiple actions together — for example, when a job is marked complete, automatically send a thank-you SMS, create the invoice, and sync it to Xero.",
      imagePlaceholder: "Action node configuration panel",
    },
    {
      title: "Test, monitor, and debug",
      description:
        "Dry-run your workflows before activating them to make sure they do what you expect. Once live, the execution log shows every step — which nodes fired, what data was used, and whether each step succeeded or failed.",
      imagePlaceholder: "Workflow execution log with step details",
    },
  ],
  integrationCallout: {
    title: "Automation across your whole business",
    description:
      "Workflows connect to jobs, bookings, communications, and invoicing — automating the repetitive tasks that slow you down.",
    features: ["job-management", "customer-communications", "invoicing-xero"],
  },
  relatedFeatures: ["job-management", "customer-communications", "invoicing-xero"],
  seo: {
    title: "Workflow Automation for Moving Companies | VanMan",
    description:
      "Build visual workflows that automate SMS, email, invoicing, and status changes. Drag-and-drop automation built for moving companies.",
  },
};
