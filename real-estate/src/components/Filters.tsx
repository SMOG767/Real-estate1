import { RotateCcw } from 'lucide-react'

import { areas, propertyTypes } from '../data/properties'
import { compactPrice } from '../lib/format'
import { priceCaps } from '../lib/search'
import { cx } from '../lib/utils'
import { Field } from './ui'

export type FilterValues = {
  purpose: 'any' | 'sale' | 'rent'
  area: string
  type: string
  beds: string
  max: string
}

export const emptyFilters: FilterValues = { purpose: 'any', area: '', type: '', beds: '', max: '' }

export function activeFilterCount(values: FilterValues): number {
  return [values.purpose !== 'any', values.area, values.type, values.beds, values.max].filter(Boolean).length
}

export function Filters({
  values,
  onChange,
  onClear,
  className,
}: {
  values: FilterValues
  onChange: (key: keyof FilterValues, value: string) => void
  onClear: () => void
  className?: string
}) {
  const caps = priceCaps(values.purpose)
  const purposes: { value: FilterValues['purpose']; label: string }[] = [
    { value: 'any', label: 'All' },
    { value: 'sale', label: 'Buy' },
    { value: 'rent', label: 'Rent' },
  ]

  return (
    <div className={cx('space-y-5', className)}>
      <div>
        <p className="label">Purpose</p>
        <div className="grid grid-cols-3 gap-1 rounded-full bg-sand/80 p-1">
          {purposes.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange('purpose', option.value)}
              aria-pressed={values.purpose === option.value}
              className={cx(
                'rounded-full px-2 py-2 text-[12px] font-semibold transition',
                values.purpose === option.value ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-ink',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <Field label="Location" htmlFor="filter-area">
        <select id="filter-area" className="field select" value={values.area} onChange={(event) => onChange('area', event.target.value)}>
          <option value="">Anywhere in London</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Property type" htmlFor="filter-type">
        <select id="filter-type" className="field select" value={values.type} onChange={(event) => onChange('type', event.target.value)}>
          <option value="">All types</option>
          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Bedrooms" htmlFor="filter-beds">
        <select id="filter-beds" className="field select" value={values.beds} onChange={(event) => onChange('beds', event.target.value)}>
          <option value="">Any</option>
          {[1, 2, 3, 4, 5].map((count) => (
            <option key={count} value={count}>
              {count}+ bedrooms
            </option>
          ))}
        </select>
      </Field>

      <Field label={values.purpose === 'rent' ? 'Max monthly rent' : 'Max price'} htmlFor="filter-max">
        <select id="filter-max" className="field select" value={values.max} onChange={(event) => onChange('max', event.target.value)}>
          <option value="">No maximum</option>
          {caps.map((cap) => (
            <option key={cap} value={cap}>
              Up to {compactPrice(cap)}
              {values.purpose === 'rent' ? ' pcm' : ''}
            </option>
          ))}
        </select>
      </Field>

      <button
        type="button"
        onClick={onClear}
        className="inline-flex items-center gap-2 text-[12px] font-medium text-muted transition hover:text-forest"
      >
        <RotateCcw size={13} aria-hidden />
        Clear all filters
      </button>
    </div>
  )
}
