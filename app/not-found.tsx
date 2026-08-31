"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { Arrow, Asterisk, Wordmark } from "@/components/site/ui";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <main className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -end-24 -top-24 z-0 text-mint/12">
        <Asterisk size={420} className="spin-slow" />
      </div>

      <div className="relative z-[2] px-5 pt-10 sm:px-8 lg:px-14">
        <Link href="/" aria-label="INNO">
          <Wordmark size={21} />
        </Link>
      </div>

      <div className="relative z-[2] flex flex-1 flex-col justify-center px-5 pb-24 sm:px-8 lg:px-14">
        <div className="eyebrow text-mint">
          <Asterisk size={13} />
          <span className="num">ERROR 404</span>
        </div>

        <h1 className="display mt-8 text-[clamp(3.5rem,16vw,11rem)] leading-[0.9]">
          <span className="num">404</span>
        </h1>

        <h2 className="mt-6 text-2xl font-semibold sm:text-3xl">
          {t("notFound.title")}
        </h2>
        <p className="mt-3 max-w-[30rem] text-[17px] font-light leading-[1.85] text-white/60">
          {t("notFound.desc")}
        </p>

        <Link
          href="/"
          className="group mt-10 inline-flex w-fit items-center gap-3 rounded-[5px] bg-mint px-6 py-4 text-base font-semibold text-ink transition-colors hover:bg-white"
        >
          {t("notFound.cta")}
          <Arrow className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </Link>
      </div>
    </main>
  );
}
