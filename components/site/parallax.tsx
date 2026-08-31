"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

/**
 * Scroll-linked parallax.
 *
 * One shared listener and one rAF write per frame for every registered layer,
 * rather than a listener per element — a dozen independent scroll handlers is
 * how a page starts to feel heavy.
 */

const layers = new Set<HTMLElement>();
let frame = 0;
let bound = false;

function paint() {
  frame = 0;
  const vh = window.innerHeight || 1;
  for (const el of layers) {
    const r = el.getBoundingClientRect();
    // -1 when the layer sits a viewport below centre, +1 when above.
    const progress = (vh / 2 - (r.top + r.height / 2)) / vh;
    el.style.setProperty("--sy", `${(progress * 52).toFixed(1)}px`);
  }
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(paint);
}

function bind() {
  if (bound) return;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  bound = true;
}

function unbind() {
  if (!bound || layers.size) return;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
  cancelAnimationFrame(frame);
  frame = 0;
  bound = false;
}

export function ScrollLayer({
  depth = 1,
  className = "",
  children,
}: {
  /** Negative values drift the other way, which is what separates the planes. */
  depth?: number;
  className?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    layers.add(el);
    bind();
    schedule();

    return () => {
      layers.delete(el);
      unbind();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`spar ${className}`}
      style={{ "--sd": depth } as CSSProperties & Record<string, number>}
    >
      {children}
    </div>
  );
}
