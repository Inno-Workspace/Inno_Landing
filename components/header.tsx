"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface MenuItem {
  label: string;
  href: string;
  bgImage?: string;
}

const menuItems: MenuItem[] = [
  { label: "Home", href: "#", bgImage: "/images/cloud.png" },
  { label: "About", href: "#about", bgImage: "/images/liquid-1.png" },
  { label: "Services", href: "#services", bgImage: "/images/liquid-2.png" },
  { label: "Contact", href: "#contact", bgImage: "/images/shape.png" },
];

// Helper function to split text into characters (replacement for SplitText)
const splitTextIntoChars = (element: HTMLElement): HTMLElement[] => {
  // Check if already split (has child spans)
  if (element.children.length > 0 && element.querySelector("span")) {
    return Array.from(element.querySelectorAll("span")) as HTMLElement[];
  }
  
  const text = element.textContent || "";
  const chars = text.split("").map((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    span.style.visibility = "hidden";
    return span;
  });
  
  element.textContent = "";
  chars.forEach((char) => element.appendChild(char));
  
  return chars;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const headerBgRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const bgImagesContainerRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const linkTextsRef = useRef<(HTMLElement | null)[]>([]);

  // Scroll detection for header background
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 50; // Show background after 50px scroll
      
      if (scrollY > threshold && !isScrolled) {
        setIsScrolled(true);
        if (headerBgRef.current) {
          gsap.to(headerBgRef.current, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      } else if (scrollY <= threshold && isScrolled) {
        setIsScrolled(false);
        if (headerBgRef.current) {
          gsap.to(headerBgRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  useEffect(() => {
    if (!menuOverlayRef.current || !bgImagesContainerRef.current) return;

    const menuOverlay = menuOverlayRef.current;
    const pageContent = document.querySelector(".page-content") as HTMLElement;
    
    if (!pageContent) return;
    
    // Get all img elements from the background images container
    const bgImgs = Array.from(
      bgImagesContainerRef.current.querySelectorAll("img")
    ) as HTMLImageElement[];
    const items = menuItemsRef.current.filter(Boolean) as HTMLLIElement[];

    // Initialize menu timeline
    const menuTimeline = gsap.timeline({ paused: true });
    menuTimelineRef.current = menuTimeline;

    // Show first image by default
    if (bgImgs[0]) {
      gsap.set(bgImgs[0], { opacity: 1 });
    }

    // Menu overlay background animation on hover
    const cleanupFunctions: (() => void)[] = [];
    
    items.forEach((item, index) => {
      const handleMouseEnter = () => {
        // Fade out all images
        gsap.to(bgImgs, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });

        // Fade in corresponding image (index + 1 because first is default)
        if (bgImgs[index + 1]) {
          gsap.to(bgImgs[index + 1], {
            opacity: 1,
            scale: 1.18,
            duration: 0.5,
            ease: "power3.inOut",
          });
        }
      };

      const handleMouseLeave = () => {
        // Reset to default (first image)
        gsap.to(bgImgs, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          scale: 1,
        });

        if (bgImgs[0]) {
          gsap.to(bgImgs[0], {
            opacity: 1,
            duration: 0.5,
            ease: "power3.inOut",
          });
        }
      };

      item.addEventListener("mouseenter", handleMouseEnter);
      item.addEventListener("mouseleave", handleMouseLeave);

      cleanupFunctions.push(() => {
        item.removeEventListener("mouseenter", handleMouseEnter);
        item.removeEventListener("mouseleave", handleMouseLeave);
      });
    });

    // === OPEN ANIMATION ===
    menuTimeline
      // Animate menu overlay clip-path open
      .to(
        menuOverlay,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 120%, 0% 100%)",
          duration: 0.8,
          ease: "power3.inOut",
          onStart: () => {
            menuOverlay.style.pointerEvents = "none";
          },
          onComplete: () => {
            menuOverlay.style.clipPath = "none";
            menuOverlay.style.pointerEvents = "auto";
          },
        },
        0
      )
      // Animate page content
      .to(
        pageContent,
        {
          yPercent: 20,
          rotation: 18,
          scale: 1.3,
          transformOrigin: "left top",
          duration: 0.8,
          ease: "power3.inOut",
        },
        0
      )
      // Animate background zoom
      .to(
        ".menu-overlay__bg-img img",
        {
          scale: 1.1,
          duration: 1,
          ease: "power3.inOut",
        },
        0
      )
      // Animate menu links in
      .add(() => {
        const linkTexts = linkTextsRef.current.filter(Boolean) as HTMLElement[];
        linkTexts.forEach((el) => {
          const chars = splitTextIntoChars(el);
          menuTimeline.fromTo(
            chars,
            { yPercent: -200 },
            {
              yPercent: 0,
              ease: "power2.inOut",
              duration: 0.5,
              stagger: 0.01,
              visibility: "visible",
            },
            0.2
          );
        });
      }, 0)
      // Animate toggle button
      .to(
        ".toggle-line-top",
        {
          transformOrigin: "center",
          y: 4,
          scaleX: 0.8,
          rotation: 45,
          duration: 0.4,
          ease: "back.out(1.5)",
        },
        0.2
      )
      .to(
        ".toggle-line-bottom",
        {
          transformOrigin: "center",
          y: -4,
          scaleX: 0.8,
          rotation: -45,
          duration: 0.4,
          ease: "back.out(1.5)",
        },
        0.2
      );

    // Cleanup
    return () => {
      menuTimeline.kill();
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, []);

  const handleToggleMenu = () => {
    const menuTimeline = menuTimelineRef.current;
    if (!menuTimeline) return;

    if (menuTimeline.progress() === 1) {
      // Menu is open, close it
      menuTimeline.reverse();
      menuTimeline.eventCallback("onReverseComplete", () => {
        if (menuOverlayRef.current) {
          menuOverlayRef.current.style.pointerEvents = "none";
        }
        setIsMenuOpen(false);
      });
      setIsMenuOpen(false);
    } else {
      // Menu is closed, open it
      menuTimeline.play();
      setIsMenuOpen(true);
    }
  };

  return (
    <>
      {/* Header */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8"
      >
        {/* Background blur overlay - appears on scroll */}
        <div
          ref={headerBgRef}
          className="absolute inset-0 bg-teal-950/70 backdrop-blur-lg -z-10 opacity-0"
          style={{
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
          }}
        />
        
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl md:text-3xl font-bold text-white">
            <span style={{ fontFamily: "var(--font-bbh-sans)" }}>INNO</span>
          </div>

          {/* Menu Toggle Button */}
          <button
            ref={toggleButtonRef}
            id="menu-toggle"
            onClick={handleToggleMenu}
            className="relative w-10 h-10 flex flex-col items-center justify-center gap-2 z-50"
            aria-label="Toggle menu"
          >
            <span className="toggle-line-top w-8 h-0.5 bg-white rounded-full transition-all" />
            <span className="toggle-line-bottom w-8 h-0.5 bg-white rounded-full transition-all" />
          </button>
        </div>
      </header>

      {/* Menu Overlay */}
      <div
        ref={menuOverlayRef}
        className="menu-overlay fixed inset-0 bg-gradient-to-br from-teal-900 via-cyan-900 to-teal-950 z-40 pointer-events-none"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
      >
        {/* Background Images */}
        <div
          ref={bgImagesContainerRef}
          className="menu-overlay__bg-img absolute inset-0 overflow-hidden"
        >
          {/* Default background image */}
          <Image
            src="/images/cloud.png"
            alt="Menu background"
            fill
            className="object-cover opacity-0"
            style={{ objectFit: "cover" }}
            priority
          />
          {/* Menu item background images */}
          {menuItems.map((item, index) => {
            if (!item.bgImage) return null;
            return (
              <Image
                key={index}
                src={item.bgImage}
                alt={`${item.label} background`}
                fill
                className="object-cover opacity-0"
                style={{ objectFit: "cover" }}
              />
            );
          })}
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/80 via-cyan-900/70 to-teal-950/90" />

        {/* Menu Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <nav className="menu-overlay__main">
            <ul className="space-y-8 md:space-y-12">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  ref={(el) => {
                    menuItemsRef.current[index] = el;
                  }}
                  className="text-center"
                >
                  <a
                    href={item.href}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white hover:text-cyan-300 transition-colors"
                    style={{ fontFamily: "var(--font-bbh-sans)" }}
                    data-text-anim
                    ref={(el) => {
                      if (el) linkTextsRef.current[index] = el;
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

    </>
  );
};

export default Header;

