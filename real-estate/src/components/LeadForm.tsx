import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { Check } from 'lucide-react'

import { brand } from '../data/site'
import { saveLead } from '../lib/leads'
import type { LeadInput } from '../lib/leads'
import { cx } from '../lib/utils'
import { Button, Field } from './ui'

type Interest = LeadInput['interest']

const interests: Interest[] = ['Buying', 'Renting', 'Selling', 'General enquiry']

type Values = {
  name: string
  email: string
  phone: string
  interest: Interest
  message: string
  consent: boolean
}

function blankValues(interest: Interest): Values {
  return { name: '', email: '', phone: '', interest, message: '', consent: false }
}

type LeadFormProps = {
  propertyRef?: string
  propertyTitle?: string
  defaultInterest?: Interest
  title?: string
  description?: string
  compact?: boolean
  className?: string
}

export function LeadForm({
  propertyRef,
  propertyTitle,
  defaultInterest = 'General enquiry',
  title = 'Arrange a viewing',
  description,
  compact = false,
  className,
}: LeadFormProps) {
  const uid = useId()
  const [values, setValues] = useState<Values>(() => blankValues(defaultInterest))
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({})
  const [sent, setSent] = useState<LeadInput | null>(null)

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((previous) => ({ ...previous, [key]: value }))
    setErrors((previous) => ({ ...previous, [key]: undefined }))
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const next: Partial<Record<keyof Values, string>> = {}
    if (values.name.trim().length < 2) next.name = 'Please tell us your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) next.email = 'Enter a valid email address.'
    if (values.phone.trim() && values.phone.replace(/\D/g, '').length < 7) next.phone = 'Enter a valid phone number.'
    if (!values.consent) next.consent = 'Please agree to be contacted about your enquiry.'

    setErrors(next)
    if (Object.keys(next).length > 0) return

    const lead = saveLead({
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      interest: values.interest,
      message: values.message.trim(),
      propertyRef,
      propertyTitle,
    })

    setSent(lead)
  }

  if (sent) {
    return (
      <div className={cx('rounded-3xl border border-line bg-white p-6 sm:p-8', className)}>
        <span className="grid h-11 w-11 place-items-center rounded-full bg-forest text-cream">
          <Check size={20} aria-hidden />
        </span>
        <h3 className="mt-4 text-2xl leading-tight">Thank you, {sent.name.split(' ')[0]}.</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">
          Your enquiry
          {propertyTitle ? ` about ${propertyTitle}` : ''}
          {propertyRef ? ` (ref ${propertyRef})` : ''} is with our team. We reply within one working day — usually much sooner.
        </p>
        <div className="mt-5 rounded-xl bg-sand/60 px-4 py-3 text-[12px] text-ink-soft">
          <p className="font-medium">{sent.interest}</p>
          <p className="mt-0.5 text-muted">
            {sent.email}
            {sent.phone ? ` · ${sent.phone}` : ''}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="mt-5"
          onClick={() => {
            setValues(blankValues(defaultInterest))
            setSent(null)
          }}
        >
          Send another enquiry
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className={cx('rounded-3xl border border-line bg-white p-6 sm:p-8', className)}>
      <h3 className="text-2xl leading-tight">{title}</h3>
      {description ? <p className="mt-2 text-[13px] leading-relaxed text-muted">{description}</p> : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Full name" htmlFor={`${uid}-name`} error={errors.name}>
          <input
            id={`${uid}-name`}
            name="name"
            autoComplete="name"
            placeholder="Jordan Ellis"
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            className={cx('field', errors.name && 'border-red-400 focus:border-red-400 focus:ring-red-100')}
          />
        </Field>

        <Field label="Email" htmlFor={`${uid}-email`} error={errors.email}>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            value={values.email}
            onChange={(event) => update('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            className={cx('field', errors.email && 'border-red-400 focus:border-red-400 focus:ring-red-100')}
          />
        </Field>

        <Field label="Phone (optional)" htmlFor={`${uid}-phone`} error={errors.phone}>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+44 7700 900123"
            value={values.phone}
            onChange={(event) => update('phone', event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            className={cx('field', errors.phone && 'border-red-400 focus:border-red-400 focus:ring-red-100')}
          />
        </Field>

        <Field label="I’m interested in" htmlFor={`${uid}-interest`}>
          <select
            id={`${uid}-interest`}
            name="interest"
            className="field select"
            value={values.interest}
            onChange={(event) => update('interest', event.target.value as Interest)}
          >
            {interests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message (optional)" htmlFor={`${uid}-message`} className="mt-4">
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={compact ? 3 : 4}
          placeholder={propertyTitle ? `I'd like to arrange a viewing of ${propertyTitle}.` : 'Tell us what you are looking for, and when.'}
          value={values.message}
          onChange={(event) => update('message', event.target.value)}
          className="field resize-none"
        />
      </Field>

      <div className="mt-4 flex items-start gap-2.5">
        <input
          id={`${uid}-consent`}
          name="consent"
          type="checkbox"
          checked={values.consent}
          onChange={(event) => update('consent', event.target.checked)}
          aria-invalid={Boolean(errors.consent)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-line accent-forest"
        />
        <label htmlFor={`${uid}-consent`} className="cursor-pointer text-[12px] leading-relaxed text-muted">
          I agree to be contacted by {brand.name} about my enquiry. We never share your details.
        </label>
      </div>
      {errors.consent ? <p className="mt-1.5 text-[12px] font-medium text-red-700">{errors.consent}</p> : null}

      <Button type="submit" className="mt-5 w-full">
        Send enquiry
      </Button>
      <p className="mt-3 text-center text-[11px] leading-relaxed text-muted">
        We reply within one working day. This demo stores enquiries in your browser.
      </p>
    </form>
  )
}
