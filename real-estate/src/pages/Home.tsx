import { Link } from 'react-router'
import { ArrowRight, Compass, KeyRound, Phone, ShieldCheck } from 'lucide-react'

import { CtaBand } from '../components/CtaBand'
import { PropertyCard } from '../components/PropertyCard'
import { Reveal } from '../components/Reveal'
import { SearchBar } from '../components/SearchBar'
import { Button, SectionHeading, Stars } from '../components/ui'
import { featuredProperties, photo } from '../data/properties'
import { brand, neighbourhoods, stats, testimonials, values } from '../data/site'

const valueIcons = [ShieldCheck, Compass, KeyRound]

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink">
        <img
          src={photo('1613490493576-7fde63acd811', 2200)}
          alt="A contemporary London house at dusk"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/85 via-ink/55 to-ink/90" />

        <div className="wrap flex min-h-[560px] flex-col justify-center pb-28 pt-20 sm:min-h-[640px] lg:min-h-[700px] lg:pb-32">
          <p className="eyebrow text-brass-soft">Kensington · Chelsea · Notting Hill</p>
          <h1 className="mt-4 max-w-3xl text-[42px] leading-[0.98] text-cream sm:text-6xl lg:text-7xl">
            Homes with a sense of place.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-cream/75 sm:text-base">
            A small practice selling and letting exceptional London houses. Honest advice, discreet introductions, and
            someone who answers the phone.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button to="/properties" variant="light">
              Browse properties
              <ArrowRight size={16} aria-hidden />
            </Button>
            <Button
              href={brand.phoneHref}
              variant="ghost"
              className="border border-cream/25 text-cream hover:border-cream/50 hover:bg-cream/10"
            >
              <Phone size={15} aria-hidden />
              {brand.phone}
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <Stars />
            <p className="text-[12px] text-cream/60">4.9 from 320 client reviews</p>
          </div>
        </div>
      </section>

      <div className="wrap relative z-10 -mt-20 lg:-mt-24">
        <SearchBar />
      </div>

      <section className="wrap mt-10">
        <dl className="grid grid-cols-2 gap-6 rounded-3xl border border-line bg-white/60 px-6 py-8 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-line">
          {stats.map((stat) => (
            <div key={stat.label} className="sm:px-6 sm:first:pl-0 sm:last:pr-0">
              <dd className="font-display text-[30px] leading-none">
                {stat.value}
                <span className="text-[15px] text-muted">{stat.suffix}</span>
              </dd>
              <dt className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap py-20 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Selected homes"
            title="A short list, not a long one."
            description="Six houses we would happily live in ourselves — a mix of new instructions and a few that never reached a portal."
            action={
              <Button to="/properties" variant="outline" size="sm">
                All properties
                <ArrowRight size={14} aria-hidden />
              </Button>
            }
          />
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.slice(0, 6).map((property, index) => (
            <Reveal key={property.slug} delay={index * 70} className="h-full">
              <PropertyCard property={property} className="h-full" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-sand/40">
        <div className="wrap py-20 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Where we work"
              title="Four corners of London we know block by block."
              description="We do not claim to cover the whole city. We cover these streets properly."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {neighbourhoods.map((area, index) => (
              <Reveal key={area.name} delay={index * 70}>
                <Link
                  to={`/properties?area=${encodeURIComponent(area.name)}`}
                  className="group relative block overflow-hidden rounded-3xl bg-ink"
                >
                  <img
                    src={area.image}
                    alt={`${area.name}, London`}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                    <p className="font-display text-2xl">{area.name}</p>
                    <p className="mt-1 text-[12px] leading-relaxed text-cream/70">{area.blurb}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-brass-soft">
                      See homes
                      <ArrowRight size={12} aria-hidden />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <img
              src={photo('1600585154340-be6161a56a0c', 1200)}
              alt="The reception room of a Kensington house"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-[2rem] object-cover"
            />
            <div className="absolute -bottom-6 -right-2 hidden w-56 rounded-2xl border border-line bg-cream p-5 shadow-[0_24px_50px_-30px_rgba(20,17,13,0.5)] sm:block lg:-right-6">
              <p className="font-display text-3xl leading-none">£1.8bn</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-muted">Sold since 1998</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="eyebrow">Why us</p>
            <h2 className="mt-3 text-3xl leading-[1.08] sm:text-4xl lg:text-[44px]">
              Fewer clients, more attention. That is the whole idea.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Elena founded the practice in 1998 with a simple rule: only take instructions we can do properly. Three
              decades later, that still caps how many houses we represent at once.
            </p>

            <ul className="mt-8 space-y-6">
              {values.map((value, index) => {
                const Icon = valueIcons[index]
                return (
                  <li key={value.title} className="flex gap-4">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest/8 text-forest">
                      <Icon size={16} aria-hidden />
                    </span>
                    <div>
                      <p className="text-[15px] font-medium">{value.title}</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted">{value.description}</p>
                    </div>
                  </li>
                )
              })}
            </ul>

            <Button to="/about" variant="outline" size="sm" className="mt-8">
              More about the practice
              <ArrowRight size={14} aria-hidden />
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-white/60">
        <div className="wrap py-20 sm:py-24">
          <Reveal>
            <SectionHeading eyebrow="In their words" title="The reviews we did not have to ask for." />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 80} className="h-full">
                <figure className="flex h-full flex-col rounded-3xl border border-line bg-cream p-6">
                  <Stars />
                  <blockquote className="mt-4 flex-1 text-[14px] leading-relaxed text-ink-soft">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="mt-5 border-t border-line/70 pt-4">
                    <p className="text-[13px] font-medium">{testimonial.name}</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-muted">{testimonial.detail}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-20 sm:pt-24">
        <CtaBand />
      </div>
    </>
  )
}
