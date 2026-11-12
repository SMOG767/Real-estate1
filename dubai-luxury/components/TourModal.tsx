"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BedDouble,
  Bath,
  Maximize,
  MessageCircle,
  MoveHorizontal,
  Ruler,
  X,
} from "lucide-react";
import {
  categoryLabel,
  type Property,
} from "@/lib/properties";
import { formatNumber, formatPrice, type Currency } from "@/lib/currency";
import { whatsappLink } from "@/lib/site";

export default function TourModal({
  property,
  currency,
  onClose,
}: {
  property: Property;
  currency: Currency;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"spatial" | "floorplan">("spatial");
  const [imageIndex, setImageIndex] = useState(0);
  const [pan, setPan] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panoramaRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, startPan: 0 });

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    window.dispatchEvent(new CustomEvent("luxe:scroll-lock", { detail: true }));
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.dispatchEvent(
        new CustomEvent("luxe:scroll-lock", { detail: false }),
      );
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [onClose]);

  const clampPan = (value: number) => Math.min(0, Math.max(-50, value));

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = { active: true, startX: event.clientX, startPan: pan };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const width = panoramaRef.current?.clientWidth ?? 600;
    const delta = ((event.clientX - dragRef.current.startX) / width) * 100;
    setPan(clampPan(dragRef.current.startPan + delta));
  };

  const endDrag = () => {
    dragRef.current.active = false;
  };

  const inquiry = whatsappLink(
    `Hello Dr. Farah, I am interested in ${property.name} (${property.ref}) at ${formatPrice(
      property.priceAED,
      "AED",
    )}. Could we arrange a private viewing?`,
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-title"
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-obsidian/80 p-3 backdrop-blur-xl sm:items-center sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative my-auto w-full max-w-6xl overflow-hidden rounded-[1.6rem] border border-white/10 bg-pearl shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)]">
        <div className="flex items-center justify-between gap-4 border-b border-charcoal/10 px-5 py-4 sm:px-7">
          <div className="min-w-0">
            <p className="text-[9px] uppercase tracking-[0.26em] text-graphite">
              {categoryLabel(property.category)} · {property.ref}
            </p>
            <h2
              id="tour-title"
              className="mt-1 truncate font-display text-[1.4rem] leading-tight sm:text-2xl"
            >
              {property.name}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close spatial preview"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-charcoal/15 text-charcoal transition hover:border-tiffany hover:text-tiffany"
          >
            <X size={16} />
          </button>
        </div>

        <div className="grid lg:grid-cols-[1.25fr_1fr]">
          <div className="bg-obsidian p-4 sm:p-5">
            <div className="flex gap-1.5 rounded-full border border-white/10 bg-white/5 p-1">
              {(
                [
                  { id: "spatial", label: "Spatial preview" },
                  { id: "floorplan", label: "Floorplan" },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`flex-1 rounded-full px-3 py-2 text-[9.5px] font-medium uppercase tracking-[0.2em] transition ${
                    tab === item.id
                      ? "bg-tiffany text-[#04110f]"
                      : "text-pearl/55 hover:text-pearl"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
              {tab === "spatial" ? (
                <div className="relative">
                  <div
                    ref={panoramaRef}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={endDrag}
                    onPointerLeave={endDrag}
                    onPointerCancel={endDrag}
                    className="relative aspect-[4/3] cursor-grab touch-none select-none overflow-hidden bg-obsidian active:cursor-grabbing"
                  >
                    <img
                      src={property.images[imageIndex]}
                      alt={`${property.name} — spatial view`}
                      draggable={false}
                      className="h-full w-[200%] max-w-none object-cover"
                      style={{
                        transform: `translateX(${pan}%)`,
                        transition: dragRef.current.active
                          ? "none"
                          : "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
                      }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(14,14,18,0.55),transparent_45%)]" />
                    <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/20 bg-obsidian/50 px-2.5 py-1 text-[8px] uppercase tracking-[0.22em] text-pearl/75 backdrop-blur">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tiffany" />
                      360° spatial
                    </div>
                    <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-obsidian/55 px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] text-pearl/60 backdrop-blur">
                      <MoveHorizontal size={11} />
                      Drag to pan
                    </div>
                  </div>

                  <div className="flex gap-1.5 border-t border-white/10 bg-obsidian p-2">
                    {property.images.map((image, index) => (
                      <button
                        key={image}
                        type="button"
                        onClick={() => {
                          setImageIndex(index);
                          setPan(0);
                        }}
                        aria-label={`View image ${index + 1}`}
                        aria-pressed={imageIndex === index}
                        className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-md border transition ${
                          imageIndex === index
                            ? "border-tiffany opacity-100"
                            : "border-white/10 opacity-55 hover:opacity-90"
                        }`}
                      >
                        <img
                          src={image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                    <span className="ml-auto self-center pr-2 text-[8px] uppercase tracking-[0.2em] text-pearl/35">
                      {imageIndex + 1} / {property.images.length}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-obsidian p-3">
                  <svg
                    viewBox="0 0 100 72"
                    className="h-auto w-full"
                    role="img"
                    aria-label={`Indicative floorplan of ${property.name}`}
                  >
                    <rect width="100" height="72" fill="#0a0b0f" />
                    {property.floorplan.rooms.map((room) => (
                      <g key={room.l}>
                        <rect
                          x={room.x}
                          y={room.y}
                          width={room.w}
                          height={room.h}
                          fill="rgba(10,186,181,0.07)"
                          stroke="rgba(129,216,208,0.5)"
                          strokeWidth="0.3"
                        />
                        <text
                          x={room.x + room.w / 2}
                          y={room.y + room.h / 2}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="rgba(250,250,252,0.72)"
                          fontSize="2"
                          letterSpacing="0.05"
                        >
                          {room.l}
                        </text>
                      </g>
                    ))}
                    <g stroke="rgba(250,250,252,0.25)" strokeWidth="0.25">
                      <path d="M4 66 H16" />
                      <path d="M4 65 V67 M16 65 V67" />
                    </g>
                    <text
                      x="18"
                      y="67"
                      fill="rgba(250,250,252,0.35)"
                      fontSize="1.8"
                    >
                      5 m
                    </text>
                    <text
                      x="96"
                      y="8"
                      textAnchor="end"
                      fill="rgba(181,126,220,0.65)"
                      fontSize="2"
                      letterSpacing="0.2"
                    >
                      N ▲
                    </text>
                  </svg>
                  <p className="px-1 pt-2 text-[8.5px] uppercase tracking-[0.2em] text-pearl/35">
                    {property.floorplan.level}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 p-5 sm:p-7">
            <div>
              <p className="text-[9px] uppercase tracking-[0.24em] text-graphite">
                Guide price · {currency}
              </p>
              <p className="mt-1.5 font-display text-[2rem] leading-none text-charcoal">
                {formatPrice(property.priceAED, currency)}
              </p>
              <p className="mt-2 text-[11px] text-graphite">
                {property.location} · {property.status}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 border-y border-charcoal/10 py-4 text-[11px] text-charcoal">
              <span className="flex items-center gap-2">
                <BedDouble size={14} className="text-tiffany" />
                {property.beds} bedrooms
              </span>
              <span className="flex items-center gap-2">
                <Bath size={14} className="text-tiffany" />
                {property.baths} bathrooms
              </span>
              <span className="flex items-center gap-2">
                <Ruler size={14} className="text-tiffany" />
                {formatNumber(property.areaSqft)} sq ft
              </span>
              <span className="flex items-center gap-2">
                <Maximize size={14} className="text-tiffany" />
                {property.plotSqft
                  ? `${formatNumber(property.plotSqft)} sq ft plot`
                  : "Full floor"}
              </span>
            </div>

            <p className="text-[12.5px] leading-relaxed text-graphite">
              {property.description}
            </p>

            <div>
              <p className="text-[9px] uppercase tracking-[0.24em] text-charcoal">
                Residence notes
              </p>
              <ul className="mt-2.5 space-y-1.5">
                {property.features.slice(0, 5).map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-[11.5px] leading-snug text-graphite"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-tiffany" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto space-y-2">
              <a
                href={inquiry}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-tiffany w-full"
              >
                <MessageCircle size={14} />
                Enquire on WhatsApp
              </a>
              <a
                href="#contact"
                onClick={onClose}
                className="btn btn-outline w-full"
              >
                Book private viewing
                <ArrowUpRight size={13} />
              </a>
              <p className="pt-1 text-center text-[9px] leading-relaxed text-graphite/80">
                Indicative plans and imagery. Availability, price and handover to
                be confirmed in writing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
