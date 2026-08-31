"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import { content } from "@/lib/content";
import { ScrollLayer } from "./parallax";
import { Asterisk, Eyebrow, Reveal } from "./ui";

export default function About() {
  const { language } = useLanguage();
  const c = content[language].about;

  return (
    <section id="about" className="grain grain-soft relative overflow-hidden bg-bone text-ink">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 sm:px-8 sm:pt-24 lg:px-14 lg:pt-[88px]">
        <Reveal>
          <Eyebrow num={c.num} label={c.label} labelLat={c.labelLat} tone="light" />
        </Reveal>

        <div className="mt-10 grid gap-12 lg:mt-13 lg:grid-cols-[1fr_480px] lg:gap-18">
          <div>
            <Reveal delay={60}>
              <h2 className="display max-w-[16ch] text-[clamp(2rem,5.2vw,3.9rem)] leading-[1.22] text-ink">
                {c.titleA}
                <br />
                {c.titleB}{" "}
                <span className="relative inline-block">
                  {c.titleC}
                  <Asterisk
                    size={28}
                    className="absolute -top-3 -end-9 text-mint"
                  />
                </span>
                {language === "ar" ? " ؟" : "?"}
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-9 max-w-[35rem] text-[17px] font-light leading-[2] text-ash sm:text-lg">
                <strong className="font-semibold text-ink">{c.bodyLead}</strong>{" "}
                {c.body}
              </p>
            </Reveal>

            <Reveal delay={220}>
              <blockquote className="mt-9 max-w-[35rem] border-s-[3px] border-mint ps-6">
                <p className="text-xl font-medium leading-[1.7] text-ink sm:text-2xl">
                  {c.pull}
                </p>
              </blockquote>
            </Reveal>
          </div>

          {/* Offset blocks + a greyscale insert — the deck's layering, flattened
              for the web. The three planes drift against each other as you
              scroll, which is what turns a flat collage into depth. */}
          <Reveal delay={200}>
            <div className="relative mx-auto h-[420px] w-full max-w-[480px] sm:h-[500px]">
              <ScrollLayer
                depth={-0.9}
                className="absolute -top-5 end-0 h-[52%] w-[62%] bg-mint"
              />

              <ScrollLayer
                depth={0.35}
                className="absolute start-0 top-8 h-[88%] w-[86%] overflow-hidden rounded-[4px]"
              >
                <Image
                  src="/brand/team.jpg"
                  alt={language === "ar" ? "فريق إينو" : "The INNO team"}
                  fill
                  sizes="(max-width: 1024px) 90vw, 430px"
                  className="object-cover object-[38%_30%] grayscale contrast-[1.04]"
                />
                <div className="absolute inset-0 bg-ink mix-blend-color opacity-55" />
              </ScrollLayer>

              <ScrollLayer
                depth={1.15}
                className="absolute -bottom-4 -start-2 max-w-[19rem] rounded-[4px] bg-ink p-6 text-white sm:-start-8"
              >
                <div className="lat text-[11px] tracking-[0.22em] text-mint">
                  {c.sloganLabel}
                </div>
                <p className="mt-2.5 text-[17px] font-medium leading-[1.6] sm:text-[19px]">
                  {c.slogan}
                  <span className="text-mint">.</span>
                </p>
              </ScrollLayer>

              <ScrollLayer
                depth={1.6}
                className="absolute -end-6 bottom-16 text-mint"
              >
                <Asterisk size={54} className="spin-slow" />
              </ScrollLayer>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Brand direction, as four hairline-divided cells. */}
      <div className="mt-20 grid border-t border-ink/14 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
        {c.pillars.map((p, i) => (
          <Reveal
            key={p.t}
            delay={i * 80}
            className="border-b border-ink/14 px-5 py-8 sm:border-b-0 sm:border-s sm:px-8 sm:py-9 lg:px-10 lg:pb-11"
          >
            <div className="num text-[11px] tracking-[0.2em] text-mint-deep">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="mt-3.5 text-lg font-semibold text-ink sm:text-[19px]">
              {p.t}
            </div>
            <p className="mt-2 text-sm leading-[1.75] text-ash">{p.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
