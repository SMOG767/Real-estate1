import { Mail, Phone } from 'lucide-react'

import { CtaBand } from '../components/CtaBand'
import { Reveal } from '../components/Reveal'
import { Button, PageHero, SectionHeading } from '../components/ui'
import { photo } from '../data/properties'
import { agents, brand, stats, values } from '../data/site'

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="A small practice, deliberately."
        description="Marlowe & Co. has been selling and letting London houses since 1998. We have stayed small on purpose: it is the only way to know every instruction properly."
      />

      <section className="wrap py-16 sm:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <img
              src={photo('1600566753086-00f18fb6b3ea', 1200)}
              alt="A sitting room in one of our Notting Hill instructions"
              className="aspect-[4/5] w-full rounded-[2rem] object-cover"
              loading="lazy"
            />
          </Reveal>
          <Reveal delay={80} className="lg:pt-6">
            <h2 className="text-3xl leading-[1.1] sm:text-4xl">We started with one house and a borrowed desk.</h2>
            <div className="mt-5 space-y-4 text-[14.5px] leading-relaxed text-ink-soft">
              <p>
                Elena Marlowe opened the practice above a framer’s shop on Kensington Church Street with a single
                instruction: a garden flat on Lexham Gardens that two larger agents had failed to sell. It went in nine
                days.
              </p>
              <p>
                Twenty-eight years later we still work the same way. One advisor owns the whole process, from the first
                valuation to the day keys change hands. We take on a limited number of houses at a time so that promise
                means something.
              </p>
              <p>
                Today the team covers Kensington, Chelsea, Notting Hill, Marylebone, Hampstead, Islington, Bermondsey and
                Richmond — and we still turn down work outside those streets.
              </p>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="font-display text-3xl leading-none">
                    {stat.value}
                    <span className="text-[15px] text-muted">{stat.suffix}</span>
                  </dd>
                  <dt className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-sand/40">
        <div className="wrap py-16 sm:py-20">
          <Reveal>
            <SectionHeading eyebrow="How we work" title="Three things we will not compromise on." />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 80} className="h-full">
                <div className="flex h-full flex-col rounded-3xl border border-line bg-cream p-6">
                  <span className="font-display text-4xl text-brass">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="mt-4 text-xl leading-snug">{value.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="The team"
            title="The people you will actually deal with."
            description="No call centre, no handovers. The advisor you meet is the one who negotiates."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent, index) => (
            <Reveal key={agent.id} delay={index * 80} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white">
                <img src={agent.photo} alt={agent.name} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl leading-snug">{agent.name}</h3>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-brass">{agent.role}</p>
                  <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted">{agent.bio}</p>
                  <div className="mt-5 space-y-2 border-t border-line/70 pt-4 text-[12px] text-ink-soft">
                    <a href={`tel:${agent.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 transition hover:text-forest">
                      <Phone size={13} aria-hidden />
                      {agent.phone}
                    </a>
                    <a href={`mailto:${agent.email}`} className="flex items-center gap-2 transition hover:text-forest">
                      <Mail size={13} aria-hidden />
                      {agent.email}
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap pb-16">
        <div className="rounded-[2.5rem] border border-line bg-white px-6 py-12 text-center sm:px-12">
          <p className="font-display text-2xl italic leading-relaxed text-forest sm:text-3xl">
            “Sell the house, not the brochure. Clients remember how you behaved long after they forget the asking price.”
          </p>
          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
            Elena Marlowe · Founding Director
          </p>
          <Button to="/contact" variant="outline" size="sm" className="mt-7">
            Meet us at {brand.address.split(',')[0]}
          </Button>
        </div>
      </section>

      <div className="pb-4">
        <CtaBand
          eyebrow="Valuations"
          title="Curious what your house would achieve?"
          description="A 45-minute visit, a written valuation with comparable evidence, and no obligation to instruct us."
        />
      </div>
    </>
  )
}
