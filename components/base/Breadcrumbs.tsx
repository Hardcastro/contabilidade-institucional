import Link from "next/link";
import { ArrowRightIcon } from "./Icons";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

/** Wayfinding trail for inner pages: where am I, and how do I get back. */
export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav aria-label="Trilha de navegação" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-body-sm text-text-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {index > 0 ? <ArrowRightIcon className="h-3 w-3 shrink-0 opacity-60" /> : null}
              {item.href && !isLast ? (
                // Mesma técnica do rodapé: o par -my/py cresce o alvo de
                // 21 para 41px e a margem negativa devolve o espaço, então a
                // trilha continua com a mesma altura na página.
                <Link href={item.href} className="-my-2.5 py-2.5 hover:text-text-primary">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-text-primary" : ""}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
