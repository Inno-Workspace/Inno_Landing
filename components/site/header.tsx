"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { content } from "@/lib/content";
import { Arrow, Wordmark } from "./ui";

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const c = content[language].nav;

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section the reader is in, so the nav says where they are.
  useEffect(() => {
    const ids = c.links.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [c.links]);

  // Lock the page while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled
            ? "border-b border-mint/24 bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 sm:h-[76px] sm:px-8 lg:px-14">
          <div className="flex items-center gap-10 lg:gap-11">
            <a href="#top" aria-label="INNO" className="shrink-0">
              <Wordmark size={21} />
            </a>

            <nav className="hidden items-center gap-7 lg:flex">
              {c.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={`relative py-1 text-[15px] font-medium transition-colors ${
                    active === l.href
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-0.5 inset-x-0 h-px origin-center bg-mint transition-transform duration-300 ${
                      active === l.href ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="num rounded-[3px] border border-white/22 px-2.5 py-2 text-[11px] tracking-[0.2em] text-white/60 transition-colors hover:border-mint hover:text-mint"
              aria-label={language === "ar" ? "Switch to English" : "التبديل إلى العربية"}
            >
              {language === "ar" ? "EN" : "AR"}
            </button>

            <a
              href="#plans"
              className="group hidden items-center gap-2.5 rounded-[4px] bg-mint px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white sm:inline-flex"
            >
              {c.cta}
              <Arrow
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              />
            </a>

            <button
              onClick={() => setOpen(true)}
              aria-label={c.menu}
              className="flex h-11 w-11 items-center justify-center rounded-[4px] border border-white/22 text-white transition-colors hover:border-mint lg:hidden"
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <path d="M0 1h18M0 7h18M0 13h11" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink-deep/80 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`grain absolute inset-y-0 end-0 flex w-[86%] max-w-sm flex-col border-s border-mint/24 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
          }`}
        >
          <div className="flex h-[68px] items-center justify-between border-b border-white/10 px-5">
            <Wordmark size={20} />
            <button
              onClick={() => setOpen(false)}
              aria-label={c.close}
              className="flex h-11 w-11 items-center justify-center rounded-[4px] border border-white/22 text-white"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path d="M1 1l14 14M15 1L1 15" />
              </svg>
            </button>
          </div>

          <nav className="relative z-[4] flex flex-col px-5 py-2">
            {c.links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-white/10 py-5 text-xl font-semibold text-white"
              >
                {l.label}
                <span className="num text-[11px] text-mint">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </a>
            ))}
          </nav>

          <div className="relative z-[4] mt-auto p-5">
            <a
              href="#plans"
              onClick={() => setOpen(false)}
              className="flex h-[52px] items-center justify-center gap-2.5 rounded-[5px] bg-mint text-base font-semibold text-ink"
            >
              {c.cta}
              <Arrow size={16} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
