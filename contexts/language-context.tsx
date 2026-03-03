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
    "contact.whatsapp.title": "Message Us Instantly",
    "contact.whatsapp.description": "Skip the wait — get a direct response through WhatsApp. We're just a message away.",
    "contact.whatsapp.button": "Start a Conversation",
    "contact.whatsapp.prefill": "Hello! I'm interested in your services.",
    "contact.info.title": "Contact Information",
    "contact.info.emailLabel": "Email",
    "contact.info.phoneLabel": "Phone",
    "contact.info.addressLabel": "Address",
    "contact.info.address": "Riyadh, Saudi Arabia",
    "plans.title": "Our Plans",
    "plans.subtitle": "Solutions tailored for every business",
    "plans.cta": "Buy Now",
    "plans.popular": "Most Popular",
    "plans.currency": "SAR",
    "plans.plan1.title": "Professional Website",
    "plans.plan1.subtitle": "Personal | Business",
    "plans.plan1.desc": "A fast, professional website that showcases your services and brings you clients.",
    "plans.plan1.price": "2100",
    "plans.plan1.f1": "Delivery in 7 days",
    "plans.plan1.f2": "Responsive design for all devices",
    "plans.plan1.f3": "Website in Arabic & English",
    "plans.plan1.f4": "Custom design matching your brand identity",
    "plans.plan1.f5": "Free hosting for 3 months",
    "plans.plan1.f6": "Free domain for 1 year",
    "plans.plan2.title": "Business Management System",
    "plans.plan2.desc": "A custom internal system designed around your exact workflow — not a ready-made template.",
    "plans.plan2.price": "2999",
    "plans.plan2.f1": "Custom system built for your business",
    "plans.plan2.f2": "Delivery in 12 days",
    "plans.plan2.f3": "Responsive design for all devices",
    "plans.plan2.f4": "Admin dashboard",
    "plans.plan2.f5": "Website in Arabic & English",
    "plans.plan2.f6": "Free hosting for 3 months",
    "plans.plan2.f7": "Free domain for 1 year",
    "plans.plan3.title": "Booking System",
    "plans.plan3.desc": "A complete booking system so your clients book online — no more missed appointments.",
    "plans.plan3.price": "1500",
    "plans.plan3.f1": "Custom booking system with a simple interface",
    "plans.plan3.f2": "Delivery in 12 days",
    "plans.plan3.f3": "Responsive design for all devices",
    "plans.plan3.f4": "Website in Arabic & English",
    "plans.plan3.f5": "Admin dashboard",
    "plans.plan3.f6": "Free hosting for 3 months",
    "plans.plan3.f7": "Free domain for 1 year",
    "plans.custom.title": "Custom Solutions",
    "plans.custom.desc": "We build custom tech solutions for the problems you face.",
    "plans.custom.cta": "Contact Us",
    "footer.tagline": "Your Best Technical Partner",
    "footer.social.title": "Resources",
    "footer.contact.title": "Contact",
    "footer.contact.email": "contact@inno.sa",
    "footer.contact.phone": "+966 55 562 5068",
    "footer.contact.address": "Riyadh, Saudi Arabia",
    "footer.copyright": "All rights reserved.",
  },
  ar: {
    "header.logo": "اينو",
    "menu.home": "الرئيسية",
    "menu.about": "من نحن",
    "menu.works": "أعمالنا",
    "menu.contact": "تواصل معنا",
    "hero.innovation": "اينو",
    "hero.title": "شريكك التقني",
    "about.title": "كيف نشيل مسؤولية التقنية عنك\u00A0؟",
    "about.paragraph1":
      "باينو حنا متخصصين بتمكين الأعمال وإيجاد حلول تقنية تسهّل عليك عملك بأي مجال كان ، قد طوّرنا منصات رقمية قدمنا حلول أتمتة وذكاء إصطناعي ، وواحدة من أهدافنا هي تحويل العمليات التقليدية إلى تقنيات الكترونية مرنة تمشّي لك عملك بكل سهولة .",
    "about.paragraph2":
      "يعني لا تشيل هم التقنية وحنا بنطوّر وندير لك التقنية بمشروعك كامل .",
    "works.title": "أعمالنا",
    "works.subtitle": "أعمالنا",
    "works.description":
      "طوّرنا مواقع وأنظمة كثير عملاء ، التطوير ماكان فقط تقني ، التطوير كان بأساس التقنيات داخل الكيانات وبسّطنا كثير أمور",
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
    "contact.title": "خلّك من ضمن عملائنا",
    "contact.subtitle": "تواصل معنا عشان نبدأ تعاون يطوّر من مشروعك",
    "contact.description": "",
    "contact.whatsapp.title": "كلّمنا",
    "contact.whatsapp.description": "بدون لا تنتظر كثير ، تواصل معنا وبنرد عليك أسرع مما تتخيل",
    "contact.whatsapp.button": "ابدأ المحادثة",
    "contact.whatsapp.prefill": "مرحباً! أنا مهتم بخدماتكم.",
    "contact.info.title": "معلومات الاتصال",
    "contact.info.emailLabel": "البريد الإلكتروني",
    "contact.info.phoneLabel": "الهاتف",
    "contact.info.addressLabel": "العنوان",
    "contact.info.address": "الرياض , المملكة العربية السعودية",
    "plans.title": "باقاتنا",
    "plans.subtitle": "حلول مصممة لكل نوع مشروع",
    "plans.cta": "شراء",
    "plans.popular": "الأكثر طلباً",
    "plans.currency": "ر.س",
    "plans.plan1.title": "موقع تعريفي",
    "plans.plan1.subtitle": "شخصي | تجاري",
    "plans.plan1.desc": "موقع احترافي سريع يعرض خدماتك ويجيب لك عملاء.",
    "plans.plan1.price": "2100",
    "plans.plan1.f1": "تسليم خلال 7 أيام",
    "plans.plan1.f2": "واجهة مناسبة لجميع الأجهزة",
    "plans.plan1.f3": "الموقع باللغتين العربية والانجليزية",
    "plans.plan1.f4": "واجهة بستايل خاصة فيك ومناسب للهوية البصرية",
    "plans.plan1.f5": "إستضافة مجانية لمدة 3 أشهر",
    "plans.plan1.f6": "دومين مجاني لمده سنة",
    "plans.plan2.title": "نظام إدارة أعمال",
    "plans.plan2.desc": "نظام داخلي مصمم حسب طريقة شغلك بالضبط — مو قالب جاهز.",
    "plans.plan2.price": "2999",
    "plans.plan2.f1": "إعداد نظام خاص بالبزنس الخاص فيك",
    "plans.plan2.f2": "تسليم خلال 12 يوم",
    "plans.plan2.f3": "واجهة مناسبة لجميع الأجهزة",
    "plans.plan2.f4": "واجهة أدمن (اداري)",
    "plans.plan2.f5": "الموقع باللغتين العربية والانجليزية",
    "plans.plan2.f6": "إستضافة مجانية لمدة 3 أشهر",
    "plans.plan2.f7": "دومين مجاني لمدة سنة",
    "plans.plan3.title": "نظام حجوزات",
    "plans.plan3.desc": "نظام حجوزات متكامل يخلّي عملاءك يحجزون أونلاين — بدون فوضى.",
    "plans.plan3.price": "1500",
    "plans.plan3.f1": "إعداد نظام حجوزات خاص فيك بواجهة بسيطة",
    "plans.plan3.f2": "تسليم خلال 12 يوم",
    "plans.plan3.f3": "واجهة مناسبة لجميع الأجهزة",
    "plans.plan3.f4": "الموقع باللغتين العربية والانجليزية",
    "plans.plan3.f5": "واجهة أدمن (اداري)",
    "plans.plan3.f6": "إستضافة مجانية لمدة 3 أشهر",
    "plans.plan3.f7": "دومين مجاني لمده سنة",
    "plans.custom.title": "الحلول التقنية",
    "plans.custom.desc": "نطور لك حلول تقنية للمشاكل الي تواجهك.",
    "plans.custom.cta": "تواصل معنا",
    "footer.tagline": "شريكك التقني",
    "footer.social.title": "المصادر",
    "footer.contact.title": "التواصل",
    "footer.contact.email": "contact@inno.sa",
    "footer.contact.phone": "+966 55 562 5068",
    "footer.contact.address": "الرياض , المملكة العربية السعودية",
    "footer.copyright": "جميع الحقوق محفوظة.",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar"); // Default to Arabic
  const [isTransitioning] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Mark as mounted on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load saved language preference on mount
  useEffect(() => {
    if (!isMounted) return;
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      setLanguage(savedLanguage);
    }
  }, [isMounted]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const newLang = prev === "en" ? "ar" : "en";
      // Save to localStorage
      localStorage.setItem("language", newLang);
      return newLang;
    });
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[language][key as keyof typeof translations.en] || key;
    },
    [language]
  );

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    }
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
