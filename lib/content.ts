/**
 * Landing-page copy, one object per language.
 *
 * Structured rather than flat because the redesign leans on the shape of the
 * content (numbered lists, paired lines, split headlines) as much as the words.
 * Short strings that the order/payment flow shares still live in the language
 * context's `t()` map.
 */

export type Lang = "ar" | "en";

export interface PlanContent {
  /** Stable identifier — travels to the order flow as ?plan= */
  id: string;
  kicker: string;
  title: string;
  desc: string;
  price: string;
  features: string[];
  featured?: boolean;
}

export interface WorkContent {
  title: string;
  desc: string;
  image: string;
  link?: string;
  /** Shown in place of a link when the project is an internal system. */
  note?: string;
}

const works = (lang: Lang): WorkContent[] => [
  {
    title: lang === "ar" ? "ألفا فاكتوري" : "Alpha Factory",
    desc:
      lang === "ar"
        ? "منصة إدارة إنتاج فيديو — تتبّع مشاريع، فوترة تلقائية، وإشعارات متعددة القنوات."
        : "A video-production management platform — project tracking, automated invoicing, multi-channel notifications.",
    image: "/images/projects/AlphaFactory.png",
    link: "https://www.alphafactory.net/",
  },
  {
    title: lang === "ar" ? "عمدة" : "Omdah",
    desc:
      lang === "ar"
        ? "موقع تعريفي لشركة إنتاج — يعرض الهوية والخدمات."
        : "A brand site for a production company — identity and services.",
    image: "/projcets-images/theimage.png",
    link: "https://omdah.sa",
  },
  {
    title: lang === "ar" ? "إيدار العقارية" : "IEDAR Real Estate",
    desc:
      lang === "ar"
        ? "موقع مبني ليطابق هويتهم الترويجية."
        : "A site built to match their promotional identity.",
    image: "/projcets-images/animage.png",
    link: "https://iedar.sa",
  },
  {
    title: lang === "ar" ? "وكالة الصناعية" : "Al-Sinaiya Agency",
    desc:
      lang === "ar"
        ? "منصة إعلامية بأسلوب عصري يتماشى مع توجّههم."
        : "A media platform in a modern style aligned with their direction.",
    image: "/images/projects/snaya.png",
    link: "https://www.snaya.sa",
  },
  {
    title:
      lang === "ar" ? "مجلس الجمعيات — الشرقية" : "NGO Council — Eastern Province",
    desc:
      lang === "ar"
        ? "نظام إدارة مشاريع ومهام لمجلس الجمعيات الأهلية."
        : "A projects and tasks management system for the NGO council.",
    image: "/images/projects/shrgya.png",
    note: lang === "ar" ? "نظام داخلي" : "Internal system",
  },
  {
    title: lang === "ar" ? "نظام فوري" : "Fawry",
    desc:
      lang === "ar"
        ? "محادثة مباشرة تُركّب داخل المواقع والأنظمة."
        : "Live chat that drops into websites and platforms.",
    image: "/images/projects/contactapp.png",
    link: "https://fawry.trmyz.com/",
  },
  {
    title: lang === "ar" ? "إطار" : "Eyetar",
    desc:
      lang === "ar"
        ? "متجر إلكتروني للوحات الفنية — كتالوج وسلة ودفع عبر مدى وآبل باي."
        : "An online store for art prints — catalogue, cart and checkout.",
    image: "/images/projects/itar.png",
    link: "https://eyetar.com/",
  },
];

