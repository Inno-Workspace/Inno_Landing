"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

interface WorkItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const Works = () => {
  const { t } = useLanguage();

  // Work items
  const works: WorkItem[] = [
    {
      id: 1,
      title: t("works.item1.title"),
      description: t("works.item1.description"),
      image: "/images/projects/AdminDash.png",
      category: t("works.category.web"),
    },
    {
      id: 2,
      title: t("works.item2.title"),
      description: t("works.item2.description"),
      image: "/images/projects/AIChatBot.png",
      category: t("works.category.mobile"),
    },
    {
      id: 3,
      title: t("works.item3.title"),
      description: t("works.item3.description"),
      image: "/images/projects/IphoneShowCase.png",
      category: t("works.category.ai"),
    },
    {
      id: 4,
      title: t("works.item4.title"),
      description: t("works.item4.description"),
      image: "/images/projects/LandingPage.png",
      category: t("works.category.web"),
    },
    {
      id: 5,
      title: t("works.item1.title"),
      description: t("works.item1.description"),
      image: "/images/projects/SaasLandingPage.png",
      category: t("works.category.web"),
    },
    {
      id: 6,
      title: t("works.item2.title"),
      description: t("works.item2.description"),
      image: "/images/projects/AdminDash.png",
      category: t("works.category.mobile"),
    },
  ];

