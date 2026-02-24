import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { FaqAccordions } from "@/components/faq-accordions";
import { faqSections } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about VanMan moving company software. Pricing, features, security, setup, and support.",
  openGraph: {
    title: "FAQ | VanMan",
    description:
      "Frequently asked questions about VanMan moving company software.",
  },
};

function generateFaqJsonLd() {
  const allQuestions = faqSections.flatMap((section) =>
    section.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    }))
  );

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQuestions,
  };
}

export default function FaqPage() {
  const jsonLd = generateFaqJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section>
        <SectionHeader
          eyebrow="FAQ"
          heading="Frequently asked questions"
          subheading="Quick answers to common questions about VanMan."
        />

        {/* Section anchor nav */}
        <div className="mx-auto mb-10 flex max-w-2xl flex-wrap justify-center gap-2">
          {faqSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {section.title}
            </a>
          ))}
        </div>

        <FaqAccordions />
      </Section>

      {/* Bottom CTA */}
      <Section variant="alternate-bg">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Still have questions?</h2>
          <p className="mt-2 text-muted-foreground">
            We&apos;re here to help. Get in touch or start your free trial.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
