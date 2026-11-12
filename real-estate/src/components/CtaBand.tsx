import { Phone } from 'lucide-react'

import { brand } from '../data/site'
import { Button } from './ui'

export function CtaBand({
  eyebrow = 'Private viewings',
  title = 'Come and see the house. Then decide.',
  description = 'Viewings seven days a week, including evenings. No pressure, and no follow-up calls you did not ask for.',
}: {
  eyebrow?: string
  title?: string
  description?: string
}) {
  return (
    <section className="wrap pb-4">
      <div className="overflow-hidden rounded-[2.5rem] bg-forest px-6 py-14 text-cream sm:px-12 lg:px-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow text-brass-soft">{eyebrow}</p>
            <h2 className="mt-3 text-3xl leading-[1.05] text-cream sm:text-4xl lg:text-[42px]">{title}</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-cream/70">{description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to="/contact" variant="light">
              Book a viewing
            </Button>
            <Button
              href={brand.phoneHref}
              variant="ghost"
              className="border border-cream/25 text-cream hover:border-cream/50 hover:bg-cream/10"
            >
              <Phone size={15} aria-hidden />
              Call the office
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