const plans = (lang: Lang): PlanContent[] =>
  lang === "ar"
    ? [
        {
          id: "المواقع التعريفية",
          kicker: "01 / WEBSITE",
          title: "المواقع التعريفية",
          desc: "موقع احترافي سريع يعكس قوة شركتك ويجيب لك عملاء.",
          price: "2100",
          features: [
            "تصميم مخصص لهويتك",
            "تسليم خلال ٧ أيام",
            "تحسين لمحركات البحث",
            "لوحة تحكم بالعربي والإنجليزي",
            "واجهة متناسقة مع جميع الأجهزة",
            "استضافة ٣ شهور + دومين سنة",
          ],
        },
        {
          id: "نظام تشغيل داخلي",
          kicker: "02 / SYSTEM",
          title: "نظام تشغيل داخلي",
          desc: "نظام مبني على طريقة شغلك — عملاء، مهام، فواتير، وتقارير في مكان واحد.",
          price: "2999",
          features: [
            "مبني حسب احتياجك بالضبط",
            "تسليم خلال ١٢ يوم",
            "أمان عالي وقابل للتوسع",
            "تقارير واضحة ولوحة تحكم",
            "واجهة متناسقة مع جميع الأجهزة",
            "استضافة ٣ شهور + دومين سنة",
          ],
          featured: true,
        },
        {
          id: "نظام حجوزات أونلاين",
          kicker: "03 / BOOKING",
          title: "نظام حجوزات أونلاين",
          desc: "استقبل حجوزاتك تلقائيًا — للعيادات والمراكز والاستشاريين.",
          price: "1500",
          features: [
            "واجهة حجز بسيطة للعميل",
            "تسليم خلال ١٢ يوم",
            "تذكير تلقائي للحجوزات",
            "تقارير أداء يومية",
            "لوحة تحكم بالعربي والإنجليزي",
            "استضافة ٣ شهور + دومين سنة",
          ],
        },
      ]
    : [
        {
          id: "Professional Website",
          kicker: "01 / WEBSITE",
          title: "Professional Website",
          desc: "A fast, professional site that reflects your company and brings in clients.",
          price: "2100",
          features: [
            "Custom design for your identity",
            "Delivered in 7 days",
            "Search-engine optimised",
            "Admin dashboard in Arabic and English",
            "Consistent across every device",
            "3 months hosting + 1 year domain",
          ],
        },
        {
          id: "Internal Operating System",
          kicker: "02 / SYSTEM",
          title: "Internal Operating System",
          desc: "Built around how you actually work — clients, tasks, invoices and reports in one place.",
          price: "2999",
          features: [
            "Built to your exact workflow",
            "Delivered in 12 days",
            "Hardened and scalable",
            "Clear reporting and admin dashboard",
            "Consistent across every device",
            "3 months hosting + 1 year domain",
          ],
          featured: true,
        },
        {
          id: "Online Booking System",
          kicker: "03 / BOOKING",
          title: "Online Booking System",
          desc: "Take bookings automatically — for clinics, centres and consultants.",
          price: "1500",
          features: [
            "Simple booking interface",
            "Delivered in 12 days",
            "Automatic booking reminders",
            "Daily performance reports",
            "Admin dashboard in Arabic and English",
            "3 months hosting + 1 year domain",
          ],
        },
      ];

