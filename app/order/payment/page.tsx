"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";

function PaymentContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "";
  const price = searchParams.get("price") || "";
  const name = searchParams.get("name") || "";
  const desc = searchParams.get("desc") || "";

  const greeting = t("payment.greeting").replace("{name}", name);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ecfeff] via-[#f0fdfa] to-[#ecfeff]" />
      <div className="hidden md:block absolute top-0 left-1/3 w-[600px] h-[600px] bg-teal-200/25 rounded-full blur-[150px]" />
      <div className="hidden md:block absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-cyan-200/20 rounded-full blur-[150px]" />

      <div className="relative z-10 container mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight"
            style={{
              fontFamily: "var(--font-devil-breeze)",
              background:
                "linear-gradient(135deg, #0f766e 0%, #0e7490 50%, #155e75 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {greeting}
          </h1>
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-bold"
            style={{
              fontFamily: "var(--font-moshreq)",
              background: "rgba(14, 116, 144, 0.08)",
              color: "#0e7490",
              border: "1px solid rgba(14, 116, 144, 0.15)",
            }}
          >
            {t("payment.step")}
          </span>
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-3xl mx-auto"
        >
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(175deg, #0c2633, #0a1e2b)",
              border: "1px solid rgba(103, 232, 249, 0.08)",
              boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.4)",
            }}
          >
            <div className="px-10 py-10 md:px-12 md:py-12 space-y-8">
              {/* Service Summary */}
              <div
                className="rounded-2xl px-6 py-5"
                style={{
                  background: "rgba(103, 232, 249, 0.04)",
                  border: "1px solid rgba(103, 232, 249, 0.08)",
                }}
              >
                <h3
                  className="text-lg font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-moshreq)",
                    color: "#cbd5e1",
                  }}
                >
                  {t("payment.serviceSummary")}
                </h3>
                <p
                  className="text-base font-bold mb-1"
                  style={{
                    fontFamily: "var(--font-devil-breeze)",
                    color: "#e2e8f0",
                  }}
                >
                  {plan}
                </p>
                {desc && (
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "var(--font-moshreq)",
                      color: "#7d95a8",
                    }}
                  >
                    {desc}
                  </p>
                )}
              </div>

              {/* Price */}
              <div
                className="rounded-2xl px-6 py-5"
                style={{
                  background: "rgba(103, 232, 249, 0.04)",
                  border: "1px solid rgba(103, 232, 249, 0.08)",
                }}
              >
                <h3
                  className="text-lg font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-moshreq)",
                    color: "#cbd5e1",
                  }}
                >
                  {t("payment.price")}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-4xl font-bold text-white"
                    style={{ fontFamily: "var(--font-devil-breeze)" }}
                  >
                    {price}
                  </span>
                  <span
                    className="text-base"
                    style={{
                      fontFamily: "var(--font-moshreq)",
                      color: "#64748b",
                    }}
                  >
                    {t("payment.priceSuffix")}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div
                className="h-px w-full"
                style={{ background: "rgba(103, 232, 249, 0.08)" }}
              />

              {/* Payment Methods */}
              <div className="space-y-4">
                {["payment.method1", "payment.method2", "payment.method3"].map(
                  (key, index) => (
                    <motion.button
                      key={key}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="w-full px-6 py-5 rounded-2xl text-base font-medium transition-all duration-200 cursor-pointer text-center hover:scale-[1.01] active:scale-[0.99]"
                      style={{
                        fontFamily: "var(--font-moshreq)",
                        background: "rgba(103, 232, 249, 0.04)",
                        border: "1.5px solid rgba(103, 232, 249, 0.12)",
                        color: "#94a3b8",
                      }}
                    >
                      {t(key)}
                    </motion.button>
                  )
                )}
              </div>
            </div>

            {/* Note */}
            <div
              className="px-10 py-7 md:px-12 text-center"
              style={{
                borderTop: "1px solid rgba(103, 232, 249, 0.06)",
              }}
            >
              <p
                className="text-base font-bold mb-2"
                style={{
                  fontFamily: "var(--font-moshreq)",
                  color: "#cbd5e1",
                }}
              >
                {t("payment.note")}
              </p>
              <p
                className="text-base leading-relaxed"
                style={{
                  fontFamily: "var(--font-moshreq)",
                  color: "#64748b",
                }}
              >
                {t("payment.noteText")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense>
      <PaymentContent />
    </Suspense>
  );
}
