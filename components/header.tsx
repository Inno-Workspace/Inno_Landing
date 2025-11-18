"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import LanguageSwitch from "@/components/language-switch";
import Image from "next/image";

interface LenisInstance {
  on: (event: string, callback: () => void) => void;
  off: (event: string, callback: () => void) => void;
  scrollTo: (
    target: number,
    options?: { duration?: number; easing?: (t: number) => number }
  ) => void;
}

declare global {
  interface Window {
    lenis?: LenisInstance;
  }
}

interface MenuItem {
  labelKey: string;
  href: string;
  id: string;
}

const menuItems: MenuItem[] = [
  { labelKey: "menu.home", href: "#", id: "home" },
  { labelKey: "menu.about", href: "#about", id: "about" },
  { labelKey: "menu.works", href: "#works", id: "works" },
  { labelKey: "menu.contact", href: "#contact", id: "contact" },
];

const Header = () => {
  const { t, language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const threshold = 50;

      if (scrollY > threshold && !isScrolled) {
        setIsScrolled(true);
      } else if (scrollY <= threshold && isScrolled) {
        setIsScrolled(false);
      }
    };

    // Use lenis scroll event if available, otherwise use window scroll
    const lenisInstance = window.lenis;
    if (lenisInstance) {
      lenisInstance.on("scroll", handleScroll);
    } else {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (lenisInstance) {
        lenisInstance.off("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isScrolled]);

  useEffect(() => {
    let ticking = false;
    const updateActiveSection = () => {
      const scrollY = window.scrollY || window.pageYOffset;

      if (scrollY < 100) {
        setActiveSection("home");
        ticking = false;
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
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    // Use lenis scroll event if available, otherwise use window scroll
    const lenisInstance = window.lenis;
    if (lenisInstance) {
      lenisInstance.on("scroll", onScroll);
    } else {
      updateActiveSection();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      if (lenisInstance) {
        lenisInstance.off("scroll", onScroll);
      } else {
        window.removeEventListener("scroll", onScroll);
      }
    };
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
            elementPosition +
            (window.pageYOffset || window.scrollY) -
            headerHeight;

          // Use lenis scroll if available for smooth scrolling
          const lenisInstance = window.lenis;
          if (lenisInstance) {
            lenisInstance.scrollTo(offsetPosition, {
              duration: 1.2,
              easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          } else {
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }
      }

      setIsMenuOpen(false);
    }
  };

  return (
    <header
      dir="ltr"
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center py-2 px-4 md:px-6"
    >
      {/* Main Navigation Bar Container */}
      <div
        className={`w-full max-w-7xl mx-auto rounded-2xl transition-all duration-300 backdrop-blur-lg ${
          isScrolled ? "bg-overlay shadow-2xl" : "bg-overlay shadow-lg"
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-6 py-2">
          {/* Logo Section */}
          <div className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={48}
              height={48}
              className="w-12 h-12 md:w-14 md:h-14 object-contain"
            />
            <span
              className="text-primary font-bold text-base md:text-lg mt-1"
              style={{ fontFamily: "var(--font-devil-breeze)" }}
            >
              {t("header.logo")}
            </span>
          </div>

          {/* Desktop Navigation Links - Centered */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {(language === "ar" ? [...menuItems].reverse() : menuItems).map(
              (item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={index}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className={`text-sm font-bold px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-hover-primary"
                        : "text-primary/80 hover:text-primary hover:bg-text-primary/5"
                    }`}
                    style={{ fontFamily: "var(--font-devil-breeze)" }}
                  >
                    {t(item.labelKey)}
                  </a>
                );
              }
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switch - Desktop */}
            <div className="hidden md:flex items-center">
              <LanguageSwitch />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50"
              aria-label="Toggle menu"
            >
              <span
                className={`w-5 h-0.5 bg-text-primary rounded-full transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-text-primary rounded-full transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-text-primary rounded-full transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <nav
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-4 pt-2 space-y-2 border-t border-text-primary/10 mt-2">
            {(language === "ar" ? [...menuItems].reverse() : menuItems).map(
              (item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={index}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className={`block text-base font-bold transition-all duration-200 py-2.5 px-4 rounded-lg ${
                      isActive
                        ? "text-hover-primary bg-text-accent/10"
                        : "text-primary/80 hover:text-primary hover:bg-text-primary/5"
                    }`}
                    style={{ fontFamily: "var(--font-devil-breeze)" }}
                  >
                    {t(item.labelKey)}
                  </a>
                );
              }
            )}
            <div className="pt-2 border-t border-text-primary/10">
              <div className="px-4">
                <LanguageSwitch />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
