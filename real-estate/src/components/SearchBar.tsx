import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { Search } from 'lucide-react'

import { areas, propertyTypes } from '../data/properties'
import { compactPrice } from '../lib/format'
import { priceCaps } from '../lib/search'
import { cx } from '../lib/utils'
import { Button } from './ui'

type Purpose = 'buy' | 'rent' | 'sell'

const purposes: { value: Purpose; label: string }[] = [
  { value: 'buy', label: 'Buy' },
  { value: 'rent', label: 'Rent' },
  { value: 'sell', label: 'Sell' },
]

export function SearchBar({ className }: { className?: string }) {
  const navigate = useNavigate()
  const [purpose, setPurpose] = useState<Purpose>('buy')
  const [area, setArea] = useState('')
  const [type, setType] = useState('')
  const [beds, setBeds] = useState('')
  const [max, setMax] = useState('')

  const caps = priceCaps(purpose === 'rent' ? 'rent' : 'sale')

  function choosePurpose(next: Purpose) {
    setPurpose(next)
    setMax('')
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (purpose === 'sell') {
      navigate('/contact?interest=Selling')
      return
    }

    const params = new URLSearchParams({ purpose: purpose === 'rent' ? 'rent' : 'sale' })
    if (area) params.set('area', area)
    if (type) params.set('type', type)
    if (beds) params.set('beds', beds)
    if (max) params.set('max', max)
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <div className={cx('rounded-[28px] border border-line/60 bg-white p-4 shadow-[0_40px_80px_-50px_rgba(20,17,13,0.5)] sm:p-5', className)}>
      <div className="mb-4 flex flex-wrap items-center gap-1.5" role="group" aria-label="What are you looking to do?">
        {purposes.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => choosePurpose(option.value)}
            aria-pressed={purpose === option.value}
            className={cx(
              'rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] transition',
              purpose === option.value ? 'bg-forest text-cream' : 'text-muted hover:bg-ink/[0.04] hover:text-ink',
            )}
          >
            {option.label}
          </button>
        ))}
        <span className="ml-auto hidden text-[11px] text-muted sm:block">
          {purpose === 'sell' ? 'Tell us about your home' : 'Refine your search'}
        </span>
      </div>

      <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_0.9fr_0.9fr_auto] lg:items-end">
        <div>
          <label htmlFor="search-area" className="label">
            Location
          </label>
          <select id="search-area" className="field select" value={area} onChange={(event) => setArea(event.target.value)}>
            <option value="">Anywhere in London</option>
            {areas.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="search-type" className="label">
            Property type
          </label>
          <select id="search-type" className="field select" value={type} onChange={(event) => setType(event.target.value)}>
            <option value="">All types</option>
            {propertyTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="search-beds" className="label">
            Bedrooms
          </label>
          <select id="search-beds" className="field select" value={beds} onChange={(event) => setBeds(event.target.value)}>
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((count) => (
              <option key={count} value={count}>
                {count}+
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="search-max" className="label">
            {purpose === 'rent' ? 'Max rent' : 'Max price'}
          </label>
          <select id="search-max" className="field select" value={max} onChange={(event) => setMax(event.target.value)}>
            <option value="">No max</option>
            {caps.map((cap) => (
              <option key={cap} value={cap}>
                {compactPrice(cap)}
                {purpose === 'rent' ? ' pcm' : ''}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" className="h-[46px] w-full lg:w-auto">
          <Search size={16} aria-hidden />
          {purpose === 'sell' ? 'Book a valuation' : 'Search homes'}
        </Button>
      </form>
    </div>
  )
}
