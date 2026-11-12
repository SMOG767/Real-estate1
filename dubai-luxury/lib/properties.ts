export type CategoryId =
  | "all"
  | "villas"
  | "penthouses"
  | "waterfront-villas"
  | "waterfront-townhouses";

export const categories: { id: CategoryId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "villas", label: "Luxury Villas" },
  { id: "penthouses", label: "Luxury Penthouses" },
  { id: "waterfront-villas", label: "Waterfront Villas" },
  { id: "waterfront-townhouses", label: "Waterfront Townhouses" },
];

export type Room = { x: number; y: number; w: number; h: number; l: string };
export type Floorplan = { level: string; rooms: Room[] };

const plans: Record<"villa" | "penthouse" | "townhouse", Floorplan> = {
  villa: {
    level: "Ground floor · indicative",
    rooms: [
      { x: 4, y: 4, w: 38, h: 30, l: "Majlis" },
      { x: 44, y: 4, w: 26, h: 18, l: "Dining" },
      { x: 72, y: 4, w: 24, h: 18, l: "Kitchen" },
      { x: 44, y: 24, w: 26, h: 10, l: "Pantry" },
      { x: 72, y: 24, w: 24, h: 10, l: "Service" },
      { x: 4, y: 36, w: 30, h: 30, l: "Primary suite" },
      { x: 36, y: 36, w: 22, h: 18, l: "Bed 2" },
      { x: 36, y: 56, w: 22, h: 10, l: "Bath" },
      { x: 60, y: 36, w: 36, h: 30, l: "Pool terrace" },
    ],
  },
  penthouse: {
    level: "Full floor · indicative",
    rooms: [
      { x: 4, y: 4, w: 44, h: 34, l: "Living" },
      { x: 50, y: 4, w: 22, h: 16, l: "Kitchen" },
      { x: 74, y: 4, w: 22, h: 34, l: "Dining" },
      { x: 50, y: 22, w: 22, h: 16, l: "Gallery" },
      { x: 4, y: 40, w: 28, h: 26, l: "Primary" },
      { x: 34, y: 40, w: 26, h: 26, l: "Bed 2 / 3" },
      { x: 62, y: 40, w: 34, h: 26, l: "Sky terrace" },
    ],
  },
  townhouse: {
    level: "Ground floor · indicative",
    rooms: [
      { x: 4, y: 4, w: 34, h: 32, l: "Living" },
      { x: 40, y: 4, w: 24, h: 20, l: "Kitchen" },
      { x: 66, y: 4, w: 30, h: 20, l: "Dining" },
      { x: 40, y: 26, w: 24, h: 10, l: "Store" },
      { x: 66, y: 26, w: 30, h: 10, l: "Guest" },
      { x: 4, y: 38, w: 26, h: 28, l: "Garden" },
      { x: 32, y: 38, w: 30, h: 28, l: "Family" },
      { x: 64, y: 38, w: 32, h: 28, l: "Water terrace" },
    ],
  },
};

const photo = (id: number, w = 1400) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export type Property = {
  id: string;
  ref: string;
  name: string;
  category: Exclude<CategoryId, "all">;
  location: string;
  priceAED: number;
  beds: number;
  baths: number;
  areaSqft: number;
  plotSqft?: number;
  status: "Ready" | "Off-plan";
  handover: string;
  view: string;
  headline: string;
  description: string;
  features: string[];
  images: string[];
  floorplan: Floorplan;
};

