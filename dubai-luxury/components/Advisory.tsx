import { ArrowUpRight, Compass, LineChart, ShieldCheck } from "lucide-react";
import { properties } from "@/lib/properties";
import { advisoryPillars, processSteps, site } from "@/lib/site";
import Reveal from "./Reveal";
import { Eyebrow, InstagramMark, Monogram } from "./ui";

const icons = [Compass, LineChart, ShieldCheck];

export default function Advisory() {
  return (
    <section
      id="advisory"
      className="relative overflow-hidden border-t border-charcoal/8 bg-pearl py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_50%_at_85%_20%,rgba(230,230,250,0.9),transparent_70%),radial-gradient(45%_40%_at_10%_85%,rgba(129,216,208,0.16),transparent_70%)]"
      />

      <div className="container-luxe relative">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-charcoal/10">
              <img
                src={properties[4].images[0]}
                alt="Aerial view of the Palm Jumeirah shoreline at sunset"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[8.5px] uppercase tracking-[0.24em] text-pearl/60">
                    Dubai · United Arab Emirates
                  </p>
                  <p className="mt-1 font-display text-lg text-pearl">
                    Palm Jumeirah shoreline
                  </p>
                </div>
                <Monogram className="h-9 w-9 border-pearl/30 text-pearl/80" />
              </div>
            </div>

            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-light group relative z-10 mt-4 flex items-center gap-4 rounded-2xl p-4 shadow-[0_24px_60px_-40px_rgba(14,14,18,0.6)] lg:absolute lg:-bottom-7 lg:-right-6 lg:mt-0 lg:w-[19rem]"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-tiffany via-tiffany-soft to-lavender text-white">
                <InstagramMark size={17} strokeWidth={1.8} />
              </span>
              <span className="min-w-0">
                <span className="block text-[9px] uppercase tracking-[0.22em] text-graphite">
                  Follow the advisory
                </span>
                <span className="mt-1 block truncate text-[13px] font-medium text-charcoal">
                  {site.instagramHandle}
                </span>
                <span className="mt-0.5 block text-[10px] text-graphite/80">
                  Market notes · walkthroughs
                </span>
              </span>
              <ArrowUpRight
                size={15}
                className="ml-auto shrink-0 text-graphite transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tiffany"
              />
            </a>
          </Reveal>

          <div className="lg:pt-4">
            <Reveal>
              <Eyebrow className="text-[#0a7f7b]">The advisory</Eyebrow>
              <h2 className="display mt-5 max-w-[16ch] text-[clamp(2.4rem,4.4vw,3.9rem)] leading-[0.98] text-charcoal">
                Advisory, not
                <br />
                <em className="italic text-[#8b5cb8]">brokerage.</em>
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-graphite">
                Most buyers do not need more listings. They need a filter. Dr.
                Farah Merhi works with a small number of clients each quarter,
                building a written view of the asset before a viewing is booked —
                so the decision is made on evidence, not atmosphere.
              </p>
            </Reveal>

            <div className="mt-9 space-y-5">
              {advisoryPillars.map((pillar, index) => {
                const Icon = icons[index];
                return (
                  <Reveal key={pillar.title} delay={index * 90}>
                    <div className="flex gap-4 border-t border-charcoal/10 pt-4">
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-tiffany/30 bg-tiffany/8 text-[#0a7f7b]">
                        <Icon size={15} strokeWidth={1.7} />
                      </span>
                      <div>
                        <h3 className="text-[13px] font-semibold tracking-[0.01em] text-charcoal">
                          {pillar.title}
                        </h3>
                        <p className="mt-1 text-[12.5px] leading-relaxed text-graphite">
                          {pillar.copy}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={120} className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#contact" className="btn btn-dark">
                Request a private brief
                <ArrowUpRight size={14} />
              </a>
              <span className="text-[9px] uppercase tracking-[0.2em] text-graphite/70">
                By appointment · EN / AR
              </span>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 border-t border-charcoal/10 pt-10">
          <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.26em] text-graphite">
                How it works
              </p>
              <h3 className="mt-2 font-display text-3xl text-charcoal">
                Four steps, no noise.
              </h3>
            </div>
            <p className="max-w-sm text-[11.5px] leading-relaxed text-graphite">
              A typical mandate runs four to ten weeks from brief to handover,
              depending on whether the residence is ready or off-plan.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <Reveal key={step.step} delay={index * 80}>
                <div className="group h-full rounded-2xl border border-charcoal/10 bg-white/60 p-5 transition hover:border-tiffany/40 hover:bg-white">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl text-tiffany">
                      {step.step}
                    </span>
                    <span className="h-px w-10 bg-charcoal/15 transition group-hover:bg-tiffany/50" />
                  </div>
                  <h4 className="mt-4 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-charcoal">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-[11.5px] leading-relaxed text-graphite">
                    {step.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
