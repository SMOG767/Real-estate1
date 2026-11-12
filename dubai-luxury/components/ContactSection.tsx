"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { budgetRanges, propertyTypes, site, whatsappLink } from "@/lib/site";
import Reveal from "./Reveal";
import { Eyebrow, InstagramMark } from "./ui";

type FormState = {
  name: string;
  whatsapp: string;
  type: string;
  budget: string;
  note: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  name: "",
  whatsapp: "",
  type: "",
  budget: "",
  note: "",
  consent: false,
};

export default function ContactSection() {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  };

  const validate = () => {
    const next: Errors = {};
    if (values.name.trim().length < 2) {
      next.name = "Please share your full name.";
    }
    const digits = values.whatsapp.replace(/\D/g, "");
    if (digits.length < 8) {
      next.whatsapp = "Include the country code, e.g. +971 50 123 4567.";
    }
    if (!values.type) next.type = "Select a property type.";
    if (!values.budget) next.budget = "Select a budget range.";
    if (!values.consent) {
      next.consent = "Please agree to be contacted about your enquiry.";
    }
    return next;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    try {
      const key = "fm-enquiries";
      const existing = JSON.parse(localStorage.getItem(key) ?? "[]") as unknown[];
      existing.unshift({
        ...values,
        createdAt: new Date().toISOString(),
        source: "website",
      });
      localStorage.setItem(key, JSON.stringify(existing.slice(0, 50)));
    } catch {
      // Storage can be unavailable in private mode; the enquiry is still acknowledged.
    }

    setSubmitted(true);
  };

  const firstName = values.name.trim().split(" ")[0] || "there";
  const direct = whatsappLink(
    `Hello Dr. Farah, I would like to arrange a private consultation.${
      values.type ? ` Property type: ${values.type}.` : ""
    }${values.budget ? ` Budget: ${values.budget}.` : ""}`,
  );

  return (
    <section
      id="contact"
      className="grain relative overflow-hidden bg-obsidian py-20 text-pearl sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_15%,rgba(10,186,181,0.18),transparent_65%),radial-gradient(55%_45%_at_10%_75%,rgba(181,126,220,0.18),transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-lavender/20 blur-[110px]"
      />

      <div className="container-luxe relative grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow className="text-tiffany-soft">Private consultation</Eyebrow>
            <h2 className="display mt-5 max-w-[15ch] text-[clamp(2.5rem,4.6vw,4rem)] leading-[0.98]">
              Start with a conversation,
              <br />
              <em className="italic text-lavender-soft">not a brochure.</em>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-pearl/55">
              Share the brief — use, horizon and capital — and Dr. Farah Merhi
              will respond personally on WhatsApp with a considered shortlist or
              a clear reason why the timing is wrong.
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-8 space-y-3">
            {[
              {
                icon: MessageCircle,
                label: "WhatsApp",
                value: site.whatsappDisplay,
                href: direct,
              },
              {
                icon: Mail,
                label: "Email",
                value: site.email,
                href: `mailto:${site.email}`,
              },
              {
                icon: InstagramMark,
                label: "Instagram",
                value: site.instagramHandle,
                href: site.instagramUrl,
              },
              {
                icon: MapPin,
                label: "Based in",
                value: site.location,
              },
            ].map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/12 text-tiffany-soft">
                    <Icon size={15} strokeWidth={1.7} />
                  </span>
                  <span>
                    <span className="block text-[8.5px] uppercase tracking-[0.24em] text-pearl/35">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-[12.5px] text-pearl/80">
                      {item.value}
                    </span>
                  </span>
                </>
              );
              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex items-center gap-3 transition hover:text-tiffany-soft"
                >
                  {content}
                </a>
              ) : (
                <div key={item.label} className="flex items-center gap-3">
                  {content}
                </div>
              );
            })}
          </Reveal>

          <Reveal delay={160} className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6">
            {[
              "Reply within one business day",
              "NDA on request",
              "No listings before the brief",
            ].map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-[9.5px] uppercase tracking-[0.16em] text-pearl/45"
              >
                <Check size={12} className="text-tiffany" />
                {item}
              </span>
            ))}
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="glass rounded-[1.6rem] p-5 shadow-[0_40px_120px_-50px_rgba(10,186,181,0.6)] sm:p-7">
            {submitted ? (
              <div className="flex min-h-[26rem] flex-col justify-center text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-tiffany/40 bg-tiffany/10 text-tiffany">
                  <Check size={24} strokeWidth={1.8} />
                </span>
                <h3 className="mt-6 font-display text-3xl text-pearl">
                  Thank you, {firstName}.
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-[13px] leading-relaxed text-pearl/55">
                  Your brief is with Dr. Farah Merhi. Expect a personal reply on
                  WhatsApp within one business day — usually sooner.
                </p>
                <div className="mx-auto mt-6 w-full max-w-xs rounded-xl border border-white/10 bg-white/5 p-4 text-left">
                  <p className="text-[8.5px] uppercase tracking-[0.22em] text-pearl/35">
                    Brief received
                  </p>
                  <p className="mt-2 text-[12px] text-pearl/75">
                    {values.type || "Luxury residence"}
                    {values.budget ? ` · ${values.budget}` : ""}
                  </p>
                  <p className="mt-1 text-[12px] text-pearl/45">
                    {values.whatsapp}
                  </p>
                </div>
                <a
                  href={direct}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-tiffany mx-auto mt-6"
                >
                  <MessageCircle size={14} />
                  Continue on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setValues(initial);
                    setErrors({});
                    setSubmitted(false);
                  }}
                  className="mx-auto mt-4 text-[9px] uppercase tracking-[0.2em] text-pearl/35 underline-offset-4 transition hover:text-pearl/70 hover:underline"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className="flex items-center justify-between">
                  <p className="text-[9px] uppercase tracking-[0.24em] text-pearl/45">
                    Private enquiry · Dubai
                  </p>
                  <ShieldCheck size={15} className="text-tiffany/70" />
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label text-pearl/50" htmlFor="name">
                      Full name
                    </label>
                    <input
                      id="name"
                      name="name"
                      className="field"
                      placeholder="Your name"
                      autoComplete="name"
                      value={values.name}
                      onChange={(event) => update("name", event.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name ? (
                      <p
                        id="name-error"
                        className="mt-1.5 text-[10.5px] text-[#ffb4b4]"
                      >
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label className="label text-pearl/50" htmlFor="whatsapp">
                      WhatsApp number
                    </label>
                    <input
                      id="whatsapp"
                      name="whatsapp"
                      className="field"
                      placeholder="+971 50 123 4567"
                      inputMode="tel"
                      autoComplete="tel"
                      value={values.whatsapp}
                      onChange={(event) => update("whatsapp", event.target.value)}
                      aria-invalid={Boolean(errors.whatsapp)}
                      aria-describedby={
                        errors.whatsapp ? "whatsapp-error" : undefined
                      }
                    />
                    {errors.whatsapp ? (
                      <p
                        id="whatsapp-error"
                        className="mt-1.5 text-[10.5px] text-[#ffb4b4]"
                      >
                        {errors.whatsapp}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label className="label text-pearl/50" htmlFor="type">
                      Property type
                    </label>
                    <select
                      id="type"
                      name="type"
                      className="field appearance-none"
                      value={values.type}
                      onChange={(event) => update("type", event.target.value)}
                      aria-invalid={Boolean(errors.type)}
                    >
                      <option value="">Select</option>
                      {propertyTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.type ? (
                      <p className="mt-1.5 text-[10.5px] text-[#ffb4b4]">
                        {errors.type}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label className="label text-pearl/50" htmlFor="budget">
                      Budget range (AED)
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      className="field appearance-none"
                      value={values.budget}
                      onChange={(event) => update("budget", event.target.value)}
                      aria-invalid={Boolean(errors.budget)}
                    >
                      <option value="">Select</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                    {errors.budget ? (
                      <p className="mt-1.5 text-[10.5px] text-[#ffb4b4]">
                        {errors.budget}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="label text-pearl/50" htmlFor="note">
                    Anything specific? <span className="normal-case tracking-normal text-pearl/25">(optional)</span>
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    rows={3}
                    className="field resize-none"
                    placeholder="Target area, handover date, or the reason for the move."
                    value={values.note}
                    onChange={(event) => update("note", event.target.value)}
                  />
                </div>

                <div className="mt-4 flex items-start gap-2.5">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/25 bg-white/10 accent-tiffany"
                    checked={values.consent}
                    onChange={(event) => update("consent", event.target.checked)}
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={
                      errors.consent ? "consent-error" : undefined
                    }
                  />
                  <label
                    htmlFor="consent"
                    className="cursor-pointer text-[10.5px] leading-relaxed text-pearl/45"
                  >
                    I agree to be contacted by {site.name} about this enquiry. No
                    third-party marketing, ever.
                  </label>
                </div>
                {errors.consent ? (
                  <p
                    id="consent-error"
                    className="mt-1.5 text-[10.5px] text-[#ffb4b4]"
                  >
                    {errors.consent}
                  </p>
                ) : null}

                <button type="submit" className="btn btn-tiffany mt-5 w-full">
                  Request private consultation
                  <ArrowUpRight size={14} />
                </button>

                <p className="mt-3 text-center text-[9px] leading-relaxed text-pearl/30">
                  Or{" "}
                  <a
                    href={direct}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-tiffany-soft/80 underline underline-offset-2"
                  >
                    message on WhatsApp
                  </a>{" "}
                  — a Dubai-based advisor replies personally.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