export const properties: Property[] = [
  {
    id: "palm-jumeirah-signature-villa",
    ref: "FM-101",
    name: "Palm Jumeirah Signature Villa",
    category: "waterfront-villas",
    location: "Palm Jumeirah · Frond K",
    priceAED: 68_000_000,
    beds: 6,
    baths: 7,
    areaSqft: 8_240,
    plotSqft: 13_500,
    status: "Ready",
    handover: "Ready · vacant on transfer",
    view: "Atlantis and open Gulf sunset",
    headline: "Twenty-two metres of private beach, and a berth for the boat you actually use.",
    description:
      "A rebuilt Signature Villa on the quiet side of Frond K, oriented west so the pool, majlis and primary suite all take the sunset. The current owner has kept the original palm-garden canopy while opening the ground floor to a single 14-metre living span. Title is freehold, held in a Dubai structure, with the beach plot included.",
    features: [
      "22 m private beach frontage",
      "Deep-water berth for a 24 m yacht",
      "Infinity pool with Gulf outlook",
      "Staff quarters and separate service entry",
      "Landscaped majlis courtyard",
      "Smart-home and solar pre-install",
      "Freehold title in a Dubai structure",
    ],
    images: [photo(21856236), photo(29212663), photo(31817164)],
    floorplan: plans.villa,
  },
  {
    id: "downtown-sky-penthouse",
    ref: "FM-102",
    name: "Downtown Sky Penthouse",
    category: "penthouses",
    location: "Downtown Dubai · Burj Khalifa District",
    priceAED: 42_500_000,
    beds: 4,
    baths: 5,
    areaSqft: 6_100,
    status: "Ready",
    handover: "Ready · furnished by negotiation",
    view: "Burj Khalifa and the Fountain, full north-east",
    headline: "The whole floor, three and a half metres of ceiling, and nothing above you.",
    description:
      "A full-floor residence with private lift lobby and a 120 sq m terrace set back from the tower edge. The north-east aspect holds the Burj Khalifa and Fountain without the neighbouring tower in frame — a distinction that is easy to verify on site and hard to find twice. Service charge and reserve fund statements for the last three years are available on request.",
    features: [
      "Full-floor with private lift lobby",
      "3.6 m ceilings and 120 sq m terrace",
      "Protected Burj Khalifa aspect",
      "Chef's kitchen with service access",
      "Two parking bays plus valet",
      "Concierge and residents' spa",
      "Three years of service-charge statements",
    ],
    images: [photo(29212699), photo(31817164), photo(29212681)],
    floorplan: plans.penthouse,
  },
  {
    id: "creek-harbour-waterfront-townhouse",
    ref: "FM-103",
    name: "Dubai Creek Harbour Waterfront Townhouse",
    category: "waterfront-townhouses",
    location: "Dubai Creek Harbour · Marina Promenade",
    priceAED: 12_900_000,
    beds: 4,
    baths: 4,
    areaSqft: 3_480,
    plotSqft: 2_650,
    status: "Off-plan",
    handover: "Q4 2027 · 60/40 plan",
    view: "Creek Tower and the marina promenade",
    headline: "A waterfront address at entry pricing, with the payment plan doing the work.",
    description:
      "A four-bedroom townhouse on the promenade side of Creek Harbour, walking distance to the marina and the Creek Tower district. The 60/40 structure is staged to handover, with the balance due on transfer — modelled here on a 6.4% gross rent assumption and a three-year hold. Escrow account and developer delivery record verified before shortlisting.",
    features: [
      "Direct promenade frontage",
      "60/40 payment plan to Q4 2027",
      "Four bedrooms plus family lounge",
      "Private roof terrace",
      "Two covered parking bays",
      "Escrow verified",
      "Yield model available on request",
    ],
    images: [photo(10514386), photo(29212678), photo(29212681)],
    floorplan: plans.townhouse,
  },
  {
    id: "emirates-hills-mansion",
    ref: "FM-104",
    name: "Emirates Hills Mansion",
    category: "villas",
    location: "Emirates Hills · Sector E",
    priceAED: 95_000_000,
    beds: 8,
    baths: 9,
    areaSqft: 14_800,
    plotSqft: 24_000,
    status: "Ready",
    handover: "Ready · furnished",
    view: "Montgomerie golf course and lake",
    headline: "Twenty-four thousand square feet of land on the golf course, with a house that earns it.",
    description:
      "A 2019 completion on one of the deeper Sector E plots, with a double-height reception hall, indoor pool and a guest wing that functions independently. The garden faces the 11th fairway with mature planting on both boundaries. Fully furnished, with a maintenance contract and staff in place if the buyer wants continuity.",
    features: [
      "24,000 sq ft plot on the 11th fairway",
      "Indoor and outdoor pools",
      "Independent guest wing",
      "Cinema, gym and majlis",
      "Staff accommodation for four",
      "Mature boundary planting",
      "Furnished with maintenance contract",
    ],
    images: [photo(30781823), photo(28449020), photo(24807139), photo(35069534)],
    floorplan: plans.villa,
  },
  {
    id: "jumeirah-bay-island-villa",
    ref: "FM-105",
    name: "Jumeirah Bay Island Villa",
    category: "waterfront-villas",
    location: "Jumeirah Bay Island",
    priceAED: 54_000_000,
    beds: 5,
    baths: 6,
    areaSqft: 7_100,
    plotSqft: 11_200,
    status: "Ready",
    handover: "Ready · vacant",
    view: "Dubai skyline across the water",
    headline: "An island address with the skyline close enough to read, and the city far enough to ignore.",
    description:
      "One of the limited villa plots on Jumeirah Bay, set behind a private gate with a west-facing garden and pool. The living floor is oriented to the water and the Downtown skyline beyond it; the principal suite occupies the entire first floor. Low-density island management, with beach club access included in the service charge.",
    features: [
      "Gated island villa plot",
      "West-facing pool and garden",
      "Principal suite on its own floor",
      "Beach club access included",
      "Private lift to all levels",
      "Two staff rooms",
      "Low-density island management",
    ],
    images: [photo(33663907), photo(29212671), photo(28915352)],
    floorplan: plans.villa,
  },
  {
    id: "dubai-marina-penthouse",
    ref: "FM-106",
    name: "Dubai Marina Penthouse",
    category: "penthouses",
    location: "Dubai Marina · Marina Gate",
    priceAED: 28_700_000,
    beds: 3,
    baths: 4,
    areaSqft: 4_950,
    status: "Ready",
    handover: "Ready · vacant on transfer",
    view: "Marina, Ain Dubai and the sea",
    headline: "A duplex over the marina with a terrace built for the hours that matter.",
    description:
      "A duplex penthouse on the upper floors of Marina Gate, with a 96 sq m terrace facing Ain Dubai and the water. The lower level holds the reception and kitchen; the upper level is given entirely to bedrooms and a second lounge. Walk to the promenade, or stay above it — the glazing is triple-lined, which is the difference between a view and a noise complaint.",
    features: [
      "Duplex with 96 sq m terrace",
      "Ain Dubai and sea aspect",
      "Triple-lined glazing",
      "Second lounge on the upper level",
      "Two parking bays",
      "Pool, gym and residents' lounge",
      "Walk to the Marina promenade",
    ],
    images: [photo(36134179), photo(29212678), photo(31817157)],
    floorplan: plans.penthouse,
  },
];

export function categoryLabel(category: Property["category"]) {
  return (
    categories.find((item) => item.id === category)?.label ?? "Residence"
  );
}
