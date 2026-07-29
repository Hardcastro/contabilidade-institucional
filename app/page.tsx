import Link from "next/link";
import { Container, ClayButton, ClayTile, GlassCard, SectionHeading, Section, SolidCard } from "@/components/base/primitives";
import { ServiceExplorer } from "@/components/base/ServiceExplorer";
import {
  ArrowRightIcon,
  BuildingIcon,
  CalculatorIcon,
  CheckIcon,
  CompassIcon,
  FileTextIcon,
  UsersIcon,
} from "@/components/base/Icons";
import { pageMetadata } from "@/lib/seo";
import {
  finalCta,
  howItWorks,
  officeHistory,
  proofNumbers,
  services,
  siteConfig,
  whyChooseUs,
} from "@/site.config";

export const metadata = pageMetadata({
  title: siteConfig.tagline,
  description: siteConfig.description,
});

const serviceIcons: Record<string, typeof BuildingIcon> = {
  "abertura-de-empresa": BuildingIcon,
  "contabilidade-mensal": CalculatorIcon,
  "folha-de-pagamento": UsersIcon,
  "imposto-de-renda-pj-e-pf": FileTextIcon,
  "consultoria-tributaria": CompassIcon,
};

const heroStat = proofNumbers[1];

export default function Home() {
  const explorerServices = services.map((service) => {
    const Icon = serviceIcons[service.slug] ?? BuildingIcon;
    return {
      slug: service.slug,
      title: service.title,
      description: service.description,
      icon: <Icon className="h-7 w-7" />,
      href: `/servicos#${service.slug}`,
    };
  });

  return (
    <>
      <Section className="relative pb-8 pt-14 sm:pt-20">
        <div className="ambient-glow" aria-hidden="true" />
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-center lg:gap-12">
            <div className="flex max-w-3xl flex-col gap-6">
              <span className="text-body-sm font-medium uppercase tracking-wide text-text-secondary">
                Contabilidade em {siteConfig.city}
              </span>
              <h1 className="text-h2 sm:text-h1 font-medium tracking-tight text-text-primary text-balance">
                {siteConfig.tagline}
              </h1>
              <p className="max-w-xl text-lead text-text-muted">{siteConfig.description}</p>
              <div className="mt-2 flex flex-wrap items-center gap-4">
                <ClayButton href="/contato">
                  Falar com a Meridiano
                  <ArrowRightIcon className="h-4 w-4" />
                </ClayButton>
                <ClayButton href="/planos" variant="surface">
                  Ver planos e preços
                </ClayButton>
              </div>
              {heroStat ? (
                <p className="text-body-sm text-text-muted">
                  <span className="font-semibold tracking-tight text-text-primary">{heroStat.value}</span>{" "}
                  {heroStat.label} já confiam na Meridiano.
                </p>
              ) : null}
            </div>

            <GlassCard className="hidden flex-col gap-4 p-6 lg:flex">
              <span className="text-body-sm font-semibold uppercase tracking-wide text-text-secondary">
                Por que a Meridiano
              </span>
              <ul className="flex flex-col gap-3">
                {whyChooseUs.map((reason) => (
                  <li key={reason} className="flex items-start gap-2 text-body-sm text-text-primary">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-clay-primary" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="O que você recebe"
            title="Escolha o que pesa mais na sua rotina"
            description="Toque em cada serviço para ver o que muda no seu dia a dia — os detalhes completos ficam na página de serviços."
          />
          <div className="mt-10">
            <ServiceExplorer services={explorerServices} />
          </div>
          <Link
            href="/servicos"
            className="mt-6 inline-flex items-center gap-1 text-body-sm font-medium text-text-secondary hover:text-text-primary"
          >
            Ver todos os serviços
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Como funciona" title="Do primeiro contato à rotina no calendário" />
          <div className="relative mt-10 grid gap-8 sm:grid-cols-3">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[16.67%] right-[16.67%] top-5 hidden border-t border-dashed border-clay-primary/30 sm:block"
            />
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

      <Section className="pt-0">
        <Container>
          <SolidCard className="flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="flex flex-col gap-2">
              <span className="text-body-sm font-medium uppercase tracking-wide text-text-secondary">
                Quem somos
              </span>
              <p className="max-w-2xl text-body text-text-muted">{officeHistory}</p>
            </div>
            <Link
              href="/escritorio"
              className="inline-flex shrink-0 items-center gap-1 text-body-sm font-medium text-text-secondary hover:text-text-primary"
            >
              Conheça a equipe
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </SolidCard>
        </Container>
      </Section>

      <section className="bg-clay-primary py-14 sm:py-16">
        <Container>
          <span className="text-body-sm font-semibold uppercase tracking-wide text-clay-primary-ink">
            Números do escritório
          </span>
          <div className="mt-6 grid gap-8 sm:grid-cols-4">
            {proofNumbers.map((item, index) => (
              <div
                key={item.label}
                className={`flex flex-col gap-1 ${
                  index > 0 ? "sm:border-l sm:border-clay-primary-ink/20 sm:pl-8" : ""
                }`}
              >
                <span className="text-h3 font-semibold tracking-tight text-clay-primary-ink">{item.value}</span>
                <span className="text-body-sm font-medium text-clay-primary-ink">{item.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Section className="pb-24">
        <Container>
          <SolidCard className="flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="flex flex-col gap-2">
              <h2 className="text-h3 font-medium tracking-tight text-text-primary">{finalCta.title}</h2>
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
