import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'

import { cx } from '../lib/utils'

export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const count = images.length
  const current = images[Math.min(index, count - 1)]

  function go(step: number) {
    setIndex((value) => (value + step + count) % count)
  }

  useEffect(() => {
    if (!open) return

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
      if (event.key === 'ArrowRight') go(1)
      if (event.key === 'ArrowLeft') go(-1)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open, count])

  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl bg-sand">
        <img
          src={current}
          alt={`${title} — photograph ${index + 1} of ${count}`}
          className="aspect-[16/10] w-full object-cover"
        />

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-ink/70 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-cream backdrop-blur transition hover:bg-ink"
        >
          <Expand size={13} aria-hidden />
          All {count} photos
        </button>

        <div className="absolute inset-y-0 left-0 hidden items-center pl-3 sm:flex">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="grid h-10 w-10 place-items-center rounded-full bg-cream/85 text-ink backdrop-blur transition hover:bg-cream"
          >
            <ChevronLeft size={18} aria-hidden />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 hidden items-center pr-3 sm:flex">
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className="grid h-10 w-10 place-items-center rounded-full bg-cream/85 text-ink backdrop-blur transition hover:bg-cream"
          >
            <ChevronRight size={18} aria-hidden />
          </button>
        </div>

        <span className="absolute bottom-3 left-3 rounded-full bg-ink/70 px-3 py-1 text-[11px] font-medium text-cream backdrop-blur">
          {index + 1} / {count}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
        {images.map((image, position) => (
          <button
            key={image}
            type="button"
            onClick={() => setIndex(position)}
            aria-label={`Show photograph ${position + 1}`}
            aria-current={position === index}
            className={cx(
              'overflow-hidden rounded-xl border-2 transition',
              position === index ? 'border-forest' : 'border-transparent opacity-70 hover:opacity-100',
            )}
          >
            <img src={image} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </button>
        ))}
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photographs`}
          className="fixed inset-0 z-50 flex flex-col bg-ink/95 p-4 sm:p-6"
        >
          <div className="flex items-center justify-between text-cream">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/70">{title}</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close gallery"
              className="grid h-10 w-10 place-items-center rounded-full border border-cream/25 text-cream transition hover:bg-cream/10"
            >
              <X size={18} aria-hidden />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center py-4">
            <img src={current} alt={`${title} — photograph ${index + 1} of ${count}`} className="max-h-full max-w-full rounded-xl object-contain" />
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute left-0 grid h-11 w-11 place-items-center rounded-full bg-cream/90 text-ink transition hover:bg-cream"
            >
              <ChevronLeft size={20} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute right-0 grid h-11 w-11 place-items-center rounded-full bg-cream/90 text-ink transition hover:bg-cream"
            >
              <ChevronRight size={20} aria-hidden />
            </button>
          </div>

          <p className="pb-2 text-center text-[12px] text-cream/60">
            {index + 1} of {count}
          </p>
        </div>
      ) : null}
    </div>
  )
}
