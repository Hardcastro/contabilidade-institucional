import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/servicos". Defaults to the homepage. */
  path?: string;
};

/**
 * Keeps a route's <title>, meta description and Open Graph tags in sync.
 * Next.js does not deep-merge nested metadata objects — a route that sets
 * its own `openGraph` fully replaces the root layout's, so every field
 * (url, type, siteName, locale) has to be repeated here per route.
 */
export function pageMetadata({ title, description, path = "/" }: PageMetadataInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
    },
    twitter: { title, description, card: "summary" },
  };
}
