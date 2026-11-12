import { useSearchParams } from 'react-router'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'

import { LeadForm } from '../components/LeadForm'
import { Button, PageHero } from '../components/ui'
import { brand, offices, openingHours } from '../data/site'

export default function Contact() {
  const [params] = useSearchParams()
  const requested = params.get('interest')
  const defaultInterest =
    requested === 'Selling' ? 'Selling' : requested === 'Renting' ? 'Renting' : requested === 'Buying' ? 'Buying' : 'General enquiry'

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you are looking for."
        description="A person reads every enquiry and replies within one working day. If it is urgent, call the office — someone is always there during opening hours."
      />

      <section className="wrap py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div className="space-y-6">
            <div className="rounded-3xl border border-line bg-white p-6 sm:p-8">
              <h2 className="text-2xl">Kensington office</h2>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                Our head office, above the shop on Kensington Church Street. Drop in for coffee — no appointment needed.
              </p>

              <div className="mt-6 space-y-4 text-[13.5px]">
                <a href={brand.phoneHref} className="flex items-start gap-3 transition hover:text-forest">
                  <Phone size={15} className="mt-0.5 shrink-0 text-brass" aria-hidden />
                  <span>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Phone</span>
                    {brand.phone}
                  </span>
                </a>
                <a href={`mailto:${brand.email}`} className="flex items-start gap-3 transition hover:text-forest">
                  <Mail size={15} className="mt-0.5 shrink-0 text-brass" aria-hidden />
                  <span>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Email</span>
                    {brand.email}
                  </span>
                </a>
                <div className="flex items-start gap-3">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-brass" aria-hidden />
                  <span>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Address</span>
                    {brand.address}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={15} className="mt-0.5 shrink-0 text-brass" aria-hidden />
                  <span>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Opening hours</span>
                    {openingHours.map((entry) => (
                      <span key={entry.day} className="mt-1 flex justify-between gap-6 text-[12.5px] text-ink-soft">
                        <span>{entry.day}</span>
                        <span className="text-muted">{entry.time}</span>
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-line bg-white">
              <iframe
                title="Map showing the Marlowe & Co. Kensington office"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-0.2020%2C51.4995%2C-0.1900%2C51.5075&layer=mapnik&marker=51.5035%2C-0.1965"
                className="h-[300px] w-full border-0"
                loading="lazy"
              />
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <p className="text-[12px] text-muted">18 Kensington Church Street, W8 4EP</p>
                <Button
                  href="https://www.openstreetmap.org/?mlat=51.5035&mlon=-0.1965#map=16/51.5035/-0.1965"
                  variant="outline"
                  size="sm"
                >
                  Open map
                </Button>
              </div>
            </div>
          </div>

          <LeadForm
            title="Send us a message"
            description="Buying, renting, selling or just curious — tell us the details and the right advisor will come back to you."
            defaultInterest={defaultInterest}
          />
        </div>
      </section>

      <section className="border-t border-line bg-sand/40">
        <div className="wrap py-14 sm:py-16">
          <h2 className="text-2xl sm:text-3xl">Three offices, one team.</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offices.map((office) => (
              <div key={office.name} className="rounded-3xl border border-line bg-cream p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brass">{office.name}</p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">{office.address}</p>
                <a
                  href={`tel:${office.phone.replace(/\s/g, '')}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] text-muted transition hover:text-forest"
                >
                  <Phone size={12} aria-hidden />
                  {office.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
