import type { Metadata } from "next";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { ContactTabs } from "@/components/contact-tabs";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with VanMan. Send us a message, request a demo, or find our contact details.",
  openGraph: {
    title: "Contact Us | VanMan",
    description:
      "Get in touch with VanMan. Send us a message or request a demo.",
  },
};

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@vanman.app",
    href: "mailto:hello@vanman.app",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+64 9 123 4567",
    href: "tel:+6491234567",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Level 2, 45 Queen Street\nAuckland CBD 1010\nNew Zealand",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Monday – Friday\n8:00 am – 6:00 pm NZST",
  },
];

export default function ContactPage() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Contact"
        heading="Get in touch"
        subheading="Have a question, want a demo, or just want to say hello? We'd love to hear from you."
      />

      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_320px]">
        {/* Form */}
        <ContactTabs />

        {/* Contact Details */}
        <div className="space-y-6 lg:pt-2">
          <h3 className="text-lg font-semibold">Contact details</h3>
          <div className="space-y-5">
            {contactDetails.map((item) => (
              <div key={item.label} className="flex gap-3">
                <item.icon className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="whitespace-pre-line text-sm text-muted-foreground">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
