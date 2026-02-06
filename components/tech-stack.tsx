"use client";

import { CSSProperties } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

const panelStyle: CSSProperties = {
  background: "rgba(0, 20, 30, 0.6)",
  border: "1px solid rgba(103, 232, 249, 0.15)",
  boxShadow: "0 25px 60px rgba(0, 0, 0, 0.3)",
};

const cardStyle: CSSProperties = {
  background: "rgba(0, 30, 43, 0.7)",
  border: "1px solid rgba(103, 232, 249, 0.12)",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s ease",
};

const fadeGradient = (direction: "left" | "right" | "top" | "bottom") => {
  const base = "rgba(0, 20, 30, 0.95)";
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
    { name: "Coarzm", image: "/works/Coarzm_.PNG" },
    { name: "IEDAR", image: "/works/IEDAR_LOGO.png" },
    { name: "Client", image: "/works/IMG_6752.PNG" },
    { name: "Logo 2", image: "/works/Logo_2.png" },
    { name: "Logo 5", image: "/works/Logo_5.png" },
    { name: "Client", image: "/works/5ed7c3be-eb49-45d0-a6b2-2e5ca62c56ab_removalai_preview.png" },
  ];

  const technologies = [
    { name: "Next.js", image: "/tech/nextjs-icon.png" },
    { name: "Python", image: "/tech/python-logo.avif" },
    { name: "Node.js", image: "/tech/nod.png" },
    { name: "GitHub", image: "/tech/github-logo.png" },
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
      {/* Deep dark background matching hero */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#001e2b] to-slate-950" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(103, 232, 249, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(103, 232, 249, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ambient glow orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/[0.07] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/[0.07] rounded-full blur-[120px]" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT SIDE - CLIENTS MARQUEE */}
          <div className="flex flex-col h-full">
            <div className="rounded-2xl p-8 md:p-10" style={panelStyle}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h2
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                  style={{ fontFamily: "var(--font-devil-breeze)" }}
                >
                  {language === "ar" ? "عملاؤنا" : "Our Clients"}
                </h2>
                <p
                  className="text-lg md:text-xl text-slate-300/80"
                  style={{ fontFamily: "var(--font-moshreq)" }}
                >
                  {language === "ar"
                    ? "عملاء طوّرنا لهم أنظمتهم وسهّلنا عليهم التقنيات"
                    : "Trusted by industry leaders worldwide"}
                </p>
              </motion.div>

              {/* Horizontal Marquee for Small Screens */}
              <div className="relative overflow-hidden rounded-xl p-4 h-32 lg:hidden">
                <div
                  className="absolute left-0 top-0 bottom-0 w-16 z-20 pointer-events-none"
                  style={{ background: fadeGradient("left") }}
                ></div>
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
                        ...cardStyle,
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

              {/* Vertical Marquee Container - Desktop Only */}
              <div className="relative overflow-hidden rounded-xl p-6 h-[550px] hidden lg:block">
                <div
                  className="absolute top-0 left-0 right-0 h-32 z-20 pointer-events-none"
                  style={{ background: fadeGradient("top") }}
                ></div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none"
                  style={{ background: fadeGradient("bottom") }}
                ></div>

                <div className="grid grid-cols-2 gap-4 h-full">
                  {/* LEFT COLUMN - Scrolls UP */}
                  <motion.div
                    className="flex flex-col gap-4"
                    animate={{ y: ["0%", "-50%"] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    style={{ willChange: "transform" }}
                  >
                    {[...duplicatedClients, ...duplicatedClients]
                      .filter((_, i) => i % 2 === 0)
                      .map((client, index) => (
                        <div
                          key={`left-${index}`}
                          className="rounded-xl p-3 flex items-center justify-center"
                          style={cardStyle}
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
                    animate={{ y: ["-50%", "0%"] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    style={{ willChange: "transform" }}
                  >
                    {[...duplicatedClients, ...duplicatedClients]
                      .filter((_, i) => i % 2 === 1)
                      .map((client, index) => (
                        <div
                          key={`right-${index}`}
                          className="rounded-xl p-3 flex items-center justify-center"
                          style={cardStyle}
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
            <div className="rounded-2xl p-8 md:p-10" style={panelStyle}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h2
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                  style={{ fontFamily: "var(--font-devil-breeze)" }}
                >
                  {language === "ar" ? "تقنياتنا" : "Our Tech Stack"}
                </h2>
                <p
                  className="text-lg md:text-xl text-slate-300/80"
                  style={{ fontFamily: "var(--font-moshreq)" }}
                >
                  {language === "ar"
                    ? "نستخدم أحدث التقنيات لبناء حلول مبتكرة"
                    : "Powered by cutting-edge technologies"}
                </p>
              </motion.div>

              {/* Horizontal Marquee for Small Screens */}
              <div className="relative overflow-hidden rounded-xl p-4 h-32 lg:hidden">
                <div
                  className="absolute left-0 top-0 bottom-0 w-16 z-20 pointer-events-none"
                  style={{ background: fadeGradient("left") }}
                ></div>
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
                        ...cardStyle,
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
                    className="flex items-center justify-center"
                  >
                    <div
                      className="relative rounded-xl p-4 md:p-5 flex items-center justify-center hover:scale-[1.03] hover:border-cyan-500/30 transition-all duration-300"
                      style={cardStyle}
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
