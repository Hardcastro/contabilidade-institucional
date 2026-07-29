"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { ClayTile, SolidCard } from "./primitives";

export type ExplorerService = {
  slug: string;
  title: string;
  description: string;
  icon: ReactNode;
};

type ServiceExplorerProps = {
  services: ExplorerService[];
};

/**
 * A tabbed self-selector: pick a service, read what it means for you,
 * without leaving the page. Swaps a static grid for something closer to
 * how visitors actually decide — one question at a time — instead of
 * asking them to read five paragraphs up front.
 *
 * Domain-agnostic on purpose: every label and icon arrives pre-rendered
 * through `services`, so this component never needs to know what kind
 * of business it belongs to.
 */
export function ServiceExplorer({ services }: ServiceExplorerProps) {
  const [activeSlug, setActiveSlug] = useState(services[0]?.slug);
  const active = services.find((service) => service.slug === activeSlug) ?? services[0];

  return (
    <div className="flex flex-col gap-6">
      <div role="tablist" aria-label="Serviços" className="flex flex-wrap gap-2">
        {services.map((service) => {
          const isActive = service.slug === active.slug;
          return (
            <button
              key={service.slug}
              type="button"
              role="tab"
              id={`service-tab-${service.slug}`}
              aria-selected={isActive}
              aria-controls={`service-panel-${service.slug}`}
              onClick={() => setActiveSlug(service.slug)}
              className={`rounded-control px-4 py-2.5 text-body-sm font-medium transition-colors ${
                isActive
                  ? "bg-clay-primary text-clay-primary-ink"
                  : "border border-glass-solid-border bg-glass-solid-bg text-text-muted hover:text-text-primary"
              }`}
            >
              {service.title}
            </button>
          );
        })}
      </div>

      <SolidCard
        as="div"
        role="tabpanel"
        id={`service-panel-${active.slug}`}
        aria-labelledby={`service-tab-${active.slug}`}
        className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:gap-8 sm:p-8"
      >
        <ClayTile className="h-14 w-14 shrink-0">{active.icon}</ClayTile>
        <div className="flex flex-col gap-2">
          <h3 className="text-lead font-medium text-text-primary">{active.title}</h3>
          <p className="text-body text-text-muted">{active.description}</p>
        </div>
      </SolidCard>
    </div>
  );
}
