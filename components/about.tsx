"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useLanguage } from "@/contexts/language-context";

const ThreeDCircle = dynamic(() => import("./3d-circle"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

const About = () => {
  const { t, language } = useLanguage();
  const bubbleCount = language === "ar" ? 6 : 8;

  return (
    <div id="about" className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "#f0fdfa" }}
      ></div>

      <motion.div
        className={`absolute top-[17%] sm:top-auto sm:bottom-[10%] md:bottom-[10%] ${
          language === "ar"
            ? "left-[-10%] sm:left-[3%]"
            : "right-[-0%] sm:right-[3%]"
        } w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] md:w-[420px] md:h-[420px] lg:w-[520px] lg:h-[520px] z-5`}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <ThreeDCircle speed={0.5} scale={2} rotationAxis={[1, 0, 0]} />
      </motion.div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: bubbleCount }).map((_, i) => {
          const size = 50 + ((i * 10) % 80);
          const left = (i * 15) % 100;
          const delay = (i * 1.2) % 6;
          const duration = 20 + (i % 8);
          const opacity = 0.12 + (i % 4) * 0.04;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                bottom: "-150px",
                background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.7), rgba(20, 184, 166, 0.3) 50%, rgba(14, 116, 144, 0.15))`,
                border: "1px solid rgba(255, 255, 255, 0.25)",
                willChange: "transform",
              }}
              animate={{
                y: [0, -1200],
                opacity: [0, opacity, opacity, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear",
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 leading-tight"
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
          className="max-w-4xl space-y-6 text-lg md:text-xl leading-relaxed text-dark"
          style={{
            fontFamily: "var(--font-poppins)",
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
