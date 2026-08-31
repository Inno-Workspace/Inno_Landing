"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

/**
 * Lenis on pointer devices only — native scroll is smoother and cheaper on
 * touch. Also owns in-page anchor navigation, since Lenis and the browser's
 * own smooth scroll fight each other otherwise.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let lenis: Lenis | undefined;
    let raf = 0;

    if (!reduced && !coarse) {
      lenis = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });
      window.lenis = lenis;

      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!anchor) return;

      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      const offset = -68; // fixed header
      if (lenis) {
        lenis.scrollTo(target, { offset, duration: 1.1 });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
      }
      history.replaceState(null, "", `#${id}`);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis?.destroy();
      delete window.lenis;
    };
  }, []);

  return <>{children}</>;
}
