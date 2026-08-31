"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";
import { CONTACT, content } from "@/lib/content";
import { Arrow, Asterisk, Reveal, Wordmark } from "@/components/site/ui";

function OrderForm() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const params = useSearchParams();

  const plan = params.get("plan") || "";
  const price = params.get("price") || "";
  const desc = params.get("desc") || "";
  const currency = content[language].plans.currency;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    business: "",
    hasIdentity: "",
    country: "",
    description: "",
  });

  const change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(
      "orderForm",
      JSON.stringify({ ...form, plan, price, desc })
    );
    router.push(
      `/order/payment?plan=${encodeURIComponent(plan)}&price=${encodeURIComponent(
        price
      )}&name=${encodeURIComponent(form.name)}&desc=${encodeURIComponent(desc)}`
    );
  };

  return (
    <main className="grain relative min-h-[100svh] overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -end-32 -top-32 z-0 text-mint/10">
        <Asterisk size={420} className="spin-slow" />
      </div>

      <div className="relative z-[2] mx-auto max-w-[880px] px-5 pb-20 pt-8 sm:px-8 sm:pt-10">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="INNO">
            <Wordmark size={20} />
          </Link>
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2.5 rounded-[4px] border border-white/22 px-4 py-2.5 text-sm text-white/70 transition-colors hover:border-mint hover:text-mint"
          >
            <Arrow
              size={15}
              className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1 rtl:rotate-0 rtl:group-hover:translate-x-1"
            />
            {t("order.back")}
          </button>
        </div>

        <Reveal>
          <div className="eyebrow mt-14 text-mint">
            <Asterisk size={12} />
            <span className="font-ar normal-case tracking-[0.16em]">
              {t("order.step")}
            </span>
            <span className="h-px flex-1 bg-white/14" />
          </div>
        </Reveal>

        <Reveal delay={70}>
          <h1 className="display mt-7 text-[clamp(2rem,6vw,3.4rem)]">
            {t("order.pageTitle")}
            <span className="text-mint">.</span>
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-10 overflow-hidden rounded-[6px] border border-white/14 bg-ink-2">
            {plan && (
              <div className="flex items-center justify-between gap-4 border-b border-white/12 bg-mint/6 px-6 py-5 sm:px-8">
                <div>
                  <div className="text-xs text-white/45">
                    {t("order.selectedPlan")}
                  </div>
                  <div className="mt-1 text-lg font-semibold sm:text-xl">
                    {plan}
                  </div>
                </div>
                {price && (
                  <div className="flex items-baseline gap-1.5">
                    <span className="num text-2xl font-semibold text-mint sm:text-[30px]">
                      {Number(price).toLocaleString("en-US")}
                    </span>
                    <span className="text-xs text-white/50">{currency}</span>
                  </div>
                )}
              </div>
            )}

            <form onSubmit={submit} className="space-y-6 px-6 py-8 sm:px-8 sm:py-10">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="field-label" htmlFor="name">
                    {t("order.name")}
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={change}
                    placeholder={t("order.namePlaceholder")}
                    className="field"
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor="phone">
                    {t("order.phone")}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    dir="ltr"
                    value={form.phone}
                    onChange={change}
                    placeholder={t("order.phonePlaceholder")}
                    className="field"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="field-label" htmlFor="email">
                    {t("order.email")}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    dir="ltr"
                    value={form.email}
                    onChange={change}
                    placeholder={t("order.emailPlaceholder")}
                    className="field"
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor="business">
                    {t("order.business")}
                  </label>
                  <input
                    id="business"
                    name="business"
                    value={form.business}
                    onChange={change}
                    placeholder={t("order.businessPlaceholder")}
                    className="field"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <span className="field-label">{t("order.hasIdentity")}</span>
                  <div className="flex gap-3">
                    {[
                      { value: "yes", label: t("order.identityYes") },
                      { value: "no", label: t("order.identityNo") },
                    ].map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        onClick={() =>
                          setForm((p) => ({ ...p, hasIdentity: o.value }))
                        }
                        className={`flex-1 rounded-[5px] border py-3.5 text-[15px] transition-colors ${
                          form.hasIdentity === o.value
                            ? "border-mint bg-mint text-ink font-semibold"
                            : "border-white/16 text-white/60 hover:border-white/32"
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="field-label" htmlFor="country">
                    {t("order.country")}
                  </label>
                  <input
                    id="country"
                    name="country"
                    value={form.country}
                    onChange={change}
                    placeholder={t("order.countryPlaceholder")}
                    className="field"
                  />
                </div>
              </div>

              <div>
                <label className="field-label" htmlFor="description">
                  {t("order.description")}
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={form.description}
                  onChange={change}
                  placeholder={t("order.descriptionPlaceholder")}
                  className="field resize-none"
                />
              </div>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-[5px] bg-mint py-4.5 text-base font-semibold text-ink transition-colors hover:bg-white"
              >
                {t("order.cta")}
                <Arrow className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </button>
            </form>

            <div className="border-t border-white/10 px-6 py-5 text-center sm:px-8">
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] text-white/45 transition-colors hover:text-mint"
              >
                {t("order.footer")}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div className="min-h-[100svh] bg-ink" />}>
      <OrderForm />
    </Suspense>
  );
}
