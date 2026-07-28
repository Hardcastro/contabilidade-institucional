import type { Metadata } from "next";
import Link from "next/link";
import { Container, ClayButton, ClayTile, GlassCard, SectionHeading, Section, SolidCard } from "@/components/base/primitives";
import { ArrowRightIcon, BuildingIcon, CalculatorIcon, CompassIcon } from "@/components/base/Icons";
import {
  featuredServiceSlugs,
  finalCta,
  howItWorks,
  proofNumbers,
  services,
  siteConfig,
} from "@/site.config";

export const metadata: Metadata = {
  title: siteConfig.tagline,
  description: siteConfig.description,
};

const featuredIcons: Record<string, typeof BuildingIcon> = {
  "abertura-de-empresa": BuildingIcon,
  "contabilidade-mensal": CalculatorIcon,
  "consultoria-tributaria": CompassIcon,
};

export default function Home() {
  const featuredServices = featuredServiceSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <>
      <Section className="pb-8 pt-14 sm:pt-20">
        <Container>
          <div className="flex max-w-3xl flex-col gap-6">
            <span className="text-body-sm font-medium uppercase tracking-wide text-text-secondary">
              Contabilidade em {siteConfig.city}
            </span>
            <h1 className="text-h2 sm:text-h1 font-medium text-text-primary text-balance">
              {siteConfig.tagline}
            </h1>
            <p className="max-w-xl text-lead text-text-muted">{siteConfig.description}</p>
            <div className="mt-2 flex flex-wrap gap-4">
              <ClayButton href="/contato">
                Falar com a Meridiano
                <ArrowRightIcon className="h-4 w-4" />
              </ClayButton>
              <ClayButton href="/planos" variant="surface">
                Ver planos e preços
              </ClayButton>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="O que você recebe"
            title="Três frentes que tiram o imposto da sua cabeça"
            description="Detalhes de todos os serviços ficam na página de serviços — aqui, o resumo do que muda no seu dia a dia."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {featuredServices.map((service) => {
              const Icon = featuredIcons[service.slug] ?? BuildingIcon;
              return (
                <SolidCard key={service.slug} className="flex flex-col gap-4 p-6">
                  <ClayTile className="h-12 w-12">
                    <Icon className="h-6 w-6" />
                  </ClayTile>
                  <h3 className="text-lead font-medium text-text-primary">{service.title}</h3>
                  <p className="text-body-sm text-text-muted">{service.summary}</p>
                  <Link
                    href="/servicos"
                    className="mt-auto inline-flex items-center gap-1 text-body-sm font-medium text-text-secondary hover:text-text-primary"
                  >
                    Ver detalhes
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </SolidCard>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Como funciona" title="Do primeiro contato à rotina no calendário" />
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {howItWorks.map((step, index) => (
              <div key={step.title} className="flex flex-col gap-3">
                <ClayTile className="h-10 w-10 text-body font-medium">{index + 1}</ClayTile>
                <h3 className="text-lead font-medium text-text-primary">{step.title}</h3>
                <p className="text-body-sm text-text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <GlassCard className="p-8 sm:p-10">
            <span className="text-body-sm font-medium uppercase tracking-wide text-text-secondary">
              Números do escritório
            </span>
            <div className="mt-6 grid gap-8 sm:grid-cols-4">
              {proofNumbers.map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <span className="text-h3 font-semibold text-text-primary">{item.value}</span>
                  <span className="text-body-sm text-text-muted">{item.label}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </Container>
      </Section>

      <Section className="pb-24">
        <Container>
          <SolidCard className="flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="flex flex-col gap-2">
              <h2 className="text-h3 font-medium text-text-primary">{finalCta.title}</h2>
              <p className="max-w-xl text-body text-text-muted">{finalCta.description}</p>
            </div>
            <ClayButton href={finalCta.buttonHref} className="shrink-0">
              {finalCta.buttonLabel}
              <ArrowRightIcon className="h-4 w-4" />
            </ClayButton>
          </SolidCard>
        </Container>
      </Section>
    </>
  );
}
