"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";
import { Arrow, Asterisk, Wordmark } from "@/components/site/ui";

function ResultContent() {
  const { language } = useLanguage();
  const router = useRouter();
  const params = useSearchParams();

  const respStatus = params.get("respStatus");
  const respMessage = params.get("respMessage");
  const tranRef = params.get("tranRef");

  const isSuccess = respStatus === "A";
  const isCancelled = !respStatus || respStatus === "C";

  // A cancelled payment goes back to the payment step rather than showing a
  // failure the customer did not cause.
  useEffect(() => {
    if (isCancelled) router.back();
  }, [isCancelled, router]);

  if (isCancelled) return <div className="min-h-[100svh] bg-ink" />;

  return (
    <main className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -end-28 -top-28 z-0 text-mint/10">
        <Asterisk size={400} className="spin-slow" />
      </div>

      <div className="relative z-[2] px-5 pt-8 sm:px-8 sm:pt-10">
        <Wordmark size={20} />
      </div>

      <div className="relative z-[2] flex flex-1 items-center justify-center px-5 py-16 sm:px-8">
        <div className="w-full max-w-[34rem] rounded-[6px] border border-white/14 bg-ink-2 p-8 sm:p-11">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full border-2 ${
              isSuccess
                ? "border-mint/40 bg-mint/12 text-mint"
                : "border-red-400/40 bg-red-400/12 text-red-300"
            }`}
          >
            {isSuccess ? (
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                <path d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>

          <h1 className="display mt-7 text-[clamp(1.7rem,4.5vw,2.4rem)]">
            {isSuccess
              ? language === "ar"
                ? "تم الدفع بنجاح"
                : "Payment successful"
              : language === "ar"
                ? "ما تمت عملية الدفع"
                : "Payment failed"}
          </h1>

          <p className="mt-4 text-[16.5px] leading-[1.85] text-white/62">
            {isSuccess
              ? language === "ar"
                ? "شكرًا لك — بنتواصل معك خلال ٢٤ ساعة ونبدأ التنفيذ."
                : "Thank you — we will contact you within 24 hours and start work."
              : respMessage ||
                (language === "ar"
                  ? "صار خطأ أثناء الدفع. حاول مرة ثانية أو كلّمنا وبنساعدك."
                  : "Something went wrong during payment. Try again, or message us.")}
          </p>

          {tranRef && (
            <div className="mt-6 flex items-center gap-3 border-t border-white/12 pt-5">
              <span className="text-xs text-white/45">
                {language === "ar" ? "رقم المرجع" : "Reference"}
              </span>
              <span className="num text-sm text-white/80">{tranRef}</span>
            </div>
          )}

          <button
            onClick={() => router.push("/")}
            className="group mt-9 flex w-full items-center justify-center gap-3 rounded-[5px] bg-mint py-4 text-base font-semibold text-ink transition-colors hover:bg-white"
          >
            {language === "ar" ? "العودة للرئيسية" : "Back to home"}
            <Arrow className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </button>
        </div>
      </div>
    </main>
  );
}

export default function PaymentResultPage() {
  return (
    <Suspense fallback={<div className="min-h-[100svh] bg-ink" />}>
      <ResultContent />
    </Suspense>
  );
}
