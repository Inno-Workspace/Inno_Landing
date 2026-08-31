"use client";

import { useLanguage } from "@/contexts/language-context";
import { CONTACT, content } from "@/lib/content";
import OfferScene from "./offer-scene";
import { Arrow, ButtonGhost, Eyebrow, Reveal } from "./ui";

export default function Offer() {
  const { language } = useLanguage();
  const c = content[language].offer;

  const wa = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    content[language].contact.waPrefill
  )}`;

  return (
    <section id="offer" className="grain relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -start-24 -top-24 z-0 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(79,199,163,0.13),rgba(79,199,163,0)_62%)]" />

      <div className="relative z-[2] mx-auto max-w-[1440px] px-5 pt-20 sm:px-8 sm:pt-24 lg:px-14 lg:pt-[88px]">
        <Reveal>
          <Eyebrow num={c.num} label={c.label} labelLat={c.labelLat} tone="dark" />
        </Reveal>

        <div className="mt-10 grid gap-10 lg:mt-11 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14">
          <div>
            <Reveal delay={60}>
              <h2 className="display max-w-[18ch] text-[clamp(2rem,5vw,3.6rem)] leading-[1.24]">
                {c.titleA}
                <br />
                {c.titleB}
                <span className="text-mint">{c.titleAccent}</span>
              </h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="mt-7 max-w-[30rem] text-base font-light leading-[1.9] text-white/62">
                {c.lede}
              </p>
            </Reveal>
          </div>

          {/* Scales rather than reflows, so the cascade never comes apart. */}
          <Reveal delay={220} className="flex justify-center lg:justify-end">
            <div className="h-[290px] w-full sm:h-[352px] lg:h-[430px] lg:w-[470px]">
              <div className="flex origin-top scale-[0.66] justify-center sm:scale-[0.8] lg:scale-100">
                <OfferScene scene={c.scene} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Editorial list — hover fills the row with mint. */}
      <ul className="relative z-[2] mx-auto mt-12 max-w-[1440px] px-5 sm:px-8 lg:mt-15 lg:px-14">
        {c.items.map((item, i) => (
          <Reveal as="li" key={item.t} delay={i * 60}>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className={`group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 rounded-[4px] border-t border-white/14 py-6 transition-[background-color,border-color,padding] duration-300 hover:border-transparent hover:bg-mint hover:px-5 sm:gap-x-7 lg:grid-cols-[58px_1fr_1.35fr_30px] lg:py-7 ${
                i === c.items.length - 1 ? "border-b border-b-white/14 hover:border-b-transparent" : ""
              }`}
            >
              <span className="num text-[13px] tracking-[0.14em] text-mint transition-colors duration-300 group-hover:text-ink/70">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="text-xl font-semibold leading-snug transition-colors duration-300 group-hover:text-ink sm:text-[25px]">
                {item.t}
              </span>

              <span className="col-span-2 col-start-2 row-start-2 text-[15px] font-light leading-[1.7] text-white/60 transition-colors duration-300 group-hover:text-ink/80 lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:text-base">
                {item.d}
              </span>

              <Arrow
                size={20}
                className="col-start-3 row-start-1 justify-self-end text-white/35 transition-colors duration-300 group-hover:text-ink lg:col-start-4"
              />
            </a>
          </Reveal>
        ))}
      </ul>

      <div className="relative z-[2] mx-auto flex max-w-[1440px] flex-col items-start gap-4 px-5 pb-20 pt-12 sm:flex-row sm:items-center sm:px-8 sm:pb-24 lg:px-14">
        <ButtonGhost href={wa} external arrow className="!border-mint/50 !text-mint hover:!bg-mint hover:!text-ink">
          {c.cta}
        </ButtonGhost>
        <span className="text-[13px] text-white/40">{c.ctaNote}</span>
      </div>
    </section>
  );
}
