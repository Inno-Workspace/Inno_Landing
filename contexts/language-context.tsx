"use client";

import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { Lang } from "@/lib/content";

/* The chosen language lives in localStorage, which is external state — so it
   is read through useSyncExternalStore rather than synced into an effect.
   That keeps the server render deterministic ("ar") while the client picks up
   a saved preference on hydration, and keeps tabs in step. */

const STORAGE_KEY = "language";
const EVENT = "inno:language";

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "en" || saved === "ar" ? saved : "ar";
  } catch {
    return "ar";
  }
}

const getServerSnapshot = (): Lang => "ar";

interface LanguageContextType {
  language: Lang;
  toggleLanguage: () => void;
  /** Short shared strings (order + payment flow, errors). Landing-page copy lives in lib/content.ts. */
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  en: {
    "order.pageTitle": "Let's start your project",
    "order.step": "Step 1 of 2",
    "order.selectedPlan": "Selected plan",
    "order.name": "Full name",
    "order.namePlaceholder": "Enter your full name",
    "order.phone": "Phone number",
    "order.phonePlaceholder": "05XXXXXXXX",
    "order.email": "Email",
    "order.emailPlaceholder": "example@email.com",
    "order.business": "Business activity",
    "order.businessPlaceholder": "e.g. restaurant, gym, clinic",
    "order.hasIdentity": "Do you have a visual identity?",
    "order.identityYes": "Yes",
    "order.identityNo": "No",
    "order.country": "Business country",
    "order.countryPlaceholder": "e.g. Saudi Arabia",
    "order.description": "Brief description of your need",
    "order.descriptionPlaceholder": "Tell us what you need in a few words",
    "order.cta": "Continue to payment",
    "order.footer": "Message us if anything is unclear",
    "order.back": "Back",

    "payment.greeting": "Welcome {name} — choose the payment method that suits you",
    "payment.step": "Step 2 of 2",
    "payment.serviceSummary": "Service summary",
    "payment.price": "Price",
    "payment.priceSuffix": "SAR",
    "payment.payWith": "Pay with",
    "payment.payNow": "Pay now",
    "payment.poweredBy": "Powered by",
    "payment.note": "Note",
    "payment.noteText":
      "We will contact you and start the order within 24 hours at most",
    "payment.back": "Back",

    "notFound.title": "Page not found",
    "notFound.desc": "The page you are looking for does not exist or has moved.",
    "notFound.cta": "Back to home",

    "error.title": "Something went wrong",
    "error.desc": "An unexpected error occurred. Try again, or contact us.",
    "error.cta": "Try again",
  },
  ar: {
    "order.pageTitle": "خلّنا نبدأ مشروعك",
    "order.step": "الخطوة ١ من ٢",
    "order.selectedPlan": "الباقة المختارة",
    "order.name": "الاسم الكريم",
    "order.namePlaceholder": "اكتب اسمك الكامل",
    "order.phone": "رقم الجوال",
    "order.phonePlaceholder": "05XXXXXXXX",
    "order.email": "الإيميل",
    "order.emailPlaceholder": "example@email.com",
    "order.business": "نشاط المشروع",
    "order.businessPlaceholder": "مثال: مطعم، نادي رياضي، عيادة",
    "order.hasIdentity": "عندك هوية بصرية؟",
    "order.identityYes": "نعم",
    "order.identityNo": "لا",
    "order.country": "بلد نشاط المشروع",
    "order.countryPlaceholder": "مثال: المملكة العربية السعودية",
    "order.description": "وصف سريع لاحتياجك",
    "order.descriptionPlaceholder": "قل لنا وش تحتاج بكلمات بسيطة",
    "order.cta": "انتقل للدفع",
    "order.footer": "كلّمنا لو عندك أي استفسار",
    "order.back": "رجوع",

    "payment.greeting": "أهلاً {name}، اختر طريقة الدفع المناسبة",
    "payment.step": "الخطوة ٢ من ٢",
    "payment.serviceSummary": "ملخص الخدمة",
    "payment.price": "السعر",
    "payment.priceSuffix": "ريال سعودي",
    "payment.payWith": "ادفع عبر",
    "payment.payNow": "ادفع الآن",
    "payment.poweredBy": "مدعوم بواسطة",
    "payment.note": "ملاحظة",
    "payment.noteText":
      "بنتواصل معك ونبدأ تنفيذ الطلب خلال ٢٤ ساعة كحد أقصى",
    "payment.back": "رجوع",

    "notFound.title": "الصفحة غير موجودة",
    "notFound.desc": "الصفحة اللي تدوّرها مو موجودة أو تم نقلها.",
    "notFound.cta": "الرجوع للرئيسية",

    "error.title": "صار خطأ غير متوقع",
    "error.desc": "حاول مرة ثانية، أو تواصل معنا وبنساعدك.",
    "error.cta": "حاول مرة ثانية",
  },
} as const;

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const toggleLanguage = useCallback(() => {
    const next: Lang = getSnapshot() === "en" ? "ar" : "en";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const t = useCallback(
    (key: string): string =>
      translations[language][key as keyof (typeof translations)["en"]] ?? key,
    [language]
  );

  const value = useMemo(
    () => ({ language, toggleLanguage, t }),
    [language, toggleLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
