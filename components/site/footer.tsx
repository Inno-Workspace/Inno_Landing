"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/language-context";
import { CONTACT, content } from "@/lib/content";
import { Wordmark } from "./ui";

/**
 * Drops a ball into the footer the first time it comes into view. It bounces
 * itself out and settles into the O of INNO, which is missing until it lands.
 *
 * The landing spot is measured from the real dot rather than hard-coded, so it
 * stays exact at any width and in either language — and the hiding class is
 * added here, on mount, rather than rendered on the server, so the O is simply
 * present for anyone without JS.
 */
function useFooterBall(
  footerRef: React.RefObject<HTMLElement | null>,
  ballRef: React.RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const footer = footerRef.current;
    const ball = ballRef.current;
    if (!footer || !ball) return;

    const dot = footer.querySelector<HTMLElement>(".mark-dot");
    if (!dot) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    footer.classList.add("ball-pending");

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();

        const f = footer.getBoundingClientRect();
        const d = dot.getBoundingClientRect();
        const top = d.top - f.top;

        // Physical `left`, not `inset-inline-start`: getBoundingClientRect
        // reports a physical offset, and the logical property resolves to
        // `right` in Arabic — which threw the ball to the opposite corner.
        ball.style.left = `${d.left - f.left}px`;
        ball.style.top = `${top}px`;
        ball.style.width = `${d.width}px`;
        ball.style.height = `${d.height}px`;
        // Bounce near the bottom of the footer, measured down from the O.
        ball.style.setProperty("--floor", `${Math.max(120, f.height - 72 - top)}px`);
        // Start big, end exactly dot-sized.
        ball.style.setProperty("--s0", `${72 / d.width}`);

        ball.classList.add("run");
      },
      { threshold: 0.3 }
    );

    io.observe(footer);

    const onEnd = () => {
      footer.classList.remove("ball-pending");
      ball.classList.add("gone");
    };
    ball.addEventListener("animationend", onEnd);

    return () => {
      io.disconnect();
      ball.removeEventListener("animationend", onEnd);
    };
  }, [footerRef, ballRef]);
}

const socials = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/inno-ksa",
    path: "M20.4 3H3.6a.6.6 0 0 0-.6.6v16.8c0 .3.3.6.6.6h16.8c.3 0 .6-.3.6-.6V3.6a.6.6 0 0 0-.6-.6zM8.3 18.3H5.5V9.7h2.8v8.6zM6.9 8.5a1.6 1.6 0 1 1 0-3.3 1.6 1.6 0 0 1 0 3.3zm11.4 9.8h-2.8V14c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.4H9.7V9.7h2.7v1.2a3 3 0 0 1 2.7-1.5c2.8 0 3.3 1.9 3.3 4.3v4.6z",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/inno.ksa/",
    path: "M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.9c-.1 3.2-1.6 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-3.3-.2-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.9s0-3.5.1-4.8C2.4 4 3.9 2.4 7.1 2.3c1.3-.1 1.7-.1 4.9-.1zm0 5.1a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@inno.ksa",
    path: "M16.6 2h-3v13.1a2.5 2.5 0 1 1-2-2.4V9.6a5.6 5.6 0 1 0 5 5.5V8.7a6.6 6.6 0 0 0 4 1.3V6.9a3.7 3.7 0 0 1-3-1.4 3.8 3.8 0 0 1-1-3.5z",
  },
];

export default function Footer() {
  const { language } = useLanguage();
  const c = content[language].footer;
  const nav = content[language].nav;

  const wa = `https://wa.me/${CONTACT.whatsapp}`;

  const footerRef = useRef<HTMLElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  useFooterBall(footerRef, ballRef);

  return (
    /* Not overflow-hidden: the ball has to fall in from above the footer. The
       oversized wordmark gets its own clipping layer instead. */
    <footer
      ref={footerRef}
      className="relative border-t border-mint/24 bg-ink-deep"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="lat absolute -bottom-10 -start-3 select-none text-[clamp(6rem,17vw,13.25rem)] font-bold leading-[0.8] tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_rgba(79,199,163,0.2)] sm:-bottom-16">
          INNO
        </div>
      </div>

      <div ref={ballRef} aria-hidden="true" className="ball" />

      <div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 pb-8 pt-11 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:gap-10 lg:px-14">
        <div>
          <Wordmark size={22} />
          <p className="mt-4 max-w-[16rem] text-[14.5px] leading-[1.9] text-white/55">
            {c.tagline}
          </p>
        </div>

        <div>
          <div className="lat mb-3.5 text-[11px] tracking-[0.22em] text-mint">
            {c.siteHead}
          </div>
          <ul>
            {nav.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block text-[14.5px] leading-[2.1] text-white/62 transition-colors hover:text-mint"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="lat mb-3.5 text-[11px] tracking-[0.22em] text-mint">
            {c.servicesHead}
          </div>
          <ul>
            {c.services.map((s) => (
              <li key={s}>
                <a
                  href="#offer"
                  className="block text-[14.5px] leading-[2.1] text-white/62 transition-colors hover:text-mint"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="lat mb-3.5 text-[11px] tracking-[0.22em] text-mint">
            {c.contactHead}
          </div>
          <ul>
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="block text-[14.5px] leading-[2.1] text-white/62 transition-colors hover:text-mint"
              >
                {/* Isolate the LTR run, but leave the link block aligned to the
                    column's own edge like every other footer item. */}
                <span className="lat">{CONTACT.email}</span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                className="block text-[14.5px] leading-[2.1] text-white/62 transition-colors hover:text-mint"
              >
                <span className="num">{CONTACT.phone}</span>
              </a>
            </li>
            <li>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[14.5px] leading-[2.1] text-white/62 transition-colors hover:text-mint"
              >
                {c.whatsapp}
              </a>
            </li>
            <li className="text-[14.5px] leading-[2.1] text-white/62">
              {content[language].contact.address}
            </li>
            <li>
              <a
                href="/files/INNO-Brand-Profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[14.5px] leading-[2.1] text-white/62 transition-colors hover:text-mint"
              >
                {c.brandProfile}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-[1440px] flex-col items-start gap-4 border-t border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-14">
        <div className="text-[13px] text-white/40">
          © <span className="num">2026</span> {c.copyright}
        </div>
        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="text-white/45 transition-colors hover:text-mint"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={s.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
