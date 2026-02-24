"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqSections } from "@/lib/faq";

export function FaqAccordions() {
  return (
    <div className="mx-auto max-w-2xl space-y-10">
      {faqSections.map((section) => (
        <div key={section.id} id={section.id} className="scroll-mt-20">
          <h2 className="mb-4 text-xl font-semibold">{section.title}</h2>
          <Accordion type="single" collapsible>
            {section.items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`${section.id}-${index}`}
              >
                <AccordionTrigger className="text-base text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
