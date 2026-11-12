export const AED_PER_USD = 3.6725;

export type Currency = "AED" | "USD";

export function convert(priceAED: number, currency: Currency) {
  return currency === "AED" ? priceAED : priceAED / AED_PER_USD;
}

export function formatPrice(priceAED: number, currency: Currency) {
  const value = convert(priceAED, currency);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompact(priceAED: number, currency: Currency) {
  const value = convert(priceAED, currency);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}
