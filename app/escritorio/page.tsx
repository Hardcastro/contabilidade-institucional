import { Container, ClayTile, Section, SectionHeading, SolidCard } from "@/components/base/primitives";
import { pageMetadata } from "@/lib/seo";
import { officeHistory, proofNumbers, siteConfig, team } from "@/site.config";

export const metadata = pageMetadata({
  title: "Escritório",
  description: `Conheça a equipe e a história da ${siteConfig.name}, escritório de contabilidade em ${siteConfig.city}.`,
  path: "/escritorio",
});

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts[parts.length - 1]?.[0] ?? "";
  return `${first}${last}`.toUpperCase();
}

export default function EscritorioPage() {
  return (
    <>
      <Section className="pb-8 pt-14 sm:pt-20">
        <Container>
          <SectionHeading eyebrow="Escritório" title="Uma equipe pequena, sem terceirizar a explicação" />
          <SolidCard className="mt-8 p-6 sm:p-8">
            <p className="text-body text-text-muted">{officeHistory}</p>
          </SolidCard>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <SectionHeading eyebrow="Time" title="Quem responde quando você escreve" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {team.map((member) => (
              <SolidCard key={member.name} className="flex gap-5 p-6">
                <ClayTile className="h-16 w-16 shrink-0 text-lead font-medium">
                  {initials(member.name)}
                </ClayTile>
                <div className="flex flex-col gap-1">
                  <h3 className="text-body font-medium text-text-primary">{member.name}</h3>
                  <p className="text-body-sm text-text-secondary">{member.role}</p>
                  <p className="text-body-sm text-text-muted">{member.crc}</p>
                  <p className="mt-2 text-body-sm text-text-muted">{member.bio}</p>
                </div>
              </SolidCard>
            ))}
          </div>
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
    </>
  );
}
