import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeaturePage } from "@/components/feature-page";
import { features } from "@/lib/features";
import { featurePages } from "@/lib/feature-pages";

interface FeatureDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return features.map((feature) => ({
    slug: feature.slug,
  }));
}

export async function generateMetadata({
  params,
}: FeatureDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = featurePages[slug];

  if (!data) {
    return { title: "Feature Not Found" };
  }

  return {
    title: data.seo.title,
    description: data.seo.description,
    openGraph: {
      title: data.seo.title,
      description: data.seo.description,
      ...(data.seo.ogImage && { images: [{ url: data.seo.ogImage }] }),
    },
  };
}

export default async function FeatureDetailPage({
  params,
}: FeatureDetailPageProps) {
  const { slug } = await params;
  const data = featurePages[slug];

  if (!data) {
    notFound();
  }

  return <FeaturePage data={data} />;
}
