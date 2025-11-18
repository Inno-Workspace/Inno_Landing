"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Simple text splitting utility (alternative to SplitText)
const splitTextIntoLines = (element: HTMLElement): HTMLElement[] => {
  if (!element || !element.textContent) return [];
  
  const text = element.textContent;
  const words = text.split(" ");
  const lines: HTMLElement[] = [];
  const maxWidth = element.offsetWidth || window.innerWidth - 100;

  // Create a temporary container to measure text width
  const tempContainer = document.createElement("div");
  tempContainer.style.position = "absolute";
  tempContainer.style.visibility = "hidden";
  tempContainer.style.whiteSpace = "nowrap";
  tempContainer.style.fontSize = window.getComputedStyle(element).fontSize;
  tempContainer.style.fontFamily = window.getComputedStyle(element).fontFamily;
  document.body.appendChild(tempContainer);

  let currentLine = document.createElement("div");
  currentLine.style.display = "block";
  currentLine.style.overflow = "hidden";
  currentLine.style.opacity = "0";
  element.innerHTML = "";

  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.textContent = word + (index < words.length - 1 ? " " : "");
    span.style.display = "inline";
    currentLine.appendChild(span);

    // Measure current line width
    tempContainer.innerHTML = currentLine.textContent || "";
    const lineWidth = tempContainer.offsetWidth;

    if (lineWidth > maxWidth && currentLine.children.length > 1) {
      const lastChild = currentLine.lastChild;
      if (lastChild) {
        currentLine.removeChild(lastChild);
        element.appendChild(currentLine);
        lines.push(currentLine);
        currentLine = document.createElement("div");
        currentLine.style.display = "block";
        currentLine.style.overflow = "hidden";
        currentLine.style.opacity = "0";
        currentLine.appendChild(lastChild);
      }
    }
  });

  if (currentLine.children.length > 0) {
    element.appendChild(currentLine);
    lines.push(currentLine);
  }

  document.body.removeChild(tempContainer);
  return lines;
};

