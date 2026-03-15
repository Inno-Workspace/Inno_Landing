"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";

function PaymentContent() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "";
  const price = searchParams.get("price") || "";
  const name = searchParams.get("name") || "";
  const desc = searchParams.get("desc") || "";
  const [loading, setLoading] = useState(false);

  const greeting = t("payment.greeting").replace("{name}", name);

  const handlePayment = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // Get customer details from localStorage (saved by order form)
      let customerName = name;
      let customerEmail = "";
      let customerPhone = "";
      try {
        const orderData = JSON.parse(localStorage.getItem("orderForm") || "{}");
        customerName = orderData.name || name;
        customerEmail = orderData.email || "";
        customerPhone = orderData.phone || "";
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
        alert(language === "ar" ? "حدث خطأ، يرجى المحاولة مرة أخرى" : "An error occurred, please try again");
        setLoading(false);
      }
    } catch {
      alert(language === "ar" ? "حدث خطأ، يرجى المحاولة مرة أخرى" : "An error occurred, please try again");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ecfeff] via-[#f0fdfa] to-[#ecfeff]" />
      <div className="hidden md:block absolute top-0 left-1/3 w-[600px] h-[600px] bg-teal-200/25 rounded-full blur-[150px]" />
      <div className="hidden md:block absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-cyan-200/20 rounded-full blur-[150px]" />

      <div className="relative z-10 container mx-auto px-6 py-16 md:py-24">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={() => router.back()}
          dir="ltr"
          className="flex items-center justify-center gap-2 mb-8 px-10 py-4 rounded-2xl text-lg font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          style={{
            fontFamily: "var(--font-moshreq)",
            background: "linear-gradient(135deg, #0891b2, #0d9488)",
            color: "#ffffff",
            border: "none",
            boxShadow: "0 12px 40px -8px rgba(8, 145, 178, 0.4)",
            marginInlineStart: "0",
            marginInlineEnd: "auto",
          }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {language === "ar" ? "رجوع" : "Back"}
        </motion.button>

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
              <div className="space-y-5">
                <h3
                  className="text-lg font-bold text-center"
                  style={{
                    fontFamily: "var(--font-moshreq)",
                    color: "#cbd5e1",
                  }}
                >
                  {language === "ar" ? "ادفع عبر" : "Pay with"}
                </h3>

                {/* Payment Method Icons */}
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  {/* Visa */}
                  <div
                    className="px-4 py-2.5 rounded-xl flex items-center justify-center"
                    style={{
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <svg viewBox="0 0 48 32" className="h-7 w-auto" fill="none">
                      <rect width="48" height="32" rx="4" fill="#1A1F71" />
                      <path d="M19.5 21H17L18.8 11H21.3L19.5 21Z" fill="white" />
                      <path d="M28.5 11.2C28 11 27.2 10.8 26.2 10.8C23.7 10.8 22 12.1 22 13.9C22 15.2 23.2 15.9 24.1 16.4C25 16.9 25.3 17.2 25.3 17.6C25.3 18.2 24.6 18.5 23.9 18.5C22.9 18.5 22.4 18.4 21.6 18L21.3 17.9L21 19.7C21.6 20 22.6 20.2 23.7 20.2C26.4 20.2 28 18.9 28 17C28 16 27.4 15.2 26 14.5C25.2 14.1 24.7 13.8 24.7 13.3C24.7 12.9 25.2 12.5 26.1 12.5C26.9 12.5 27.5 12.7 27.9 12.9L28.2 13L28.5 11.2Z" fill="white" />
                      <path d="M32.8 11H30.8C30.2 11 29.8 11.2 29.5 11.8L26 21H28.7L29.2 19.5H32.5L32.8 21H35.2L33.1 11H32.8ZM30 17.7L31.2 14.2L31.9 17.7H30Z" fill="white" />
                      <path d="M16.5 11L14 17.9L13.7 16.5L12.8 11.8C12.7 11.2 12.2 11 11.7 11H8.1L8 11.2C8.9 11.4 9.8 11.8 10.5 12.2L12.8 21H15.5L19.2 11H16.5Z" fill="white" />
                    </svg>
                  </div>

                  {/* Mastercard */}
                  <div
                    className="px-4 py-2.5 rounded-xl flex items-center justify-center"
                    style={{
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <svg viewBox="0 0 48 32" className="h-7 w-auto" fill="none">
                      <rect width="48" height="32" rx="4" fill="#252525" />
                      <circle cx="19" cy="16" r="8" fill="#EB001B" />
                      <circle cx="29" cy="16" r="8" fill="#F79E1B" />
                      <path d="M24 10.3C25.8 11.7 27 13.7 27 16C27 18.3 25.8 20.3 24 21.7C22.2 20.3 21 18.3 21 16C21 13.7 22.2 11.7 24 10.3Z" fill="#FF5F00" />
                    </svg>
                  </div>

                  {/* mada */}
                  <div
                    className="px-4 py-2.5 rounded-xl flex items-center justify-center"
                    style={{
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <svg viewBox="0 0 48 32" className="h-7 w-auto" fill="none">
                      <rect width="48" height="32" rx="4" fill="#003B2A" />
                      <text x="24" y="19" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">mada</text>
                    </svg>
                  </div>

                  {/* Apple Pay */}
                  <div
                    className="px-4 py-2.5 rounded-xl flex items-center justify-center"
                    style={{
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <svg viewBox="0 0 48 32" className="h-7 w-auto" fill="none">
                      <rect width="48" height="32" rx="4" fill="#000" />
                      <path d="M15.2 10.8C15.7 10.2 16 9.4 15.9 8.6C15.2 8.7 14.3 9.1 13.8 9.7C13.3 10.2 12.9 11.1 13 11.8C13.8 11.9 14.6 11.4 15.2 10.8Z" fill="white" />
                      <path d="M15.9 12C14.8 11.9 13.8 12.6 13.3 12.6C12.7 12.6 11.9 12 11 12C9.8 12 8.7 12.7 8.1 13.8C6.8 16 7.8 19.2 9 21C9.6 21.9 10.3 22.9 11.2 22.9C12 22.9 12.4 22.4 13.4 22.4C14.5 22.4 14.8 22.9 15.7 22.9C16.6 22.9 17.2 22 17.8 21.1C18.5 20 18.8 19 18.8 19C18.8 19 17.3 18.3 17.3 16.6C17.3 15.1 18.5 14.4 18.6 14.3C17.8 13.2 16.7 13.1 16.3 13C15.9 12.9 15.9 12 15.9 12Z" fill="white" />
                      <text x="30" y="19" textAnchor="middle" fill="white" fontSize="8" fontWeight="600" fontFamily="Arial">Pay</text>
                    </svg>
                  </div>
                </div>

                {/* Pay Now Button */}
                <motion.button
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full py-5 rounded-2xl font-bold text-lg text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    fontFamily: "var(--font-moshreq)",
                    background: "linear-gradient(135deg, #0891b2, #0d9488)",
                    boxShadow: "0 12px 40px -8px rgba(8, 145, 178, 0.4)",
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {language === "ar" ? "جاري التحويل..." : "Redirecting..."}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {language === "ar" ? "ادفع الآن" : "Pay Now"}
                      <svg
                        className={`w-5 h-5 transition-transform duration-300 ${language === "ar" ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  )}
                </motion.button>

                {/* Powered by ClickPay */}
                <p
                  className="text-center text-xs"
                  style={{ fontFamily: "var(--font-moshreq)", color: "#475569" }}
                >
                  {language === "ar" ? "مدعوم بواسطة" : "Powered by"}{" "}
                  <span className="font-bold" style={{ color: "#64748b" }}>ClickPay</span>
                </p>
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
