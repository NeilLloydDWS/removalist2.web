"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactForm } from "@/components/contact-form";
import { DemoRequestForm } from "@/components/demo-request-form";

function ContactTabsInner() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("type") === "demo" ? "demo" : "contact";

  return (
    <Tabs defaultValue={defaultTab}>
      <TabsList className="mb-6 grid w-full grid-cols-2">
        <TabsTrigger value="contact">Contact Us</TabsTrigger>
        <TabsTrigger value="demo">Request a Demo</TabsTrigger>
      </TabsList>
      <TabsContent value="contact">
        <ContactForm />
      </TabsContent>
      <TabsContent value="demo">
        <DemoRequestForm />
      </TabsContent>
    </Tabs>
  );
}

export function ContactTabs() {
  return (
    <Suspense fallback={<ContactForm />}>
      <ContactTabsInner />
    </Suspense>
  );
}
