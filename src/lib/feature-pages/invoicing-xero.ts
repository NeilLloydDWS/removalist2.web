import type { FeaturePageData } from "./types";

export const invoicingXero: FeaturePageData = {
  slug: "invoicing-xero",
  title: "Invoicing & Xero",
  tagline: "Get paid faster",
  description:
    "Generate invoices from completed jobs with one click and sync them straight to Xero. No double entry, no code errors, no chasing spreadsheets.",
  heroImage: "Invoice preview with Xero sync status",
  benefits: [
    {
      icon: "Receipt",
      title: "Invoice in one click",
      description:
        "Select a completed job, click 'Create Invoice', and VanMan generates a professional invoice from the job costs automatically.",
    },
    {
      icon: "RefreshCw",
      title: "Syncs straight to Xero",
      description:
        "Two-way Xero integration keeps invoices, contacts, and payment statuses in sync. No manual data entry between systems.",
    },
    {
      icon: "Shield",
      title: "No more code errors",
      description:
        "VanMan validates account codes and item codes against your Xero chart of accounts before syncing. Self-healing error resolution fixes common issues automatically.",
    },
    {
      icon: "Calculator",
      title: "Detailed job costing",
      description:
        "Track materials, labour, and other costs against every job. Build a material catalog with pricing, add items to jobs, and generate accurate quotes — all feeding directly into your invoices.",
    },
  ],
  detailSections: [
    {
      title: "One-click invoice generation",
      description:
        "When a job is complete, generate an invoice with one click. VanMan pulls in the customer details, job costs, and line items automatically. Preview and adjust before sending.",
      imagePlaceholder: "Invoice preview dialog with job costs",
    },
    {
      title: "Xero connection and sync",
      description:
        "Connect your Xero account in minutes. VanMan syncs invoices, contacts, and payment statuses in both directions. Your accountant sees everything in Xero without you lifting a finger.",
      imagePlaceholder: "Xero connection settings page",
    },
    {
      title: "Self-healing error resolution",
      description:
        "If a sync fails — wrong account code, missing contact, duplicate invoice — VanMan identifies the issue and suggests a fix. Most errors resolve automatically on retry.",
      imagePlaceholder: "Error resolution flow with suggested fixes",
    },
    {
      title: "Materials catalog and job costing",
      description:
        "Build a catalog of materials with categories and pricing. When creating a job, add materials from your catalog for accurate cost tracking. Generate customer-facing quotes from the materials and costs on a job, then convert to an invoice when the work is done.",
      imagePlaceholder: "Material catalog and job costing interface",
    },
  ],
  integrationCallout: {
    title: "From job to paid invoice",
    description:
      "Invoicing connects your completed jobs to your accounting system. The whole flow is automated.",
    features: [
      "job-management",
      "dashboard-analytics",
      "customer-communications",
    ],
  },
  relatedFeatures: [
    "job-management",
    "dashboard-analytics",
    "customer-communications",
  ],
  seo: {
    title: "Moving Company Invoicing & Xero Integration | VanMan",
    description:
      "Generate invoices from completed jobs in one click and sync to Xero automatically. Self-healing error resolution for moving companies.",
  },
};
