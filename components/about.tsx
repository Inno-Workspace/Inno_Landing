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
  const bubbleCount = language === "ar" ? 12 : 20;

  return (
    <div id="about" className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "#f0fdfa" }}
      ></div>

      <motion.div
        className={`absolute bottom-[10%] ${
          language === "ar" ? "left-[3%]" : "right-[3%]"
        } w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[520px] md:h-[520px] z-5`}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <ThreeDCircle speed={0.5} scale={2} rotationAxis={[1, 0, 0]} />
      </motion.div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: bubbleCount }).map((_, i) => {
          const size = 40 + ((i * 7) % 100);
          const left = (i * 13) % 100;
          const delay = (i * 0.8) % 5;
          const duration = 15 + (i % 10);
          const opacity = 0.15 + (i % 5) * 0.05;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                bottom: "-150px",
                background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(20, 184, 166, 0.4) 50%, rgba(14, 116, 144, 0.2))`,
                boxShadow: `
                  inset 0 0 20px rgba(255, 255, 255, 0.5),
                  inset 10px 10px 20px rgba(255, 255, 255, 0.3),
                  0 0 20px rgba(14, 116, 144, 0.2)
                `,
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
              animate={{
                y: [0, -1200],
                x: [0, i % 2 === 0 ? 50 : -50, 0],
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
