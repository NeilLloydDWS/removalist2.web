import type { FeaturePageData } from "./types";

export const emailIntegration: FeaturePageData = {
  slug: "email-integration",
  title: "Email Integration",
  tagline: "Your inbox meets your jobs",
  description:
    "Connect your Gmail or Outlook account and VanMan automatically captures every email that mentions a job number — linked to the right job, with attachments stored and full threading.",
  heroImage: "Email thread linked to a job with attachment previews",
  benefits: [
    {
      icon: "Mail",
      title: "Emails linked to the right job",
      description:
        "VanMan scans incoming and outgoing emails for job numbers. When it finds a match, the email is automatically captured against that job — no forwarding or copying needed.",
    },
    {
      icon: "Reply",
      title: "Reply without leaving VanMan",
      description:
        "See an email on a job and need to respond? Reply directly from VanMan. Your response is sent from your connected email account and threaded into the existing conversation.",
    },
    {
      icon: "Shield",
      title: "Works with Gmail and Outlook",
      description:
        "Connect whichever email provider your business uses. One-click OAuth setup for both Gmail and Microsoft 365 / Outlook. Your credentials are encrypted and stored securely.",
    },
  ],
  detailSections: [
    {
      title: "One-click email connection",
      description:
        "Head to Settings, click Connect next to Gmail or Outlook, and authorise VanMan to read your inbox. That's it — emails start appearing on jobs within minutes. No IT setup, no forwarding rules, no server configuration.",
      imagePlaceholder: "Integration settings page with Gmail and Outlook cards",
    },
    {
      title: "Real-time email capture",
      description:
        "VanMan uses webhooks to capture emails the moment they arrive — Gmail via Google Pub/Sub and Outlook via Microsoft Graph change notifications. No polling, no delays. Attachments are downloaded and stored against the job automatically.",
      imagePlaceholder: "Job messages tab showing captured email thread",
    },
    {
      title: "Full email threading",
      description:
        "Email conversations are threaded by subject and message ID, just like your inbox. See the full back-and-forth between your team and the customer in one place. Every team member with access to the job can see the conversation history.",
      imagePlaceholder: "Threaded email conversation on job detail page",
    },
  ],
  integrationCallout: {
    title: "Every conversation in one place",
    description:
      "Email integration works alongside SMS and in-app messaging. All customer communication is captured against the job — regardless of channel.",
    features: ["job-management", "customer-communications"],
  },
  relatedFeatures: ["job-management", "customer-communications", "workflow-automation"],
  seo: {
    title: "Gmail & Outlook Integration for Moving Companies | VanMan",
    description:
      "Connect Gmail or Outlook to automatically capture emails against jobs. Reply from VanMan, store attachments, and keep your team in the loop.",
  },
};
