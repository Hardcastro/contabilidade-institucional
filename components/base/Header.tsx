"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Container, GlassCard } from "./primitives";
import { CloseIcon, MenuIcon } from "./Icons";
import type { NavItem } from "@/site.config";

type HeaderProps = {
  brand: string;
  navItems: NavItem[];
};

type IndicatorRect = {
  left: number;
  width: number;
};

export function Header({ brand, navItems }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [indicator, setIndicator] = useState<IndicatorRect | null>(null);

  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const activeIndex = navItems.findIndex((item) => item.href === pathname);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Slides the active-nav pill from its old position to the new one instead
  // of just swapping a background class — the "fluid" part of navigation.
  useLayoutEffect(() => {
    const measure = () => {
      const activeEl = linkRefs.current[activeIndex];
      if (!activeEl) {
        setIndicator(null);
        return;
      }
      setIndicator({ left: activeEl.offsetLeft, width: activeEl.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeIndex, pathname]);

  return (
    <header className="sticky top-0 z-50 pt-4">
      <Container>
        <GlassCard
          as="nav"
          aria-label="Principal"
          className={`flex items-center justify-between px-5 py-3 transition-shadow duration-300 sm:px-6 ${
            scrolled ? "shadow-[0_12px_32px_-16px_rgba(0,0,0,0.55)]" : ""
          }`}
        >
          <Link href="/" className="text-body font-medium tracking-tight text-text-primary">
            {brand}
          </Link>

          <ul className="relative hidden items-center gap-1 sm:flex">
            {indicator ? (
              <span
                aria-hidden="true"
                className="absolute top-0 z-0 h-full rounded-control bg-clay-primary transition-[left,width] duration-300 ease-out"
                style={{ left: indicator.left, width: indicator.width }}
              />
            ) : null}
            {navItems.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={item.href}>
                  <Link
                    ref={(el) => {
                      linkRefs.current[index] = el;
                    }}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`block rounded-control px-4 py-2 text-body-sm font-medium transition-colors ${
                      isActive
                        ? `text-clay-primary-ink ${indicator ? "" : "bg-clay-primary"}`
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-control text-text-primary sm:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </GlassCard>

        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out sm:hidden ${
            open ? "mt-2 grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <nav
              id="mobile-menu"
              aria-label="Menu móvel"
              inert={!open}
              aria-hidden={!open}
              className={`rounded-panel border border-glass-solid-border bg-glass-solid-bg p-4 transition-opacity duration-200 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = item.href === pathname;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`block rounded-control px-4 py-3 text-body font-medium ${
                          isActive
                            ? "bg-clay-primary text-clay-primary-ink"
                            : "text-text-secondary hover:text-text-primary"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
}
