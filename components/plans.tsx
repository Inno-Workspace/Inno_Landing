"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";

const WHATSAPP_NUMBER = "966552658605";

interface Plan {
  titleKey: string;
  descKey: string;
  forKey: string;
  featureKeys: string[];
  icon: ReactNode;
  featured?: boolean;
}

const plans: Plan[] = [
  {
    titleKey: "plans.plan1.title",
    descKey: "plans.plan1.desc",
    forKey: "plans.plan1.for",
    featureKeys: [
      "plans.plan1.f1",
      "plans.plan1.f2",
      "plans.plan1.f3",
      "plans.plan1.f4",
      "plans.plan1.f5",
    ],
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    titleKey: "plans.plan2.title",
    descKey: "plans.plan2.desc",
    forKey: "plans.plan2.for",
    featureKeys: [
      "plans.plan2.f1",
      "plans.plan2.f2",
      "plans.plan2.f3",
      "plans.plan2.f4",
      "plans.plan2.f5",
      "plans.plan2.f6",
    ],
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    featured: true,
  },
  {
    titleKey: "plans.plan3.title",
    descKey: "plans.plan3.desc",
    forKey: "plans.plan3.for",
    featureKeys: [
      "plans.plan3.f1",
      "plans.plan3.f2",
      "plans.plan3.f3",
      "plans.plan3.f4",
      "plans.plan3.f5",
    ],
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
      </svg>
    ),
  },
];

const Plans = () => {
  const { t, language } = useLanguage();

  const handleWhatsApp = (planTitle: string) => {
    const message =
      language === "ar"
        ? `مرحباً! أبغى أستفسر عن ${planTitle}`
        : `Hello! I'm interested in the ${planTitle} plan.`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section className="relative w-full overflow-hidden py-20 md:py-32">
      {/* Light cyan-teal background — matching contact */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ecfeff] via-[#f0fdfa] to-[#ecfeff]" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(14, 116, 144, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14, 116, 144, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow orbs — desktop */}
      <div className="hidden md:block absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-300/20 rounded-full blur-[120px]" />
      <div className="hidden md:block absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-300/15 rounded-full blur-[120px]" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-20"
        >
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-3 md:mb-4"
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
            className="text-xl md:text-2xl lg:text-3xl max-w-3xl"
            style={{ fontFamily: "var(--font-moshreq)", color: "#155e75" }}
          >
            {t("plans.subtitle")}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => {
            const title = t(plan.titleKey);
            const isFeatured = plan.featured;

            return (
              <motion.div
                key={plan.titleKey}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative flex"
              >
                {/* Glow ring behind featured */}
                {isFeatured && (
                  <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-teal-400/40 via-cyan-400/20 to-teal-400/40 blur-[2px]" />
                )}

                <div
                  className={`relative flex flex-col w-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                    isFeatured ? "ring-1 ring-teal-400/30" : ""
                  }`}
                  style={{
                    background: "linear-gradient(160deg, #0a1e2b, #0c2a3a)",
                    border: isFeatured
                      ? "1px solid rgba(62, 207, 180, 0.35)"
                      : "1px solid rgba(62, 207, 180, 0.15)",
                    boxShadow: isFeatured
                      ? "0 25px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(62, 207, 180, 0.08)"
                      : "0 25px 60px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {/* Top accent line */}
                  {isFeatured && (
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{
                        background: "linear-gradient(90deg, transparent, #14b8a6, #06b6d4, #14b8a6, transparent)",
                      }}
                    />
                  )}

                  <div className="p-8 md:p-10 flex flex-col flex-1">
                    {/* Icon + Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{
                          background: isFeatured
                            ? "linear-gradient(135deg, #0891b2, #0d9488)"
                            : "rgba(0, 30, 43, 0.9)",
                          border: isFeatured ? "none" : "1px solid rgba(62, 207, 180, 0.2)",
                          boxShadow: isFeatured ? "0 8px 24px rgba(0, 0, 0, 0.3)" : "none",
                        }}
                      >
                        {plan.icon}
                      </div>

                      {isFeatured && (
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold"
                          style={{
                            fontFamily: "var(--font-moshreq)",
                            background: "linear-gradient(135deg, rgba(8, 145, 178, 0.2), rgba(13, 148, 136, 0.2))",
                            color: "#5eead4",
                            border: "1px solid rgba(94, 234, 212, 0.25)",
                          }}
                        >
                          {t("plans.popular")}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className="text-2xl md:text-3xl font-bold text-white mb-2"
                      style={{ fontFamily: "var(--font-devil-breeze)" }}
                    >
                      {title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm md:text-base leading-relaxed mb-2"
                      style={{ fontFamily: "var(--font-moshreq)", color: "#94a3b8" }}
                    >
                      {t(plan.descKey)}
                    </p>

                    {/* For who */}
                    <p
                      className="text-xs mb-6"
                      style={{ fontFamily: "var(--font-moshreq)", color: "#64748b" }}
                    >
                      {t(plan.forKey)}
                    </p>

                    {/* Divider */}
                    <div
                      className="h-px w-full mb-6"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(62, 207, 180, 0.2), transparent)" }}
                    />

                    {/* What's included */}
                    <p
                      className="text-sm font-bold mb-4"
                      style={{ fontFamily: "var(--font-moshreq)", color: "#e2e8f0" }}
                    >
                      {t("plans.includes")}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.featureKeys.map((key, fIndex) => (
                        <motion.li
                          key={key}
                          initial={{ opacity: 0, x: language === "ar" ? 15 : -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.15 + fIndex * 0.06 }}
                          className="flex items-center gap-3"
                        >
                          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="8" fill="rgba(13, 148, 136, 0.15)" />
                            <path d="M5 8l2 2 4-4" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span
                            className="text-sm"
                            style={{ fontFamily: "var(--font-moshreq)", color: "#cbd5e1" }}
                          >
                            {t(key)}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button
                      onClick={() => handleWhatsApp(title)}
                      className="w-full px-6 py-4 rounded-xl font-bold text-base transition-all transform hover:scale-[1.03] active:scale-95 relative overflow-hidden group cursor-pointer"
                      style={{
                        fontFamily: "var(--font-moshreq)",
                        background: isFeatured
                          ? "linear-gradient(135deg, #0891b2, #0d9488)"
                          : "rgba(0, 30, 43, 0.9)",
                        color: isFeatured ? "#ffffff" : "#5eead4",
                        border: isFeatured ? "none" : "1px solid rgba(62, 207, 180, 0.2)",
                        boxShadow: isFeatured
                          ? "0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(62, 207, 180, 0.1)"
                          : "none",
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {t("plans.cta")}
                        <svg
                          className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: isFeatured
                            ? "linear-gradient(135deg, #14b8a6 0%, #06b6d4 50%, #0891b2 100%)"
                            : "linear-gradient(135deg, rgba(8, 145, 178, 0.15), rgba(13, 148, 136, 0.15))",
                        }}
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Plans;
