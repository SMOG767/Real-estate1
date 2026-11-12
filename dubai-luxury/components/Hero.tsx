"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MessageCircle, MoveDown, Sparkles, Layers } from "lucide-react";
import { heroAreas, site, whatsappLink } from "@/lib/site";
import Magnetic from "./Magnetic";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

function SceneFallback() {
  const bars = [38, 62, 46, 78, 55, 92, 68, 48, 74, 58, 88, 42, 66, 52, 80];
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_15%,rgba(181,126,220,0.20),transparent_55%),radial-gradient(90%_70%_at_20%_40%,rgba(10,186,181,0.20),transparent_60%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(to_top,#07080c,rgba(7,8,12,0))]" />
      <div className="absolute inset-x-0 bottom-[18%] flex items-end justify-center gap-[2.2vw] px-[4vw] opacity-70">
        {bars.map((height, index) => (
          <span
            key={index}
            className="w-[3.2vw] rounded-t-[2px] bg-[linear-gradient(to_top,rgba(10,186,181,0.45),rgba(181,126,220,0.12),transparent)]"
            style={{ height: `${height * 2.1}px` }}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-[18%] h-px bg-tiffany/30" />
      <div className="absolute inset-x-0 bottom-[18%] h-40 bg-[linear-gradient(to_top,rgba(10,186,181,0.10),transparent)] blur-md" />
    </div>
  );
}

export default function Hero() {
  const [ready, setReady] = useState(false);
  const [cinematic, setCinematic] = useState(true);
  const [inView, setInView] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setReady(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower =
      window.innerWidth < 768 ||
      (navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false);
    if (reduced || lowPower) setCinematic(false);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="grain relative isolate min-h-[100svh] overflow-hidden bg-obsidian text-pearl"
    >
      <div className="absolute inset-0">
        {cinematic ? (
          <HeroCanvas paused={!inView} />
        ) : (
          <SceneFallback />
        )}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_0%,transparent_30%,rgba(14,14,18,0.55)_75%,#0e0e12_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent"
      />

      <p className="sr-only">
        An interactive three-dimensional sculpture of the Dubai skyline and
        waterfront, lit in Tiffany blue and lavender, with a gentle parallax that
        follows the pointer.
      </p>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[88rem] flex-col px-5 pb-8 pt-32 sm:px-8 sm:pb-10 sm:pt-36 xl:px-12">
        <div className="flex flex-1 flex-col justify-center py-10">
          <div
            className={`flex items-center gap-3 transition-all duration-1000 ${
              ready ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-tiffany/30 bg-tiffany/8 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.26em] text-tiffany-soft">
              <Sparkles size={11} strokeWidth={1.6} />
              Private advisory · Dubai
            </span>
            <span className="hidden text-[9px] uppercase tracking-[0.28em] text-pearl/40 sm:block">
              AED · USD portfolios
            </span>
          </div>

          <h1 className="mt-7 max-w-5xl">
            <span
              className={`block transition-all duration-[1100ms] ${
                ready ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "80ms" }}
            >
              <span className="display block text-[clamp(2.9rem,7.4vw,6.8rem)]">
                Redefining{" "}
                <em className="font-normal italic text-tiffany-soft">
                  Waterfront
                </em>
              </span>
            </span>
            <span
              className={`block transition-all duration-[1100ms] ${
                ready ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <span className="display block text-[clamp(2.9rem,7.4vw,6.8rem)]">
                &amp; Sky-High Living
              </span>
            </span>
            <span
              className={`block transition-all duration-[1100ms] ${
                ready ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "320ms" }}
            >
              <span className="display block text-[clamp(2.9rem,7.4vw,6.8rem)] text-pearl/55">
                in Dubai.
              </span>
            </span>
          </h1>

          <div
            className={`mt-8 flex max-w-3xl flex-col gap-8 transition-all duration-1000 lg:flex-row lg:items-end lg:justify-between ${
              ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: "430ms" }}
          >
            <p className="max-w-md text-sm leading-relaxed text-pearl/60 sm:text-[0.95rem]">
              Curated real estate advisory by{" "}
              <span className="text-pearl">Dr. Farah Merhi</span>{" "}
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-tiffany-soft"
              >
                ({site.instagramHandle})
              </a>
              . Waterfront villas, full-floor penthouses and off-plan positions —
              selected on evidence, not inventory.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Magnetic strength={10}>
                <a href="#showcase" className="btn btn-tiffany w-full sm:w-auto">
                  Enter 3D Portfolio
                  <ArrowUpRight size={15} strokeWidth={2} />
                </a>
              </Magnetic>
              <Magnetic strength={8}>
                <a
                  href={whatsappLink(
                    "Hello Dr. Farah, I would like a private consultation about Dubai real estate.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost w-full sm:w-auto"
                >
                  <MessageCircle size={15} strokeWidth={1.8} />
                  WhatsApp Consultation
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-5 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="no-scrollbar relative -mx-1 overflow-hidden">
            <div className="flex w-max animate-marquee items-center gap-6 px-1">
              {[...heroAreas, ...heroAreas].map((area, index) => (
                <span
                  key={`${area}-${index}`}
                  className="flex items-center gap-6 whitespace-nowrap text-[9px] uppercase tracking-[0.26em] text-pearl/45"
                >
                  {area}
                  <span className="h-1 w-1 rounded-full bg-tiffany/60" />
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.24em] text-pearl/35">
              <MoveDown size={12} className="text-tiffany/70" />
              Scroll to explore
            </span>
            <button
              type="button"
              onClick={() => setCinematic((value) => !value)}
              aria-pressed={cinematic}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-[9px] font-medium uppercase tracking-[0.2em] text-pearl/60 transition hover:border-tiffany/50 hover:text-tiffany-soft"
            >
              <Layers size={11} strokeWidth={1.7} />
              {cinematic ? "3D on" : "Lite mode"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
