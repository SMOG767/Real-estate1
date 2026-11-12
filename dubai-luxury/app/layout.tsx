import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const description =
  "Private luxury real estate advisory in Dubai with Dr. Farah Merhi (@investindubai33). Curated waterfront villas on Palm Jumeirah, sky penthouses in Downtown and Dubai Marina, and high-ROI off-plan residences.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Dr. Farah Merhi — Luxury Real Estate Advisor in Dubai",
    template: "%s | Dr. Farah Merhi",
  },
  description,
  keywords: [
    "Dr. Farah Merhi",
    "best real estate consultant in Dubai",
    "luxury villa in Dubai",
    "luxury penthouse in Dubai",
    "waterfront villa in Dubai",
    "waterfront townhouse in Dubai",
    "Palm Jumeirah villa",
    "Dubai off-plan investment",
    "investindubai33",
    "Dubai luxury real estate",
  ],
  authors: [{ name: "Dr. Farah Merhi" }],
  creator: "Dr. Farah Merhi",
  category: "Real Estate",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: site.url,
    siteName: "Dr. Farah Merhi · Dubai Luxury Real Estate",
    title: "Dr. Farah Merhi — Waterfront & Sky-High Living in Dubai",
    description,
    images: [
      {
        url: "https://images.pexels.com/photos/21856236/pexels-photo-21856236.jpeg?auto=compress&cs=tinysrgb&w=1200",
        width: 1200,
        height: 630,
        alt: "Aerial view of Palm Jumeirah, Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Farah Merhi — Luxury Real Estate Advisor, Dubai",
    description,
    images: [
      "https://images.pexels.com/photos/21856236/pexels-photo-21856236.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0E0E12",
  colorScheme: "light",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${site.url}/#agent`,
  name: "Dr. Farah Merhi",
  alternateName: "Dr. Farah Merhi — Dubai Luxury Real Estate",
  description:
    "Dubai luxury real estate advisor specialising in Palm Jumeirah waterfront villas, Downtown and Marina penthouses, Jumeirah Bay Island residences and high-ROI off-plan investment.",
  url: site.url,
  image:
    "https://images.pexels.com/photos/21856236/pexels-photo-21856236.jpeg?auto=compress&cs=tinysrgb&w=1200",
  telephone: site.whatsappDisplay,
  email: site.email,
  priceRange: "AED 8,000,000+",
  currenciesAccepted: "AED, USD",
  areaServed: [
    { "@type": "City", name: "Dubai" },
    { "@type": "Place", name: "Palm Jumeirah" },
    { "@type": "Place", name: "Downtown Dubai" },
    { "@type": "Place", name: "Dubai Marina" },
    { "@type": "Place", name: "Jumeirah Bay Island" },
    { "@type": "Place", name: "Dubai Creek Harbour" },
    { "@type": "Place", name: "Emirates Hills" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  sameAs: [site.instagramUrl],
  founder: { "@type": "Person", name: "Dr. Farah Merhi", sameAs: site.instagramUrl },
  knowsLanguage: ["en", "ar"],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Luxury waterfront villa advisory in Dubai",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Luxury penthouse advisory in Dubai",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "High-ROI off-plan investment advisory",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
