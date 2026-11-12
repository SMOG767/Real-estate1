import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'

import { brand, navLinks, offices } from '../data/site'

const socials = [
  { label: 'Instagram', href: 'https://instagram.com', mark: 'IG' },
  { label: 'LinkedIn', href: 'https://linkedin.com', mark: 'in' },
  { label: 'Facebook', href: 'https://facebook.com', mark: 'FB' },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="mt-24 bg-forest text-cream/70">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_0.8fr_1.2fr]">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-cream/25 font-display text-[19px] text-cream">M</span>
            <span className="leading-none">
              <span className="block font-display text-[22px] text-cream">{brand.name}</span>
              <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.3em] text-cream/50">Prime London Property</span>
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-cream/60">{brand.tagline} Sales, lettings and private search across prime central and west London.</p>
          <div className="mt-6 flex gap-2">
            {socials.map(({ label, href, mark }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-cream/15 text-[10px] font-semibold tracking-[0.06em] text-cream/70 transition hover:border-cream/40 hover:text-cream"
              >
                {mark}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cream/40">Explore</p>
          <ul className="mt-5 space-y-3 text-[13px]">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition hover:text-cream">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cream/40">Offices</p>
          <ul className="mt-5 space-y-4 text-[13px]">
            {offices.map((office) => (
              <li key={office.name}>
                <p className="text-cream/85">{office.name}</p>
                <p className="mt-0.5 leading-relaxed text-cream/50">{office.address}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cream/40">The list</p>
          <p className="mt-5 text-[13px] leading-relaxed text-cream/60">
            New houses and off-market opportunities, sent once a fortnight. No noise.
          </p>
          {subscribed ? (
            <p className="mt-5 rounded-xl border border-cream/15 px-4 py-3 text-[13px] text-cream">Thank you — you’re on the list.</p>
          ) : (
            <form onSubmit={subscribe} className="mt-5">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <div className="flex items-center gap-2 border-b border-cream/25 pb-2 focus-within:border-cream/60">
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@email.com"
                  className="w-full bg-transparent text-[13px] text-cream outline-none placeholder:text-cream/35"
                />
                <button type="submit" aria-label="Subscribe" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/20">
                  <ArrowRight size={15} aria-hidden />
                </button>
              </div>
            </form>
          )}
          <div className="mt-6 space-y-2 text-[12px] text-cream/50">
            <a href={brand.phoneHref} className="flex items-center gap-2 transition hover:text-cream">
              <Phone size={12} aria-hidden />
              {brand.phone}
            </a>
            <a href={`mailto:${brand.email}`} className="flex items-center gap-2 transition hover:text-cream">
              <Mail size={12} aria-hidden />
              {brand.email}
            </a>
            <p className="flex items-start gap-2">
              <MapPin size={12} className="mt-0.5 shrink-0" aria-hidden />
              {brand.address}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="wrap flex flex-col gap-2 py-6 text-[10px] uppercase tracking-[0.18em] text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p>Property details and imagery are illustrative</p>
        </div>
      </div>
    </footer>
  )
}
