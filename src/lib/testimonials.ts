export interface Testimonial {
  name: string;
  company: string;
  role: string;
  quote: string;
  location: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    company: "Swift Removals",
    role: "Owner",
    quote:
      "VanMan replaced three different tools we were using. Scheduling, invoicing, and customer comms all in one place — it's saved us hours every week.",
    location: "Auckland, NZ",
  },
  {
    name: "James Thornton",
    company: "Thornton & Sons Moving",
    role: "Operations Manager",
    quote:
      "The calendar view alone was worth switching. We can see our whole week at a glance and our drivers get updates straight to their phones.",
    location: "Melbourne, AU",
  },
  {
    name: "Emma Clarke",
    company: "QuickMove London",
    role: "Director",
    quote:
      "Our customers love the SMS updates — they know exactly when we're arriving. And the Xero integration means no more double-entry at invoice time.",
    location: "London, UK",
  },
];
