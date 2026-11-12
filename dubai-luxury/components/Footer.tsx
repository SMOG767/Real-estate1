import { ArrowUp, Mail, MessageCircle } from "lucide-react";
import { categories } from "@/lib/properties";
import { nav, site } from "@/lib/site";
import { InstagramMark, Monogram } from "./ui";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-obsidian text-pearl">
      <div className="container-luxe py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-3">
              <Monogram className="h-10 w-10" />
              <span>
                <span className="block text-[11px] font-semibold tracking-[0.28em]">
                  {site.wordmark}
                </span>
                <span className="mt-1.5 block text-[7.5px] uppercase tracking-[0.3em] text-pearl/40">
                  {site.tagline}
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-[12px] leading-relaxed text-pearl/40">
              Private advisory on waterfront villas, sky penthouses and high-ROI
              off-plan residences across Dubai.
            </p>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-tiffany-soft transition hover:text-pearl"
            >
              <InstagramMark size={13} />
              {site.instagramHandle}
            </a>
          </div>

          <nav aria-label="Footer sections">
            <p className="text-[8.5px] uppercase tracking-[0.28em] text-pearl/30">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[12px] text-pearl/60 transition hover:text-tiffany-soft"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[8.5px] uppercase tracking-[0.28em] text-pearl/30">
              Portfolio
            </p>
            <ul className="mt-4 space-y-2.5">
              {categories
                .filter((category) => category.id !== "all")
                .map((category) => (
                  <li key={category.id}>
                    <a
                      href="#showcase"
                      className="text-[12px] text-pearl/60 transition hover:text-tiffany-soft"
                    >
                      {category.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <p className="text-[8.5px] uppercase tracking-[0.28em] text-pearl/30">
              Contact
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`https://wa.me/${site.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[12px] text-pearl/60 transition hover:text-tiffany-soft"
                >
                  <MessageCircle size={13} />
                  {site.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 text-[12px] text-pearl/60 transition hover:text-tiffany-soft"
                >
                  <Mail size={13} />
                  {site.email}
                </a>
              </li>
              <li className="text-[12px] leading-relaxed text-pearl/40">
                {site.location}
                <br />
                By appointment only
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-white/8 bg-white/[0.03] p-4">
          <p className="text-[9px] leading-relaxed text-pearl/30">
            <span className="font-semibold uppercase tracking-[0.18em] text-pearl/45">
              Regulatory note ·{" "}
            </span>
            {site.rera} Property particulars are prepared in good faith and are
            indicative only; they do not form part of an offer or contract.
            Buyers should complete independent legal, financial and technical
            due diligence.
          </p>
        </div>

        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-4 border-t border-white/8 pt-6 sm:flex-row sm:items-center">
          <p className="text-[9px] uppercase tracking-[0.18em] text-pearl/25">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] uppercase tracking-[0.18em] text-pearl/40 transition hover:text-tiffany-soft"
            >
              Instagram
            </a>
            <a
              href="#contact"
              className="text-[9px] uppercase tracking-[0.18em] text-pearl/40 transition hover:text-tiffany-soft"
            >
              Private viewing
            </a>
            <a
              href="#top"
              aria-label="Back to top"
              className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-pearl/60 transition hover:border-tiffany/50 hover:text-tiffany"
            >
              <ArrowUp size={13} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
