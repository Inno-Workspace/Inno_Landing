"use client";

import { useLanguage } from "@/contexts/language-context";
import { motion } from "framer-motion";

const LanguageSwitch = () => {
  const { language, toggleLanguage, isTransitioning } = useLanguage();
  const isArabic = language === "ar";

  return (
    <button
      onClick={toggleLanguage}
      disabled={isTransitioning}
      className="relative flex items-center h-9 rounded-lg cursor-pointer overflow-hidden"
      aria-label="Switch language"
      style={{
        backgroundColor: "rgba(0, 30, 43, 0.6)",
        border: "1px solid rgba(103, 232, 249, 0.15)",
      }}
    >
      {/* EN side */}
      <div
        className="relative z-10 h-full flex items-center justify-center px-4"
      >
        <span
          className="text-xs font-bold tracking-wide transition-colors duration-300"
          style={{
            color: !isArabic ? "#ffffff" : "rgba(255, 255, 255, 0.35)",
          }}
        >
          EN
        </span>
      </div>

      {/* AR side */}
      <div
        className="relative z-10 h-full flex items-center justify-center px-4"
      >
        <span
          className="text-xs font-bold tracking-wide transition-colors duration-300"
          style={{
            color: isArabic ? "#ffffff" : "rgba(255, 255, 255, 0.35)",
          }}
        >
          AR
        </span>
      </div>

      {/* Sliding highlight */}
      <motion.div
        className="absolute top-0.5 bottom-0.5 rounded-md"
        style={{
          width: "calc(50% - 2px)",
          background: "linear-gradient(135deg, rgba(103, 232, 249, 0.25), rgba(103, 232, 249, 0.12))",
          border: "1px solid rgba(103, 232, 249, 0.3)",
          boxShadow: "0 0 12px rgba(103, 232, 249, 0.15)",
        }}
        animate={{
          left: isArabic ? "calc(50% + 1px)" : "2px",
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 28,
        }}
      />
    </button>
  );
};

export default LanguageSwitch;
