"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      anchors: true,
    });

    const update = () => ScrollTrigger.update();
    lenis.on("scroll", update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    const onLock = (event: Event) => {
      const locked = (event as CustomEvent<boolean>).detail;
      if (locked) lenis.stop();
      else lenis.start();
    };
    window.addEventListener("luxe:scroll-lock", onLock);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      window.clearTimeout(refresh);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("luxe:scroll-lock", onLock);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
