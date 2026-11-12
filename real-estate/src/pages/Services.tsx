import { useState } from 'react'
import { Building2, FileText, KeyRound, Minus, Plus, Search, Sparkles, TrendingUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { CtaBand } from '../components/CtaBand'
import { Reveal } from '../components/Reveal'
import { Button, PageHero, SectionHeading } from '../components/ui'
import { faqs, process, services } from '../data/site'
import type { ServiceIcon } from '../data/site'

const iconMap: Record<ServiceIcon, LucideIcon> = {
  search: Search,
  building: Building2,
  key: KeyRound,
  chart: TrendingUp,
  file: FileText,
  sparkles: Sparkles,
}

export default function Services() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything between wanting a house and owning one."
        description="Sales, lettings, private search and the unglamorous legal work in between. One team, one contact, no handovers."
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <Button to="/properties" variant="outline" size="sm">
            Browse the portfolio
          </Button>
          <Button to="/contact" size="sm">
            Book a valuation
          </Button>
        </div>
      </PageHero>

      <section className="wrap py-16 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon]
            return (
              <Reveal key={service.title} delay={index * 60} className="h-full">
                <article className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-45px_rgba(20,17,13,0.5)]">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-forest/8 text-forest">
                    <Icon size={18} aria-hidden />
                  </span>
                  <h2 className="mt-5 text-xl leading-snug">{service.title}</h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{service.description}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="border-y border-line bg-sand/40">
        <div className="wrap py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="Four steps, no surprises."
              description="What actually happens between the first conversation and completion."
            />
          </Reveal>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <Reveal key={step.step} delay={index * 70} className="h-full">
                <li className="flex h-full flex-col rounded-3xl border border-line bg-cream p-6">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brass">{step.step}</span>
                  <h3 className="mt-3 text-lg leading-snug">{step.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{step.description}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 className="mt-3 text-3xl leading-[1.1] sm:text-4xl">The things people ask first.</h2>
            <p className="mt-4 text-[14px] leading-relaxed text-muted">
              If your question is not here, call the office — a person answers, and it is usually Elena.
            </p>
            <Button to="/contact" variant="outline" size="sm" className="mt-6">
              Ask us something
            </Button>
          </Reveal>

          <Reveal delay={80}>
            <div className="border-t border-line">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index
                return (
                  <div key={faq.question} className="border-b border-line py-5">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-6 text-left"
                    >
                      <span className="font-display text-lg leading-snug sm:text-xl">{faq.question}</span>
                      {isOpen ? (
                        <Minus size={18} className="mt-1 shrink-0 text-forest" aria-hidden />
                      ) : (
                        <Plus size={18} className="mt-1 shrink-0 text-muted" aria-hidden />
                      )}
                    </button>
                    {isOpen ? <p className="mt-3 max-w-2xl text-[13.5px] leading-relaxed text-muted">{faq.answer}</p> : null}
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="pb-4">
        <CtaBand
          eyebrow="Start here"
          title="Tell us the street. We will tell you the truth."
          description="Valuations, search briefs or a second opinion on a price — all start with a conversation."
        />
      </div>
    </>
  )
}
