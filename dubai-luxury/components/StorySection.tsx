"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { properties } from "@/lib/properties";
import { site, storyPillars } from "@/lib/site";
import Reveal from "./Reveal";
import { Eyebrow, InstagramMark } from "./ui";

const storyImages = [
  properties[0].images[0],
  properties[1].images[0],
  properties[4].images[1],
];

const blueprintPaths = [
  "M8 14 H92 V58 H8 Z",
  "M8 34 H44 M44 14 V58",
  "M60 14 V40 M60 40 H92",
  "M60 40 V58 M74 40 V58",
  "M20 14 V58",
  "M8 46 H44",
  "M44 26 H60",
];

export default function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const blueprintRef = useRef<HTMLDivElement>(null);
  const villaRef = useRef<HTMLDivElement>(null);
  const penthouseRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<SVGSVGElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      if (!section || !pin) return;

      if (pathsRef.current) {
        gsap.fromTo(
          pathsRef.current.querySelectorAll("path"),
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 2.4,
            stagger: 0.16,
            ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top 75%", once: true },
          },
        );
      }

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.6}`,
          pin,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // A zero-length spacer sets the total scroll length of the sequence.
      timeline.to({}, { duration: 2.6 }, 0);

      if (progressRef.current) {
        timeline.fromTo(
          progressRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 2.6, transformOrigin: "left center" },
          0,
        );
      }

      // Stage one: blueprint → villa
      if (blueprintRef.current) {
        timeline.to(
          blueprintRef.current,
          { opacity: 0, scale: 1.28, duration: 0.7 },
          0.62,
        );
      }
      if (villaRef.current) {
        timeline.fromTo(
          villaRef.current,
          { opacity: 0, scale: 1.18 },
          { opacity: 1, scale: 1, duration: 0.7 },
          0.68,
        );
        timeline.to(villaRef.current, { opacity: 0, duration: 0.45 }, 1.72);
      }
      if (penthouseRef.current) {
        timeline.fromTo(
          penthouseRef.current,
          { opacity: 0, scale: 1.14 },
          { opacity: 1, scale: 1, duration: 0.65 },
          1.7,
        );
      }

      // Stage copy — panel 0 is visible on load, then hands over in sequence.
      const [first, second, third] = panelRefs.current;
      const [firstCount, secondCount, thirdCount] = counterRefs.current;

      if (first && second) {
        timeline.to(first, { opacity: 0, y: -26, duration: 0.3 }, 0.55);
        timeline.to(firstCount, { opacity: 0, duration: 0.2 }, 0.55);
        timeline.fromTo(
          second,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.35 },
          0.65,
        );
        timeline.fromTo(
          secondCount,
          { opacity: 0 },
          { opacity: 1, duration: 0.2 },
          0.7,
        );
      }
      if (second && third) {
        timeline.to(second, { opacity: 0, y: -26, duration: 0.3 }, 1.6);
        timeline.to(secondCount, { opacity: 0, duration: 0.2 }, 1.6);
        timeline.fromTo(
          third,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.35 },
          1.7,
        );
        timeline.fromTo(
          thirdCount,
          { opacity: 0 },
          { opacity: 1, duration: 0.2 },
          1.75,
        );
      }

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    });

    mm.add("(max-width: 1023px)", () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-story-mobile]");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 82%", once: true },
          },
        );
      });
    });

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 700);

    return () => {
      window.clearTimeout(refresh);
      mm.revert();
    };
  }, []);

  return (
    <section id="story" className="relative bg-obsidian text-pearl">
      {/* Mobile / tablet */}
      <div className="lg:hidden">
        <div className="container-luxe py-20">
          <Reveal>
            <Eyebrow className="text-tiffany-soft">
              The Dubai luxury standard
            </Eyebrow>
            <h2 className="display mt-5 text-[clamp(2.4rem,9vw,3.4rem)] leading-[1.02]">
              Three pillars.
              <br />
              <em className="italic text-lavender-soft">One standard.</em>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-pearl/55">
              The advisory is structured around three property types — each with
              its own diligence, its own exit, and its own set of questions.
            </p>
          </Reveal>

          <div className="mt-12 space-y-12">
            {storyPillars.map((pillar, index) => (
              <div key={pillar.index} data-story-mobile>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src={storyImages[index]}
                    alt={pillar.kicker}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-obsidian/50 px-3 py-1.5 text-[9px] uppercase tracking-[0.22em] text-pearl/70 backdrop-blur">
                    {pillar.index} · {pillar.kicker}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[1.7rem] leading-tight">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-pearl/55">
                  {pillar.body}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {pillar.meta.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-tiffany/25 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-tiffany-soft/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Reveal className="mt-14">
            <p className="border-l-2 border-tiffany/60 pl-5 font-display text-2xl italic leading-snug text-pearl/80">
              “The view is the asset. Everything else is maintenance.”
            </p>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-tiffany-soft"
            >
              <InstagramMark size={13} />
              {site.instagramHandle}
              <ArrowUpRight size={12} />
            </a>
          </Reveal>
        </div>
      </div>

      {/* Desktop pinned sequence */}
      <div className="hidden lg:block">
        <div ref={sectionRef}>
          <div ref={pinRef} className="relative h-[100svh] overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_15%_20%,rgba(10,186,181,0.10),transparent_60%),radial-gradient(80%_70%_at_85%_70%,rgba(181,126,220,0.12),transparent_60%)]"
            />
            <div className="container-luxe grid h-full grid-cols-[0.94fr_1.06fr] items-center gap-14 pb-24 pt-24">
              <div className="relative flex h-full flex-col justify-center">
                <div className="flex items-center justify-between">
                  <Eyebrow className="text-tiffany-soft">
                    The Dubai luxury standard
                  </Eyebrow>
                  <span className="relative block h-6 w-20 text-right font-display text-lg text-pearl/40">
                    {storyPillars.map((pillar, index) => (
                      <span
                        key={pillar.index}
                        ref={(node) => {
                          counterRefs.current[index] = node;
                        }}
                        className="absolute inset-y-0 right-0"
                        style={{ opacity: index === 0 ? 1 : 0 }}
                      >
                        {pillar.index}
                        <span className="text-pearl/20"> / 03</span>
                      </span>
                    ))}
                  </span>
                </div>

                <div className="relative mt-8 min-h-[21rem]">
                  {storyPillars.map((pillar, index) => (
                    <div
                      key={pillar.index}
                      ref={(node) => {
                        panelRefs.current[index] = node;
                      }}
                      className="absolute inset-0"
                      style={{
                        opacity: index === 0 ? 1 : 0,
                        transform: index === 0 ? "none" : "translateY(26px)",
                      }}
                    >
                      <p className="text-[10px] uppercase tracking-[0.3em] text-lavender-soft/70">
                        {pillar.kicker}
                      </p>
                      <h2 className="display mt-4 max-w-[15ch] text-[clamp(2.6rem,3.6vw,3.6rem)] leading-[0.98]">
                        {pillar.title}
                      </h2>
                      <p className="mt-5 max-w-md text-[0.92rem] leading-relaxed text-pearl/55">
                        {pillar.body}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {pillar.meta.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-tiffany/25 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-tiffany-soft/80"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex items-end justify-between gap-6 pt-8">
                  <p className="max-w-[22rem] font-display text-xl italic leading-snug text-pearl/60">
                    “The view is the asset. Everything else is maintenance.”
                  </p>
                  <a
                    href={site.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 whitespace-nowrap text-[9px] uppercase tracking-[0.22em] text-tiffany-soft"
                  >
                    <InstagramMark size={12} />
                    {site.instagramHandle}
                    <ArrowUpRight
                      size={11}
                      className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="relative aspect-[5/6] max-h-[calc(100svh-13rem)] overflow-hidden rounded-[2rem] border border-white/12 bg-[#0a0b0f]">
                  <div
                    ref={blueprintRef}
                    className="absolute inset-0 grid place-items-center p-10"
                  >
                    <svg
                      ref={pathsRef}
                      viewBox="0 0 100 72"
                      className="h-full w-full"
                      aria-hidden
                    >
                      <defs>
                        <pattern
                          id="storyGrid"
                          width="5"
                          height="5"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M5 0 H0 V5"
                            fill="none"
                            stroke="rgba(129,216,208,0.12)"
                            strokeWidth="0.2"
                          />
                        </pattern>
                      </defs>
                      <rect width="100" height="72" fill="url(#storyGrid)" />
                      {blueprintPaths.map((path, index) => (
                        <path
                          key={index}
                          d={path}
                          fill="none"
                          stroke="#81D8D0"
                          strokeWidth="0.4"
                          pathLength={1}
                          strokeDasharray={1}
                          strokeDashoffset={1}
                          opacity={index === 0 ? 0.9 : 0.6}
                        />
                      ))}
                      <circle cx="8" cy="14" r="0.7" fill="#0ABAB5" />
                      <text
                        x="8"
                        y="10"
                        fill="rgba(230,230,250,0.55)"
                        fontSize="2"
                        letterSpacing="0.2"
                      >
                        VILLA · LEVEL 01
                      </text>
                      <text
                        x="8"
                        y="68"
                        fill="rgba(230,230,250,0.35)"
                        fontSize="1.8"
                        letterSpacing="0.18"
                      >
                        INDICATIVE PLAN · NOT TO SCALE
                      </text>
                    </svg>
                  </div>

                  <div ref={villaRef} className="absolute inset-0 opacity-0">
                    <img
                      src={storyImages[0]}
                      alt="Waterfront villa on Palm Jumeirah"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" />
                  </div>

                  <div
                    ref={penthouseRef}
                    className="absolute inset-0 opacity-0"
                  >
                    <img
                      src={storyImages[1]}
                      alt="Dubai skyline from a Downtown penthouse"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" />
                  </div>

                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                    <span className="rounded-full border border-white/15 bg-obsidian/45 px-3 py-1.5 text-[8.5px] uppercase tracking-[0.24em] text-pearl/65 backdrop-blur">
                      {storyPillars[0].kicker} · {storyPillars[2].kicker}
                    </span>
                    <span className="text-[8px] uppercase tracking-[0.2em] text-pearl/35">
                      25.1124° N · 55.1390° E
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 text-[9px] uppercase tracking-[0.24em] text-pearl/35">
                  <MoveRight size={13} className="text-tiffany/60" />
                  <span>Blueprint to residence · scroll to advance</span>
                </div>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 border-t border-white/8">
              <div className="container-luxe py-5">
                <div className="relative h-px w-full bg-white/10">
                  <div
                    ref={progressRef}
                    className="h-px origin-left scale-x-0 bg-gradient-to-r from-tiffany to-lavender"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-[8.5px] uppercase tracking-[0.24em] text-pearl/35">
                  {storyPillars.map((pillar) => (
                    <span key={pillar.index}>{pillar.kicker}</span>
                  ))}
                  <span className="text-pearl/25">Scroll</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
