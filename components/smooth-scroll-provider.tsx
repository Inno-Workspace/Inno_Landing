"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProviderProps {
  children: ReactNode;
}

const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Expose lenis instance globally for other components
    window.lenis = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    gsap.ticker.lagSmoothing(0);

    // Ensure body can scroll properly in RTL
    const updateScroll = () => {
      const isRTL = document.documentElement.dir === "rtl";
      if (isRTL) {
        document.body.style.height = "auto";
        document.documentElement.style.height = "auto";
        // Force reflow for RTL
        document.body.style.direction = "rtl";
        document.documentElement.style.direction = "rtl";
      } else {
        document.body.style.direction = "ltr";
        document.documentElement.style.direction = "ltr";
      }
    };

    updateScroll();
    const observer = new MutationObserver(updateScroll);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
    });

    return () => {
      lenis.destroy();
      observer.disconnect();
      delete window.lenis;
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;