interface WorkItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const Works = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  // Work items - duplicated for seamless loop
  const works: WorkItem[] = [
    {
      id: 1,
      title: t("works.item1.title"),
      description: t("works.item1.description"),
      image: "/images/shape.png",
      category: t("works.category.web"),
    },
    {
      id: 2,
      title: t("works.item2.title"),
      description: t("works.item2.description"),
      image: "/images/shape-2.png",
      category: t("works.category.mobile"),
    },
    {
      id: 3,
      title: t("works.item3.title"),
      description: t("works.item3.description"),
      image: "/images/shape-3.png",
      category: t("works.category.ai"),
    },
    {
      id: 4,
      title: t("works.item4.title"),
      description: t("works.item4.description"),
      image: "/images/shape-4.png",
      category: t("works.category.web"),
    },
    {
      id: 5,
      title: t("works.item1.title"),
      description: t("works.item1.description"),
      image: "/images/shape-5.png",
      category: t("works.category.web"),
    },
    {
      id: 6,
      title: t("works.item2.title"),
      description: t("works.item2.description"),
      image: "/images/shape-6.png",
      category: t("works.category.mobile"),
    },
  ];

  // Duplicate works for infinite loop
  const duplicatedWorks = [...works, ...works, ...works];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const resizeHandlers: (() => void)[] = [];

    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Subtitle animation
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Text content animation with line splitting
      if (textContentRef.current) {
        const lines = splitTextIntoLines(textContentRef.current);
        if (lines.length > 0) {
          gsap.fromTo(
            lines,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              stagger: 0.2,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: textContentRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }

      // 3D Carousel Scroll Reveal Animation
      if (carouselTrackRef.current && sectionRef.current) {
        const carouselItems = carouselTrackRef.current.querySelectorAll(
          ".carousel-item"
        );

        // Set initial 3D transforms - items start rotated 90 degrees (edge-on)
        gsap.set(carouselItems, {
          rotationY: 90,
          rotationX: 0,
          z: -400,
          opacity: 0,
          transformStyle: "preserve-3d",
        });

        // Create scroll-triggered 3D reveal for each item
        carouselItems.forEach((item, index) => {
          const itemElement = item as HTMLElement;
          
          // Calculate item position relative to viewport center
          const updateItemTransform = () => {
            const rect = itemElement.getBoundingClientRect();
            const viewportCenter = window.innerWidth / 2;
            const itemCenter = rect.left + rect.width / 2;
            const distanceFromCenter = itemCenter - viewportCenter;
            const maxDistance = window.innerWidth / 2 + rect.width / 2;
            const normalizedDistance = Math.max(-1, Math.min(1, distanceFromCenter / maxDistance));
            
            // 3D rotation based on position
            // When item is at center: rotationY = 0, when at edges: rotationY = ±90
            const rotationY = normalizedDistance * 90;
            const rotationX = Math.abs(normalizedDistance) * 20;
            const z = Math.abs(normalizedDistance) * 400;
            
            // Opacity and scale - highest when centered
            const centerProximity = 1 - Math.abs(normalizedDistance);
            const opacity = Math.max(0.3, centerProximity);
            const scale = 0.8 + centerProximity * 0.2;
            
            gsap.set(itemElement, {
              rotationY: rotationY,
              rotationX: rotationX,
              z: z,
              opacity: opacity,
              scale: scale,
            });
          };

          // Update on scroll
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
            onUpdate: updateItemTransform,
            onEnter: updateItemTransform,
            onLeave: updateItemTransform,
            onEnterBack: updateItemTransform,
            onLeaveBack: updateItemTransform,
          });

          // Also update on resize
          window.addEventListener("resize", updateItemTransform);
          resizeHandlers.push(() => {
            window.removeEventListener("resize", updateItemTransform);
          });
        });

        // Infinite horizontal scroll animation
        const itemWidth = 350 + 32; // width + gap
        const totalWidth = works.length * itemWidth;
        
        const scrollAnimation = gsap.to(carouselTrackRef.current, {
          x: language === "ar" ? totalWidth : -totalWidth,
          duration: 60,
          ease: "none",
          repeat: -1,
        });

        // Pause animation when section is not in view
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => scrollAnimation.play(),
          onLeave: () => scrollAnimation.pause(),
          onEnterBack: () => scrollAnimation.play(),
          onLeaveBack: () => scrollAnimation.pause(),
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      // Cleanup resize listeners
      resizeHandlers.forEach(handler => handler());
    };
  }, [language, works.length]);

  return (
    <div
      id="works"
      ref={sectionRef}
      className="section2 relative w-full overflow-hidden py-12 md:py-16"
      style={{ perspective: "1000px" }}
    >
      {/* SVG Filters for texture effects */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="brush-texture-works">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="8"
              result="displacement"
            />
          </filter>
          <filter id="spray-texture-works">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.95"
              numOctaves="3"
              result="turbulence"
            />
            <feGaussianBlur in="turbulence" stdDeviation="2" result="blur" />
            <feColorMatrix
              in="blur"
              type="saturate"
              values="0"
              result="desaturated"
            />
          </filter>
          <filter id="noise-filter-works">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
        </defs>
      </svg>

      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-primary"></div>

      {/* 3D Wireframe Gradient Effect */}
      <div className="absolute inset-0 overflow-hidden opacity-70">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="wireframeGradient-works"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="var(--effect-wireframe-start)" />
              <stop offset="50%" stopColor="var(--effect-wireframe-mid)" />
              <stop offset="100%" stopColor="var(--effect-wireframe-end)" />
            </linearGradient>
            <radialGradient id="cornerFade-works" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="70%" stopColor="white" stopOpacity="0.8" />
              <stop offset="100%" stopColor="white" stopOpacity="0.2" />
            </radialGradient>
            <mask id="wireframeMask-works">
              <rect width="100%" height="100%" fill="url(#cornerFade-works)" />
            </mask>
            <pattern
              id="wireframePattern-works"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0,0 L100,0 M0,0 L0,100 M0,50 L100,50 M50,0 L50,100"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="1"
                fill="none"
              />
            </pattern>
          </defs>
          <g
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="1"
            fill="none"
            mask="url(#wireframeMask-works)"
          >
            <path d="M0,100 Q200,80 400,100 T800,100 T1200,100" />
            <path d="M0,150 Q200,130 400,150 T800,150 T1200,150" />
            <path d="M0,200 Q200,180 400,200 T800,200 T1200,200" />
            <path d="M0,250 Q200,230 400,250 T800,250 T1200,250" />
            <path d="M0,300 Q200,280 400,300 T800,300 T1200,300" />
            <path d="M0,350 Q200,330 400,350 T800,350 T1200,350" />
            <path d="M0,400 Q200,380 400,400 T800,400 T1200,400" />
            <path d="M0,450 Q200,430 400,450 T800,450 T1200,450" />
            <path d="M0,500 Q200,480 400,500 T800,500 T1200,500" />
            <path d="M0,550 Q200,530 400,550 T800,550 T1200,550" />
            <path d="M0,600 Q200,580 400,600 T800,600 T1200,600" />
            <path d="M0,650 Q200,630 400,650 T800,650 T1200,650" />
            <path d="M0,700 Q200,680 400,700 T800,700 T1200,700" />

            <path d="M100,0 Q120,200 100,400 T100,800" />
            <path d="M200,0 Q220,200 200,400 T200,800" />
            <path d="M300,0 Q320,200 300,400 T300,800" />
            <path d="M400,0 Q420,200 400,400 T400,800" />
            <path d="M500,0 Q520,200 500,400 T500,800" />
            <path d="M600,0 Q620,200 600,400 T600,800" />
            <path d="M700,0 Q720,200 700,400 T700,800" />
            <path d="M800,0 Q820,200 800,400 T800,800" />
            <path d="M900,0 Q920,200 900,400 T900,800" />
            <path d="M1000,0 Q1020,200 1000,400 T1000,800" />
            <path d="M1100,0 Q1120,200 1100,400 T1100,800" />
          </g>
          <rect
            width="100%"
            height="100%"
            fill="url(#wireframeGradient-works)"
            opacity="0.5"
            mask="url(#wireframeMask-works)"
          />
        </svg>
      </div>

      {/* Radial gradient overlays with brush texture */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 15% 25%, var(--effect-brush) 0%, transparent 60%)`,
          filter: "blur(60px)",
          mixBlendMode: "multiply",
        }}
      ></div>

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 85% 75%, var(--effect-brush) 0%, transparent 65%)`,
          filter: "blur(70px)",
          mixBlendMode: "screen",
        }}
      ></div>

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 50% 60% at 50% 50%, var(--effect-brush) 0%, transparent 70%)`,
          filter: "blur(50px)",
          mixBlendMode: "multiply",
        }}
      ></div>

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 40% 30% at 80% 20%, var(--effect-brush) 0%, transparent 55%)`,
          filter: "blur(45px)",
          mixBlendMode: "overlay",
        }}
      ></div>

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 45% 35% at 20% 80%, var(--effect-brush) 0%, transparent 60%)`,
          filter: "blur(55px)",
          mixBlendMode: "screen",
        }}
      ></div>

      {/* Spray texture overlays */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle 8% at 25% 35%, var(--effect-spray) 0%, transparent 50%),
            radial-gradient(circle 6% at 65% 15%, var(--effect-spray) 0%, transparent 45%),
            radial-gradient(circle 7% at 80% 55%, var(--effect-spray) 0%, transparent 50%),
            radial-gradient(circle 5% at 15% 70%, var(--effect-spray) 0%, transparent 40%)
          `,
          filter: "blur(25px)",
          mixBlendMode: "overlay",
        }}
      ></div>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
          opacity: 0.2,
        }}
      ></div>

      {/* Overlay gradients */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, var(--effect-overlay-top), transparent, var(--effect-overlay-bottom))`,
        }}
      ></div>

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10 md:opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="geometric-pattern-works"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0,0 L50,50 L100,0 L100,100 L50,50 L0,100 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-geometric-primary"
              />
              <path
                d="M25,25 L75,25 L50,75 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
                className="text-geometric-secondary"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geometric-pattern-works)" />
        </svg>
      </div>

      {/* Radial gradients */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle, transparent, transparent, var(--effect-radial-end))`,
        }}
      ></div>
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: `radial-gradient(circle, var(--effect-radial-start), transparent, transparent)`,
        }}
      ></div>

      {/* Linear gradients */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, transparent, var(--effect-linear), transparent)`,
        }}
      ></div>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to left, transparent, var(--effect-linear), transparent)`,
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Title and Subtitle */}
        <div className="section3 mb-6 md:mb-8">
          <h2
            ref={titleRef}
            className="title text-5xl md:text-7xl lg:text-8xl font-bold mb-3 md:mb-4 text-primary"
            style={{ fontFamily: "var(--font-devil-breeze)" }}
          >
            {t("works.title")}
          </h2>
          <p
            ref={subtitleRef}
            className="subtitle text-xl md:text-2xl lg:text-3xl text-secondary max-w-3xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {t("works.subtitle")}
          </p>
        </div>

        {/* Text Content */}
        <div
          ref={textContentRef}
          className="text-content mb-8 md:mb-12 max-w-4xl"
        >
          <p
            className="text text-lg md:text-xl leading-relaxed text-secondary"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {t("works.description")}
          </p>
        </div>
      </div>

      {/* 3D Infinite Carousel */}
      <div 
        className="loop-images relative w-full overflow-hidden" 
        style={{ 
          height: "600px",
          perspective: "1200px",
          perspectiveOrigin: "center center",
        }}
      >
        {/* Fade gradients on sides - matching TechStack */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 md:w-64 z-20 pointer-events-none"
          style={{
            background: `linear-gradient(to right, rgba(10, 52, 63, 0.92), transparent)`,
          }}
        ></div>
        <div
          className="absolute right-0 top-0 bottom-0 w-32 md:w-64 z-20 pointer-events-none"
          style={{
            background: `linear-gradient(to left, rgba(10, 52, 63, 0.92), transparent)`,
          }}
        ></div>

        {/* Carousel Track */}
        <div
          ref={carouselTrackRef}
          className="carousel-track flex gap-6 md:gap-8 items-center"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
            height: "100%",
          }}
        >
          {duplicatedWorks.map((work, index) => (
            <div
              key={`${work.id}-${index}`}
              className="carousel-item flex-shrink-0 group"
              style={{
                width: "350px",
                height: "500px",
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              <div
                className="relative w-full h-full rounded-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(10, 52, 63, 0.95), rgba(16, 93, 108, 0.9))",
                  border: "1px solid rgba(146, 243, 255, 0.3)",
                  boxShadow:
                    "0 25px 60px rgba(5, 25, 32, 0.5), 0 0 40px rgba(146, 243, 255, 0.1)",
                  backdropFilter: "blur(20px)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Work Image with 3D effect */}
                <div className="relative h-3/5 overflow-hidden">
                  <div
                    className="relative w-full h-full"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="350px"
                      style={{
                        filter: "brightness(1.1) contrast(1.1)",
                        transformStyle: "preserve-3d",
                      }}
                    />
                    {/* Glossy overlay effect */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(0, 0, 0, 0.2) 100%)",
                        mixBlendMode: "overlay",
                      }}
                    ></div>
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-medium text-primary bg-white/20 backdrop-blur-md border border-white/30">
                    {work.category}
                  </div>
                </div>

                {/* Work Content */}
                <div className="relative h-2/5 p-6 flex flex-col justify-between">
                  <div>
                    <h3
                      className="text-2xl font-bold text-primary mb-2"
                      style={{ fontFamily: "var(--font-devil-breeze)" }}
                    >
                      {work.title}
                    </h3>
                    <p
                      className="text-secondary text-sm leading-relaxed line-clamp-2"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {work.description}
                    </p>
                  </div>
                  {/* Decorative element */}
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-1 w-12 bg-accent rounded-full"></div>
                    <div className="h-1 w-1 bg-accent rounded-full"></div>
                  </div>
                </div>

                {/* 3D Shadow effect */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 60px rgba(0, 0, 0, 0.3)",
                    borderRadius: "1rem",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20"
        style={{
          background: `linear-gradient(to top, rgba(4, 47, 46, 0.5), transparent)`,
        }}
      ></div>
    </div>
  );
};

export default Works;
