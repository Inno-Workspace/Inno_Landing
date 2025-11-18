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
      className="section2 relative w-full overflow-hidden py-20 md:py-32"
      style={{ perspective: "1000px" }}
    >
      {/* Dark Background - matching TechStack exactly */}
      <div className="absolute inset-0 bg-gradient-primary"></div>

      {/* Wireframe Pattern Overlay - matching TechStack */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="works-pattern"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0,0 L60,0 M0,0 L0,60"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#works-pattern)" />
        </svg>
      </div>

      {/* Gradient Overlays - matching TechStack exactly */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 58% 40%, rgba(31, 122, 140, 0.45) 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      ></div>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 48% 38% at 24% 68%, rgba(21, 90, 104, 0.35) 0%, transparent 65%)`,
          filter: "blur(70px)",
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Title and Subtitle */}
        <div className="section3 mb-16 md:mb-24">
          <h2
            ref={titleRef}
            className="title text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-primary"
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
          className="text-content mb-16 md:mb-20 max-w-4xl"
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