export const content = {
  ar: {
    nav: {
      links: [
        { href: "#about", label: "من نحن" },
        { href: "#offer", label: "خدماتنا" },
        { href: "#works", label: "أعمالنا" },
        { href: "#plans", label: "الباقات" },
        { href: "#contact", label: "تواصل" },
      ],
      cta: "ابدأ مشروعك",
      menu: "القائمة",
      close: "إغلاق",
    },
    hero: {
      eyebrowLat: "YOUR TECHNICAL PARTNER",
      eyebrowAr: "شريكك التقني",
      titleA: "منتجك الإلكتروني",
      titleB: "جاهز ",
      titleAccent: "خلال أيام",
      sub: "نصمّم ونطوّر مواقع تعريفية، وأنظمة تشغيل داخلية، ومنصات حجز — بلوحة تحكم تديرها بنفسك، ودعم تقني بعد التسليم.",
      cta1: "ابدأ مشروعك",
      cta2: "شوف أعمالنا",
      stats: [
        { v: "07", l: "مشاريع منشورة تقدر تفتحها" },
        { v: "7—12", l: "يوم عمل حتى التسليم" },
      ],
      city: "الرياض",
      country: "المملكة العربية السعودية",
      /* Labels inside the animated hero illustration. Sample UI values —
         they show what we build, they are not client results. */
      scene: {
        url: "inno.sa",
        panel: "لوحة التحكم",
        kpis: [
          { v: "24", l: "عميل" },
          { v: "08", l: "مهمة" },
          { v: "12", l: "فاتورة" },
        ],
        chart: "الطلبات هذا الشهر",
        toast: "تم التسليم",
        chatAsk: "متى يجهز الموقع؟",
        chatReply: "خلال ٧ أيام",
        calendarLabel: "حجز جديد",
        calendarDay: "12",
        langChip: "عربي / EN",
      },
    },
    about: {
      num: "01",
      label: "من نحن",
      labelLat: "ABOUT INNO",
      titleA: "كيف نشيل مسؤولية",
      titleB: "التقنية",
      titleC: "عنك",
      body: "متخصصين في تمكين الأعمال وإيجاد حلول تقنية تسهّل عليك شغلك مهما كان مجالك. طوّرنا منصات رقمية، وقدّمنا حلول أتمتة وذكاء اصطناعي، وحوّلنا عمليات تقليدية إلى أنظمة إلكترونية مرنة تمشّي العمل بدون تعقيد.",
      bodyLead: "في إينو",
      pull: "لا تشيل هم التقنية — حنا نطوّرها وندير لك مشروعك كامل.",
      sloganLabel: "OUR SLOGAN",
      slogan: "شريكك التقني، نخلّي التقنية أسهل عليك",
      pillars: [
        { t: "ابتكار ببساطة", d: "حلول واضحة، بدون تعقيد تقني يحتاج شرح." },
        { t: "شراكة طويلة المدى", d: "ما ننتهي عند التسليم — نكمل معك بعده." },
        { t: "حلول مبنية على النتيجة", d: "نقيس الشغل بأثره على عملك، مو بعدد الميزات." },
        { t: "هوية تقنية حديثة", d: "تصميم نظيف يعكس مستوى شركتك." },
      ],
    },
    offer: {
      num: "02",
      label: "وش نقدّم",
      labelLat: "WHAT WE OFFER",
      titleA: "حلول تقنية متكاملة",
      titleB: "من الفكرة إلى ",
      titleAccent: "التشغيل",
      lede: "هدفنا مو بس نبني حلول — هدفنا نبني تقنية تدعم نمو عملك على المدى الطويل.",
      items: [
        {
          t: "مواقع تعريفية احترافية",
          d: "موقع سريع يعكس هوية شركتك، متوافق مع الجوال، وجاهز يجيب لك عملاء.",
        },
        {
          t: "أنظمة ومنصات مخصصة",
          d: "نظام مبني على طريقة شغلك أنت — عملاء، مهام، فواتير، وتقارير في مكان واحد.",
        },
        {
          t: "حلول التجارة الإلكترونية",
          d: "متجر متكامل مع بوابات الدفع والشحن، ولوحة تحكم تفهمها من أول مرة.",
        },
        {
          t: "منصات الحجز الإلكتروني",
          d: "للعيادات والمراكز والاستشاريين — تذكير تلقائي وتقارير يومية.",
        },
        {
          t: "استشارات وتحوّل رقمي",
          d: "نراجع عملياتك الحالية ونرسم لك خطة تقنية واضحة وقابلة للتنفيذ.",
        },
        {
          t: "ربط الأنظمة والأتمتة",
          d: "نربط أدواتك ببعضها ونأتمت الخطوات المتكررة اللي تاكل وقت فريقك.",
        },
      ],
      cta: "تكلّم معنا عن مشروعك",
      ctaNote: "رد خلال ساعات، مو أيام.",
      scene: {
        stages: ["فكرة", "تصميم", "تطوير", "تشغيل"],
        liveTitle: "شغّال الآن",
        rows: ["تصميم الواجهات", "ربط الأنظمة", "الإطلاق والدعم"],
      },
    },
    works: {
      num: "03",
      label: "أعمالنا",
      labelLat: "SELECTED WORK",
      titleA: "شغل ",
      titleAccent: "منشور",
      titleB: "، تقدر تفتحه الحين",
      lede: "كل مشروع تحت مبني على مشكلة حقيقية عند العميل — مو قوالب جاهزة.",
      featured: "مشروع مميّز",
      items: works("ar"),
      clientsLabel: "عملاء اشتغلنا معهم",
      clientsLabelLat: "CLIENTS",
      stackLabel: "تقنيات نبني فيها",
      stackLabelLat: "OUR STACK",
    },
    plans: {
      num: "04",
      label: "الباقات",
      labelLat: "PLANS AND PRICING",
      title: "أسعار واضحة، بدون مفاجآت",
      lede: "السعر شامل التصميم والتطوير والتسليم. الاستضافة والدومين مجانًا في كل باقة.",
      popular: "الأكثر طلبًا",
      currency: "ر.س",
      cta: "اطلب الباقة",
      aside: {
        payLabel: "طرق الدفع",
        daysValue: "7",
        daysLabel: "أيام للتسليم",
        freeTag: "مجانًا",
        inclTitle: "مشمول في كل باقة",
        inclItems: ["استضافة ٣ شهور", "دومين سنة", "لوحة تحكم", "دعم بعد التسليم"],
        noFees: "بدون رسوم مخفية",
      },
      items: plans("ar"),
      custom: {
        title: "احتياجك مو ضمن الباقات؟",
        desc: "نطوّر لك حل مفصّل على المشكلة اللي تواجهك — والسعر حسب نطاق الشغل.",
        cta: "تواصل معنا",
      },
    },
    contact: {
      num: "05",
      label: "تواصل معنا",
      labelLat: "GET IN TOUCH",
      titleA: "خلّك من ضمن ",
      titleAccent: "عملائنا",
      lede: "كلّمنا عن مشروعك — نرجع لك بخطة واضحة وسعر ومدة تسليم، بدون التزام.",
      waLabel: "WHATSAPP",
      waTitle: "كلّمنا على واتساب",
      waDesc: "بدون ما تنتظر رد إيميل — أرسل لنا رسالة ونرد عليك أسرع مما تتوقع.",
      waCta: "ابدأ المحادثة",
      waPrefill: "مرحبًا، أبغى أستفسر عن خدماتكم.",
      detailsLabel: "CONTACT DETAILS",
      emailLabel: "البريد الإلكتروني",
      phoneLabel: "الهاتف",
      addressLabel: "العنوان",
      address: "الرياض، المملكة العربية السعودية",
      siteLabel: "الموقع",
    },
    footer: {
      tagline: "شريكك التقني — نخلّي التقنية أسهل عليك.",
      siteHead: "SITE",
      servicesHead: "SERVICES",
      contactHead: "CONTACT",
      services: [
        "المواقع التعريفية",
        "أنظمة التشغيل الداخلية",
        "منصات الحجز",
        "حلول مخصصة",
      ],
      whatsapp: "واتساب",
      brandProfile: "بروفايل الهوية (PDF)",
      copyright: "إينو. جميع الحقوق محفوظة.",
    },
    ribbon: [
      "شريكك التقني",
      "YOUR TECHNICAL PARTNER",
      "نخلّي التقنية أسهل عليك",
      "RIYADH · SAUDI ARABIA",
    ],
  },

  en: {
    nav: {
      links: [
        { href: "#about", label: "About" },
        { href: "#offer", label: "Services" },
        { href: "#works", label: "Work" },
        { href: "#plans", label: "Plans" },
        { href: "#contact", label: "Contact" },
      ],
      cta: "Start your project",
      menu: "Menu",
      close: "Close",
    },
    hero: {
      eyebrowLat: "YOUR TECHNICAL PARTNER",
      eyebrowAr: "شريكك التقني",
      titleA: "Your digital product,",
      titleB: "ready in ",
      titleAccent: "days",
      sub: "We design and build brand sites, internal operating systems and booking platforms — with an admin dashboard you run yourself, and support after handover.",
      cta1: "Start your project",
      cta2: "See our work",
      stats: [
        { v: "07", l: "shipped projects you can open" },
        { v: "7—12", l: "working days to delivery" },
      ],
      city: "Riyadh",
      country: "Saudi Arabia",
      scene: {
        url: "inno.sa",
        panel: "Dashboard",
        kpis: [
          { v: "24", l: "Clients" },
          { v: "08", l: "Tasks" },
          { v: "12", l: "Invoices" },
        ],
        chart: "Orders this month",
        toast: "Delivered",
        chatAsk: "When will it be ready?",
        chatReply: "In 7 days",
        calendarLabel: "New booking",
        calendarDay: "12",
        langChip: "AR / EN",
      },
    },
    about: {
      num: "01",
      label: "About",
      labelLat: "ABOUT INNO",
      titleA: "How we take technology",
      titleB: "off",
      titleC: "your plate",
      body: "We specialise in enabling businesses with technical solutions that make the work easier, whatever the field. We have built digital platforms, delivered automation and AI solutions, and turned traditional processes into flexible systems that run without friction.",
      bodyLead: "At INNO",
      pull: "Stop carrying the technical weight — we build it and we run it for you.",
      sloganLabel: "OUR SLOGAN",
      slogan: "Your tech partner, making technology easier for you",
      pillars: [
        { t: "Innovation with simplicity", d: "Clear solutions, with no technical complexity to explain away." },
        { t: "Long-term partnership", d: "We do not stop at handover — we stay with you after it." },
        { t: "Result-oriented solutions", d: "We measure the work by its effect on your business, not its feature count." },
        { t: "A modern technical identity", d: "Clean design that reflects the level your company operates at." },
      ],
    },
    offer: {
      num: "02",
      label: "What we offer",
      labelLat: "WHAT WE OFFER",
      titleA: "End-to-end technical work,",
      titleB: "from idea to ",
      titleAccent: "operation",
      lede: "The goal is not only to build solutions — it is to build technology that supports long-term growth.",
      items: [
        {
          t: "Professional brand websites",
          d: "A fast site that carries your identity, works on mobile, and is ready to bring in clients.",
        },
        {
          t: "Custom systems and platforms",
          d: "Built around how you work — clients, tasks, invoices and reports in one place.",
        },
        {
          t: "E-commerce solutions",
          d: "A complete store with payment and shipping, and a dashboard you understand first time.",
        },
        {
          t: "Online booking platforms",
          d: "For clinics, centres and consultants — automatic reminders and daily reports.",
        },
        {
          t: "Consulting and digital transformation",
          d: "We review your current operations and draw a clear, executable technical plan.",
        },
        {
          t: "System integration and automation",
          d: "We connect your tools and automate the repeated steps eating your team's time.",
        },
      ],
      cta: "Tell us about your project",
      ctaNote: "A reply in hours, not days.",
      scene: {
        stages: ["Idea", "Design", "Build", "Operate"],
        liveTitle: "Live now",
        rows: ["Interface design", "System integration", "Launch and support"],
      },
    },
    works: {
      num: "03",
      label: "Work",
      labelLat: "SELECTED WORK",
      titleA: "",
      titleAccent: "Shipped",
      titleB: " work you can open right now",
      lede: "Every project below started from a real problem a client had — not from a template.",
      featured: "Featured",
      items: works("en"),
      clientsLabel: "Clients we have worked with",
      clientsLabelLat: "CLIENTS",
      stackLabel: "The stack we build in",
      stackLabelLat: "OUR STACK",
    },
    plans: {
      num: "04",
      label: "Plans",
      labelLat: "PLANS AND PRICING",
      title: "Clear pricing, no surprises",
      lede: "The price covers design, development and delivery. Hosting and domain are free with every plan.",
      popular: "Most requested",
      currency: "SAR",
      cta: "Order this plan",
      aside: {
        payLabel: "Payment methods",
        daysValue: "7",
        daysLabel: "days to delivery",
        freeTag: "Free",
        inclTitle: "In every plan",
        inclItems: ["3 months hosting", "1 year domain", "Admin dashboard", "Post-launch support"],
        noFees: "No hidden fees",
      },
      items: plans("en"),
      custom: {
        title: "Not covered by a plan?",
        desc: "We build a solution shaped around the specific problem you have — priced by scope.",
        cta: "Get in touch",
      },
    },
    contact: {
      num: "05",
      label: "Contact",
      labelLat: "GET IN TOUCH",
      titleA: "Become one of our ",
      titleAccent: "clients",
      lede: "Tell us about your project — we come back with a clear plan, a price and a delivery window. No commitment.",
      waLabel: "WHATSAPP",
      waTitle: "Message us on WhatsApp",
      waDesc: "No waiting on an email reply — send a message and we answer faster than you expect.",
      waCta: "Start the conversation",
      waPrefill: "Hello, I would like to ask about your services.",
      detailsLabel: "CONTACT DETAILS",
      emailLabel: "Email",
      phoneLabel: "Phone",
      addressLabel: "Address",
      address: "Riyadh, Saudi Arabia",
      siteLabel: "Website",
    },
    footer: {
      tagline: "Your technical partner — making technology easier for you.",
      siteHead: "SITE",
      servicesHead: "SERVICES",
      contactHead: "CONTACT",
      services: [
        "Brand websites",
        "Internal operating systems",
        "Booking platforms",
        "Custom solutions",
      ],
      whatsapp: "WhatsApp",
      brandProfile: "Brand profile (PDF)",
      copyright: "INNO. All rights reserved.",
    },
    ribbon: [
      "YOUR TECHNICAL PARTNER",
      "شريكك التقني",
      "Making technology easier for you",
      "RIYADH · SAUDI ARABIA",
    ],
  },
} as const;

