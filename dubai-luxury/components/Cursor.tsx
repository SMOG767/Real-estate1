"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!dot || !glow) return;

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let dotX = pointerX;
    let dotY = pointerY;
    let glowX = pointerX;
    let glowY = pointerY;
    let scale = 1;
    let glowScale = 1;
    let visible = false;
    let frame = 0;

    const onMove = (event: MouseEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        glow.style.opacity = "1";
      }
      const target = event.target as HTMLElement | null;
      const interactive = Boolean(
        target?.closest("a, button, input, select, textarea, [data-cursor]"),
      );
      scale = interactive ? 2.6 : 1;
      glowScale = interactive ? 1.35 : 1;
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      glow.style.opacity = "0";
    };

    const render = () => {
      dotX += (pointerX - dotX) * 0.35;
      dotY += (pointerY - dotY) * 0.35;
      glowX += (pointerX - glowX) * 0.09;
      glowY += (pointerY - glowY) * 0.09;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%) scale(${scale})`;
      glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%) scale(${glowScale})`;
      frame = window.requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none hidden md:block">
      <div
        ref={glowRef}
        className="fixed left-0 top-0 z-[118] h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle, rgba(10,186,181,0.30), rgba(181,126,220,0.16) 48%, transparent 72%)",
        }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 z-[119] h-1.5 w-1.5 rounded-full bg-tiffany opacity-0 shadow-[0_0_14px_rgba(10,186,181,0.9)] transition-[opacity,transform] duration-200"
      />
    </div>
  );
}
