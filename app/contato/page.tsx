import { ContactForm } from "@/components/base/ContactForm";
import { Container, Section, SectionHeading, SolidCard } from "@/components/base/primitives";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/base/Icons";
import { pageMetadata } from "@/lib/seo";
import { businessTypeOptions, revenueRangeOptions, siteConfig } from "@/site.config";

export const metadata = pageMetadata({
  title: "Contato",
  description: `Fale com a ${siteConfig.name}: telefone, e-mail, endereço e formulário de contato.`,
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <Section className="pt-14 sm:pt-20">
      <Container>
        <SectionHeading
          eyebrow="Contato"
          title="Conte como sua empresa funciona hoje"
          description="Respondemos em até 1 dia útil. O que você escrever aqui serve só para responder este contato."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <SolidCard className="p-6 sm:p-8">
            <ContactForm
              businessTypeOptions={businessTypeOptions}
              revenueRangeOptions={revenueRangeOptions}
              privacyNotice="Seus dados servem só para responder este contato — não usamos para nenhuma outra finalidade."
            />
          </SolidCard>

          <SolidCard className="flex flex-col gap-6 p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-clay-primary" />
              <div>
                <p className="text-body-sm font-medium text-text-secondary">Telefone</p>
                <a href={`tel:${siteConfig.contact.phoneHref}`} className="text-body text-text-primary">
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-clay-primary" />
              <div>
                <p className="text-body-sm font-medium text-text-secondary">E-mail</p>
                <a href={`mailto:${siteConfig.contact.email}`} className="text-body text-text-primary">
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-clay-primary" />
              <div>
                <p className="text-body-sm font-medium text-text-secondary">Endereço</p>
                <p className="text-body text-text-primary">{siteConfig.contact.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-clay-primary" />
              <div>
                <p className="text-body-sm font-medium text-text-secondary">Horário</p>
                <p className="text-body text-text-primary">{siteConfig.contact.hours}</p>
              </div>
            </div>
          </SolidCard>
        </div>
      </Container>
    </Section>
  );
}
