"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, MessageCircle, ArrowUpRight } from "lucide-react";
import { nav, site, whatsappLink } from "@/lib/site";
import Magnetic from "./Magnetic";
import { Monogram } from "./ui";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 28);
      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("luxe:scroll-lock", { detail: open }));
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[90]">
      <div className="h-px w-full bg-white/5">
        <div
          ref={progressRef}
          className="h-px origin-left scale-x-0 bg-gradient-to-r from-tiffany via-tiffany-soft to-lavender"
        />
      </div>

      <div className="container-luxe">
        <div
          className={`mt-3 flex items-center justify-between gap-4 rounded-full border py-2.5 pl-3 pr-2.5 transition-all duration-500 ${
            scrolled
              ? "border-white/12 bg-obsidian/78 shadow-[0_20px_60px_-30px_rgba(10,186,181,0.5)] backdrop-blur-2xl"
              : "border-white/10 bg-obsidian/30 backdrop-blur-md"
          }`}
        >
          <a
            href="#top"
            className="group flex items-center gap-3"
            aria-label={`${site.name} — ${site.tagline}`}
          >
            <Monogram className="h-9 w-9 transition group-hover:border-tiffany group-hover:text-tiffany" />
            <span className="leading-none">
              <span className="block text-[10.5px] font-semibold tracking-[0.28em] text-pearl">
                {site.wordmark}
              </span>
              <span className="mt-1.5 block text-[7.5px] uppercase tracking-[0.3em] text-pearl/45">
                {site.tagline}
              </span>
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="link-underline text-[10.5px] font-medium uppercase tracking-[0.2em] text-pearl/65 transition hover:text-pearl"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink(
                "Hello Dr. Farah, I would like to arrange a private viewing in Dubai.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message on WhatsApp"
              className="hidden h-10 w-10 place-items-center rounded-full border border-white/15 text-pearl/80 transition hover:border-tiffany/60 hover:text-tiffany sm:grid"
            >
              <MessageCircle size={15} strokeWidth={1.8} />
            </a>

            <Magnetic strength={9} className="hidden md:inline-block">
              <a href="#contact" className="btn btn-tiffany !px-5 !py-3">
                Book Private Viewing
                <ArrowUpRight size={13} strokeWidth={2} />
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-pearl transition hover:border-tiffany/60 lg:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 -z-10 bg-obsidian/96 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="container-luxe flex h-full flex-col justify-between pb-10 pt-28">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {nav.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline justify-between border-b border-white/8 py-4 transition"
                style={{
                  transitionDelay: open ? `${80 + index * 45}ms` : "0ms",
                  transform: open ? "none" : "translateY(14px)",
                  opacity: open ? 1 : 0,
                }}
              >
                <span className="font-display text-4xl text-pearl">
                  {item.label}
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-tiffany/70">
                  0{index + 1}
                </span>
              </a>
            ))}
          </nav>

          <div className="space-y-5">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn btn-tiffany w-full"
            >
              Book Private Viewing
              <ArrowUpRight size={14} />
            </a>
            <a
              href={whatsappLink(
                "Hello Dr. Farah, I found you through your website and would like a consultation.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost w-full"
            >
              <MessageCircle size={14} />
              WhatsApp {site.whatsappDisplay}
            </a>
            <p className="text-center text-[10px] uppercase tracking-[0.28em] text-pearl/35">
              {site.instagramHandle} · Dubai
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
