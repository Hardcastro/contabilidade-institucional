import type { Metadata } from "next";
import { ClayButton, Container, Section, SectionHeading, SolidCard } from "@/components/base/primitives";
import { CheckIcon } from "@/components/base/Icons";
import { comparisonRows, plans, siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "Planos",
  description: `Planos e preços da ${siteConfig.name}: contabilidade para MEI, ME no Simples Nacional e empresas no Lucro Presumido.`,
};

export default function PlanosPage() {
  return (
    <>
      <Section className="pb-8 pt-14 sm:pt-20">
        <Container>
          <SectionHeading
            eyebrow="Planos"
            title="Um preço fechado para cada fase da empresa"
            description="Sem letra miúda: o que está incluído em cada plano está escrito abaixo, e o que não está, também."
          />
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <SolidCard
                key={plan.id}
                className={`flex flex-col gap-6 p-6 sm:p-8 ${
                  plan.featured ? "ring-2 ring-clay-primary" : ""
                }`}
              >
                <div className="flex flex-col gap-2">
                  {plan.featured ? (
                    <span className="w-fit rounded-control bg-clay-primary px-3 py-1 text-body-sm font-medium text-clay-primary-ink">
                      Mais escolhido
                    </span>
                  ) : null}
                  <h2 className="text-lead font-medium text-text-primary">{plan.name}</h2>
                  <p className="text-h3 font-semibold text-text-primary">{plan.price}</p>
                  <p className="text-body-sm text-text-muted">{plan.audience}</p>
                </div>

                <ul className="flex flex-1 flex-col gap-3">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-body-sm text-text-muted">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-clay-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <ClayButton
                  href="/contato"
                  variant={plan.featured ? "primary" : "surface"}
                  className="w-full"
                >
                  Falar sobre este plano
                </ClayButton>
              </SolidCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pb-24 pt-0">
        <Container>
          <SectionHeading eyebrow="Comparação" title="Lado a lado" className="mb-8" />
          <SolidCard className="overflow-x-auto p-2 sm:p-4">
            <table className="w-full min-w-[640px] border-collapse text-left text-body-sm">
              <thead>
                <tr className="border-b border-glass-solid-border">
                  <th scope="col" className="p-4 font-medium text-text-secondary">
                    &nbsp;
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.id} scope="col" className="p-4 font-medium text-text-primary">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="border-b border-glass-solid-border last:border-0">
                    <th scope="row" className="p-4 font-medium text-text-secondary">
                      {row.label}
                    </th>
                    <td className="p-4 text-text-muted">{row.essencial}</td>
                    <td className="p-4 text-text-muted">{row.crescimento}</td>
                    <td className="p-4 text-text-muted">{row.completo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SolidCard>
        </Container>
      </Section>
    </>
  );
}
