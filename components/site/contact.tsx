"use client";

import { useLanguage } from "@/contexts/language-context";
import { CONTACT, content } from "@/lib/content";
import { Arrow, Eyebrow, Reveal } from "./ui";

function Row({
  icon,
  label,
  value,
  href,
  variant = "lat",
  last,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  variant?: "lat" | "num" | "ar";
  last?: boolean;
}) {
  const body = (
    <>
      <span className="shrink-0 text-mint">{icon}</span>
      <span className="flex-1">
        <span className="block text-xs text-white/45">{label}</span>
        {/* The block keeps the page's direction so the value aligns to the same
            edge as its label; only the value itself is isolated as an LTR run.
            Putting .lat/.num on the block instead flips its alignment, which is
            what threw the email and phone over to the far side of the card. */}
        <span className="mt-1 block text-[16px] font-medium sm:text-[17px]">
          <span
            className={
              variant === "num" ? "num" : variant === "lat" ? "lat" : ""
            }
          >
            {value}
          </span>
        </span>
      </span>
      {href && (
        <Arrow
          size={15}
          className="text-white/25 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-mint rtl:group-hover:-translate-x-1"
        />
      )}
    </>
  );

  const cls = `group flex items-center gap-4 py-4 ${
    last ? "" : "border-b border-white/12"
  }`;

  return href ? (
    <a href={href} className={cls}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

export default function Contact() {
  const { language } = useLanguage();
  const c = content[language].contact;

  const wa = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    c.waPrefill
  )}`;

  return (
    <section id="contact" className="grain relative overflow-hidden bg-ink text-white">
      {/* A pool rather than a half-cropped asterisk — the same fix the pricing
          and services bands got. */}
      <div className="pointer-events-none absolute -end-32 -top-24 z-0 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(79,199,163,0.15),rgba(79,199,163,0)_62%)]" />

      <div className="relative z-[2] mx-auto max-w-[1440px] px-5 pb-20 pt-20 sm:px-8 sm:pb-24 sm:pt-24 lg:px-14 lg:pt-[88px]">
        <Reveal>
          <Eyebrow num={c.num} label={c.label} labelLat={c.labelLat} tone="dark" />
        </Reveal>

        {/* Headline and lede sit across from each other, the way every other
            section header on the page does. Stacked, they left the whole
            opposite half of the band empty. */}
        <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <Reveal delay={60}>
            <h2 className="display max-w-[16ch] text-[clamp(2.2rem,5.6vw,4.5rem)] leading-[1.14]">
              {c.titleA}
              <span className="text-mint">{c.titleAccent}</span>
              <span className="text-mint">.</span>
            </h2>
          </Reveal>

          <Reveal delay={130}>
            <p className="max-w-[26rem] text-[17px] font-light leading-[1.85] text-white/65 lg:mb-2">
              {c.lede}
            </p>
          </Reveal>
        </div>

        {/* items-start rather than stretch: the WhatsApp card sizes to its own
            content instead of being padded out to match the taller details
            card, which is where the dead space came from. */}
        <div className="mt-12 grid gap-6 lg:mt-13 lg:grid-cols-[1.06fr_0.94fr] lg:items-start lg:gap-7">
          <Reveal delay={80}>
            {/* The bright card is the page's primary action, so it is the one
                light surface on an ink band — mint stays the highlighter on
                the badge and the button, not the whole field. */}
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-[6px] bg-bone p-7 text-ink transition-shadow duration-300 hover:shadow-[0_28px_60px_-28px_rgba(0,0,0,0.75)] sm:p-8"
            >
              <div className="flex items-center gap-3.5">
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mint text-ink">
                  {/* Rings pushing outward — the card is about reaching us. */}
                  {[0, 1.05, 2.1].map((d) => (
                    <span
                      key={d}
                      className="ripple pointer-events-none absolute inset-0 rounded-full border border-mint"
                      style={{ animationDelay: `${d}s` }}
                    />
                  ))}
                  <svg className="relative" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.5-5.9c-.2-.1-1.4-.7-1.7-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5 0a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2a.4.4 0 0 0 0-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.1 11.1 0 0 0 4.3 3.8c1.6.6 2.2.7 3 .6a2.5 2.5 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2z" />
                  </svg>
                </span>
                <span className="lat text-[11px] tracking-[0.22em] text-mint-deep">
                  {c.waLabel}
                </span>
              </div>

              <div className="display mt-6 text-[28px] leading-tight sm:text-[34px]">
                {c.waTitle}
              </div>
              <p className="mt-3 max-w-[26rem] text-[15px] leading-[1.85] text-ash sm:text-base">
                {c.waDesc}
              </p>

              <div className="mt-7 flex items-center justify-between gap-4 rounded-[5px] bg-mint px-6 py-4 text-base font-semibold text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-white">
                {c.waCta}
                <Arrow
                  size={17}
                  className="transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-mint rtl:group-hover:-translate-x-1"
                />
              </div>
            </a>
          </Reveal>

          <Reveal delay={160}>
            <div className="flex flex-col rounded-[6px] border border-white/16 bg-white/[0.03] p-7 sm:p-8">
              <div className="lat mb-4 text-[11px] tracking-[0.22em] text-mint">
                {c.detailsLabel}
              </div>

              <Row
                label={c.emailLabel}
                value={CONTACT.email}
                href={`mailto:${CONTACT.email}`}
                icon={
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M2 7l10 6 10-6" />
                  </svg>
                }
              />
              <Row
                label={c.phoneLabel}
                value={CONTACT.phone}
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                variant="num"
                icon={
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                    <path d="M4 4h4l2 5-2.5 1.5a12 12 0 0 0 6 6L15 14l5 2v4a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1z" />
                  </svg>
                }
              />
              <Row
                label={c.addressLabel}
                value={c.address}
                variant="ar"
                icon={
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.6" />
                  </svg>
                }
              />
              <Row
                last
                label={c.siteLabel}
                value={CONTACT.site}
                icon={
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 3v18M3.6 9h16.8M3.6 15h16.8" />
                  </svg>
                }
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
