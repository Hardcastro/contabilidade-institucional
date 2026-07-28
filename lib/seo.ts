import type { Metadata } from "next";

type PageMetadataInput = {
  title: string;
  description: string;
};

/** Keeps a route's <title>, meta description and Open Graph tags in sync. */
export function pageMetadata({ title, description }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description },
  };
}
