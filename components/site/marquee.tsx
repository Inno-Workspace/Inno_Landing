"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * A marquee that measures itself.
 *
 * The usual approach — duplicate the content twice and translate -50% — breaks
 * the moment one copy is narrower than the viewport: you get a visible gap, and
 * the animation speed swings wildly with how much content you happen to have.
 *
 * This measures one set, repeats it enough times to cover twice the viewport,
 * and translates by exactly one set width (-100% / sets), which is seamless for
 * any content at any width. Duration is derived from the measured width, so
 * every row scrolls at the same pixels-per-second no matter what is in it.
 */
export default function Marquee({
  children,
  reverse = false,
  /** Pixels per second — the actual perceived speed. */
  speed = 38,
  gap = 56,
  className = "",
  itemClassName = "",
}: {
  /** One set of content. It gets repeated; write it once. */
  children: ReactNode;
  reverse?: boolean;
  speed?: number;
  gap?: number;
  className?: string;
  itemClassName?: string;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const firstSet = useRef<HTMLDivElement>(null);
  const [sets, setSets] = useState(4);
  const [duration, setDuration] = useState(30);

  useEffect(() => {
    const vp = viewport.current;
    const one = firstSet.current;
    if (!vp || !one) return;

    const recalc = () => {
      const setWidth = one.getBoundingClientRect().width;
      if (setWidth < 1) return;
      setSets(Math.max(2, Math.ceil((vp.clientWidth * 2) / setWidth)));
      setDuration(setWidth / speed);
    };

    recalc();
    const ro = new ResizeObserver(recalc);
    ro.observe(vp);
    ro.observe(one);
    return () => ro.disconnect();
  }, [speed]);

  return (
    <div
      ref={viewport}
      dir="ltr"
      className={`marq ${className}`}
      style={
        {
          "--sets": sets,
          "--dur": `${duration}s`,
        } as CSSProperties & Record<string, string | number>
      }
    >
      <div className={`marq-track ${reverse ? "marq-rev" : ""}`}>
        {Array.from({ length: sets }, (_, i) => (
          <div
            key={i}
            ref={i === 0 ? firstSet : undefined}
            // Only the first set is read out; the rest are visual repeats.
            aria-hidden={i > 0}
            className={`marq-set ${itemClassName}`}
            style={{ gap, paddingInlineEnd: gap }}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
