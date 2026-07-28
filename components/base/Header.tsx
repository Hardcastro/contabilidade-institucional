"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container, GlassCard } from "./primitives";
import { CloseIcon, MenuIcon } from "./Icons";
import type { NavItem } from "@/site.config";

type HeaderProps = {
  brand: string;
  navItems: NavItem[];
};

export function Header({ brand, navItems }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 pt-4">
      <Container>
        <GlassCard as="nav" aria-label="Principal" className="flex items-center justify-between px-5 py-3 sm:px-6">
          <Link href="/" className="text-body font-medium text-text-primary">
            {brand}
          </Link>

          <ul className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-control px-4 py-2 text-body-sm font-medium transition-colors ${
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

        {open ? (
          <nav
            id="mobile-menu"
            aria-label="Menu móvel"
            className="mt-2 rounded-panel border border-glass-solid-border bg-glass-solid-bg p-4 sm:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
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
        ) : null}
      </Container>
    </header>
  );
}
