"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

interface WorkItem {
  id: number;
  title: string;
  description: string;
  image: string;

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

      link: "https://omdah.sa",
    },
    {
      id: 2,
      title: language === "ar" ? "iedar العقارية" : "IEDAR Real Estate",
      description: language === "ar" ? "طورنا موقع شركة iedar العقارية بشكل مناسب لهويتهم الترويجية" : "We developed IEDAR real estate website to match their promotional identity",
      image: "/projcets-images/animage.png",

      link: "https://iedar.sa",
    },
    {
      id: 3,
      title: language === "ar" ? "وكالة الصناعية" : "Al-Sinaiya Agency",
      description: language === "ar" ? "طورنا منصة الصناعية بشكل عصري يتماشى مع توجههم الإعلامي" : "We developed Al-Sinaiya platform in a modern style aligned with their media direction",
      image: "/images/projects/snaya.png",

      link: "https://www.snaya.sa",
    },
    {
      id: 4,
      title: language === "ar" ? "الفا فاكتوري" : "Alpha Factory",
      description: language === "ar" ? "منصة شاملة لإدارة إنتاج الفيديو تشمل تتبع المشاريع، الفوترة التلقائية، وإشعارات متعددة القنوات" : "A comprehensive video production management platform with project tracking, automated invoicing, and multi-channel notifications",
      image: "/images/projects/AlphaFactory.png",
      link: "https://www.alphafactory.net/",
    },
    {
      id: 5,
      title: language === "ar" ? "مجلس الجمعيات الأهلية بالشرقية" : "Eastern Province NGO Council",
      description: language === "ar" ? "نظام إدارة المشاريع والمهام لمجلس الجمعيات الأهلية بالشرقية" : "Projects and tasks management system for the Eastern Province NGO Council",
      image: "/images/projects/shrgya.png",
    },
    {
      id: 6,
      title: language === "ar" ? "نظام فوري" : "Fawry System",
      description: language === "ar" ? "نظام فوري لتقديم خدمة المحادثة المباشرة داخل المواقع والأنظمة" : "An instant system for providing live chat service within websites and platforms",
      image: "/images/projects/contactapp.png",
      link: "https://fawry.trmyz.com/",
    },
  ];

  return (
    <div
      id="works"
      className="relative w-full overflow-hidden py-20 md:py-32"
    >
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

      {/* Ambient glow orbs — desktop only */}
      <div className="hidden md:block absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/[0.07] rounded-full blur-3xl" />
      <div className="hidden md:block absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-teal-500/[0.07] rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-10 md:mb-16">
          <h2
            className="text-3xl sm:text-4xl md:text-7xl font-bold mb-4 md:mb-6 text-white"
            style={{ fontFamily: "var(--font-devil-breeze)" }}
          >
            {t("works.title")}
          </h2>
          <p
            className="text-base md:text-xl text-slate-300/80 leading-relaxed"
            style={{ fontFamily: "var(--font-moshreq)" }}
          >
            {t("works.description")}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
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
                className="relative rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-3"
                style={{
                  background: "rgba(0, 20, 30, 0.6)",
                  borderColor: "rgba(103, 232, 249, 0.12)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(103, 232, 249, 0.35)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(103, 232, 249, 0.12)"; }}
              >
                {/* Image Container */}
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  {/* Gradient overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(180deg, transparent 0%, rgba(2, 6, 23, 0.85) 100%)",
                    }}
                  ></div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 relative">
                  <h3
                    className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-3 transition-all duration-300 group-hover:text-cyan-400"
                    style={{ fontFamily: "var(--font-devil-breeze)" }}
                  >
                    {work.title}
                  </h3>
                  <p
                    className="text-slate-400 text-sm leading-relaxed line-clamp-2 group-hover:text-slate-300 transition-colors duration-300"
                    style={{ fontFamily: "var(--font-moshreq)" }}
                  >
                    {work.description}
                  </p>

                  {/* View More Indicator */}
                  <div className="mt-4 flex items-center gap-2 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-moshreq)" }}>
                      {language === "ar" ? "عرض المشروع" : "View Project"}
                    </span>
                    <svg className={`w-4 h-4 transition-transform ${language === "ar" ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Bottom border accent */}
                <div className="h-1 w-full bg-gradient-to-r from-cyan-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Works;
