"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

interface WorkItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  link?: string;
}

const Works = () => {
  const { t, language } = useLanguage();

  // Work items
  const works: WorkItem[] = [
    {
      id: 1,
      title: language === "ar" ? "موقع الكتروني لعمدة" : "Omdah Website",
      description: language === "ar" ? "موقع الكتروني يظهر تعريف وخدمات شركة إنتاجية مميزة" : "A website showcasing the identity and services of a distinguished production company",
      image: "/projcets-images/theimage.png",
      category: language === "ar" ? "موقع الكتروني" : "Website",
      link: "https://omdah.sa",
    },
    {
      id: 2,
      title: language === "ar" ? "iedar العقارية" : "IEDAR Real Estate",
      description: language === "ar" ? "طورنا موقع شركة iedar العقارية بشكل مناسب لهويتهم الترويجية" : "We developed IEDAR real estate website to match their promotional identity",
      image: "/projcets-images/animage.png",
      category: language === "ar" ? "موقع الكتروني" : "Website",
      link: "https://iedar.sa",
    },
    {
      id: 3,
      title: language === "ar" ? "وكالة الصناعية" : "Al-Sinaiya Agency",
      description: language === "ar" ? "طورنا منصة الصناعية بشكل عصري يتماشى مع توجههم الإعلامي" : "We developed Al-Sinaiya platform in a modern style aligned with their media direction",
      image: "/projcets-images/image.png",
      category: language === "ar" ? "موقع الكتروني" : "Website",
      link: "https://www.snaya.sa",
    },
  ];

  return (
    <div
      id="works"
      className="relative w-full overflow-hidden py-20 md:py-32"
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-primary"></div>

      {/* Gradient overlays - combined layers */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 15% 25%, rgba(13, 148, 136, 0.3) 0%, transparent 60%),
            radial-gradient(ellipse 70% 50% at 85% 75%, rgba(13, 148, 136, 0.25) 0%, transparent 65%),
            radial-gradient(ellipse 50% 60% at 50% 50%, rgba(13, 148, 136, 0.28) 0%, transparent 70%)
          `,
        }}
      ></div>

      {/* Spray texture - combined layers */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle 28% at 15% 20%, rgba(20, 184, 166, 0.7) 0%, transparent 70%),
            radial-gradient(circle 32% at 80% 15%, rgba(14, 116, 144, 0.65) 0%, transparent 75%),
            radial-gradient(circle 30% at 65% 75%, rgba(20, 184, 166, 0.68) 0%, transparent 72%),
            radial-gradient(circle 35% at 45% 45%, rgba(14, 116, 144, 0.55) 0%, transparent 80%),
            radial-gradient(circle 8% at 12% 35%, rgba(146, 243, 255, 0.85) 0%, transparent 65%),
            radial-gradient(circle 10% at 75% 60%, rgba(146, 243, 255, 0.75) 0%, transparent 68%),
            radial-gradient(circle 7% at 25% 80%, rgba(146, 243, 255, 0.8) 0%, transparent 64%)
          `,
        }}
      ></div>

      {/* Fine spray dots */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle 2% at 18% 12%, rgba(146, 243, 255, 0.95) 0%, transparent 50%),
            radial-gradient(circle 2% at 78% 22%, rgba(146, 243, 255, 0.9) 0%, transparent 52%),
            radial-gradient(circle 2% at 32% 68%, rgba(146, 243, 255, 0.88) 0%, transparent 50%),
            radial-gradient(circle 2% at 88% 45%, rgba(146, 243, 255, 0.92) 0%, transparent 45%),
            radial-gradient(circle 2% at 65% 58%, rgba(146, 243, 255, 0.85) 0%, transparent 50%)
          `,
          opacity: 0.7,
        }}
      ></div>

      {/* Noise texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
          opacity: 0.25,
        }}
      ></div>

      {/* Lighter spots */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle 22% at 20% 30%, rgba(146, 243, 255, 0.28) 0%, transparent 70%),
            radial-gradient(circle 25% at 75% 60%, rgba(103, 232, 249, 0.24) 0%, transparent 75%)
          `,
          mixBlendMode: "screen",
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
            style={{ fontFamily: "var(--font-moshreq)" }}
          >
            {t("works.description")}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work) => (
            <a
              key={work.id}
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer"
            >
              {/* Card */}
              <div
                className="relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 hover:border-cyan-400/50 hover:bg-white/[0.08] hover:-translate-y-3 group-hover:shadow-2xl"
                style={{
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                }}
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-cyan-900/20 to-sky-800/20">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className="inline-block px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-300 group-hover:scale-105"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(103, 232, 249, 0.2), rgba(20, 184, 166, 0.25))",
                        border: "1px solid rgba(103, 232, 249, 0.4)",
                        color: "#ffffff",
                        fontFamily: "var(--font-moshreq)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      {work.category}
                    </span>
                  </div>

                  {/* Gradient overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(180deg, transparent 0%, rgba(4, 47, 46, 0.8) 100%)",
                    }}
                  ></div>
                </div>

                {/* Content */}
                <div className="p-6 relative">
                  <h3
                    className="text-2xl font-bold text-primary mb-3 transition-all duration-300 group-hover:text-accent"
                    style={{ fontFamily: "var(--font-devil-breeze)" }}
                  >
                    {work.title}
                  </h3>
                  <p
                    className="text-secondary/70 text-sm leading-relaxed line-clamp-2 group-hover:text-secondary/90 transition-colors duration-300"
                    style={{ fontFamily: "var(--font-moshreq)" }}
                  >
                    {work.description}
                  </p>

                  {/* View More Indicator */}
                  <div className="mt-4 flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-moshreq)" }}>
                      {language === "ar" ? "عرض المشروع" : "View Project"}
                    </span>
                    <svg className={`w-4 h-4 transition-transform ${language === "ar" ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Bottom border accent */}
                <div
                  className="h-1 w-full transition-all duration-500 bg-gradient-to-r from-cyan-400 via-sky-400 to-sky-500 opacity-0 group-hover:opacity-100 group-hover:shadow-lg"
                  style={{
                    boxShadow: "0 0 20px rgba(103, 232, 249, 0.5)",
                  }}
                ></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Works;
