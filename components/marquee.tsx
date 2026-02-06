"use client";

import { useLanguage } from "@/contexts/language-context";

const Marquee = () => {
  const { language } = useLanguage();
  const text =
    language === "ar" ? "شريكك التقني" : "YOUR BEST TECHNICAL PARTNER";
  const repetitions = 10;

  const marqueeContent = Array.from({ length: repetitions }).map((_, index) => (
    <h4
      key={index}
      className={`inline-block px-8 text-[2.2rem] font-medium leading-[125%] ${
        language === "ar" ? "" : "uppercase tracking-[-0.04em]"
      } shrink-0`}
      style={{
        fontFamily:
          language === "ar" ? "var(--font-cairo)" : "var(--font-moshreq)",
        color: "#0f766e",
      }}
    >
      {text}
    </h4>
  ));

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#f0fdfa" }}
    >
      <div className="flex items-center py-5" dir="ltr">
        <div
          className="flex items-center whitespace-nowrap"
          style={{
            animation: language === "ar"
              ? "marquee-scroll-rtl 35s linear infinite"
              : "marquee-scroll 35s linear infinite",
          }}
        >
          {marqueeContent}
          {marqueeContent}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
