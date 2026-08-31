"use client";

import { useLanguage } from "@/contexts/language-context";
import { content } from "@/lib/content";
import Marquee from "./marquee";
import { Asterisk } from "./ui";

/**
 * A slim scrolling band carrying the slogan, sitting between the contact
 * section and the footer. It is the one place full-strength mint runs edge to
 * edge — a 56px ribbon can carry the accent at full saturation where a whole
 * section cannot.
 */
export default function Ribbon() {
  const { language } = useLanguage();
  const items = content[language].ribbon;

  return (
    <div className="grain relative overflow-hidden bg-mint text-ink">
      <Marquee speed={46} gap={40} className="relative z-[2] py-4">
        {items.map((t) => (
          <span key={t} className="flex shrink-0 items-center gap-10">
            <span
              className={`whitespace-nowrap font-semibold ${
                /[a-z]/i.test(t)
                  ? "lat text-[13px] tracking-[0.2em] sm:text-sm"
                  : "font-ar text-[15px] sm:text-base"
              }`}
            >
              {t}
            </span>
            <Asterisk size={13} className="shrink-0 opacity-55" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
