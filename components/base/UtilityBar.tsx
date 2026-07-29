import Link from "next/link";
import { ClockIcon, PhoneIcon } from "./Icons";

type UtilityBarProps = {
  phone: string;
  phoneHref: string;
  hours: string;
};

/**
 * Thin contact-first strip above the main nav — the pattern real
 * accounting-firm sites lead with: a phone number and hours always
 * visible before anything else loads. Scrolls away with the page; the
 * sticky glass header takes over once it's gone.
 */
export function UtilityBar({ phone, phoneHref, hours }: UtilityBarProps) {
  return (
    <div className="hidden border-b border-glass-solid-border bg-bg-solid sm:block">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-2 text-body-sm text-text-muted sm:px-8">
        <div className="flex items-center gap-5">
          <a href={`tel:${phoneHref}`} className="flex items-center gap-1.5 hover:text-text-primary">
            <PhoneIcon className="h-3.5 w-3.5" />
            {phone}
          </a>
          <span className="flex items-center gap-1.5">
            <ClockIcon className="h-3.5 w-3.5" />
            {hours}
          </span>
        </div>
        <Link href="/contato" className="font-medium text-text-secondary hover:text-text-primary">
          Fale conosco
        </Link>
      </div>
    </div>
  );
}
