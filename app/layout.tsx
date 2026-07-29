import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/base/Header";
import { Footer } from "@/components/base/Footer";
import { UtilityBar } from "@/components/base/UtilityBar";
import { navItems, services, siteConfig } from "@/site.config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-control focus:bg-clay-primary focus:px-4 focus:py-2 focus:text-clay-primary-ink focus:shadow-clay"
        >
          Pular para o conteúdo
        </a>
        <UtilityBar
          phone={siteConfig.contact.phone}
          phoneHref={siteConfig.contact.phoneHref}
          hours={siteConfig.contact.hours}
        />
        <Header brand={siteConfig.shortName} navItems={navItems} />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer
          brand={siteConfig.name}
          description={siteConfig.description}
          contact={siteConfig.contact}
          navItems={navItems}
          extraColumn={{
            heading: "Serviços",
            items: services.map((service) => ({
              label: service.title,
              href: `/servicos#${service.slug}`,
            })),
          }}
        />
      </body>
    </html>
  );
}
