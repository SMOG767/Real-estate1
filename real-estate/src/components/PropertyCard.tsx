import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight, Bath, BedDouble, Heart, MapPin, Ruler } from 'lucide-react'

import type { Property } from '../data/properties'
import { formatNumber, priceLabel } from '../lib/format'
import { cx } from '../lib/utils'
import { Badge } from './ui'

export function PropertyCard({ property, className }: { property: Property; className?: string }) {
  const [saved, setSaved] = useState(false)
  const href = `/properties/${property.slug}`

  return (
    <article
      className={cx(
        'group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_36px_70px_-48px_rgba(20,17,13,0.55)]',
        className,
      )}
    >
      <Link to={href} className="relative block aspect-[4/3] overflow-hidden bg-sand" aria-label={`View ${property.title}`}>
        <img
          src={property.images[0]}
          alt={`${property.title}, ${property.area}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
        <div className="absolute left-3 top-3">
          <Badge tone={property.status === 'For rent' ? 'brass' : 'light'}>{property.status}</Badge>
        </div>
        <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/90">
          {property.type} · {property.area}
        </span>
      </Link>

      <button
        type="button"
        onClick={() => setSaved((value) => !value)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${property.title} from saved homes` : `Save ${property.title}`}
        className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-cream/90 text-ink shadow-sm backdrop-blur transition hover:bg-white"
      >
        <Heart size={15} className={saved ? 'fill-forest text-forest' : ''} aria-hidden />
      </button>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-display text-[21px] leading-none">{priceLabel(property.price, property.status)}</p>
        <h3 className="mt-2 font-display text-[22px] leading-tight">
          <Link to={href} className="transition-colors hover:text-forest">
            {property.title}
          </Link>
        </h3>
        <p className="mt-1.5 flex items-start gap-1.5 text-[13px] leading-snug text-muted">
          <MapPin size={13} className="mt-0.5 shrink-0" aria-hidden />
          {property.address}
        </p>

        <div className="mt-auto flex items-center gap-3 border-t border-line/70 pt-4 text-[12px] text-ink-soft">
          <span className="flex items-center gap-1.5">
            <BedDouble size={14} className="text-muted" aria-hidden />
            {property.beds} bed
          </span>
          <span className="flex items-center gap-1.5">
            <Bath size={14} className="text-muted" aria-hidden />
            {property.baths} bath
          </span>
          <span className="flex items-center gap-1.5">
            <Ruler size={14} className="text-muted" aria-hidden />
            {formatNumber(property.sqft)} sq ft
          </span>
          <ArrowUpRight
            size={16}
            className="ml-auto text-forest opacity-0 transition duration-300 group-hover:opacity-100"
            aria-hidden
          />
        </div>
      </div>
    </article>
  )
}
