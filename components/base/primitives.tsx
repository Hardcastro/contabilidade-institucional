import Link from "next/link";
import type { ButtonHTMLAttributes, ElementType, ReactNode } from "react";

/**
 * Shared building blocks for the clay + glass visual system.
 * Nothing in this file may know what kind of business the page belongs to —
 * every label reaches these components through props.
 */

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: ElementType;
};

/**
 * Ritmo vertical da peça. O padding é simétrico, então DUAS seções vizinhas
 * somam o dobro entre si — e quase todo bloco desta peça já é um cartão com
 * padding próprio de 32–40px. Com py-20 dava 160px de nada entre um cartão e
 * o próximo, e a página lia como uma coluna de ilhas soltas. py-12/sm:py-16
 * deixa 96px no celular e 128px no desktop entre seções, que somados ao
 * padding dos cartões ainda é ar de sobra.
 */
export function Section({ children, className = "", id, as: As = "section" }: SectionProps) {
  return (
    <As id={id} className={`py-12 sm:py-16 ${className}`}>
      {children}
    </As>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-3 ${alignment} ${className}`}>
      {eyebrow ? (
        <span className="text-body-sm font-medium uppercase tracking-wide text-text-secondary">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-h3 sm:text-h2 font-medium tracking-tight text-text-primary text-balance">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-body text-text-muted">{description}</p>
      ) : null}
    </div>
  );
}

/**
 * Glass carries chrome, never running text: nav bars, floating panels,
 * short-number cards. The background behind it must always be the page
 * gradient, or contrast breaks.
 */
type GlassCardProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

export function GlassCard({ children, className = "", as: As = "div" }: GlassCardProps) {
  return (
    <As
      className={`rounded-panel border border-glass-border bg-glass-bg shadow-[0_8px_30px_-14px_rgba(15,23,42,0.18)] backdrop-blur-glass ${className}`}
    >
      {children}
    </As>
  );
}

/**
 * Solid (or near-solid) surface for anything with more than one line of
 * text: paragraphs, forms, tables. Set `interactive` on cards that are
 * themselves a link/button target — it adds a hover lift and border glow,
 * never on cards that merely contain one.
 */
type SolidCardProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  interactive?: boolean;
  href?: string;
  [key: `aria-${string}`]: string | boolean | undefined;
  id?: string;
  role?: string;
};

export function SolidCard({
  children,
  className = "",
  as: As = "div",
  interactive = false,
  href,
  ...rest
}: SolidCardProps) {
  const interactiveClasses = interactive
    ? "transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-clay-primary/50 hover:shadow-[0_16px_40px_-20px_rgba(16,185,129,0.45)] focus-visible:-translate-y-1"
    : "";
  const combinedClassName = `rounded-card border border-glass-solid-border bg-glass-solid-bg ${interactiveClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={`block ${combinedClassName}`} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <As className={combinedClassName} {...rest}>
      {children}
    </As>
  );
}

type ClayButtonVariant = "primary" | "surface" | "quiet";

type ClayButtonBaseProps = {
  children: ReactNode;
  variant?: ClayButtonVariant;
  className?: string;
};

/**
 * Três pesos, não dois. `primary` e `surface` são ambos preenchidos e com
 * sombra de clay — lado a lado no herói eles pesavam igual e não dava para
 * ver qual era a ação principal. `quiet` é a que faltava: contorno, sem
 * preenchimento e sem sombra, para o secundário existir sem competir.
 * `surface` continua para quando o botão precisa de peso sobre fundo claro
 * mas não é a ação principal da tela (fim de página, dentro de cartão).
 */
const clayVariants: Record<ClayButtonVariant, string> = {
  primary: "bg-clay-primary text-clay-primary-ink shadow-clay active:shadow-clay-active",
  surface: "bg-clay-surface text-clay-surface-ink shadow-clay active:shadow-clay-active",
  quiet:
    "border border-glass-solid-border bg-glass-solid-bg/60 text-text-primary hover:border-clay-primary/60 hover:bg-glass-solid-bg",
};

const clayButtonClasses = (variant: ClayButtonVariant, className: string) =>
  `inline-flex items-center justify-center gap-2 rounded-control px-6 py-3 text-body font-medium outline-none transition-[filter,box-shadow,transform,background-color,border-color] duration-150 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:brightness-100 ${
    variant === "quiet" ? "" : "hover:brightness-110 active:brightness-95"
  } ${clayVariants[variant]} ${className}`;

type ClayButtonAsButton = ClayButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

type ClayButtonAsLink = ClayButtonBaseProps & {
  href: string;
};

export function ClayButton(props: ClayButtonAsButton | ClayButtonAsLink) {
  const { children, variant = "primary", className = "" } = props;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={clayButtonClasses(variant, className)}>
        {children}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- stripping styling props before spreading onto the DOM button
  const { children: _children, variant: _variant, className: _className, ...buttonProps } =
    props as ClayButtonAsButton;
  return (
    <button className={clayButtonClasses(variant, className)} {...buttonProps}>
      {children}
    </button>
  );
}

type ClayTileProps = {
  children: ReactNode;
  className?: string;
};

export function ClayTile({ children, className = "" }: ClayTileProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-card bg-clay-surface text-clay-surface-ink shadow-clay ring-1 ring-inset ring-white/10 ${className}`}
    >
      {children}
    </div>
  );
}
