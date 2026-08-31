"use client";

import { useLanguage } from "@/contexts/language-context";
import { content } from "@/lib/content";
import HeroScene from "./hero-scene";
import { Asterisk, ButtonGhost, ButtonPrimary, Reveal } from "./ui";

export default function Hero() {
  const { language } = useLanguage();
  const c = content[language].hero;

  return (
    <section
      id="top"
      className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-ink"
    >
      {/* Mint pool, low on the leading side. */}
      <div className="pointer-events-none absolute -start-[14%] -bottom-[38%] z-0 h-[860px] w-[860px] rounded-full bg-[radial-gradient(circle,rgba(79,199,163,0.20),rgba(79,199,163,0)_62%)]" />
      {/* A second, cooler pool behind the illustration. */}
      <div className="pointer-events-none absolute -end-[10%] top-[-18%] z-0 h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(79,199,163,0.14),rgba(79,199,163,0)_60%)]" />

      <div className="relative z-[4] mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 items-center gap-y-12 px-5 pb-14 pt-28 sm:px-8 sm:pb-16 sm:pt-32 lg:grid-cols-[1.06fr_0.94fr] lg:gap-x-10 lg:px-14 xl:gap-x-4">
        <div>
          <Reveal delay={0}>
            <div className="eyebrow text-mint">
              <Asterisk size={13} />
              <span className="lat">{c.eyebrowLat}</span>
              <span className="hidden h-px w-14 bg-mint/45 sm:block" />
              <span className="hidden font-ar text-xs normal-case tracking-normal text-white/60 sm:block">
                {c.eyebrowAr}
              </span>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="display mt-8 max-w-[14ch] text-[clamp(2.6rem,7.4vw,5.6rem)] text-white">
              {c.titleA}
              <br />
              {c.titleB}
              <span className="text-mint">{c.titleAccent}</span>
              <span className="text-mint">.</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-7 max-w-[34rem] text-[17px] font-light leading-[1.85] text-white/70 sm:text-lg">
              {c.sub}
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonPrimary href="#plans">{c.cta1}</ButtonPrimary>
              <ButtonGhost href="#works">{c.cta2}</ButtonGhost>
            </div>
          </Reveal>
        </div>

        {/* Illustration — scales down rather than reflowing, so the composition
            never breaks apart on narrow screens. */}
        <Reveal delay={330} className="flex justify-center lg:justify-end">
          <div className="h-[268px] w-full sm:h-[336px] lg:h-[410px]">
            <div className="flex origin-top scale-[0.62] justify-center sm:scale-[0.78] lg:scale-100 lg:justify-end">
              <HeroScene scene={c.scene} />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Proof strip, pinned to the fold. */}
      <div className="relative z-[4] border-t border-mint/24 bg-ink/55 backdrop-blur-md">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-3">
          {c.stats.map((s) => (
            <div
              key={s.v}
              className="border-s border-mint/18 px-5 py-5 first:border-s-0 sm:px-8 sm:py-6 lg:border-s lg:px-10"
            >
              <div className="num text-2xl font-semibold leading-none text-mint sm:text-[32px]">
                {s.v}
              </div>
              <div className="mt-2 text-[12px] leading-snug text-white/60 sm:text-[13px]">
                {s.l}
              </div>
            </div>
          ))}

          <div className="col-span-2 border-t border-mint/18 px-5 py-5 sm:px-8 sm:py-6 lg:col-span-1 lg:border-s lg:border-t-0 lg:px-10">
            <div className="text-xl font-semibold leading-tight text-white sm:text-[26px]">
              {c.city}
            </div>
            <div className="mt-2 text-[12px] text-white/60 sm:text-[13px]">
              {c.country}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
