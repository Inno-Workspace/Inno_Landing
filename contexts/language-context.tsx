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
    "menu.plans": "Plans & Pricing",
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
    "plans.plan1.title": "Professional Websites",
    "plans.plan1.subtitle": "A professional website that reflects your company's strength",
    "plans.plan1.desc": "We design fast, mobile-friendly websites ready to attract clients. Perfect for businesses that want an official and professional digital presence.",
    "plans.plan1.price": "2100",
    "plans.plan1.f1": "Custom design",
    "plans.plan1.f2": "Delivery in 7 days",
    "plans.plan1.f3": "SEO optimization",
    "plans.plan1.f4": "Admin dashboard",
    "plans.plan1.f5": "Responsive design for all devices",
    "plans.plan1.f6": "Website in Arabic & English",
    "plans.plan1.f7": "Free hosting for 3 months",
    "plans.plan1.f8": "Free domain for 1 year",
    "plans.plan2.title": "Internal Operating System",
    "plans.plan2.subtitle": "A custom system to manage your business efficiently",
    "plans.plan2.desc": "We develop a system tailored to your company's workflow — to manage clients, tasks, invoices, and reports in one place.",
    "plans.plan2.price": "2999",
    "plans.plan2.f1": "Design based on your needs",
    "plans.plan2.f2": "Delivery in 12 days",
    "plans.plan2.f3": "High security",
    "plans.plan2.f4": "Scalable",
    "plans.plan2.f5": "Clear reports",
    "plans.plan2.f6": "Responsive design for all devices",
    "plans.plan2.f7": "Admin dashboard",
    "plans.plan2.f8": "Website in Arabic & English",
    "plans.plan2.f9": "Free hosting for 3 months",
    "plans.plan2.f10": "Free domain for 1 year",
    "plans.plan3.title": "Online Booking System",
    "plans.plan3.subtitle": "Receive bookings automatically — no hassle",
    "plans.plan3.desc": "An integrated booking platform for clinics, centers, and consultants with automatic reminders and daily reports.",
    "plans.plan3.price": "1500",
    "plans.plan3.f1": "Custom booking system with a simple interface",
    "plans.plan3.f2": "Delivery in 12 days",
    "plans.plan3.f3": "Responsive design for all devices",
    "plans.plan3.f4": "Website in Arabic & English",
    "plans.plan3.f5": "Performance reports",
    "plans.plan3.f6": "Admin dashboard",
    "plans.plan3.f7": "Free hosting for 3 months",
    "plans.plan3.f8": "Free domain for 1 year",
    "plans.custom.title": "Custom Solutions",
    "plans.custom.desc": "We build custom tech solutions for the problems you face.",
    "plans.custom.cta": "Contact Us",
    "order.pageTitle": "Let's start your project",
    "order.step": "Step 1 of 2",
    "order.selectedPlan": "Selected Plan",
    "order.name": "Full Name",
    "order.namePlaceholder": "Enter your full name",
    "order.phone": "Phone Number",
    "order.phonePlaceholder": "05XXXXXXXX",
    "order.email": "Email",
    "order.emailPlaceholder": "example@email.com",
    "order.business": "Business Activity",
    "order.businessPlaceholder": "e.g. Restaurant, Gym, Clinic...",
    "order.hasIdentity": "Do you have a visual identity?",
    "order.identityYes": "Yes",
    "order.identityNo": "No",
    "order.country": "Business Country",
    "order.countryPlaceholder": "e.g. Saudi Arabia",
    "order.description": "Brief description of your need",
    "order.descriptionPlaceholder": "Tell us what you need in a few words...",
    "order.cta": "Proceed to Payment",
    "order.footer": "Contact us if you have any questions",
    "payment.greeting": "Welcome {name}, please choose the suitable payment method",
    "payment.step": "Step 2 of 2",
    "payment.serviceSummary": "Service Summary",
    "payment.price": "Price",
    "payment.priceSuffix": "SAR",
    "payment.method1": "Payment Method 1",
    "payment.method2": "Payment Method 2",
    "payment.method3": "Payment Method 3",
    "payment.note": "Note",
    "payment.noteText": "We will contact you and start the order within 24 hours maximum",
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
    "menu.about": "من نحن ؟",
    "menu.plans": "المنتجات",
    "menu.works": "أعمالنا",
    "menu.contact": "تواصل معنا",
    "hero.innovation": "اينو",
    "hero.title": "منتجك الإلكتروني جاهز خلال أيام",
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
    "plans.title": "وش نقدم؟",
    "plans.subtitle": "حلول تقنية مخصصة لمشروعك",
    "plans.cta": "شراء",
    "plans.popular": "الأكثر طلباً",
    "plans.currency": "ر.س",
    "plans.plan1.title": "المواقع التعريفية",
    "plans.plan1.subtitle": "موقع احترافي يعكس قوة شركتك",
    "plans.plan1.desc": "نصمم مواقع سريعة، متوافقة مع الجوال، وجاهزة لجلب العملاء. مناسبة للشركات التي تريد حضور رقمي رسمي واحترافي.",
    "plans.plan1.price": "2100",
    "plans.plan1.f1": "تصميم مخصص",
    "plans.plan1.f2": "تسليم خلال 7 أيام",
    "plans.plan1.f3": "تحسين لمحركات البحث",
    "plans.plan1.f4": "لوحة تحكم",
    "plans.plan1.f5": "واجهة متناسقة مع جميع الأجهزة",
    "plans.plan1.f6": "الموقع باللغتين العربية والانجليزية",
    "plans.plan1.f7": "إستضافة مجانية لمدة 3 أشهر",
    "plans.plan1.f8": "دومين مجاني لمده سنة",
    "plans.plan2.title": "نظام تشغيل داخلي",
    "plans.plan2.subtitle": "نظام مخصص لإدارة أعمالك بكفاءة",
    "plans.plan2.desc": "نطوّر نظامًا حسب طريقة عمل شركتك — لإدارة العملاء، المهام، الفواتير، والتقارير في مكان واحد",
    "plans.plan2.price": "2999",
    "plans.plan2.f1": "تصميم حسب احتياجك",
    "plans.plan2.f2": "تسليم خلال 12 يوم",
    "plans.plan2.f3": "أمان عالي",
    "plans.plan2.f4": "قابل للتوسع",
    "plans.plan2.f5": "تقارير واضحة",
    "plans.plan2.f6": "واجهة مناسبة لجميع الأجهزة",
    "plans.plan2.f7": "لوحة تحكم",
    "plans.plan2.f8": "الموقع باللغتين العربية والانجليزية",
    "plans.plan2.f9": "إستضافة مجانية لمدة 3 أشهر",
    "plans.plan2.f10": "دومين مجاني لمدة سنة",
    "plans.plan3.title": "نظام حجوزات أونلاين",
    "plans.plan3.subtitle": "استقبل حجوزاتك تلقائيًا — بدون فوضى",
    "plans.plan3.desc": "منصة حجز متكاملة للعيادات، المراكز، والاستشاريين مع تذكير تلقائي وتقارير يومية.",
    "plans.plan3.price": "1500",
    "plans.plan3.f1": "إعداد نظام حجوزات خاص فيك بواجهة بسيطة",
    "plans.plan3.f2": "تسليم خلال 12 يوم",
    "plans.plan3.f3": "واجهة مناسبة لجميع الأجهزة",
    "plans.plan3.f4": "الموقع باللغتين العربية والانجليزية",
    "plans.plan3.f5": "تقارير أداء",
    "plans.plan3.f6": "لوحة تحكم",
    "plans.plan3.f7": "إستضافة مجانية لمدة 3 أشهر",
    "plans.plan3.f8": "دومين مجاني لمده سنة",
    "plans.custom.title": "الحلول التقنية",
    "plans.custom.desc": "نطور لك حلول تقنية للمشاكل الي تواجهك.",
    "plans.custom.cta": "تواصل معنا",
    "order.pageTitle": "يالله حيه , خلينا نبدأ مشروعك",
    "order.step": "الخطوة 1 من 2",
    "order.selectedPlan": "الباقة المختارة",
    "order.name": "الاسم الكريم",
    "order.namePlaceholder": "ادخل اسمك الكامل",
    "order.phone": "رقم الهاتف",
    "order.phonePlaceholder": "05XXXXXXXX",
    "order.email": "الإيميل",
    "order.emailPlaceholder": "example@email.com",
    "order.business": "نشاط المشروع",
    "order.businessPlaceholder": "مثال: مطعم، نادي رياضي، عيادة...",
    "order.hasIdentity": "هل عندك هوية بصرية؟",
    "order.identityYes": "نعم",
    "order.identityNo": "لا",
    "order.country": "بلد نشاط المشروع",
    "order.countryPlaceholder": "مثال: المملكة العربية السعودية",
    "order.description": "وصف سريع لاحتياجك",
    "order.descriptionPlaceholder": "قلنا وش تحتاج بكلمات بسيطة...",
    "order.cta": "إنتقل للدفع",
    "order.footer": "تواصل معنا في حال وجود أي استفسار",
    "payment.greeting": "أهلاً بك {name} , يرجى إختيار طريقة الدفع المناسبة",
    "payment.step": "الخطوة 2 من 2",
    "payment.serviceSummary": "ملخص الخدمة",
    "payment.price": "السعر",
    "payment.priceSuffix": "ريال سعودي",
    "payment.method1": "طريقة دفع 1",
    "payment.method2": "طريقة دفع 2",
    "payment.method3": "طريقة دفع 3",
    "payment.note": "ملاحظة",
    "payment.noteText": "سوف يتم التواصل معكم و البدء في تنفيذ الطلب خلال 24 ساعة كحد أقصى",
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
