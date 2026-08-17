import { Breadcrumbs } from "@/components/base/Breadcrumbs";
import { ClayButton, Container, ClayTile, Section, SectionHeading, SolidCard } from "@/components/base/primitives";
import {
  ArrowRightIcon,
  BuildingIcon,
  CalculatorIcon,
  CompassIcon,
  FileTextIcon,
  UsersIcon,
} from "@/components/base/Icons";
import { pageMetadata } from "@/lib/seo";
import { services, siteConfig } from "@/site.config";

export const metadata = pageMetadata({
  title: "Serviços",
  description: `Os serviços contábeis da ${siteConfig.name}: abertura de empresa, contabilidade mensal, folha de pagamento, imposto de renda e consultoria tributária.`,
  path: "/servicos",
});

const serviceIcons: Record<string, typeof BuildingIcon> = {
  "abertura-de-empresa": BuildingIcon,
  "contabilidade-mensal": CalculatorIcon,
  "folha-de-pagamento": UsersIcon,
  "imposto-de-renda-pj-e-pf": FileTextIcon,
  "consultoria-tributaria": CompassIcon,
};

export default function ServicosPage() {
  return (
    <Section className="pt-14 sm:pt-20">
      <Container>
        <Breadcrumbs
          items={[{ label: "Início", href: "/" }, { label: "Serviços" }]}
          className="mb-6"
        />
        <SectionHeading
          eyebrow="Serviços"
          title="O que a Meridiano cuida para você"
          description="Cada serviço abaixo diz o que chega até você — não o passo técnico por trás."
        />

        {/*
          Duas colunas no desktop, com o quinto cartão ocupando a linha
          inteira. Em coluna única cada cartão tinha 1152px de largura e o
          texto morria em 65 caracteres, deixando um quarto do cartão em
          branco — e cinco cartões empilhados faziam a página passar de
          2200px sem precisar. O último ganha o layout em linha (ícone,
          título e texto lado a lado) para não virar uma faixa larga com
          duas linhas de texto perdidas no canto.
        */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {services.map((service, indice) => {
            const Icon = serviceIcons[service.slug] ?? BuildingIcon;
            const ocupaLinha = indice === services.length - 1 && services.length % 2 === 1;
            return (
              <SolidCard
                key={service.slug}
                id={service.slug}
                className={`flex scroll-mt-24 flex-col gap-4 p-6 sm:flex-row sm:gap-8 sm:p-8 ${
                  ocupaLinha ? "lg:col-span-2 lg:items-center" : ""
                }`}
              >
                <ClayTile className="h-14 w-14 shrink-0">
                  <Icon className="h-7 w-7" />
                </ClayTile>
                <div className={`flex flex-col gap-2 ${ocupaLinha ? "lg:max-w-3xl" : ""}`}>
                  <h2 className="text-lead font-medium text-text-primary">{service.title}</h2>
                  <p className="text-body text-text-muted">{service.description}</p>
                </div>
              </SolidCard>
            );
          })}
        </div>

        <SolidCard className="mt-10 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="text-body text-text-muted">Já sabe do que precisa? Veja qual plano cobre isso.</p>
          <ClayButton href="/planos" variant="quiet" className="shrink-0">
            Ver planos e preços
            <ArrowRightIcon className="h-4 w-4" />
          </ClayButton>
        </SolidCard>
      </Container>
    </Section>
  );
}