  return (
    <div
      id="works"
      className="relative w-full overflow-hidden py-20 md:py-32"
    >
      {/* Base gradient background - same as hero */}
      <div className="absolute inset-0 bg-gradient-primary"></div>

      {/* Radial gradient overlays with brush texture - same as hero */}
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

      {/* Spray texture overlays - same as hero */}
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

      {/* Heavy spray paint texture - large splotches */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle 25% at 15% 20%, rgba(20, 184, 166, 0.8) 0%, rgba(20, 184, 166, 0.4) 30%, transparent 70%),
            radial-gradient(circle 30% at 80% 15%, rgba(14, 116, 144, 0.7) 0%, rgba(14, 116, 144, 0.3) 35%, transparent 75%),
            radial-gradient(circle 28% at 65% 75%, rgba(20, 184, 166, 0.75) 0%, rgba(20, 184, 166, 0.35) 32%, transparent 72%),
            radial-gradient(circle 20% at 30% 65%, rgba(15, 118, 110, 0.8) 0%, rgba(15, 118, 110, 0.4) 30%, transparent 68%),
            radial-gradient(circle 35% at 45% 45%, rgba(14, 116, 144, 0.6) 0%, rgba(14, 116, 144, 0.25) 40%, transparent 80%),
            radial-gradient(circle 18% at 88% 50%, rgba(20, 184, 166, 0.85) 0%, rgba(20, 184, 166, 0.45) 28%, transparent 65%)
          `,
          filter: "blur(50px) contrast(1.3)",
          opacity: 1,
        }}
      ></div>

      {/* Medium spray particles */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle 8% at 12% 35%, rgba(146, 243, 255, 0.9) 0%, rgba(146, 243, 255, 0.4) 40%, transparent 65%),
            radial-gradient(circle 6% at 55% 25%, rgba(146, 243, 255, 0.85) 0%, rgba(146, 243, 255, 0.35) 38%, transparent 62%),
            radial-gradient(circle 10% at 75% 60%, rgba(146, 243, 255, 0.8) 0%, rgba(146, 243, 255, 0.4) 42%, transparent 68%),
            radial-gradient(circle 7% at 25% 80%, rgba(146, 243, 255, 0.9) 0%, rgba(146, 243, 255, 0.38) 40%, transparent 64%),
            radial-gradient(circle 9% at 90% 30%, rgba(146, 243, 255, 0.82) 0%, rgba(146, 243, 255, 0.36) 40%, transparent 66%),
            radial-gradient(circle 5% at 40% 55%, rgba(146, 243, 255, 0.88) 0%, rgba(146, 243, 255, 0.42) 38%, transparent 60%)
          `,
          filter: "blur(15px)",
          opacity: 0.9,
        }}
      ></div>

      {/* Fine spray mist - visible dots */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle 2% at 18% 12%, rgba(146, 243, 255, 1) 0%, transparent 50%),
            radial-gradient(circle 1.5% at 45% 35%, rgba(146, 243, 255, 0.95) 0%, transparent 48%),
            radial-gradient(circle 2.5% at 78% 22%, rgba(146, 243, 255, 1) 0%, transparent 52%),
            radial-gradient(circle 2% at 32% 68%, rgba(146, 243, 255, 0.9) 0%, transparent 50%),
            radial-gradient(circle 1.5% at 88% 45%, rgba(146, 243, 255, 1) 0%, transparent 45%),
            radial-gradient(circle 2.5% at 12% 78%, rgba(146, 243, 255, 0.92) 0%, transparent 53%),
            radial-gradient(circle 2% at 65% 58%, rgba(146, 243, 255, 0.88) 0%, transparent 50%),
            radial-gradient(circle 1.5% at 55% 88%, rgba(146, 243, 255, 0.95) 0%, transparent 48%),
            radial-gradient(circle 2% at 92% 72%, rgba(146, 243, 255, 0.9) 0%, transparent 50%),
            radial-gradient(circle 2.5% at 8% 42%, rgba(146, 243, 255, 1) 0%, transparent 52%),
            radial-gradient(circle 1.5% at 62% 18%, rgba(146, 243, 255, 0.93) 0%, transparent 47%),
            radial-gradient(circle 2% at 38% 48%, rgba(146, 243, 255, 0.87) 0%, transparent 50%),
            radial-gradient(circle 2.5% at 82% 82%, rgba(146, 243, 255, 0.96) 0%, transparent 52%),
            radial-gradient(circle 1.5% at 22% 52%, rgba(146, 243, 255, 0.91) 0%, transparent 48%),
            radial-gradient(circle 2% at 72% 38%, rgba(146, 243, 255, 0.94) 0%, transparent 50%)
          `,
          filter: "blur(1px)",
          opacity: 0.8,
        }}
      ></div>

      {/* Heavy noise grain for spray texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
          opacity: 0.35,
        }}
      ></div>

      {/* Lighter spots - adds brightness to background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle 20% at 20% 30%, rgba(146, 243, 255, 0.3) 0%, transparent 70%),
            radial-gradient(circle 25% at 75% 60%, rgba(103, 232, 249, 0.25) 0%, transparent 75%),
            radial-gradient(circle 18% at 50% 80%, rgba(146, 243, 255, 0.28) 0%, transparent 68%)
          `,
          filter: "blur(60px)",
          mixBlendMode: "screen",
        }}
      ></div>

      {/* Overlay gradients - same as hero */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, var(--effect-overlay-top), transparent, var(--effect-overlay-bottom))`,
        }}
      ></div>

      {/* Radial gradients - same as hero */}
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

      {/* Linear gradients - same as hero */}
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
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h2
            className="text-5xl md:text-7xl font-bold mb-6 text-primary"
            style={{ fontFamily: "var(--font-devil-breeze)" }}
          >
            {t("works.title")}
          </h2>
          <p
            className="text-xl text-secondary/80 leading-relaxed"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {t("works.description")}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work) => (
            <div
              key={work.id}
              className="group cursor-pointer"
            >
              {/* Card */}
              <div 
                className="relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.07] hover:-translate-y-2"
                style={{
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-cyan-900/20 to-sky-800/20">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span 
                      className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                      style={{
                        background: "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        color: "#ffffff",
                        fontFamily: "var(--font-poppins)",
                      }}
                    >
                      {work.category}
                    </span>
                  </div>
                  
                  {/* Gradient overlay on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(180deg, transparent 0%, rgba(4, 47, 46, 0.8) 100%)",
                    }}
                  ></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300"
                    style={{ fontFamily: "var(--font-devil-breeze)" }}
                  >
                    {work.title}
                  </h3>
                  <p
                    className="text-secondary/70 text-sm leading-relaxed line-clamp-2"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {work.description}
                  </p>
                </div>

                {/* Bottom border accent */}
                <div 
                  className="h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-cyan-400 to-sky-500"
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Works;
