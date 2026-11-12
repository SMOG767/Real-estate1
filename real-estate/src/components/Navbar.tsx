import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Menu, Phone, X } from 'lucide-react'

import { brand, navLinks } from '../data/site'
import { cx } from '../lib/utils'
import { Button } from './ui'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-40">
      <div className="hidden bg-forest text-cream/75 md:block">
        <div className="wrap flex h-9 items-center justify-between text-[10px] font-medium uppercase tracking-[0.2em]">
          <span>Prime London property since {brand.established}</span>
          <div className="flex items-center gap-6">
            <a href={brand.phoneHref} className="inline-flex items-center gap-1.5 transition hover:text-cream">
              <Phone size={11} aria-hidden />
              {brand.phone}
            </a>
            <a href={`mailto:${brand.email}`} className="transition hover:text-cream">
              {brand.email}
            </a>
          </div>
        </div>
      </div>

      <div
        className={cx(
          'border-b bg-cream/90 backdrop-blur-md transition-all duration-300',
          scrolled ? 'border-line shadow-[0_18px_40px_-38px_rgba(20,17,13,0.8)]' : 'border-transparent',
        )}
      >
        <div className="wrap flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link to="/" className="flex items-center gap-3" aria-label={`${brand.name} home`}>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-forest font-display text-[19px] text-cream">M</span>
            <span className="leading-none">
              <span className="block font-display text-[21px] tracking-tight text-ink sm:text-[23px]">{brand.name}</span>
              <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.3em] text-muted">Prime London Property</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cx(
                    'relative py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-forest after:transition-transform after:duration-300',
                    isActive ? 'text-ink after:scale-x-100' : 'text-muted hover:text-ink after:scale-x-0 hover:after:scale-x-100',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={brand.phoneHref}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-[13px] font-medium text-ink transition hover:bg-ink/[0.04] lg:inline-flex"
            >
              <Phone size={14} aria-hidden />
              {brand.phone}
            </a>
            <Button to="/contact" size="sm" className="hidden sm:inline-flex">
              Book a viewing
            </Button>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition hover:bg-ink/[0.04] md:hidden"
            >
              {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
            </button>
          </div>
        </div>

        {open ? (
          <div id="mobile-nav" className="border-t border-line bg-cream md:hidden">
            <nav className="wrap flex flex-col py-4" aria-label="Mobile">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    cx(
                      'border-b border-line/60 py-3 text-sm font-medium transition-colors last:border-0',
                      isActive ? 'text-ink' : 'text-muted',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-4 flex flex-col gap-3 pb-2">
                <a href={brand.phoneHref} className="inline-flex items-center gap-2 text-sm text-ink-soft">
                  <Phone size={14} aria-hidden />
                  {brand.phone}
                </a>
                <Button to="/contact" className="w-full">
                  Book a viewing
                </Button>
              </div>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  )
}
