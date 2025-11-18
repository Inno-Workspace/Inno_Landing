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
      <div className="absolute inset-0 bg-gradient-primary"></div>

      {/* 3D Wireframe Gradient Effect */}
      <div className="absolute inset-0 overflow-hidden opacity-70">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="wireframeGradient-tech"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="var(--effect-wireframe-start)" />
              <stop offset="50%" stopColor="var(--effect-wireframe-mid)" />
              <stop offset="100%" stopColor="var(--effect-wireframe-end)" />
            </linearGradient>
            <radialGradient id="cornerFade-tech" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="70%" stopColor="white" stopOpacity="0.8" />
              <stop offset="100%" stopColor="white" stopOpacity="0.2" />
            </radialGradient>
            <mask id="wireframeMask-tech">
              <rect width="100%" height="100%" fill="url(#cornerFade-tech)" />
            </mask>
            <pattern
              id="wireframePattern-tech"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0,0 L100,0 M0,0 L0,100 M0,50 L100,50 M50,0 L50,100"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="1"
                fill="none"
              />
            </pattern>
          </defs>
          <g
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="1"
            fill="none"
            mask="url(#wireframeMask-tech)"
          >
            <path d="M0,100 Q200,80 400,100 T800,100 T1200,100" />
            <path d="M0,150 Q200,130 400,150 T800,150 T1200,150" />
            <path d="M0,200 Q200,180 400,200 T800,200 T1200,200" />
            <path d="M0,250 Q200,230 400,250 T800,250 T1200,250" />
            <path d="M0,300 Q200,280 400,300 T800,300 T1200,300" />
            <path d="M0,350 Q200,330 400,350 T800,350 T1200,350" />
            <path d="M0,400 Q200,380 400,400 T800,400 T1200,400" />
            <path d="M0,450 Q200,430 400,450 T800,450 T1200,450" />
            <path d="M0,500 Q200,480 400,500 T800,500 T1200,500" />
            <path d="M0,550 Q200,530 400,550 T800,550 T1200,550" />
            <path d="M0,600 Q200,580 400,600 T800,600 T1200,600" />
            <path d="M0,650 Q200,630 400,650 T800,650 T1200,650" />
            <path d="M0,700 Q200,680 400,700 T800,700 T1200,700" />

            <path d="M100,0 Q120,200 100,400 T100,800" />
            <path d="M200,0 Q220,200 200,400 T200,800" />
            <path d="M300,0 Q320,200 300,400 T300,800" />
            <path d="M400,0 Q420,200 400,400 T400,800" />
            <path d="M500,0 Q520,200 500,400 T500,800" />
            <path d="M600,0 Q620,200 600,400 T600,800" />
            <path d="M700,0 Q720,200 700,400 T700,800" />
            <path d="M800,0 Q820,200 800,400 T800,800" />
            <path d="M900,0 Q920,200 900,400 T900,800" />
            <path d="M1000,0 Q1020,200 1000,400 T1000,800" />
            <path d="M1100,0 Q1120,200 1100,400 T1100,800" />
          </g>
          <rect
            width="100%"
            height="100%"
            fill="url(#wireframeGradient-tech)"
            opacity="0.5"
            mask="url(#wireframeMask-tech)"
          />
        </svg>
      </div>

      {/* Radial gradient overlays with brush texture */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 15% 25%, var(--effect-brush) 0%, transparent 60%)`,
          filter: "blur(60px)",
          mixBlendMode: "multiply",
        }}
      ></div>

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 85% 75%, var(--effect-brush) 0%, transparent 65%)`,
          filter: "blur(70px)",
          mixBlendMode: "screen",
        }}
      ></div>

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 50% 60% at 50% 50%, var(--effect-brush) 0%, transparent 70%)`,
          filter: "blur(50px)",
          mixBlendMode: "multiply",
        }}
      ></div>

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 40% 30% at 80% 20%, var(--effect-brush) 0%, transparent 55%)`,
          filter: "blur(45px)",
          mixBlendMode: "overlay",
        }}
      ></div>

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 45% 35% at 20% 80%, var(--effect-brush) 0%, transparent 60%)`,
          filter: "blur(55px)",
          mixBlendMode: "screen",
        }}
      ></div>

      {/* Spray texture overlays */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle 8% at 25% 35%, var(--effect-spray) 0%, transparent 50%),
            radial-gradient(circle 6% at 65% 15%, var(--effect-spray) 0%, transparent 45%),
            radial-gradient(circle 7% at 80% 55%, var(--effect-spray) 0%, transparent 50%),
            radial-gradient(circle 5% at 15% 70%, var(--effect-spray) 0%, transparent 40%)
          `,
          filter: "blur(25px)",
          mixBlendMode: "overlay",
        }}
      ></div>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
          opacity: 0.2,
        }}
      ></div>

      {/* Overlay gradients */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, var(--effect-overlay-top), transparent, var(--effect-overlay-bottom))`,
        }}
      ></div>

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10 md:opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="geometric-pattern-tech"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0,0 L50,50 L100,0 L100,100 L50,50 L0,100 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-geometric-primary"
              />
              <path
                d="M25,25 L75,25 L50,75 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
                className="text-geometric-secondary"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geometric-pattern-tech)" />
        </svg>
      </div>

      {/* Radial gradients */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle, transparent, transparent, var(--effect-radial-end))`,
        }}
      ></div>
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: `radial-gradient(circle, var(--effect-radial-start), transparent, transparent)`,
        }}
      ></div>

      {/* Linear gradients */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, transparent, var(--effect-linear), transparent)`,
        }}
      ></div>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to left, transparent, var(--effect-linear), transparent)`,
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
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center"
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
