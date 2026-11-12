"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
import { ArrowUpRight, Maximize2, MoveUpRight } from "lucide-react";
import {
  categories,
  properties,
  type CategoryId,
  type Property,
} from "@/lib/properties";
import { formatPrice, type Currency } from "@/lib/currency";
import Reveal from "./Reveal";
import TourModal from "./TourModal";
import { Eyebrow } from "./ui";

function PropertyCard({
  property,
  currency,
  onOpen,
}: {
  property: Property;
  currency: Currency;
  onOpen: () => void;
}) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const onMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (window.matchMedia("(hover: none)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    if (imageRef.current) {
      imageRef.current.style.transform = `scale(1.08) translate3d(${x * -18}px, ${y * -18}px, 0)`;
    }
    if (mediaRef.current) {
      mediaRef.current.style.transform = `perspective(1100px) rotateX(${y * -3.5}deg) rotateY(${x * 4}deg)`;
    }
  };

  const onLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = "scale(1) translate3d(0,0,0)";
    }
    if (mediaRef.current) {
      mediaRef.current.style.transform =
        "perspective(1100px) rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <article className="group">
      <button
        type="button"
        onClick={onOpen}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        aria-label={`Open spatial preview of ${property.name}`}
        className="block w-full text-left"
      >
        <div
          ref={mediaRef}
          className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-obsidian/5 transition-transform duration-500 ease-out"
        >
          <img
            ref={imageRef}
            src={property.images[0]}
            alt={property.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/5 to-transparent opacity-90" />

          <div className="absolute left-3.5 top-3.5 flex flex-wrap gap-1.5">
            <span className="rounded-full border border-white/20 bg-obsidian/45 px-2.5 py-1 text-[8px] uppercase tracking-[0.2em] text-pearl/80 backdrop-blur">
              {property.status}
            </span>
            <span className="rounded-full border border-tiffany/30 bg-tiffany/15 px-2.5 py-1 text-[8px] uppercase tracking-[0.2em] text-tiffany-soft backdrop-blur">
              {property.ref}
            </span>
          </div>

          <div className="absolute inset-x-3.5 bottom-3.5 flex items-end justify-between gap-3">
            <div>
              <p className="text-[8.5px] uppercase tracking-[0.22em] text-pearl/55">
                Guide price
              </p>
              <p className="mt-1 font-display text-[1.35rem] leading-none text-pearl">
                {formatPrice(property.priceAED, currency)}
              </p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-obsidian/50 px-3 py-2 text-[8px] uppercase tracking-[0.18em] text-pearl/85 backdrop-blur transition group-hover:border-tiffany group-hover:text-tiffany-soft">
              <Maximize2 size={11} />
              Spatial
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-display text-[1.35rem] leading-tight text-charcoal transition group-hover:text-[#0a7f7b]">
              {property.name}
            </h3>
            <p className="mt-1.5 text-[9px] uppercase tracking-[0.2em] text-graphite">
              {property.location}
            </p>
          </div>
          <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-charcoal/15 text-charcoal transition group-hover:border-tiffany group-hover:bg-tiffany group-hover:text-[#04110f]">
            <ArrowUpRight size={13} />
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-charcoal/10 pt-3 text-[10.5px] text-graphite">
          <span>{property.beds} beds</span>
          <span className="h-1 w-1 rounded-full bg-graphite/30" />
          <span>{property.baths} baths</span>
          <span className="h-1 w-1 rounded-full bg-graphite/30" />
          <span>{property.areaSqft.toLocaleString("en-US")} sq ft</span>
        </div>
      </button>
    </article>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState<CategoryId>("all");
  const [currency, setCurrency] = useState<Currency>("AED");
  const [selected, setSelected] = useState<Property | null>(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const list =
    filter === "all"
      ? properties
      : properties.filter((property) => property.category === filter);

  const measure = useCallback(() => {
    const wrap = tabsRef.current;
    const active = tabRefs.current[filter];
    if (!wrap || !active) return;
    const wrapRect = wrap.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    setPill({
      left: activeRect.left - wrapRect.left,
      width: activeRect.width,
    });
  }, [filter]);

  useIsoLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <section
      id="showcase"
      className="relative overflow-hidden bg-pearl py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(60%_100%_at_70%_0%,rgba(181,126,220,0.16),transparent_70%),radial-gradient(50%_100%_at_20%_0%,rgba(10,186,181,0.12),transparent_70%)]"
      />

      <div className="container-luxe relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <Eyebrow className="text-[#0a7f7b]">The portfolio</Eyebrow>
            <h2
              id="portfolio"
              className="display mt-5 text-[clamp(2.5rem,5vw,4.4rem)] leading-[0.98] text-charcoal"
            >
              Six residences.
              <br />
              <em className="italic text-[#8b5cb8]">One standard.</em>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-graphite">
              Waterfront villas, full-floor penthouses and one considered
              off-plan position. Every entry has been walked, titled and
              stress-tested before it reached this page.
            </p>
          </Reveal>

          <Reveal delay={120} className="flex flex-col items-start gap-4 sm:items-end">
            <div className="inline-flex items-center gap-1 rounded-full border border-charcoal/12 bg-white p-1.5 shadow-sm">
              <span className="pl-2.5 pr-1 text-[8.5px] uppercase tracking-[0.2em] text-graphite">
                Currency
              </span>
              {(["AED", "USD"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCurrency(item)}
                  aria-pressed={currency === item}
                  className={`rounded-full px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] transition ${
                    currency === item
                      ? "bg-obsidian text-pearl"
                      : "text-graphite hover:text-charcoal"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <p className="text-[9px] uppercase tracking-[0.18em] text-graphite/70">
              {list.length} {list.length === 1 ? "residence" : "residences"} · AED
              / USD at 3.6725
            </p>
          </Reveal>
        </div>

        <div className="no-scrollbar mt-12 overflow-x-auto pb-1">
          <div
            ref={tabsRef}
            className="relative inline-flex min-w-max items-center gap-1 rounded-full border border-charcoal/10 bg-white p-1.5 shadow-[0_18px_50px_-40px_rgba(14,14,18,0.6)]"
          >
            <span
              aria-hidden
              className="absolute top-1.5 bottom-1.5 rounded-full bg-obsidian transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ left: pill.left, width: pill.width }}
            />
            {categories.map((category) => (
              <button
                key={category.id}
                ref={(node) => {
                  tabRefs.current[category.id] = node;
                }}
                type="button"
                onClick={() => setFilter(category.id)}
                aria-pressed={filter === category.id}
                className={`relative z-10 whitespace-nowrap rounded-full px-4 py-2.5 text-[9.5px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                  filter === category.id
                    ? "text-pearl"
                    : "text-graphite hover:text-charcoal"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((property, index) => (
            <Reveal key={property.id} delay={(index % 3) * 90}>
              <PropertyCard
                property={property}
                currency={currency}
                onOpen={() => setSelected(property)}
              />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-charcoal/10 pt-6 sm:flex-row sm:items-center">
          <p className="max-w-xl text-[10.5px] leading-relaxed text-graphite/80">
            Prices are indicative and subject to availability, negotiation and
            currency movement. Imagery is representative; spatial previews and
            floorplans are illustrative, not to scale.
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal"
          >
            Request the full dossier
            <MoveUpRight
              size={14}
              className="text-tiffany transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </Reveal>
      </div>

      {selected ? (
        <TourModal
          property={selected}
          currency={currency}
          onClose={() => setSelected(null)}
        />
      ) : null}
    </section>
  );
}
