export const salePriceCaps = [1_500_000, 2_000_000, 3_000_000, 5_000_000, 8_000_000, 12_000_000]

export const rentPriceCaps = [3_000, 4_000, 5_000, 8_000, 12_000]

/** Rent is quoted monthly, so it gets its own set of caps. */
export function priceCaps(purpose: 'any' | 'sale' | 'rent'): number[] {
  return purpose === 'rent' ? rentPriceCaps : salePriceCaps
}
