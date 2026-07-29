import Link from "next/link";
import { Container } from "./primitives";
import { MailIcon, MapPinIcon, PhoneIcon } from "./Icons";
import type { NavItem } from "@/site.config";

type FooterContact = {
  phone: string;
  phoneHref: string;
  email: string;
  address: string;
  hours: string;
};

type FooterProps = {
  brand: string;
  description: string;
  contact: FooterContact;
  navItems: NavItem[];
};

export function Footer({ brand, description, contact, navItems }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t-2 border-transparent bg-bg-solid [border-image:linear-gradient(90deg,transparent,rgba(16,185,129,0.45),transparent)_1]">
      <Container className="grid gap-10 py-14 sm:grid-cols-3">
        <div className="flex flex-col gap-3">
          <span className="text-body font-medium tracking-tight text-text-primary">{brand}</span>
          <p className="text-body-sm text-text-muted">{description}</p>
        </div>

        <nav aria-label="Rodapé">
          <span className="text-body-sm font-medium uppercase tracking-wide text-text-secondary">
            Navegação
          </span>
          <ul className="mt-3 flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-body-sm text-text-muted hover:text-text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <span className="text-body-sm font-medium uppercase tracking-wide text-text-secondary">
            Contato
          </span>
          <ul className="mt-3 flex flex-col gap-2 text-body-sm text-text-muted">
            <li className="flex items-start gap-2">
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0" />
              <a href={`tel:${contact.phoneHref}`} className="hover:text-text-primary">
                {contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MailIcon className="mt-0.5 h-4 w-4 shrink-0" />
              <a href={`mailto:${contact.email}`} className="hover:text-text-primary">
                {contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{contact.address}</span>
            </li>
            <li>{contact.hours}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-glass-solid-border">
        <Container className="flex flex-col gap-2 py-6 text-body-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {brand}. Todos os direitos reservados.</p>
          <p>Projeto de portfólio — conteúdo fictício.</p>
        </Container>
      </div>
    </footer>
  );
}
