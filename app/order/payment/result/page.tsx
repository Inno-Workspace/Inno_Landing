"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";

function PaymentResultContent() {
  const { language } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const respStatus = searchParams.get("respStatus");
  const respMessage = searchParams.get("respMessage");
  const tranRef = searchParams.get("tranRef");

  const isSuccess = respStatus === "A";
  const isCancelled = !respStatus || respStatus === "C";

  // If cancelled, redirect back to payment page
  if (isCancelled) {
    router.back();
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#ecfeff] via-[#f0fdfa] to-[#ecfeff]" />
      <div className="hidden md:block absolute top-0 left-1/3 w-[600px] h-[600px] bg-teal-200/25 rounded-full blur-[150px]" />
      <div className="hidden md:block absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-cyan-200/20 rounded-full blur-[150px]" />

      <div className="relative z-10 container mx-auto px-6 py-16 md:py-24 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full"
        >
          <div
            className="rounded-3xl overflow-hidden text-center px-10 py-14 md:px-12"
            style={{
              background: "linear-gradient(175deg, #0c2633, #0a1e2b)",
              border: "1px solid rgba(103, 232, 249, 0.08)",
              boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.4)",
            }}
          >
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              {isSuccess ? (
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(16, 185, 129, 0.12)", border: "2px solid rgba(16, 185, 129, 0.3)" }}
                >
                  <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(239, 68, 68, 0.12)", border: "2px solid rgba(239, 68, 68, 0.3)" }}
                >
                  <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
            </div>

            {/* Title */}
            <h1
              className="text-3xl font-bold mb-3"
              style={{
                fontFamily: "var(--font-devil-breeze)",
                color: isSuccess ? "#34d399" : "#f87171",
              }}
            >
              {isSuccess
                ? language === "ar" ? "تمت عملية الدفع بنجاح" : "Payment Successful"
                : language === "ar" ? "فشلت عملية الدفع" : "Payment Failed"}
            </h1>

            {/* Message */}
            <p
              className="text-base mb-2"
              style={{ fontFamily: "var(--font-moshreq)", color: "#94a3b8" }}
            >
              {isSuccess
                ? language === "ar"
                  ? "شكراً لك! سوف نتواصل معك خلال 24 ساعة"
                  : "Thank you! We will contact you within 24 hours"
                : respMessage || (language === "ar" ? "حدث خطأ أثناء الدفع" : "An error occurred during payment")}
            </p>

            {/* Transaction Ref */}
            {tranRef && (
              <p
                className="text-sm mb-8"
                style={{ fontFamily: "var(--font-moshreq)", color: "#64748b" }}
              >
                {language === "ar" ? "رقم المرجع: " : "Reference: "}{tranRef}
              </p>
            )}

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/")}
              className="px-10 py-4 rounded-2xl text-lg font-bold text-white cursor-pointer"
              style={{
                fontFamily: "var(--font-moshreq)",
                background: "linear-gradient(135deg, #0891b2, #0d9488)",
                boxShadow: "0 12px 40px -8px rgba(8, 145, 178, 0.4)",
              }}
            >
              {language === "ar" ? "العودة للرئيسية" : "Back to Home"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function PaymentResultPage() {
  return (
    <Suspense>
      <PaymentResultContent />
    </Suspense>
  );
}
