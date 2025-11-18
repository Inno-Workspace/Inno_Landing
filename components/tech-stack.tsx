"use client";

import { CSSProperties } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

const panelStyle: CSSProperties = {
  background:
    "linear-gradient(160deg, rgba(10, 52, 63, 0.9), rgba(16, 93, 108, 0.85))",
  border: "1px solid rgba(146, 243, 255, 0.25)",
  boxShadow: "0 25px 60px rgba(5, 25, 32, 0.35)",
  backdropFilter: "blur(16px)",
};

const frostedCardStyle: CSSProperties = {
  background:
    "linear-gradient(140deg, rgba(18, 74, 88, 0.9), rgba(11, 113, 129, 0.85))",
  border: "1px solid rgba(146, 243, 255, 0.28)",
  boxShadow: "0 15px 32px rgba(6, 22, 28, 0.3)",
  backdropFilter: "blur(14px)",
};

const techCardStyle: CSSProperties = {
  background:
    "linear-gradient(145deg, rgba(15, 82, 95, 0.92), rgba(13, 129, 143, 0.85))",
  border: "1px solid rgba(146, 243, 255, 0.3)",
  boxShadow: "0 12px 24px rgba(7, 25, 30, 0.28)",
  backdropFilter: "blur(16px)",
};

const fadeGradient = (direction: "left" | "right" | "top" | "bottom") => {
  const base = "rgba(10, 52, 63, 0.92)";
  const gradientDirection =
    direction === "left"
      ? "to right"
      : direction === "right"
      ? "to left"
      : direction === "top"
      ? "to bottom"
      : "to top";

  return `linear-gradient(${gradientDirection}, ${base}, transparent)`;
};

