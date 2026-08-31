"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* ------------------------------------------------------------------
   Asterisk — the eight-arm mark from the brand profile.
   Long vertical/horizontal arms, shorter diagonals.
   ------------------------------------------------------------------ */

/**
 * One closed path tracing the star's silhouette — 8 arms, flat tips, notched
 * between. Drawing it as four crossing rectangles (the obvious approach) looks
 * like scribble the moment you outline it, because you see every arm's hidden
 * edges. Orthogonal arms run to r=48, diagonals to r=40, matching the deck.
 */
const ASTERISK_PATH =
  "M98 43 L98 57 L66.9 57 L83.23 73.33 L73.33 83.23 L57 66.9 L57 98 " +
  "L43 98 L43 66.9 L26.67 83.23 L16.77 73.33 L33.1 57 L2 57 " +
  "L2 43 L33.1 43 L16.77 26.67 L26.67 16.77 L43 33.1 L43 2 " +
  "L57 2 L57 33.1 L73.33 16.77 L83.23 26.67 L66.9 43 Z";

export function Asterisk({
  size = 24,
  className = "",
  outline = false,
  strokeWidth = 2.5,
}: {
  size?: number;
  className?: string;
  outline?: boolean;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={className}
    >
      <path
        d={ASTERISK_PATH}
        fill={outline ? "none" : "currentColor"}
        stroke={outline ? "currentColor" : "none"}
        strokeWidth={outline ? strokeWidth : undefined}
        strokeLinejoin="miter"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------
   Wordmark — INN + a mint dot standing in for the final O,
   the way the deck's lockup resolves it.
   ------------------------------------------------------------------ */

export function Wordmark({ size = 22 }: { size?: number }) {
  const dot = Math.round(size * 0.68);
  return (
    <span
      className="mark lat inline-flex items-baseline font-bold text-white"
      style={{ fontSize: size, letterSpacing: "0.02em" }}
    >
      INN
      {/* The O is the mint dot; it takes a squash-and-stretch hop on hover. */}
      <span
        aria-hidden="true"
        className="mark-dot inline-block rounded-full bg-mint"
        style={{ width: dot, height: dot, marginInlineStart: 3 }}
      />
      <span className="sr-only">O</span>
    </span>
  );
}

/* ------------------------------------------------------------------
   Arrow — points along the reading direction, so it flips with RTL.
   ------------------------------------------------------------------ */

export function Arrow({
  size = 16,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="square"
      aria-hidden="true"
      className={`rtl:-scale-x-100 ${className}`}
    >
      <path d="M10 6l6 6-6 6" />
    </svg>
  );
}

export function ExternalArrow({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      aria-hidden="true"
    >
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

/* ------------------------------------------------------------------
   Eyebrow — "01 — SECTION ————— LATIN LABEL"
   ------------------------------------------------------------------ */

export function Eyebrow({
  num,
  label,
  labelLat,
  tone = "dark",
}: {
  num: string;
  label: string;
  labelLat: string;
  /** "dark" = on ink, "light" = on bone, "mint" = on the mint band */
  tone?: "dark" | "light" | "mint";
}) {
  const styles = {
    dark: { text: "text-white/55", accent: "text-mint", rule: "bg-white/16", tick: "bg-mint/50" },
    light: { text: "text-ink/55", accent: "text-mint-deep", rule: "bg-ink/14", tick: "bg-ink/30" },
    mint: { text: "text-ink/70", accent: "text-ink", rule: "bg-ink/25", tick: "bg-ink/40" },
  }[tone];

  return (
    <div className={`eyebrow ${styles.text}`}>
      <span className={`num ${styles.accent}`}>{num}</span>
      <span className={`h-px w-6 sm:w-[34px] ${styles.tick}`} />
      <span className="font-ar tracking-[0.16em] normal-case">{label}</span>
      <span className={`hidden h-px flex-1 sm:block ${styles.rule}`} />
      <span className="lat hidden sm:block">{labelLat}</span>
    </div>
  );
}

/* ------------------------------------------------------------------
   Reveal — a single orchestrated entrance per section.
   IntersectionObserver + CSS, so nothing animates off-screen.
   ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "h2" | "p" | "span";
}) {
  const ref = useRef<HTMLElement>(null);

  // Driven through the DOM rather than state: the entrance is presentation,
  // and re-rendering the subtree to add one class is wasted work.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add("in");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   Buttons — three levels, two grounds. Elevation is reserved for
   the primary action; everything else is a hairline.
   ------------------------------------------------------------------ */

type BtnProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
  arrow?: boolean;
};

const btnBase =
  "group inline-flex items-center justify-center gap-3 rounded-[5px] px-6 py-4 text-[15px] font-semibold transition-all duration-300 sm:text-base";

export function ButtonPrimary({
  children,
  href,
  onClick,
  className = "",
  external,
  arrow = true,
  tone = "mint",
}: BtnProps & { tone?: "mint" | "ink" }) {
  const skin =
    tone === "mint"
      ? "bg-mint text-ink shadow-[0_12px_34px_-14px_rgba(79,199,163,0.85)] hover:bg-white hover:shadow-[0_16px_40px_-12px_rgba(255,255,255,0.35)]"
      : "bg-ink text-white shadow-[0_12px_30px_-16px_rgba(7,36,54,0.9)] hover:bg-ink-2";

  const inner = (
    <>
      {children}
      {arrow && (
        <Arrow className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={`${btnBase} ${skin} ${className}`}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={`${btnBase} ${skin} ${className}`}>
      {inner}
    </button>
  );
}

export function ButtonGhost({
  children,
  href,
  onClick,
  className = "",
  external,
  arrow = false,
  tone = "onInk",
}: BtnProps & { tone?: "onInk" | "onLight" }) {
  const skin =
    tone === "onInk"
      ? "border border-white/28 text-white hover:border-mint hover:text-mint"
      : "border border-ink/28 text-ink hover:border-ink hover:bg-ink hover:text-white";

  const inner = (
    <>
      {children}
      {arrow && (
        <Arrow className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={`${btnBase} font-medium ${skin} ${className}`}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={`${btnBase} font-medium ${skin} ${className}`}>
      {inner}
    </button>
  );
}
