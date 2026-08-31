"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import {
  CLIENT_LOGOS,
  TECH_LOGOS,
  content,
  type LogoMark,
  type WorkContent,
} from "@/lib/content";
import { Eyebrow, ExternalArrow, Reveal } from "./ui";

function Card({
  work,
  featured = false,
  dark = false,
  badge,
  priority = false,
}: {
  work: WorkContent;
  featured?: boolean;
  dark?: boolean;
  badge?: string;
  priority?: boolean;
}) {
  const Wrapper = work.link ? "a" : "div";

  return (
    <Wrapper
      {...(work.link
        ? { href: work.link, target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={`group flex h-full flex-col overflow-hidden rounded-[5px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        work.link ? "hover:-translate-y-1" : ""
      } ${dark ? "bg-ink text-white" : "border border-ink/14 bg-white"}`}
    >
      <div
        className={`relative overflow-hidden bg-ink-2 ${
          featured ? "h-[220px] sm:h-[300px] lg:h-[352px]" : "h-[180px]"
        }`}
      >
        <Image
          src={work.image}
          alt={work.title}
          fill
          priority={priority}
          sizes={featured ? "(max-width: 1024px) 100vw, 62vw" : "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 250px"}
          className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
        {badge && (
          <div className="absolute start-4 top-4 rounded-[3px] bg-mint px-3 py-1.5 text-xs font-semibold text-ink">
            {badge}
          </div>
        )}
      </div>

      <div
        className={`flex flex-1 flex-col p-5 sm:p-6 ${
          dark ? "border-t border-white/14" : "border-t border-ink/14"
        } ${featured ? "lg:flex-row lg:items-center lg:justify-between lg:gap-6" : ""}`}
      >
        <div>
          <h3 className={`font-semibold ${featured ? "text-[19px] sm:text-[23px]" : "text-[17px]"}`}>
            {work.title}
          </h3>
          <p
            className={`mt-1.5 leading-[1.7] ${
              dark ? "text-white/60" : "text-ash"
            } ${featured ? "max-w-[36rem] text-sm sm:text-[15px]" : "text-[13px]"}`}
          >
            {work.desc}
          </p>
        </div>

        {work.link ? (
          <div
            className={`lat mt-3.5 flex items-center gap-2 whitespace-nowrap text-[11px] tracking-[0.1em] transition-transform duration-300 group-hover:translate-x-0.5 ${
              dark ? "text-mint" : "text-mint-deep"
            } ${featured ? "lg:mt-0 lg:text-xs" : ""}`}
          >
            {work.link.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
            <ExternalArrow size={featured ? 15 : 13} />
          </div>
        ) : (
          <div className="num mt-3.5 text-[11px] tracking-[0.1em] text-ash">
            {work.note}
          </div>
        )}
      </div>
    </Wrapper>
  );
}

/**
 * The logo index.
 *
 * Not a marquee. An endlessly scrolling logo strip is the most generic pattern
 * on the web, and it also forces every mark to share one size — which is why
 * the Arabic client wordmarks were disappearing next to the big Latin tech
 * ones. This is a hairline spec sheet instead: fixed cells, each logo at its
 * own tuned height, revealing in a stagger when the band scrolls into view.
 *
 * Every mark is knocked back to a white silhouette so the wall reads as one
 * system, and only the cell you point at returns to its real colours.
 *
 * Cells carry `border-t` and `border-s` only, so a short last row simply ends
 * the way a table's does rather than leaving a rule hanging in mid-air.
 */
function LogoIndex({
  label,
  labelLat,
  logos,
}: {
  label: string;
  labelLat: string;
  logos: LogoMark[];
}) {
  return (
    <div>
      <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-5 sm:px-8 lg:px-14">
        <span className="font-ar text-xs tracking-[0.16em] text-white/45">
          {label}
        </span>
        <span className="h-px flex-1 bg-white/12" />
        <span className="lat text-[10.5px] tracking-[0.22em] text-white/30">
          {labelLat}
        </span>
        <span className="num text-[10.5px] tracking-[0.16em] text-mint">
          {String(logos.length).padStart(2, "0")}
        </span>
      </div>

      <div className="mx-auto mt-4 max-w-[1440px] border-b border-white/10 px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
          {logos.map((l, i) => (
            <Reveal key={l.name} delay={i * 45}>
              <div className="group flex h-[86px] items-center justify-center border-s border-t border-white/10 px-3 transition-colors duration-300 hover:bg-mint/[0.07]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={l.image}
                  alt={l.name}
                  width={Math.round((l.w / l.h) * l.size)}
                  height={l.size}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  className="block max-w-full opacity-45 [filter:brightness(0)_invert(1)] transition-[opacity,filter] duration-300 group-hover:opacity-100 group-hover:[filter:none]"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Works() {
  const { language } = useLanguage();
  const c = content[language].works;
  const [feature, second, ...rest] = c.items;

  return (
    <section id="works" className="grain grain-soft relative overflow-hidden bg-bone text-ink">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 sm:px-8 sm:pt-24 lg:px-14 lg:pt-[88px]">
        <Reveal>
          <Eyebrow num={c.num} label={c.label} labelLat={c.labelLat} tone="light" />
        </Reveal>

        <div className="mt-9 flex flex-col gap-5 lg:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <Reveal delay={60}>
            <h2 className="display max-w-[20ch] text-[clamp(2rem,5vw,3.6rem)] leading-[1.2] text-ink">
              {c.titleA}
              <span className="text-mint-deep">{c.titleAccent}</span>
              {c.titleB}
            </h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="max-w-[22rem] text-[15px] font-light leading-[1.85] text-ash lg:mb-2">
              {c.lede}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[1.85fr_1fr] lg:gap-7">
          <Reveal delay={80} className="h-full">
            <Card work={feature} featured dark={false} badge={c.featured} priority />
          </Reveal>
          <Reveal delay={160} className="h-full">
            <Card work={second} featured dark />
          </Reveal>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:mt-7 lg:grid-cols-5 lg:gap-6">
          {rest.map((w, i) => (
            <Reveal key={w.title} delay={i * 70} className="h-full">
              <Card work={w} />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="h-20 lg:h-24" />

      {/* Clients and stack, on ink — every logo file is white-on-transparent,
          so a light band would swallow them. */}
      <div className="grain relative bg-ink py-10 text-white">
        <div className="relative z-[2] flex flex-col gap-8">
          <LogoIndex
            label={c.clientsLabel}
            labelLat={c.clientsLabelLat}
            logos={CLIENT_LOGOS}
          />
          <LogoIndex
            label={c.stackLabel}
            labelLat={c.stackLabelLat}
            logos={TECH_LOGOS}
          />
        </div>
      </div>
    </section>
  );
}
