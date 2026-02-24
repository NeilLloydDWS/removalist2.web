export interface FaqSection {
  id: string;
  title: string;
  items: { question: string; answer: string }[];
}

export const faqSections: FaqSection[] = [
  {
    id: "general",
    title: "General",
    items: [
      {
        question: "What is VanMan?",
        answer:
          "VanMan is software built specifically for moving companies. It handles scheduling, job management, invoicing, customer communications, and more \u2014 all from one place. It replaces the spreadsheets, whiteboards, and scattered tools most removalists use to run their business.",
      },
      {
        question: "Who is VanMan for?",
        answer:
          "VanMan is designed for moving and removalist companies of all sizes \u2014 from owner-operators with one truck to large businesses with a fleet. If you schedule moving jobs, manage a crew, and invoice customers, VanMan is built for you.",
      },
      {
        question: "What countries do you support?",
        answer:
          "VanMan is available in New Zealand, Australia, the United Kingdom, and the United States. Pricing is displayed in your local currency, and features like Xero integration and SMS are configured for your region.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing & Billing",
    items: [
      {
        question: "How much does it cost?",
        answer:
          "VanMan is a single all-inclusive plan with no per-user charges. Every feature is included. Pricing varies by region \u2014 visit our pricing page for current rates in your currency.",
      },
      {
        question: "Is there a free trial?",
        answer:
          "Yes! Every new account starts with a 14-day free trial with full access to every feature. No credit card is required to start.",
      },
      {
        question: "Can I cancel anytime?",
        answer:
          "Absolutely. There are no lock-in contracts. You can cancel your subscription at any time from your billing settings, and you\u2019ll keep access until the end of your current billing period.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit and debit cards (Visa, Mastercard, Amex) through Stripe. Bank transfer is available on request for annual plans.",
      },
    ],
  },
  {
    id: "features",
    title: "Features",
    items: [
      {
        question: "Does VanMan have a mobile app?",
        answer:
          "Yes. VanMan has native iOS and Android apps for your entire team. Drivers see their assigned jobs and track delivery time. Operators can create jobs, process payments, and send invoices. Admins get full access to everything.",
      },
      {
        question: "Can I send SMS to customers?",
        answer:
          "Yes. VanMan includes built-in SMS and email communications. You can create reusable templates with variables (customer name, date, address) and send messages directly from any job.",
      },
      {
        question: "Does it integrate with Xero?",
        answer:
          "Yes. VanMan has a two-way Xero integration. Generate invoices from completed jobs with one click and they sync straight to Xero \u2014 contacts, line items, and payment statuses all stay in sync.",
      },
      {
        question: "Can my drivers use it?",
        answer:
          "Yes. Drivers get a simplified mobile view showing their assigned jobs for the day. They can tap to call customers, navigate to addresses via Google Maps, track delivery time, and add notes \u2014 all from the app.",
      },
    ],
  },
  {
    id: "setup",
    title: "Setup & Migration",
    items: [
      {
        question: "How long does setup take?",
        answer:
          "Most companies are up and running within an hour. The onboarding wizard walks you through adding your company details, trucks, and team. You can start scheduling jobs on day one.",
      },
      {
        question: "Can I import data from my old system?",
        answer:
          "Yes. VanMan supports CSV import for contacts and job history. If you need help migrating data from another system, our support team can assist with the process.",
      },
      {
        question: "Do you offer migration help?",
        answer:
          "Yes. If you\u2019re moving from another tool or a complex spreadsheet setup, our team can help you plan and execute the migration. Contact support to discuss your needs.",
      },
    ],
  },
  {
    id: "security",
    title: "Security & Privacy",
    items: [
      {
        question: "Where is my data stored?",
        answer:
          "Your data is stored securely in cloud infrastructure hosted in data centres with SOC 2 compliance. Data for NZ/AU customers is stored in the Asia-Pacific region.",
      },
      {
        question: "Is it secure?",
        answer:
          "Yes. VanMan uses industry-standard encryption (TLS 1.3 in transit, AES-256 at rest), secure authentication via Clerk, and regular security audits. All payment processing is handled by Stripe.",
      },
      {
        question: "Is my data backed up?",
        answer:
          "Yes. We perform automated daily backups with point-in-time recovery. Backups are stored in a separate geographic region for disaster recovery.",
      },
      {
        question: "Do you comply with NZ Privacy Act?",
        answer:
          "Yes. VanMan complies with the New Zealand Privacy Act 2020, the Australian Privacy Act, UK GDPR, and US data protection requirements. Our privacy policy details how we collect, use, and protect your data.",
      },
    ],
  },
  {
    id: "support",
    title: "Support",
    items: [
      {
        question: "How do I get help?",
        answer:
          "You can search our help center for guides and tutorials, or contact our support team via the in-app chat or email. We also have a getting-started guide series that walks through every feature.",
      },
      {
        question: "What are your support hours?",
        answer:
          "Our support team is available Monday to Friday, 8am\u20136pm NZST. We aim to respond to all enquiries within 4 business hours. Urgent issues are prioritised.",
      },
      {
        question: "Do you offer training?",
        answer:
          "Yes. New customers get access to our getting-started guide series in the help center. For larger teams, we offer personalised onboarding sessions via video call. Contact support to arrange one.",
      },
    ],
  },
];
