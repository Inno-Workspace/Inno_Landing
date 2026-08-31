"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { CONTACT, content, type PlanContent } from "@/lib/content";
import PlansAside from "./plans-aside";
import { Arrow, Asterisk, Eyebrow, Reveal } from "./ui";

function Tick() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4FC7A3"
      strokeWidth={3}
      className="mt-1 shrink-0"
      aria-hidden="true"
    >
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}

function PlanCard({
  plan,
  cta,
  currency,
  popular,
}: {
  plan: PlanContent;
  cta: string;
  currency: string;
  popular: string;
}) {
  const orderHref = `/order?plan=${encodeURIComponent(
    plan.id
  )}&price=${encodeURIComponent(plan.price)}&desc=${encodeURIComponent(plan.desc)}`;

  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-[6px] bg-ink p-8 text-white sm:p-8 ${
        plan.featured
          ? "shadow-[0_26px_60px_-24px_rgba(7,36,54,0.55)] ring-1 ring-mint/45 lg:-mt-6"
          : ""
      }`}
    >
      {plan.featured && <div className="absolute inset-x-0 top-0 h-1 bg-mint" />}

      <div className="flex items-center justify-between gap-3">
        <div className="lat text-[11px] tracking-[0.22em] text-mint">
          {plan.kicker}
        </div>
        {plan.featured && (
          <div className="rounded-[3px] bg-mint px-2.5 py-1 text-[11px] font-bold text-ink">
            {popular}
          </div>
        )}
      </div>

      <h3 className="mt-3.5 text-2xl font-semibold sm:text-[26px]">{plan.title}</h3>
      <p className="mt-2 min-h-[3rem] text-sm leading-[1.7] text-white/60">
        {plan.desc}
      </p>

      <div
        className={`mt-6 flex items-baseline gap-2 border-t pt-5 ${
          plan.featured ? "border-mint/32" : "border-white/14"
        }`}
      >
        <span
          className={`num text-[44px] font-semibold leading-none tracking-[-0.03em] sm:text-[52px] ${
            plan.featured ? "text-mint" : ""
          }`}
        >
          {Number(plan.price).toLocaleString("en-US")}
        </span>
        <span className="text-[15px] text-white/55">{currency}</span>
      </div>

      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[14.5px] text-white/82">
            <Tick />
            <span className="leading-snug">{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href={orderHref}
        className={`group mt-8 flex items-center justify-center gap-2.5 rounded-[5px] py-4 text-[15px] transition-colors duration-300 ${
          plan.featured
            ? "bg-mint font-semibold text-ink hover:bg-white"
            : "border border-white/28 font-medium text-white hover:border-mint hover:text-mint"
        }`}
      >
        {cta}
        <Arrow
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
        />
      </Link>
    </div>
  );
}

export default function Plans() {
  const { language } = useLanguage();
  const c = content[language].plans;

  const wa = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    content[language].contact.waPrefill
  )}`;

  return (
    <section
      id="plans"
      className="grain grain-soft relative overflow-hidden bg-mint-pale text-ink"
    >
      {/* A wide mint slab anchors the band to the accent without flooding it. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-1.5 bg-mint" />
      {/* A soft pool instead of the oversized cut-off marks that used to sit
          in these corners — depth without a shape fighting the cards. */}
      <div className="pointer-events-none absolute -start-40 bottom-0 z-0 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(79,199,163,0.22),rgba(79,199,163,0)_64%)]" />

      <div className="relative z-[2] mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-[88px]">
        <Reveal>
          <Eyebrow num={c.num} label={c.label} labelLat={c.labelLat} tone="light" />
        </Reveal>

        <div className="mt-9 flex flex-col gap-5 lg:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <Reveal delay={60}>
            {/* No character cap here: this headline is written to sit on one
                line, and 16ch was breaking it well before the column ran out. */}
            <h2 className="display text-[clamp(2rem,4.8vw,3.5rem)] leading-[1.2]">
              {c.title}
            </h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="max-w-[22rem] text-[15px] leading-[1.85] text-ash lg:mb-2">
              {c.lede}
            </p>
          </Reveal>
        </div>

        {/* The cards narrow at xl so the margins open up, and the two
            constellations live in those margins — flanking the cards rather
            than sitting above or below them. */}
        <div className="relative mt-12 lg:mt-14">
          {/* Reveal sits *inside* the positioned wrapper on purpose: it animates
              `transform`, which would otherwise wipe out the centring translate
              the moment the entrance finished. */}
          <div className="pointer-events-none absolute -start-12 top-1/2 hidden -translate-y-1/2 min-[1400px]:block">
            <Reveal delay={260}>
              <PlansAside side="start" aside={c.aside} />
            </Reveal>
          </div>
          <div className="pointer-events-none absolute -end-12 top-1/2 hidden -translate-y-1/2 min-[1400px]:block">
            <Reveal delay={320}>
              <PlansAside side="end" aside={c.aside} />
            </Reveal>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 lg:gap-7 xl:mx-auto xl:max-w-[1020px]">
            {c.items.map((p, i) => (
              <Reveal key={p.id} delay={i * 90} className="h-full">
                <PlanCard
                  plan={p}
                  cta={c.cta}
                  currency={c.currency}
                  popular={c.popular}
                />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={140}>
          <div className="mt-12 flex flex-col gap-6 rounded-[6px] border border-ink/18 bg-white/55 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 lg:mt-14 xl:mx-auto xl:max-w-[1020px]">
            <div className="flex items-start gap-5 sm:items-center">
              <Asterisk size={26} className="mt-1 shrink-0 text-ink sm:mt-0" />
              <div>
                <div className="text-xl font-semibold sm:text-[21px]">
                  {c.custom.title}
                </div>
                <p className="mt-1.5 text-[14.5px] leading-[1.7] text-ash">
                  {c.custom.desc}
                </p>
              </div>
            </div>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex shrink-0 items-center justify-center gap-2.5 rounded-[5px] bg-ink px-6 py-4 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-ink-2"
            >
              {c.custom.cta}
              <Arrow
                size={16}
                className="text-mint transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
