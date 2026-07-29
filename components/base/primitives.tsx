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

export function Section({ children, className = "", id, as: As = "section" }: SectionProps) {
  return (
    <As id={id} className={`py-16 sm:py-24 ${className}`}>
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
      className={`rounded-panel border border-glass-border bg-glass-bg shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-glass ${className}`}
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
};

export function SolidCard({
  children,
  className = "",
  as: As = "div",
  interactive = false,
  href,
}: SolidCardProps) {
  const interactiveClasses = interactive
    ? "transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-clay-primary/50 hover:shadow-[0_16px_40px_-20px_rgba(16,185,129,0.45)] focus-visible:-translate-y-1"
    : "";
  const combinedClassName = `rounded-card border border-glass-solid-border bg-glass-solid-bg ${interactiveClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={`block ${combinedClassName}`}>
        {children}
      </Link>
    );
  }

  return <As className={combinedClassName}>{children}</As>;
}

type ClayButtonBaseProps = {
  children: ReactNode;
  variant?: "primary" | "surface";
  className?: string;
};

const clayVariants = {
  primary: "bg-clay-primary text-clay-primary-ink",
  surface: "bg-clay-surface text-clay-surface-ink",
};

const clayButtonClasses = (variant: "primary" | "surface", className: string) =>
  `inline-flex items-center justify-center gap-2 rounded-control px-6 py-3 text-body font-medium shadow-clay outline-none transition-[filter,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:shadow-clay-active active:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:brightness-100 ${clayVariants[variant]} ${className}`;

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
