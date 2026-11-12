import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router'
import { Star } from 'lucide-react'

import { cx } from '../lib/utils'

type ButtonVariant = 'primary' | 'brass' | 'outline' | 'light' | 'ghost'

type ButtonProps = {
  children: ReactNode
  variant?: ButtonVariant
  size?: 'sm' | 'md'
  to?: string
  href?: string
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const variants: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  brass: 'btn-brass',
  outline: 'btn-outline',
  light: 'btn-light',
  ghost: 'btn-ghost',
}

/** A single button primitive that renders a router link, an anchor or a button. */
export function Button({ children, variant = 'primary', size = 'md', to, href, className, ...rest }: ButtonProps) {
  const classes = cx('btn', variants[variant], size === 'sm' && 'btn-sm', className)

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}

type BadgeTone = 'light' | 'forest' | 'brass' | 'dark'

const badgeTones: Record<BadgeTone, string> = {
  light: 'bg-cream/95 text-ink',
  forest: 'bg-forest/90 text-cream',
  brass: 'bg-brass/95 text-ink',
  dark: 'bg-ink/80 text-cream',
}

export function Badge({ children, tone = 'light', className }: { children: ReactNode; tone?: BadgeTone; className?: string }) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur',
        badgeTones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  description?: string
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={cx('flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div className="max-w-2xl">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="mt-3 text-3xl leading-[1.08] sm:text-4xl lg:text-[44px]">{title}</h2>
        {description ? <p className="mt-4 text-[15px] leading-relaxed text-muted">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}

export function Field({
  label,
  htmlFor,
  error,
  hint,
  className,
  children,
}: {
  label: string
  htmlFor?: string
  error?: string
  hint?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cx('min-w-0', className)}>
      <label htmlFor={htmlFor} className="label">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-[12px] font-medium text-red-700">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-[12px] text-muted">{hint}</p>
      ) : null}
    </div>
  )
}

export function Stars({ count = 5, className }: { count?: number; className?: string }) {
  return (
    <div className={cx('flex items-center gap-0.5', className)} aria-label={`Rated ${count} out of 5`}>
      {Array.from({ length: count }).map((_, index) => (
        <Star key={index} size={13} className="fill-brass text-brass" aria-hidden />
      ))}
    </div>
  )
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: ReactNode
  description?: string
  children?: ReactNode
}) {
  return (
    <section className="border-b border-line bg-sand/60">
      <div className="wrap py-14 sm:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl leading-[1.04] sm:text-5xl lg:text-6xl">{title}</h1>
        {description ? <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-soft/80">{description}</p> : null}
        {children}
      </div>
    </section>
  )
}