export const CONTACT = {
  whatsapp: "966552658605",
  email: "contact@inno.sa",
  phone: "+966 55 265 8605",
  site: "inno.sa",
} as const;

export interface LogoMark {
  name: string;
  image: string;
  /** Intrinsic size, so next/image never guesses. */
  w: number;
  h: number;
  /** Rendered height in px, tuned per mark so optical weight matches across
      wildly different aspect ratios (a square mark needs more height than a
      long wordmark to read at the same size). */
  size: number;
}

/* Logo_2.png and Logo_5.png in /works were byte-identical, so the old wall
   showed the same client twice. Five distinct marks now. */
export const CLIENT_LOGOS: LogoMark[] = [
  { name: "كوارزم", image: "/logos/coarzm.png", w: 168, h: 96, size: 30 },
  { name: "IEDAR", image: "/logos/iedar.png", w: 96, h: 96, size: 38 },
  { name: "انفرادة", image: "/logos/infrada.png", w: 96, h: 96, size: 36 },
  { name: "قمة", image: "/logos/qimmah.png", w: 128, h: 96, size: 33 },
  { name: "سفر جماس", image: "/logos/safar.png", w: 82, h: 96, size: 40 },
];

export const TECH_LOGOS: LogoMark[] = [
  { name: "Next.js", image: "/tech/nextjs-icon.png", w: 244, h: 49, size: 22 },
  { name: "Node.js", image: "/tech/nod.png", w: 127, h: 65, size: 28 },
  { name: "Python", image: "/tech/python-logo.avif", w: 268, h: 69, size: 24 },
  { name: "GitHub", image: "/tech/github-logo.png", w: 188, h: 69, size: 26 },
  { name: "OpenAI", image: "/tech/open-ai.png", w: 268, h: 69, size: 24 },
  { name: "Cloudflare", image: "/tech/cloudflare-logo.avif", w: 204, h: 69, size: 26 },
  { name: "Sitecore", image: "/tech/Sitecore-LOGO.png", w: 255, h: 69, size: 24 },
  { name: "Umbraco", image: "/tech/umbraco.avif", w: 268, h: 82, size: 26 },
  { name: "Wagtail", image: "/tech/Wagtail-2.png", w: 272, h: 100, size: 27 },
];
