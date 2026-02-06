"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import LanguageSwitch from "@/components/language-switch";
import Image from "next/image";
import Lenis from "lenis";

declare global {
  interface Window {
    lenis?: Lenis;
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

  const navFont =
    language === "ar"
      ? '"Fatimah Arabic", sans-serif'
      : '"Cadillac", sans-serif';

  return (
    <header
      dir="ltr"
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center py-3 px-4 md:px-6"
    >
      {/* Main Navigation Bar Container */}
      <div
        className="w-full max-w-7xl mx-auto rounded-2xl transition-all duration-500 ease-out backdrop-blur-xl"
        style={{
          backgroundColor: isScrolled
            ? "rgba(0, 30, 43, 0.9)"
            : "rgba(0, 30, 43, 0.55)",
          borderBottom: "1px solid rgba(103, 232, 249, 0.1)",
          boxShadow: isScrolled
            ? "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(103, 232, 249, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.04)"
            : "0 4px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
        }}
      >
        <div className="flex items-center justify-between h-12 md:h-14 px-4 md:px-6">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Image
              src="/images/inno_text_logo.PNG"
              alt="INNO"
              width={65}
              height={20}
              className=" w-auto object-contain"
            />
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
                    className="relative text-[15px] font-bold px-5 py-2 rounded-lg transition-all duration-300"
                    style={{
                      fontFamily: navFont,
                      color: isActive
                        ? "#ffffff"
                        : "rgba(255, 255, 255, 0.55)",
                      backgroundColor: isActive
                        ? "rgba(103, 232, 249, 0.08)"
                        : undefined,
                      borderBottom: isActive
                        ? "2px solid rgba(103, 232, 249, 0.5)"
                        : "2px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = "#ffffff";
                        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = "rgba(255, 255, 255, 0.55)";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
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
          <div className="px-4 pb-4 pt-2 space-y-2 mt-2">
            {(language === "ar" ? [...menuItems].reverse() : menuItems).map(
              (item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={index}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="block text-base font-bold transition-all duration-200 py-2.5 px-4 rounded-lg"
                    style={{
                      fontFamily: navFont,
                      color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.55)",
                      backgroundColor: isActive ? "rgba(103, 232, 249, 0.08)" : undefined,
                      borderLeft: isActive ? "2px solid rgba(103, 232, 249, 0.5)" : "2px solid transparent",
                    }}
                  >
                    {t(item.labelKey)}
                  </a>
                );
              }
            )}
            <div className="pt-2">
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
