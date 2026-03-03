"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";

const WHATSAPP_NUMBER = "966552658605";

function OrderForm() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "";
  const price = searchParams.get("price") || "";
  const desc = searchParams.get("desc") || "";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    business: "",
    hasIdentity: "",
    country: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("orderForm", JSON.stringify({ ...form, plan, price, desc }));
    router.push(
      `/order/payment?plan=${encodeURIComponent(plan)}&price=${encodeURIComponent(price)}&name=${encodeURIComponent(form.name)}&desc=${encodeURIComponent(desc)}`
    );
  };

  const inputStyle = {
    fontFamily: "var(--font-moshreq)",
    background: "rgba(103, 232, 249, 0.06)",
    border: "1.5px solid rgba(103, 232, 249, 0.14)",
    color: "#e2e8f0",
    fontSize: "16px",
  };

  const labelStyle = {
    fontFamily: "var(--font-moshreq)",
    color: "#cbd5e1",
    fontSize: "15px",
  };

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
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-6"
            style={{
              fontFamily: "var(--font-moshreq)",
              background: "rgba(14, 116, 144, 0.08)",
              color: "#0e7490",
              border: "1px solid rgba(14, 116, 144, 0.15)",
            }}
          >
            {t("order.step")}
          </span>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-devil-breeze)",
              background:
                "linear-gradient(135deg, #0f766e 0%, #0e7490 50%, #155e75 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("order.pageTitle")}
          </h1>
        </motion.div>

        {/* Form Card */}
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
            {/* Selected Plan Banner */}
            {plan && (
              <div
                className="px-10 py-6 md:px-12 md:py-7 flex items-center justify-between"
                style={{
                  background: "rgba(103, 232, 249, 0.04)",
                  borderBottom: "1px solid rgba(103, 232, 249, 0.08)",
                }}
              >
                <div>
                  <p
                    className="text-sm mb-1"
                    style={{ fontFamily: "var(--font-moshreq)", color: "#64748b" }}
                  >
                    {t("order.selectedPlan")}
                  </p>
                  <p
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: "var(--font-devil-breeze)" }}
                  >
                    {plan}
                  </p>
                </div>
                {price && (
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className="text-3xl font-bold text-white"
                      style={{ fontFamily: "var(--font-devil-breeze)" }}
                    >
                      {price}
                    </span>
                    <span
                      className="text-sm"
                      style={{
                        fontFamily: "var(--font-moshreq)",
                        color: "#64748b",
                      }}
                    >
                      {t("plans.currency")}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-10 py-10 md:px-12 md:py-12 space-y-7">
              {/* Name */}
              <div>
                <label className="block text-base mb-2.5" style={labelStyle}>
                  {t("order.name")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("order.namePlaceholder")}
                  className="w-full px-5 py-4 rounded-xl text-base outline-none transition-colors focus:border-cyan-400/30 placeholder:text-slate-500"
                  style={inputStyle}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-base mb-2.5" style={labelStyle}>
                  {t("order.phone")}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={t("order.phonePlaceholder")}
                  dir="ltr"
                  className="w-full px-5 py-4 rounded-xl text-base outline-none transition-colors focus:border-cyan-400/30 placeholder:text-slate-500"
                  style={inputStyle}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-base mb-2.5" style={labelStyle}>
                  {t("order.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t("order.emailPlaceholder")}
                  dir="ltr"
                  className="w-full px-5 py-4 rounded-xl text-base outline-none transition-colors focus:border-cyan-400/30 placeholder:text-slate-500"
                  style={inputStyle}
                />
              </div>

              {/* Business Activity */}
              <div>
                <label className="block text-base mb-2.5" style={labelStyle}>
                  {t("order.business")}
                </label>
                <input
                  type="text"
                  name="business"
                  value={form.business}
                  onChange={handleChange}
                  placeholder={t("order.businessPlaceholder")}
                  className="w-full px-5 py-4 rounded-xl text-base outline-none transition-colors focus:border-cyan-400/30 placeholder:text-slate-500"
                  style={inputStyle}
                />
              </div>

              {/* Visual Identity */}
              <div>
                <label className="block text-base mb-3" style={labelStyle}>
                  {t("order.hasIdentity")}
                </label>
                <div className="flex gap-3">
                  {[
                    { value: "yes", label: t("order.identityYes") },
                    { value: "no", label: t("order.identityNo") },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          hasIdentity: option.value,
                        }))
                      }
                      className="px-8 py-3.5 rounded-xl text-base font-medium transition-all duration-200 cursor-pointer"
                      style={{
                        fontFamily: "var(--font-moshreq)",
                        background:
                          form.hasIdentity === option.value
                            ? "rgba(34, 211, 238, 0.12)"
                            : "rgba(103, 232, 249, 0.04)",
                        color:
                          form.hasIdentity === option.value
                            ? "#22d3ee"
                            : "#64748b",
                        border:
                          form.hasIdentity === option.value
                            ? "1px solid rgba(34, 211, 238, 0.25)"
                            : "1px solid rgba(103, 232, 249, 0.1)",
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-base mb-2.5" style={labelStyle}>
                  {t("order.country")}
                </label>
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder={t("order.countryPlaceholder")}
                  className="w-full px-5 py-4 rounded-xl text-base outline-none transition-colors focus:border-cyan-400/30 placeholder:text-slate-500"
                  style={inputStyle}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-base mb-2.5" style={labelStyle}>
                  {t("order.description")}
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder={t("order.descriptionPlaceholder")}
                  rows={4}
                  className="w-full px-5 py-4 rounded-xl text-base outline-none transition-colors focus:border-cyan-400/30 placeholder:text-slate-500 resize-none"
                  style={inputStyle}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-5 rounded-2xl font-bold text-lg text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer mt-4"
                style={{
                  fontFamily: "var(--font-moshreq)",
                  background: "linear-gradient(135deg, #0891b2, #0d9488)",
                  boxShadow: "0 12px 40px -8px rgba(8, 145, 178, 0.4)",
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  {t("order.cta")}
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${language === "ar" ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>
            </form>

            {/* Footer */}
            <div
              className="px-10 py-6 md:px-12 text-center"
              style={{
                borderTop: "1px solid rgba(103, 232, 249, 0.06)",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  const msg =
                    language === "ar"
                      ? "مرحباً! عندي استفسار"
                      : "Hello! I have a question.";
                  window.open(
                    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
                    "_blank"
                  );
                }}
                className="text-base transition-colors duration-200 hover:text-cyan-300 cursor-pointer"
                style={{
                  fontFamily: "var(--font-moshreq)",
                  color: "#64748b",
                }}
              >
                {t("order.footer")}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense>
      <OrderForm />
    </Suspense>
  );
}
