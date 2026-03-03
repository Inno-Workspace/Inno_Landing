"use client";

import { type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";

const WHATSAPP_NUMBER = "966552658605";

interface Plan {
  titleKey: string;
  subtitleKey?: string;
  descKey: string;
  priceKey: string;
  featureKeys: string[];
  icon: ReactNode;
  featured?: boolean;
}

const plans: Plan[] = [
  {
    titleKey: "plans.plan1.title",
    subtitleKey: "plans.plan1.subtitle",
    descKey: "plans.plan1.desc",
    priceKey: "plans.plan1.price",
    featureKeys: [
      "plans.plan1.f1",
      "plans.plan1.f2",
      "plans.plan1.f3",
      "plans.plan1.f4",
      "plans.plan1.f5",
      "plans.plan1.f6",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    titleKey: "plans.plan2.title",
    descKey: "plans.plan2.desc",
    priceKey: "plans.plan2.price",
    featureKeys: [
      "plans.plan2.f1",
      "plans.plan2.f2",
      "plans.plan2.f3",
      "plans.plan2.f4",
      "plans.plan2.f5",
      "plans.plan2.f6",
      "plans.plan2.f7",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    featured: true,
  },
  {
    titleKey: "plans.plan3.title",
    descKey: "plans.plan3.desc",
    priceKey: "plans.plan3.price",
    featureKeys: [
      "plans.plan3.f1",
      "plans.plan3.f2",
      "plans.plan3.f3",
      "plans.plan3.f4",
      "plans.plan3.f5",
      "plans.plan3.f6",
      "plans.plan3.f7",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
];

const Plans = () => {
  const { t, language } = useLanguage();
  const router = useRouter();

  const handleBuyPlan = (planTitle: string, planPrice: string, planDesc: string) => {
    router.push(
      `/order?plan=${encodeURIComponent(planTitle)}&price=${encodeURIComponent(planPrice)}&desc=${encodeURIComponent(planDesc)}`
    );
  };

  return (
    <section id="plans" className="relative w-full overflow-hidden py-24 md:py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-[#ecfeff] via-[#f0fdfa] to-[#ecfeff]" />

      <div className="hidden md:block absolute top-0 left-1/3 w-[600px] h-[600px] bg-teal-200/25 rounded-full blur-[150px]" />
      <div className="hidden md:block absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-cyan-200/20 rounded-full blur-[150px]" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6"
            style={{
              fontFamily: "var(--font-devil-breeze)",
              background: "linear-gradient(135deg, #0f766e 0%, #0e7490 50%, #155e75 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("plans.title")}
          </h2>
          <p
            className="text-lg md:text-2xl max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-moshreq)", color: "#0e7490" }}
          >
            {t("plans.subtitle")}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-5 items-start max-w-7xl mx-auto lg:items-center">
          {plans.map((plan, index) => {
            const title = t(plan.titleKey);
            const isFeatured = plan.featured;

            return (
              <motion.div
                key={plan.titleKey}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className={`relative ${isFeatured ? "lg:z-10 lg:-my-10" : "lg:z-0"}`}
              >
                <div
                  className="relative flex flex-col w-full rounded-3xl overflow-hidden"
                  style={{
                    background: isFeatured
                      ? "linear-gradient(175deg, #0d2d3d, #091c28)"
                      : "linear-gradient(175deg, #0c2633, #0a1e2b)",
                    border: isFeatured
                      ? "1px solid rgba(103, 232, 249, 0.2)"
                      : "1px solid rgba(103, 232, 249, 0.06)",
                    boxShadow: isFeatured
                      ? "0 40px 80px -20px rgba(0, 0, 0, 0.5)"
                      : "0 20px 50px -15px rgba(0, 0, 0, 0.35)",
                  }}
                >
                  {/* Featured top glow */}
                  {isFeatured && (
                    <div
                      className="absolute top-0 left-[15%] right-[15%] h-px"
                      style={{
                        background: "linear-gradient(90deg, transparent, #22d3ee, transparent)",
                      }}
                    />
                  )}

                  <div className={`flex flex-col flex-1 ${isFeatured ? "px-10 py-16 md:px-14 md:py-20" : "px-9 py-14 md:px-12 md:py-18"}`}>

                    {/* Icon + Badge */}
                    <div className="flex items-center justify-between mb-10">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{
                          color: isFeatured ? "#fff" : "#67e8f9",
                          background: isFeatured
                            ? "linear-gradient(135deg, #0891b2, #0d9488)"
                            : "rgba(103, 232, 249, 0.06)",
                          border: isFeatured ? "none" : "1px solid rgba(103, 232, 249, 0.1)",
                        }}
                      >
                        {plan.icon}
                      </div>

                      {isFeatured && (
                        <span
                          className="px-4 py-1.5 rounded-full text-xs font-bold"
                          style={{
                            fontFamily: "var(--font-moshreq)",
                            background: "rgba(34, 211, 238, 0.08)",
                            color: "#22d3ee",
                            border: "1px solid rgba(34, 211, 238, 0.15)",
                          }}
                        >
                          {t("plans.popular")}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-bold text-white ${isFeatured ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"}`}
                      style={{ fontFamily: "var(--font-devil-breeze)" }}
                    >
                      {title}
                    </h3>

                    {/* Subtitle */}
                    {plan.subtitleKey && (
                      <p
                        className="text-base md:text-lg mt-1"
                        style={{ fontFamily: "var(--font-moshreq)", color: "#67e8f9" }}
                      >
                        {t(plan.subtitleKey)}
                      </p>
                    )}

                    {/* Description */}
                    <p
                      className={`leading-relaxed mt-4 ${isFeatured ? "text-base md:text-lg" : "text-sm md:text-base"}`}
                      style={{ fontFamily: "var(--font-moshreq)", color: "#7d95a8" }}
                    >
                      {t(plan.descKey)}
                    </p>

                    {/* Price */}
                    <div className="mt-8 mb-10 flex items-baseline gap-2">
                      <span
                        className={`font-bold text-white ${isFeatured ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl"}`}
                        style={{ fontFamily: "var(--font-devil-breeze)" }}
                      >
                        {t(plan.priceKey)}
                      </span>
                      <span
                        className="text-base md:text-lg"
                        style={{ fontFamily: "var(--font-moshreq)", color: "#64748b" }}
                      >
                        {t("plans.currency")}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full mb-10" style={{ background: "rgba(103, 232, 249, 0.08)" }} />

                    {/* Features */}
                    <ul className={`flex-1 ${isFeatured ? "space-y-5 mb-14" : "space-y-5 mb-12"}`}>
                      {plan.featureKeys.map((key) => (
                        <li key={key} className="flex items-center gap-4">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{
                              background: isFeatured
                                ? "rgba(34, 211, 238, 0.12)"
                                : "rgba(13, 148, 136, 0.1)",
                            }}
                          >
                            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                              <path
                                d="M3 6l2 2 4-4"
                                stroke={isFeatured ? "#22d3ee" : "#14b8a6"}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <span
                            className={isFeatured ? "text-base md:text-lg" : "text-base"}
                            style={{
                              fontFamily: "var(--font-moshreq)",
                              color: isFeatured ? "#cbd5e1" : "#8899a8",
                            }}
                          >
                            {t(key)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button
                      onClick={() => handleBuyPlan(title, t(plan.priceKey), t(plan.descKey))}
                      className={`w-full rounded-2xl font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer group ${
                        isFeatured ? "py-6 text-lg" : "py-5 text-base md:text-lg"
                      }`}
                      style={{
                        fontFamily: "var(--font-moshreq)",
                        background: isFeatured
                          ? "linear-gradient(135deg, #0891b2, #0d9488)"
                          : "transparent",
                        color: isFeatured ? "#ffffff" : "#5eead4",
                        border: isFeatured
                          ? "none"
                          : "1px solid rgba(103, 232, 249, 0.12)",
                        boxShadow: isFeatured
                          ? "0 12px 40px -8px rgba(8, 145, 178, 0.4)"
                          : "none",
                      }}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {t("plans.cta")}
                        <svg
                          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Custom Solutions Card — below the grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-7xl mx-auto mt-10 lg:mt-14"
        >
          <div
            className="relative rounded-3xl overflow-hidden text-center"
            style={{
              background: "linear-gradient(175deg, #0c2633, #0a1e2b)",
              border: "1px solid rgba(103, 232, 249, 0.06)",
              boxShadow: "0 20px 50px -15px rgba(0, 0, 0, 0.35)",
            }}
          >
            <div className="px-10 py-14 md:px-16 md:py-18">
              <h3
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-devil-breeze)" }}
              >
                {t("plans.custom.title")}
              </h3>

              <div className="w-16 h-px mx-auto mb-6" style={{ background: "rgba(103, 232, 249, 0.15)" }} />

              <p
                className="text-base md:text-xl leading-relaxed max-w-xl mx-auto mb-10"
                style={{ fontFamily: "var(--font-moshreq)", color: "#7d95a8" }}
              >
                {t("plans.custom.desc")}
              </p>

              <button
                onClick={() => {
                  const msg = language === "ar"
                    ? "مرحباً! أبغى حل تقني مخصص"
                    : "Hello! I need a custom tech solution.";
                  window.open(
                    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
                    "_blank"
                  );
                }}
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl font-bold text-base md:text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
                style={{
                  fontFamily: "var(--font-moshreq)",
                  background: "transparent",
                  color: "#5eead4",
                  border: "1px solid rgba(103, 232, 249, 0.12)",
                }}
              >
                {t("plans.custom.cta")}
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Plans;
