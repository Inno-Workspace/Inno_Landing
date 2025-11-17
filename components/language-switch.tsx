"use client";

import { useLanguage } from "@/contexts/language-context";
import { motion } from "framer-motion";

const LanguageSwitch = () => {
  const { language, toggleLanguage, isTransitioning } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      disabled={isTransitioning}
      className="relative group flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 overflow-hidden cursor-pointer"
      aria-label="Switch language"
      style={{
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <motion.div
        className="absolute inset-0 bg-linear-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />

      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
          key={language}
          initial={{ rotateY: -90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: 90, opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span className="text-white font-bold text-sm tracking-wider">
            {language === "en" ? "AR" : "EN"}
          </span>
        </motion.div>
      </div>

      {isTransitioning && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}

      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md shadow-lg">
          <span className="text-xs font-medium text-gray-800">
            {language === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
          </span>
        </div>
      </div>
    </button>
  );
};

export default LanguageSwitch;
