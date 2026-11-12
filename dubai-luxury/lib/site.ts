export const site = {
  name: "Dr. Farah Merhi",
  wordmark: "DR. FARAH MERHI",
  tagline: "Dubai Luxury Real Estate",
  instagramHandle: "@investindubai33",
  instagramUrl: "https://www.instagram.com/investindubai33",
  whatsappNumber: "971500000000",
  whatsappDisplay: "+971 50 000 0000",
  email: "advisory@drfarahmerhi.com",
  location: "Palm Jumeirah · Dubai, UAE",
  url: "https://www.drfarahmerhi.com",
  rera:
    "RERA advisory disclaimer — replace this line with the licensed brokerage name, ORN and permit number before publishing.",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const nav = [
  { label: "Story", href: "#story" },
  { label: "3D Showcase", href: "#showcase" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Advisory", href: "#advisory" },
  { label: "Contact", href: "#contact" },
];

export const heroAreas = [
  "Palm Jumeirah · Frond K",
  "Downtown · Burj Khalifa District",
  "Jumeirah Bay Island",
  "Dubai Creek Harbour",
  "Emirates Hills",
  "Dubai Marina",
];

export const storyPillars = [
  {
    index: "01",
    kicker: "Waterfront villas",
    title: "A private shoreline, engineered for permanence.",
    body:
      "Frond addresses on Palm Jumeirah and island residences on Jumeirah Bay are evaluated on frontage, berth rights and re-sale depth — not on the brochure. We walk the plot, read the title and model the exit before you commit.",
    meta: ["Palm Jumeirah", "Jumeirah Bay", "Private berths"],
  },
  {
    index: "02",
    kicker: "Sky penthouses",
    title: "Full-floor living, with the skyline as the only neighbour.",
    body:
      "Downtown and Marina penthouses trade on height, aspect and exclusivity. We verify what is actually above you, how the service charge behaves at the top of the tower, and which views are protected by planning.",
    meta: ["Downtown Dubai", "Dubai Marina", "Full-floor"],
  },
  {
    index: "03",
    kicker: "High-ROI off-plan",
    title: "Entry pricing, payment plans, and a modelled exit.",
    body:
      "Off-plan is a cash-flow decision before it is a design decision. Handover timelines, escrow status, developer delivery record and rent assumptions are stress-tested so the yield story survives contact with the market.",
    meta: ["Escrow verified", "Payment plans", "Yield modelling"],
  },
];

export const advisoryPillars = [
  {
    title: "Acquisition advisory",
    copy:
      "Shortlists built around your brief, not an inventory list — with title, service-charge and planning diligence completed before viewing.",
  },
  {
    title: "Investment modelling",
    copy:
      "Entry price, payment schedule, holding cost and exit assumptions in one model, in AED and USD, so the numbers are comparable.",
  },
  {
    title: "Private representation",
    copy:
      "Discreet negotiation on off-market villas and penthouses, coordinated with your legal and banking teams through handover.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Private brief",
    copy: "A 30-minute conversation on use, horizon and capital. No listings sent before the brief is clear.",
  },
  {
    step: "02",
    title: "Curated shortlist",
    copy: "Three to five residences with diligence notes, floorplans and honest trade-offs.",
  },
  {
    step: "03",
    title: "Viewings & modelling",
    copy: "In-person or spatial previews, followed by a written investment and exit view.",
  },
  {
    step: "04",
    title: "Negotiation & handover",
    copy: "Offer strategy, developer liaison and coordination through transfer or snagging.",
  },
];

export const propertyTypes = [
  "Waterfront villa",
  "Luxury penthouse",
  "Waterfront townhouse",
  "Off-plan investment",
  "Portfolio review",
];

export const budgetRanges = [
  "AED 8M – 15M",
  "AED 15M – 30M",
  "AED 30M – 60M",
  "AED 60M – 100M",
  "AED 100M+",
];
