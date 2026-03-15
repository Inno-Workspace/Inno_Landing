"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useLanguage } from "@/contexts/language-context";
import { useState, useEffect } from "react";

const ThreeDCircle = dynamic(() => import("./3d-circle"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

const About = () => {
  const { t, language } = useLanguage();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div id="about" className="relative w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "#f0fdfa" }}
      ></div>

      {isDesktop && (
        <>
          <motion.div
            className={`absolute sm:top-auto sm:bottom-0 md:bottom-0 ${
              language === "ar"
                ? "left-[-10%] sm:left-[3%]"
                : "right-[-0%] sm:right-[3%]"
            } md:w-[420px] md:h-[420px] lg:w-[520px] lg:h-[520px] z-5`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ThreeDCircle speed={0.5} scale={2} rotationAxis={[1, 0, 0]} />
          </motion.div>

        </>
      )}

      <div className="relative z-10 container mx-auto px-5 sm:px-6 py-16 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-5 md:mb-8 leading-tight"
            style={{
              fontFamily: "var(--font-devil-breeze)",
              background:
                "linear-gradient(135deg, #0f766e 0%, #0e7490 50%, #155e75 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("about.title")}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl space-y-4 md:space-y-6 text-base md:text-xl leading-relaxed text-dark"
          style={{
            fontFamily: "var(--font-moshreq)",
            fontWeight: 400,
          }}
        >
          <p>{t("about.paragraph1")}</p>
          <p>{t("about.paragraph2")}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
