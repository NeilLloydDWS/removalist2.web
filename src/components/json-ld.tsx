export interface OrganizationSchema {
  "@type": "Organization";
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
  contactPoint?: {
    "@type": "ContactPoint";
    email?: string;
    contactType?: string;
  };
}

export interface SoftwareApplicationSchema {
  "@type": "SoftwareApplication";
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  offers?: OfferSchema;
  description?: string;
  url?: string;
}

export interface ProductSchema {
  "@type": "Product";
  name: string;
  description?: string;
  offers?: OfferSchema;
}

export interface ArticleSchema {
  "@type": "Article";
  headline: string;
  author?: { "@type": "Person"; name: string };
  datePublished?: string;
  dateModified?: string;
  image?: string;
  description?: string;
}

export interface FAQPageSchema {
  "@type": "FAQPage";
  mainEntity: {
    "@type": "Question";
    name: string;
    acceptedAnswer: { "@type": "Answer"; text: string };
  }[];
}

export interface HowToSchema {
  "@type": "HowTo";
  name: string;
  step: { "@type": "HowToStep"; name: string; text: string }[];
}

export interface OfferSchema {
  "@type": "Offer";
  price?: string;
  priceCurrency?: string;
  availability?: string;
  url?: string;
}

export interface BreadcrumbListSchema {
  "@type": "BreadcrumbList";
  itemListElement: {
    "@type": "ListItem";
    position: number;
    name: string;
    item?: string;
  }[];
}

export type JsonLdSchema =
  | (OrganizationSchema & { "@context": string })
  | (SoftwareApplicationSchema & { "@context": string })
  | (ProductSchema & { "@context": string })
  | (ArticleSchema & { "@context": string })
  | (FAQPageSchema & { "@context": string })
  | (HowToSchema & { "@context": string })
  | (BreadcrumbListSchema & { "@context": string })
  | Record<string, unknown>;

export function JsonLd({ data }: { data: JsonLdSchema }) {
  // Escape </script> to prevent XSS
  const json = JSON.stringify(data).replace(/<\/script/gi, "<\\/script");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
