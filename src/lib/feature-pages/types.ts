export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export interface DetailSection {
  title: string;
  description: string;
  imagePlaceholder: string;
}

export interface SeoMetadata {
  title: string;
  description: string;
  ogImage?: string;
}

export interface FeaturePageData {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  heroImage: string;
  benefits: Benefit[];
  detailSections: DetailSection[];
  integrationCallout: {
    title: string;
    description: string;
    features: string[];
  };
  relatedFeatures: string[];
  seo: SeoMetadata;
}