const TechStack = () => {
  const { language } = useLanguage();

  const clients = [
    { name: "Next.js", image: "/tech/nextjs-icon.png" },
    { name: "Python", image: "/tech/python-logo.avif" },
    { name: "Node.js", image: "/tech/nod.png" },
    { name: "GitHub", image: "/tech/github-logo.png" },
    { name: "WordPress", image: "/tech/wp.png" },
    { name: "Sitecore", image: "/tech/Sitecore-LOGO.png" },
    { name: "Umbraco", image: "/tech/umbraco.avif" },
    { name: "Wagtail", image: "/tech/Wagtail-2.png" },
    { name: "Cloudflare", image: "/tech/cloudflare-logo.avif" },
    { name: "OpenAI", image: "/tech/open-ai.png" },
    { name: "Bard AI", image: "/tech/bard-ai.avif" },
  ];

  const technologies = [
    { name: "Next.js", image: "/tech/nextjs-icon.png" },
    { name: "Python", image: "/tech/python-logo.avif" },
    { name: "Node.js", image: "/tech/nod.png" },
    { name: "GitHub", image: "/tech/github-logo.png" },
    { name: "WordPress", image: "/tech/wp.png" },
    { name: "Sitecore", image: "/tech/Sitecore-LOGO.png" },
    { name: "Umbraco", image: "/tech/umbraco.avif" },
    { name: "Wagtail", image: "/tech/Wagtail-2.png" },
    { name: "Cloudflare", image: "/tech/cloudflare-logo.avif" },
    { name: "OpenAI", image: "/tech/open-ai.png" },
    { name: "Bard AI", image: "/tech/bard-ai.avif" },
  ];

  // Duplicate clients for seamless loop
  const duplicatedClients = [...clients, ...clients];

  return (
    <div className="relative w-full overflow-hidden py-20 md:py-32">
      {/* SVG Filters for texture effects */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="brush-texture-tech">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="8"
              result="displacement"
            />
          </filter>
          <filter id="spray-texture-tech">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.95"
              numOctaves="3"
              result="turbulence"
            />
            <feGaussianBlur in="turbulence" stdDeviation="2" result="blur" />
            <feColorMatrix
              in="blur"
              type="saturate"
              values="0"
              result="desaturated"
            />
          </filter>
          <filter id="noise-filter-tech">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
        </defs>
      </svg>

      {/* Base gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-primary"
        style={{
          transform: "translate3d(0, 0, 0)",
        }}
      ></div>


      {/* Optimized gradient overlays - combined layers */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 15% 25%, rgba(13, 148, 136, 0.3) 0%, transparent 60%),
            radial-gradient(ellipse 70% 50% at 85% 75%, rgba(13, 148, 136, 0.25) 0%, transparent 65%),
            radial-gradient(ellipse 50% 60% at 50% 50%, rgba(13, 148, 136, 0.28) 0%, transparent 70%)
          `,
          filter: "blur(50px)",
          willChange: "transform",
        }}
      ></div>

      {/* Optimized spray texture - combined vibrant layers */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle 30% at 18% 25%, rgba(6, 182, 212, 0.85) 0%, transparent 68%),
            radial-gradient(circle 35% at 78% 20%, rgba(14, 165, 233, 0.8) 0%, transparent 72%),
            radial-gradient(circle 32% at 62% 70%, rgba(20, 184, 166, 0.82) 0%, transparent 70%),
            radial-gradient(circle 38% at 48% 48%, rgba(14, 165, 233, 0.7) 0%, transparent 78%),
            radial-gradient(circle 10% at 15% 38%, rgba(56, 189, 248, 0.95) 0%, transparent 68%),
            radial-gradient(circle 12% at 72% 58%, rgba(34, 211, 238, 0.88) 0%, transparent 70%),
            radial-gradient(circle 9% at 88% 35%, rgba(103, 232, 249, 0.85) 0%, transparent 68%)
          `,
          filter: "blur(42px)",
          opacity: 1,
          willChange: "transform",
        }}
      ></div>

      {/* Fine spray dots - reduced count */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle 2.5% at 20% 15%, rgba(103, 232, 249, 0.95) 0%, transparent 55%),
            radial-gradient(circle 2.5% at 75% 25%, rgba(56, 189, 248, 0.92) 0%, transparent 58%),
            radial-gradient(circle 2.5% at 35% 65%, rgba(103, 232, 249, 0.9) 0%, transparent 54%),
            radial-gradient(circle 2.5% at 85% 48%, rgba(34, 211, 238, 0.93) 0%, transparent 53%),
            radial-gradient(circle 2.5% at 62% 55%, rgba(103, 232, 249, 0.88) 0%, transparent 55%)
          `,
          opacity: 0.75,
          willChange: "transform",
        }}
      ></div>

      {/* Optimized noise texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
          opacity: 0.28,
          willChange: "transform",
        }}
      ></div>

      {/* Optimized lighter spots */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle 25% at 22% 32%, rgba(56, 189, 248, 0.4) 0%, transparent 75%),
            radial-gradient(circle 28% at 72% 58%, rgba(34, 211, 238, 0.35) 0%, transparent 78%)
          `,
          filter: "blur(52px)",
          mixBlendMode: "screen",
          willChange: "transform",
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT SIDE - CLIENTS MARQUEE */}
          <div className="flex flex-col h-full">
            {/* Clients Container with Background */}
            <div className="rounded-2xl p-8 md:p-10" style={panelStyle}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h2
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4"
                  style={{ fontFamily: "var(--font-devil-breeze)" }}
                >
                  {language === "ar" ? "عملاؤنا" : "Our Clients"}
                </h2>
                <p
                  className="text-lg md:text-xl text-secondary"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {language === "ar"
                    ? "نفخر بالشراكة مع قادة الصناعة العالميين"
                    : "Trusted by industry leaders worldwide"}
                </p>
              </motion.div>

              {/* Horizontal Marquee for Small Screens */}
              <div className="relative overflow-hidden rounded-xl p-4 h-32 lg:hidden">
                {/* Left Fade */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-16 z-20 pointer-events-none"
                  style={{ background: fadeGradient("left") }}
                ></div>
                {/* Right Fade */}
                <div
                  className="absolute right-0 top-0 bottom-0 w-16 z-20 pointer-events-none"
                  style={{ background: fadeGradient("right") }}
                ></div>
                <motion.div
                  className="flex gap-4 h-full"
                  animate={{
                    x: language === "ar" ? [0, "50%"] : ["0%", "-50%"],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {duplicatedClients.map((client, index) => (
                    <div
                      key={`mobile-client-${index}`}
                      className="rounded-xl p-3 flex items-center justify-center shrink-0"
                      style={{
                        ...frostedCardStyle,
                        width: "100px",
                        height: "100px",
                      }}
                    >
                      <div className="relative w-16 h-16">
                        <Image
                          src={client.image}
                          alt={client.name}
                          fill
                          className="object-contain"
                          sizes="64px"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Vertical Marquee Container - Shows ~5 cards - Desktop Only */}
              <div className="relative overflow-hidden rounded-xl p-6 h-[550px] hidden lg:block">
                {/* Top Fade - Makes logos disappear at top */}
                <div
                  className="absolute top-0 left-0 right-0 h-32 z-20 pointer-events-none"
                  style={{ background: fadeGradient("top") }}
                ></div>

                {/* Bottom Fade - Makes logos disappear at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none"
                  style={{ background: fadeGradient("bottom") }}
                ></div>

                {/* Two Column Marquee - Opposite Directions */}
                <div className="grid grid-cols-2 gap-4 h-full">
                  {/* LEFT COLUMN - Scrolls UP */}
                  <motion.div
                    className="flex flex-col gap-4"
                    animate={{
                      y: ["0%", "-50%"],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ willChange: "transform" }}
                  >
                    {[...duplicatedClients, ...duplicatedClients]
                      .filter((_, i) => i % 2 === 0)
                      .map((client, index) => (
                        <div
                          key={`left-${index}`}
                          className="rounded-xl p-3 flex items-center justify-center"
                          style={frostedCardStyle}
                        >
                          <div className="relative w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32">
                            <Image
                              src={client.image}
                              alt={client.name}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 80px, (max-width: 1024px) 112px, 128px"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      ))}
                  </motion.div>

                  {/* RIGHT COLUMN - Scrolls DOWN */}
                  <motion.div
                    className="flex flex-col gap-4"
                    animate={{
                      y: ["-50%", "0%"],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ willChange: "transform" }}
                  >
                    {[...duplicatedClients, ...duplicatedClients]
                      .filter((_, i) => i % 2 === 1)
                      .map((client, index) => (
                        <div
                          key={`right-${index}`}
                          className="rounded-xl p-3 flex items-center justify-center"
                          style={frostedCardStyle}
                        >
                          <div className="relative w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32">
                            <Image
                              src={client.image}
                              alt={client.name}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 80px, (max-width: 1024px) 112px, 128px"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - TECH STACK GRID */}
          <div className="flex flex-col h-full">
            {/* Tech Stack Container with Background */}
            <div className="rounded-2xl p-8 md:p-10" style={panelStyle}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h2
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4"
                  style={{ fontFamily: "var(--font-devil-breeze)" }}
                >
                  {language === "ar" ? "تقنياتنا" : "Our Tech Stack"}
                </h2>
                <p
                  className="text-lg md:text-xl text-secondary"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {language === "ar"
                    ? "نستخدم أحدث التقنيات لبناء حلول مبتكرة"
                    : "Powered by cutting-edge technologies"}
                </p>
              </motion.div>

              {/* Horizontal Marquee for Small Screens */}
              <div className="relative overflow-hidden rounded-xl p-4 h-32 lg:hidden">
                {/* Left Fade */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-16 z-20 pointer-events-none"
                  style={{ background: fadeGradient("left") }}
                ></div>
                {/* Right Fade */}
                <div
                  className="absolute right-0 top-0 bottom-0 w-16 z-20 pointer-events-none"
                  style={{ background: fadeGradient("right") }}
                ></div>
                <motion.div
                  className="flex gap-4 h-full"
                  animate={{
                    x: language === "ar" ? [0, "50%"] : ["0%", "-50%"],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {[...technologies, ...technologies].map((tech, index) => (
                    <div
                      key={`mobile-tech-${index}`}
                      className="relative rounded-xl p-4 flex items-center justify-center shrink-0"
                      style={{
                        ...techCardStyle,
                        width: "100px",
                        height: "100px",
                      }}
                    >
                      <div className="relative w-16 h-16">
                        <Image
                          src={tech.image}
                          alt={tech.name}
                          fill
                          className="object-contain"
                          sizes="64px"
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Tech Grid - Desktop Only */}
              <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 lg:gap-6 xl:gap-8">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    whileHover={{ scale: 1.03 }}
                    className="flex items-center justify-center"
                    style={{ willChange: "transform" }}
                  >
                    <div
                      className="relative rounded-xl p-4 md:p-5 flex items-center justify-center"
                      style={techCardStyle}
                    >
                      <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
                        <Image
                          src={tech.image}
                          alt={tech.name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
