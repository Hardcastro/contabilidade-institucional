import { ClayButton, Container, Section } from "@/components/base/primitives";
import { ArrowRightIcon } from "@/components/base/Icons";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Página não encontrada",
  description: "Essa página não existe ou mudou de endereço.",
});

export default function NotFound() {
  return (
    <Section className="pb-24 pt-14 sm:pt-20">
      <Container>
        <div className="flex max-w-xl flex-col gap-6">
          <span className="text-body-sm font-medium uppercase tracking-wide text-text-secondary">
            Erro 404
          </span>
          <h1 className="text-h2 font-medium tracking-tight text-text-primary text-balance">
            Essa página não existe — ou mudou de endereço.
          </h1>
          <p className="text-lead text-text-muted">
            Confira o link ou volte para uma das páginas abaixo.
          </p>
          <div className="mt-2 flex flex-wrap gap-4">
            <ClayButton href="/">
              Voltar para o início
              <ArrowRightIcon className="h-4 w-4" />
            </ClayButton>
            <ClayButton href="/contato" variant="surface">
              Falar com a Meridiano
            </ClayButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}
