import type { ListingStatus } from '../data/properties'

const currency = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
})

export function gbp(value: number): string {
  return currency.format(value)
}

/** £4,850,000 for sales, £5,200 pcm for rentals. */
export function priceLabel(price: number, status: ListingStatus): string {
  return status === 'For rent' ? `${gbp(price)} pcm` : gbp(price)
}

/** Short form used inside filter options: £2m, £450k. */
export function compactPrice(value: number): string {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000
    return `£${Number.isInteger(millions) ? millions : millions.toFixed(1)}m`
  }
  return `£${Math.round(value / 1000)}k`
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-GB').format(value)
}

export function dateLabel(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
