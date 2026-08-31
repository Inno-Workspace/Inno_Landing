"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";
import { content } from "@/lib/content";
import { Arrow, Asterisk, Reveal, Wordmark } from "@/components/site/ui";

function Card({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex h-[38px] items-center justify-center rounded-[4px] border border-white/12 bg-white/5 px-3.5">
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}

function PaymentContent() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const params = useSearchParams();

  const plan = params.get("plan") || "";
  const price = params.get("price") || "";
  const name = params.get("name") || "";
  const desc = params.get("desc") || "";

  const currency = content[language].plans.currency;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const greeting = t("payment.greeting").replace("{name}", name);

  const pay = async () => {
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      let customerName = name;
      let customerEmail = "";
      let customerPhone = "";
      try {
        const saved = JSON.parse(localStorage.getItem("orderForm") || "{}");
        customerName = saved.name || name;
        customerEmail = saved.email || "";
        customerPhone = saved.phone || "";
      } catch {}

      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart_amount: Number(price),
          cart_description: `${plan}${desc ? " - " + desc : ""}`,
          cart_id: `order_${Date.now()}`,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          language,
        }),
      });

      const data = await res.json();

      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        setError(t("error.desc"));
        setLoading(false);
      }
    } catch {
      setError(t("error.desc"));
      setLoading(false);
    }
  };

  return (
    <main className="grain relative min-h-[100svh] overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -start-32 top-40 z-0 text-mint/10">
        <Asterisk size={420} outline strokeWidth={1.4} />
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
            {t("payment.back")}
          </button>
        </div>

        <Reveal>
          <div className="eyebrow mt-14 text-mint">
            <Asterisk size={12} />
            <span className="font-ar normal-case tracking-[0.16em]">
              {t("payment.step")}
            </span>
            <span className="h-px flex-1 bg-white/14" />
          </div>
        </Reveal>

        <Reveal delay={70}>
          <h1 className="display mt-7 max-w-[20ch] text-[clamp(1.8rem,5vw,2.9rem)] leading-[1.24]">
            {greeting}
          </h1>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_340px]">
          <Reveal delay={120} className="h-full">
            <div className="flex h-full flex-col rounded-[6px] border border-white/14 bg-ink-2 p-6 sm:p-8">
              <div className="lat text-[11px] tracking-[0.22em] text-mint">
                {t("payment.payWith")}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Card label="Visa">
                  <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-hidden="true">
                    <rect width="48" height="32" rx="4" fill="#1A1F71" />
                    <path d="M19.5 21H17L18.8 11H21.3L19.5 21Z" fill="white" />
                    <path d="M28.5 11.2C28 11 27.2 10.8 26.2 10.8C23.7 10.8 22 12.1 22 13.9C22 15.2 23.2 15.9 24.1 16.4C25 16.9 25.3 17.2 25.3 17.6C25.3 18.2 24.6 18.5 23.9 18.5C22.9 18.5 22.4 18.4 21.6 18L21.3 17.9L21 19.7C21.6 20 22.6 20.2 23.7 20.2C26.4 20.2 28 18.9 28 17C28 16 27.4 15.2 26 14.5C25.2 14.1 24.7 13.8 24.7 13.3C24.7 12.9 25.2 12.5 26.1 12.5C26.9 12.5 27.5 12.7 27.9 12.9L28.2 13L28.5 11.2Z" fill="white" />
                    <path d="M32.8 11H30.8C30.2 11 29.8 11.2 29.5 11.8L26 21H28.7L29.2 19.5H32.5L32.8 21H35.2L33.1 11H32.8ZM30 17.7L31.2 14.2L31.9 17.7H30Z" fill="white" />
                    <path d="M16.5 11L14 17.9L13.7 16.5L12.8 11.8C12.7 11.2 12.2 11 11.7 11H8.1L8 11.2C8.9 11.4 9.8 11.8 10.5 12.2L12.8 21H15.5L19.2 11H16.5Z" fill="white" />
                  </svg>
                </Card>
                <Card label="Mastercard">
                  <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-hidden="true">
                    <rect width="48" height="32" rx="4" fill="#252525" />
                    <circle cx="19" cy="16" r="8" fill="#EB001B" />
                    <circle cx="29" cy="16" r="8" fill="#F79E1B" />
                    <path d="M24 10.3C25.8 11.7 27 13.7 27 16C27 18.3 25.8 20.3 24 21.7C22.2 20.3 21 18.3 21 16C21 13.7 22.2 11.7 24 10.3Z" fill="#FF5F00" />
                  </svg>
                </Card>
                <Card label="mada">
                  <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-hidden="true">
                    <rect width="48" height="32" rx="4" fill="#003B2A" />
                    <text x="24" y="19" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">mada</text>
                  </svg>
                </Card>
                <Card label="Apple Pay">
                  <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-hidden="true">
                    <rect width="48" height="32" rx="4" fill="#000" />
                    <path d="M15.2 10.8C15.7 10.2 16 9.4 15.9 8.6C15.2 8.7 14.3 9.1 13.8 9.7C13.3 10.2 12.9 11.1 13 11.8C13.8 11.9 14.6 11.4 15.2 10.8Z" fill="white" />
                    <path d="M15.9 12C14.8 11.9 13.8 12.6 13.3 12.6C12.7 12.6 11.9 12 11 12C9.8 12 8.7 12.7 8.1 13.8C6.8 16 7.8 19.2 9 21C9.6 21.9 10.3 22.9 11.2 22.9C12 22.9 12.4 22.4 13.4 22.4C14.5 22.4 14.8 22.9 15.7 22.9C16.6 22.9 17.2 22 17.8 21.1C18.5 20 18.8 19 18.8 19C18.8 19 17.3 18.3 17.3 16.6C17.3 15.1 18.5 14.4 18.6 14.3C17.8 13.2 16.7 13.1 16.3 13C15.9 12.9 15.9 12 15.9 12Z" fill="white" />
                    <text x="30" y="19" textAnchor="middle" fill="white" fontSize="8" fontWeight="600" fontFamily="Arial">Pay</text>
                  </svg>
                </Card>
              </div>

              {error && (
                <p className="mt-6 rounded-[5px] border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </p>
              )}

              <button
                onClick={pay}
                disabled={loading}
                className="group mt-auto flex w-full items-center justify-center gap-3 rounded-[5px] bg-mint py-4.5 text-base font-semibold text-ink transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-mint"
                style={{ marginTop: "2rem" }}
              >
                {loading ? (
                  <>
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {language === "ar" ? "جاري التحويل" : "Redirecting"}
                  </>
                ) : (
                  <>
                    {t("payment.payNow")}
                    <Arrow className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </Reveal>

          <Reveal delay={180} className="h-full">
            <div className="flex h-full flex-col rounded-[6px] border border-white/14 p-6 sm:p-7">
              <div className="lat text-[11px] tracking-[0.22em] text-mint">
                {t("payment.serviceSummary")}
              </div>

              <div className="mt-5 border-b border-white/12 pb-5">
                <div className="text-lg font-semibold">{plan}</div>
                {desc && (
                  <p className="mt-2 text-sm leading-[1.7] text-white/55">{desc}</p>
                )}
              </div>

              <div className="flex items-baseline justify-between gap-3 py-5">
                <span className="text-sm text-white/55">{t("payment.price")}</span>
                <span className="flex items-baseline gap-1.5">
                  <span className="num text-[34px] font-semibold leading-none text-mint">
                    {Number(price).toLocaleString("en-US")}
                  </span>
                  <span className="text-xs text-white/50">{currency}</span>
                </span>
              </div>

              <div className="mt-auto rounded-[5px] border border-mint/28 bg-mint/8 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-mint">
                  <Asterisk size={11} />
                  {t("payment.note")}
                </div>
                <p className="mt-2 text-[13.5px] leading-[1.75] text-white/70">
                  {t("payment.noteText")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-[100svh] bg-ink" />}>
      <PaymentContent />
    </Suspense>
  );
}
