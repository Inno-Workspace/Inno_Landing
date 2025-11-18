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
    "menu.works": "Works",
    "menu.contact": "Contact",
    "hero.innovation": "innovation",
    "hero.title": "Your Best Technical Partner",
    "about.title": "How do we make your work easier?",
    "about.paragraph1":
      "Inno is a technology company specialized in empowering businesses through building advanced digital solutions. We work as a technical partner that provides vision, implementation, and operation of systems that help companies grow, develop their way of working, and improve their customer experience.",
    "about.paragraph2":
      "We develop digital platforms and provide automation and artificial intelligence solutions, and work on transforming traditional processes into flexible workflows that operate with higher efficiency and clearer results. Our focus is on building scalable, understandable, and easy-to-use solutions, with a solid technical foundation that lasts for years.",
    "works.title": "Our Works",
    "works.subtitle": "Showcasing Excellence in Digital Innovation",
    "works.description":
      "Explore our portfolio of successful projects that demonstrate our expertise in creating cutting-edge digital solutions. Each project represents our commitment to quality, innovation, and client success.",
    "works.category.web": "Web Development",
    "works.category.mobile": "Mobile App",
    "works.category.ai": "AI Solutions",
    "works.item1.title": "Enterprise Platform",
    "works.item1.description":
      "A comprehensive enterprise solution that transformed business operations with advanced automation and seamless integration.",
    "works.item2.title": "Mobile Application",
    "works.item2.description":
      "A cutting-edge mobile app that delivers exceptional user experience with modern design and powerful features.",
    "works.item3.title": "AI-Powered System",
    "works.item3.description":
      "An intelligent system leveraging artificial intelligence to optimize processes and deliver actionable insights.",
    "works.item4.title": "E-Commerce Platform",
    "works.item4.description":
      "A robust e-commerce solution that drives sales and enhances customer experience with innovative features.",
    "contact.title": "Get In Touch",
    "contact.subtitle": "Let's Build Something Amazing Together",
    "contact.description":
      "Ready to transform your business with cutting-edge technology? We're here to help you achieve your goals. Reach out to us and let's discuss how we can bring your vision to life.",
    "contact.form.name": "Name",
    "contact.form.namePlaceholder": "Your name",
    "contact.form.email": "Email",
    "contact.form.emailPlaceholder": "your.email@example.com",
    "contact.form.message": "Message",
    "contact.form.messagePlaceholder": "Tell us about your project...",
    "contact.form.submit": "Send Message",
    "contact.info.title": "Contact Information",
    "contact.info.emailLabel": "Email",
    "contact.info.phoneLabel": "Phone",
    "contact.info.addressLabel": "Address",
    "contact.info.address": "123 Innovation Street, Tech City, TC 12345",
    "footer.tagline": "Your Best Technical Partner",
    "footer.social.title": "Our Accounts",
    "footer.contact.title": "Contact",
    "footer.contact.email": "contact@inno.sa",
    "footer.contact.phone": "+966 55 555 5555",
    "footer.contact.address": "Riyadh, Saudi Arabia",
    "footer.copyright": "All rights reserved.",
  },
  ar: {
    "header.logo": "إينو",
    "menu.home": "الرئيسية",
    "menu.about": "من نحن",
    "menu.works": "أعمالنا",
    "menu.contact": "تواصل معنا",
    "hero.innovation": "إينو",
    "hero.title": "شريكك التقني الأمثل",
    "about.title": "كيف نسهل عليك عملك؟",
    "about.paragraph1":
      "إينو هي شركة تقنية متخصصة في تمكين الأعمال من خلال بناء حلول رقمية متطورة. نعمل كشريك تقني يقدم الرؤية والتنفيذ والتشغيل لأنظمة تساعد الشركات على النمو وتطوير طريقة عملها وتحسين تجربة عملائها.",
    "about.paragraph2":
      "نطوّر منصات رقمية ونقدّم حلول أتمتة وذكاء اصطناعي، ونعمل على تحويل العمليات التقليدية إلى مسارات عمل مرنة تعمل بكفاءة أعلى ونتائج أوضح. تركيزنا على بناء حلول قابلة للتطوير ومفهومة وسهلة الاستخدام، مع بنية تقنية ثابتة تدوم لسنوات.",
    "works.title": "أعمالنا",
    "works.subtitle": "عرض التميز في الابتكار الرقمي",
    "works.description":
      "استكشف محفظة مشاريعنا الناجحة التي تُظهر خبرتنا في إنشاء حلول رقمية متطورة. يمثل كل مشروع التزامنا بالجودة والابتكار ونجاح العملاء.",
    "works.category.web": "تطوير الويب",
    "works.category.mobile": "تطبيق موبايل",
    "works.category.ai": "حلول الذكاء الاصطناعي",
    "works.item1.title": "منصة المؤسسات",
    "works.item1.description":
      "حل مؤسسي شامل حوّل عمليات الأعمال بأتمتة متقدمة وتكامل سلس.",
    "works.item2.title": "تطبيق موبايل",
    "works.item2.description":
      "تطبيق موبايل متطور يوفر تجربة مستخدم استثنائية بتصميم عصري وميزات قوية.",
    "works.item3.title": "نظام مدعوم بالذكاء الاصطناعي",
    "works.item3.description":
      "نظام ذكي يستفيد من الذكاء الاصطناعي لتحسين العمليات وتقديم رؤى قابلة للتنفيذ.",
    "works.item4.title": "منصة التجارة الإلكترونية",
    "works.item4.description":
      "حل تجارة إلكترونية قوي يعزز المبيعات ويحسّن تجربة العملاء بميزات مبتكرة.",
    "contact.title": "تواصل معنا",
    "contact.subtitle": "لنبني شيئاً رائعاً معاً",
    "contact.description":
      "هل أنت مستعد لتحويل عملك بتقنيات متطورة؟ نحن هنا لمساعدتك في تحقيق أهدافك. تواصل معنا ودعنا نناقش كيف يمكننا تحويل رؤيتك إلى واقع.",
    "contact.form.name": "الاسم",
    "contact.form.namePlaceholder": "اسمك",
    "contact.form.email": "البريد الإلكتروني",
    "contact.form.emailPlaceholder": "بريدك@example.com",
    "contact.form.message": "الرسالة",
    "contact.form.messagePlaceholder": "أخبرنا عن مشروعك...",
    "contact.form.submit": "إرسال الرسالة",
    "contact.info.title": "معلومات الاتصال",
    "contact.info.emailLabel": "البريد الإلكتروني",
    "contact.info.phoneLabel": "الهاتف",
    "contact.info.addressLabel": "العنوان",
    "contact.info.address": "شارع الابتكار 123، مدينة التقنية، 12345",
    "footer.tagline": "شريكك التقني الأمثل",
    "footer.social.title": "حساباتنا",
    "footer.contact.title": "التواصل",
    "footer.contact.email": "contact@inno.sa",
    "footer.contact.phone": "+9665555555555",
    "footer.contact.address": "الرياض , المملكة العربية السعودية",
    "footer.copyright": "جميع الحقوق محفوظة.",
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
