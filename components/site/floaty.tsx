"use client";

import {
  useEffect,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";

/**
 * Shared machinery for the illustrated scenes.
 *
 * Every floating piece needs two transforms at once — pointer parallax and an
 * idle float — and one element cannot run both on `transform`. So a piece is
 * always two nested layers: the outer one carries parallax scaled by its own
 * depth, the inner one carries the float.
 */

export type Vars = CSSProperties & Record<string, string | number>;

/**
 * Writes --px/--py on the scene root as the pointer moves across the section.
 * rAF-throttled, and skipped entirely on touch or with reduced motion.
 */
export function usePointerParallax(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    let tx = 0;
    let ty = 0;

    const apply = () => {
      frame = 0;
      el.style.setProperty("--px", `${tx}px`);
      el.style.setProperty("--py", `${ty}px`);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - (r.left + r.width / 2)) / r.width) * 26;
      ty = ((e.clientY - (r.top + r.height / 2)) / r.height) * 22;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const host = el.closest("section") ?? el;
    host.addEventListener("pointermove", onMove as EventListener);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove as EventListener);
      host.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [ref]);
}

export function Piece({
  children,
  x,
  y,
  w,
  depth,
  dur,
  delay = 0,
  amp = -12,
  rot = [0, 0],
  z = 2,
}: {
  children: ReactNode;
  x: number;
  y: number;
  w?: number;
  /** Parallax strength. Nearer things move more. */
  depth: number;
  dur: number;
  delay?: number;
  amp?: number;
  /** Rotation at rest and at the top of the float, in degrees. */
  rot?: [number, number];
  z?: number;
}) {
  return (
    <div
      className="scene-par absolute"
      style={{ left: x, top: y, width: w, zIndex: z, "--d": depth } as Vars}
    >
      <div
        className="scene-float"
        style={
          {
            "--dur": `${dur}s`,
            "--delay": `${delay}s`,
            "--amp": `${amp}px`,
            "--r0": `${rot[0]}deg`,
            "--r1": `${rot[1]}deg`,
          } as Vars
        }
      >
        {children}
      </div>
    </div>
  );
}
