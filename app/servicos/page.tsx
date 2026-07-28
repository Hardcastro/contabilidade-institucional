import type { Metadata } from "next";
import { Container, ClayTile, Section, SectionHeading, SolidCard } from "@/components/base/primitives";
import {
  BuildingIcon,
  CalculatorIcon,
  CompassIcon,
  FileTextIcon,
  UsersIcon,
} from "@/components/base/Icons";
import { services, siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "Serviços",
  description: `Os serviços contábeis da ${siteConfig.name}: abertura de empresa, contabilidade mensal, folha de pagamento, imposto de renda e consultoria tributária.`,
};

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
        <SectionHeading
          eyebrow="Serviços"
          title="O que a Meridiano cuida para você"
          description="Cada serviço abaixo diz o que chega até você — não o passo técnico por trás."
        />

        <div className="mt-10 flex flex-col gap-6">
          {services.map((service) => {
            const Icon = serviceIcons[service.slug] ?? BuildingIcon;
            return (
              <SolidCard key={service.slug} className="flex flex-col gap-4 p-6 sm:flex-row sm:gap-8 sm:p-8">
                <ClayTile className="h-14 w-14 shrink-0">
                  <Icon className="h-7 w-7" />
                </ClayTile>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lead font-medium text-text-primary">{service.title}</h2>
                  <p className="text-body text-text-muted">{service.description}</p>
                </div>
              </SolidCard>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
