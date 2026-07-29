import { Container, ClayTile, GlassCard, Section, SectionHeading, SolidCard } from "@/components/base/primitives";
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

      <Section className="pb-24">
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
    </>
  );
}
