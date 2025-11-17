"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import LanguageSwitch from "@/components/language-switch";
import Image from "next/image";

interface MenuItem {
  labelKey: string;
  href: string;
  id: string;
}

const menuItems: MenuItem[] = [
  { labelKey: "menu.home", href: "#", id: "home" },
  { labelKey: "menu.about", href: "#about", id: "about" },
  { labelKey: "menu.services", href: "#services", id: "services" },
  { labelKey: "menu.contact", href: "#contact", id: "contact" },
];

const Header = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

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

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollY = window.scrollY;

      if (scrollY < 100) {
        setActiveSection("home");
        return;
      }

      const sections = menuItems
        .map((item) => {
          const element = document.getElementById(item.id);
          if (!element) return null;
          const rect = element.getBoundingClientRect();
          return {
            id: item.id,
            top: rect.top + scrollY,
            bottom: rect.bottom + scrollY,
            height: rect.height,
          };
        })
        .filter(Boolean) as Array<{
        id: string;
        top: number;
        bottom: number;
        height: number;
      }>;

      const currentSection = sections.find((section) => {
        const offset = 150;
        return (
          scrollY + offset >= section.top && scrollY + offset < section.bottom
        );
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);

      if (targetId === "" || targetId === "home") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const headerHeight = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }

      setIsMenuOpen(false);
    }
  };

  return (
    <header
      dir="ltr"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-overlay backdrop-blur-lg ${
        isScrolled ? "shadow-lg" : "shadow-sm"
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
            {menuItems.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`text-sm font-medium relative group px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "text-hover-primary scale-105"
                      : "text-text-primary hover:text-hover-primary hover:scale-105"
                  }`}
                >
                  <span className="relative z-10">{t(item.labelKey)}</span>
                  {isActive && (
                    <span className="absolute inset-0 bg-white/10 rounded-lg blur-sm" />
                  )}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-hover-primary transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                  <span className="absolute inset-0 bg-hover-primary/0 group-hover:bg-hover-primary/5 rounded-lg transition-all duration-300" />
                </a>
              );
            })}
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
            {menuItems.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`block text-base font-medium transition-all duration-300 py-2 px-3 rounded-lg relative ${
                    isActive
                      ? "text-hover-primary bg-white/10 scale-105"
                      : "text-text-primary hover:text-hover-primary hover:bg-white/5 hover:scale-105"
                  }`}
                >
                  <span className="relative z-10">{t(item.labelKey)}</span>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-hover-primary rounded-r-full" />
                  )}
                </a>
              );
            })}
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
