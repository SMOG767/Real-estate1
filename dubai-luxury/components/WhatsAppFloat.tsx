import { MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(
        "Hello Dr. Farah, I would like to arrange a private consultation about a Dubai residence.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Dr. Farah Merhi on WhatsApp"
      className="group fixed bottom-5 right-5 z-[95] flex items-center gap-3 rounded-full border border-white/15 bg-obsidian/80 p-2 pr-4 text-pearl shadow-[0_18px_50px_-18px_rgba(10,186,181,0.55)] backdrop-blur-xl transition hover:border-tiffany/60 hover:bg-obsidian/90 sm:bottom-7 sm:right-7"
    >
      <span className="relative grid h-10 w-10 place-items-center rounded-full bg-tiffany text-[#04110f]">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full border border-tiffany/60"
          style={{ animation: "pulse-ring 2.8s ease-out infinite" }}
        />
        <MessageCircle size={17} strokeWidth={1.8} />
      </span>
      <span className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] sm:block">
        WhatsApp
      </span>
      <span className="sr-only">{site.whatsappDisplay}</span>
    </a>
  );
}
