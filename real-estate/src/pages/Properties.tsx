import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { SlidersHorizontal, X } from 'lucide-react'

import { CtaBand } from '../components/CtaBand'
import { Filters, activeFilterCount } from '../components/Filters'
import type { FilterValues } from '../components/Filters'
import { PropertyCard } from '../components/PropertyCard'
import { Button, PageHero } from '../components/ui'
import { properties } from '../data/properties'

const sortOptions = [
  { value: 'featured', label: 'Featured first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'beds-desc', label: 'Most bedrooms' },
]

export default function Properties() {
  const [params, setParams] = useSearchParams()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const purposeParam = params.get('purpose')
  const values: FilterValues = {
    purpose: purposeParam === 'sale' || purposeParam === 'rent' ? purposeParam : 'any',
    area: params.get('area') ?? '',
    type: params.get('type') ?? '',
    beds: params.get('beds') ?? '',
    max: params.get('max') ?? '',
  }
  const sort = params.get('sort') ?? 'featured'

  useEffect(() => {
    if (!drawerOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [drawerOpen])

  function update(key: keyof FilterValues, value: string) {
    const next = new URLSearchParams(params)
    if (!value || (key === 'purpose' && value === 'any')) next.delete(key)
    else next.set(key, value)
    if (key === 'purpose') next.delete('max')
    setParams(next, { replace: true })
  }

  function clear() {
    const next = new URLSearchParams()
    if (sort !== 'featured') next.set('sort', sort)
    setParams(next, { replace: true })
  }

  const results = useMemo(() => {
    const minBeds = Number(values.beds || 0)
    const maxPrice = Number(values.max || 0)

    const filtered = properties.filter((property) => {
      if (values.purpose === 'sale' && property.status !== 'For sale') return false
      if (values.purpose === 'rent' && property.status !== 'For rent') return false
      if (values.area && property.area !== values.area) return false
      if (values.type && property.type !== values.type) return false
      if (minBeds && property.beds < minBeds) return false
      if (maxPrice && property.price > maxPrice) return false
      return true
    })

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'beds-desc':
          return b.beds - a.beds
        default:
          return Number(b.featured) - Number(a.featured) || a.price - b.price
      }
    })
  }, [values.purpose, values.area, values.type, values.beds, values.max, sort])

  const filterCount = activeFilterCount(values)

  return (
    <>
      <PageHero
        eyebrow="The portfolio"
        title="Houses and apartments, honestly described."
        description="Sale and rental instructions across prime central and west London. Filter by area, type, budget and bedrooms — or call us about the ones we never advertise."
      />

      <div className="wrap py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[290px_1fr] lg:gap-12">
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-3xl border border-line bg-white p-6">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-display text-xl">Refine</p>
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">{filterCount} active</span>
              </div>
              <Filters values={values} onChange={update} onClear={clear} />
            </div>
          </aside>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
              <p className="text-[13px] text-muted">
                <span className="font-medium text-ink">{results.length}</span> {results.length === 1 ? 'home' : 'homes'}
                {values.area ? ` in ${values.area}` : ''}
                {values.type ? ` · ${values.type}` : ''}
                {values.purpose === 'sale' ? ' · for sale' : values.purpose === 'rent' ? ' · to rent' : ''}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[12px] font-medium transition hover:border-ink/30 lg:hidden"
                >
                  <SlidersHorizontal size={14} aria-hidden />
                  Filters
                  {filterCount > 0 ? (
                    <span className="grid h-4 min-w-4 place-items-center rounded-full bg-forest px-1 text-[10px] text-cream">{filterCount}</span>
                  ) : null}
                </button>

                <label htmlFor="sort" className="sr-only">
                  Sort properties
                </label>
                <select
                  id="sort"
                  className="field select w-auto py-2 text-[12px]"
                  value={sort}
                  onChange={(event) => {
                    const next = new URLSearchParams(params)
                    if (event.target.value === 'featured') next.delete('sort')
                    else next.set('sort', event.target.value)
                    setParams(next, { replace: true })
                  }}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-7 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((property) => (
                <PropertyCard key={property.slug} property={property} className="h-full" />
              ))}

              {results.length === 0 ? (
                <div className="col-span-full rounded-3xl border border-dashed border-line bg-white/60 px-6 py-16 text-center">
                  <p className="font-display text-2xl">No homes match those filters.</p>
                  <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-muted">
                    Try widening the area or budget — or tell us what you are after. Around a third of what we sell never
                    reaches a website.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <Button variant="outline" size="sm" onClick={clear}>
                      Clear filters
                    </Button>
                    <Button to="/contact" size="sm">
                      Register your requirements
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-12 rounded-3xl border border-line bg-sand/50 px-6 py-8 sm:flex sm:items-center sm:justify-between sm:gap-6">
              <div>
                <p className="font-display text-2xl">Looking for something specific?</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                  Tell us the street, the budget and the timing. We will do the searching.
                </p>
              </div>
              <Button to="/contact" size="sm" className="mt-5 shrink-0 sm:mt-0">
                Talk to an advisor
              </Button>
            </div>
          </div>
        </div>
      </div>

      {drawerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filter properties">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-[28px] bg-cream p-6 pb-8">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-display text-2xl">Filters</p>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close filters"
                className="grid h-9 w-9 place-items-center rounded-full border border-line"
              >
                <X size={16} aria-hidden />
              </button>
            </div>
            <Filters values={values} onChange={update} onClear={clear} />
            <Button className="mt-6 w-full" onClick={() => setDrawerOpen(false)}>
              Show {results.length} {results.length === 1 ? 'home' : 'homes'}
            </Button>
          </div>
        </div>
      ) : null}

      <div className="pt-16">
        <CtaBand
          eyebrow="Not on the market"
          title="The best houses are often the quiet ones."
          description="Register once and we will send the off-market houses that match, before they are photographed."
        />
      </div>
    </>
  )
}
