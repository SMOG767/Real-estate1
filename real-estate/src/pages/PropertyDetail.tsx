import { Link, useParams } from 'react-router'
import { Bath, BedDouble, Building2, CalendarDays, Check, MapPin, Phone, Ruler } from 'lucide-react'

import { Gallery } from '../components/Gallery'
import { LeadForm } from '../components/LeadForm'
import { PropertyCard } from '../components/PropertyCard'
import { Badge, Button, SectionHeading } from '../components/ui'
import { getProperty, similarProperties } from '../data/properties'
import { agents, neighbourhoods } from '../data/site'
import { formatNumber, priceLabel } from '../lib/format'

export default function PropertyDetail() {
  const { slug } = useParams()
  const property = getProperty(slug)

  if (!property) {
    return (
      <div className="wrap py-24 text-center">
        <p className="eyebrow">Not found</p>
        <h1 className="mt-3 text-4xl leading-tight">This home is no longer listed.</h1>
        <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-muted">
          It may have been sold or withdrawn. Browse the current portfolio, or tell us what you are looking for and we
          will keep an eye out.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button to="/properties">Browse properties</Button>
          <Button to="/contact" variant="outline">
            Register requirements
          </Button>
        </div>
      </div>
    )
  }

  const agent = agents.find((item) => item.id === property.agentId) ?? agents[0]
  const similar = similarProperties(property)
  const areaBlurb = neighbourhoods.find((area) => area.name === property.area)?.blurb
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.address)}`

  const facts = [
    { icon: BedDouble, label: 'Bedrooms', value: String(property.beds) },
    { icon: Bath, label: 'Bathrooms', value: String(property.baths) },
    { icon: Ruler, label: 'Interior', value: `${formatNumber(property.sqft)} sq ft` },
    { icon: Building2, label: 'Type', value: property.type },
    { icon: CalendarDays, label: 'Built', value: String(property.year) },
  ]

  return (
    <div className="wrap py-8 sm:py-10">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
        <Link to="/" className="transition hover:text-ink">
          Home
        </Link>
        <span aria-hidden>/</span>
        <Link to="/properties" className="transition hover:text-ink">
          Properties
        </Link>
        <span aria-hidden>/</span>
        <span className="text-ink-soft">{property.title}</span>
      </nav>

      <div className="mt-6">
        <Gallery images={property.images} title={property.title} />
      </div>

      <div className="mt-8 flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={property.status === 'For rent' ? 'brass' : 'forest'}>{property.status}</Badge>
            <span className="chip">{property.type}</span>
            <span className="chip">Ref {property.reference}</span>
          </div>
          <h1 className="mt-4 text-4xl leading-[1.02] sm:text-5xl">{property.title}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-[14px] text-muted">
            <MapPin size={14} aria-hidden />
            {property.address}
          </p>
          <p className="mt-3 font-display text-[19px] italic text-forest">{property.tagline}</p>
        </div>
        <div className="shrink-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
            {property.status === 'For rent' ? 'Rent' : 'Guide price'}
          </p>
          <p className="mt-1 font-display text-3xl leading-none sm:text-4xl">
            {priceLabel(property.price, property.status)}
          </p>
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {facts.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-2xl border border-line bg-white/70 p-4">
            <Icon size={16} className="text-brass" aria-hidden />
            <dt className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">{label}</dt>
            <dd className="mt-1 text-[15px] font-medium">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
        <div>
          <h2 className="text-2xl sm:text-3xl">About this home</h2>
          <div className="mt-4 space-y-4 text-[14.5px] leading-relaxed text-ink-soft">
            {property.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <h2 className="mt-10 text-2xl">Features</h2>
          <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {property.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-[14px] text-ink-soft">
                <Check size={15} className="mt-0.5 shrink-0 text-forest" aria-hidden />
                {feature}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-2xl">Amenities</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {property.amenities.map((amenity) => (
              <span key={amenity} className="chip">
                {amenity}
              </span>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-line bg-white p-6">
            <h2 className="text-2xl">Location</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">
              {property.area}, {property.city}. {areaBlurb ?? 'A well-connected part of the city, with excellent schools and transport nearby.'}
            </p>
            <p className="mt-3 text-[13px] text-ink-soft">{property.address}</p>
            <Button href={mapsUrl} variant="outline" size="sm" className="mt-5">
              Open in maps
            </Button>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl border border-line bg-white p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">Your advisor</p>
            <div className="mt-4 flex items-center gap-3">
              <img src={agent.photo} alt={agent.name} className="h-12 w-12 rounded-full object-cover" loading="lazy" />
              <div>
                <p className="text-[14px] font-medium">{agent.name}</p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-muted">{agent.role}</p>
              </div>
            </div>
            <a
              href={`tel:${agent.phone.replace(/\s/g, '')}`}
              className="mt-4 flex items-center gap-2 text-[13px] text-ink-soft transition hover:text-forest"
            >
              <Phone size={14} aria-hidden />
              {agent.phone}
            </a>
            <p className="mt-4 border-t border-line pt-4 text-[12px] leading-relaxed text-muted">{agent.bio}</p>
          </div>

          <LeadForm
            className="mt-4"
            propertyRef={property.reference}
            propertyTitle={property.title}
            defaultInterest={property.status === 'For rent' ? 'Renting' : 'Buying'}
            description="Tell us when suits and we will confirm within the hour."
            compact
          />
        </aside>
      </div>

      <section className="mt-16 border-t border-line pt-12">
        <SectionHeading
          eyebrow="You may also like"
          title="Similar homes"
          action={
            <Button to="/properties" variant="outline" size="sm">
              All properties
            </Button>
          }
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {similar.map((item) => (
            <PropertyCard key={item.slug} property={item} className="h-full" />
          ))}
        </div>
      </section>
    </div>
  )
}
