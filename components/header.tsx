"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import LanguageSwitch from "@/components/language-switch";
import Image from "next/image";

interface MenuItem {
  labelKey: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { labelKey: "menu.home", href: "#" },
  { labelKey: "menu.about", href: "#about" },
  { labelKey: "menu.services", href: "#services" },
  { labelKey: "menu.contact", href: "#contact" },
];

const Header = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 50;

      if (scrollY > threshold && !isScrolled) {
        setIsScrolled(true);
      } else if (scrollY <= threshold && isScrolled) {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setIsMenuOpen(false);
    }
  };

  return (
    <header
      dir="ltr"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-overlay backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="w-full py-4 md:py-6 relative">
        <div className="flex items-center justify-between">
          <div className="shrink-0 pl-6 md:pl-8">
            <Image
              src="/images/inno.jpeg"
              alt="Logo"
              width={300}
              height={300}
              className="w-14 h-14 rounded-lg"
            />
          </div>

          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="text-sm font-medium text-text-primary hover:text-hover-primary transition-colors relative group"
              >
                {t(item.labelKey)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hover-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center shrink-0 pr-6 md:pr-8">
            <LanguageSwitch />
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-2 z-50 pr-6 md:pr-8"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-text-primary rounded-full transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-text-primary rounded-full transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-text-primary rounded-full transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        <nav
          className={`md:hidden absolute top-full left-0 right-0 bg-overlay backdrop-blur-lg border-t border-white/10 transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-6 space-y-4">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="block text-base font-medium text-text-primary hover:text-hover-primary transition-colors py-2"
              >
                {t(item.labelKey)}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10">
              <LanguageSwitch />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
