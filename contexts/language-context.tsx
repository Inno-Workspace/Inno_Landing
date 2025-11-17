"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isTransitioning: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  en: {
    "header.logo": "INNO",
    "menu.home": "Home",
    "menu.about": "About",
    "menu.services": "Services",
    "menu.contact": "Contact",
    "hero.innovation": "innovation",
    "hero.title": "Your Best Technical Partner",
    "about.title": "How do we make your work easier?",
    "about.paragraph1":
      "Inno is a technology company specialized in empowering businesses through building advanced digital solutions. We work as a technical partner that provides vision, implementation, and operation of systems that help companies grow, develop their way of working, and improve their customer experience.",
    "about.paragraph2":
      "We develop digital platforms and provide automation and artificial intelligence solutions, and work on transforming traditional processes into flexible workflows that operate with higher efficiency and clearer results. Our focus is on building scalable, understandable, and easy-to-use solutions, with a solid technical foundation that lasts for years.",
  },
  ar: {
    "header.logo": "إينو",
    "menu.home": "الرئيسية",
    "menu.about": "من نحن",
    "menu.services": "الخدمات",
    "menu.contact": "تواصل معنا",
    "hero.innovation": "إينو",
    "hero.title": "شريكك التقني الأمثل",
    "about.title": "كيف نسهل عليك عملك؟",
    "about.paragraph1":
      "إينو هي شركة تقنية متخصصة في تمكين الأعمال من خلال بناء حلول رقمية متطورة. نعمل كشريك تقني يقدم الرؤية والتنفيذ والتشغيل لأنظمة تساعد الشركات على النمو وتطوير طريقة عملها وتحسين تجربة عملائها.",
    "about.paragraph2":
      "نطوّر منصات رقمية ونقدّم حلول أتمتة وذكاء اصطناعي، ونعمل على تحويل العمليات التقليدية إلى مسارات عمل مرنة تعمل بكفاءة أعلى ونتائج أوضح. تركيزنا على بناء حلول قابلة للتطوير ومفهومة وسهلة الاستخدام، مع بنية تقنية ثابتة تدوم لسنوات.",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [isTransitioning] = useState(false);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[language][key as keyof typeof translations.en] || key;
    },
    [language]
  );

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const contextValue = useMemo(
    () => ({ language, toggleLanguage, t, isTransitioning }),
    [language, toggleLanguage, t, isTransitioning]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
