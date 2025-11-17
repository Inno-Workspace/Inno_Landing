"use client";

import {
  useScroll,
  useTransform,
  motion,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

const Hero = () => {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scrollY2 = useTransform(smoothProgress, [0, 1], [0, -300]);
  const scrollX2 = useTransform(smoothProgress, [0, 1], [0, 150]);
  const scrollY3 = useTransform(smoothProgress, [0, 1], [0, -250]);
  const scrollX3 = useTransform(smoothProgress, [0, 1], [0, -120]);

  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const mouseX2 = useTransform(smoothMouseX, [-1, 1], [-30, 30]);
  const mouseY2 = useTransform(smoothMouseY, [-1, 1], [-30, 30]);
  const mouseX3 = useTransform(smoothMouseX, [-1, 1], [-25, 25]);
  const mouseY3 = useTransform(smoothMouseY, [-1, 1], [-25, 25]);

  const y2 = useTransform(
    [scrollY2, mouseY2],
    ([scroll, mouse]) => (scroll as number) + (mouse as number)
  );
  const x2 = useTransform(
    [scrollX2, mouseX2],
    ([scroll, mouse]) => (scroll as number) + (mouse as number)
  );
  const y3 = useTransform(
    [scrollY3, mouseY3],
    ([scroll, mouse]) => (scroll as number) + (mouse as number)
  );
  const x3 = useTransform(
    [scrollX3, mouseX3],
    ([scroll, mouse]) => (scroll as number) + (mouse as number)
  );

  const rotate2 = useTransform(smoothProgress, [0, 1], [0, 15]);
  const rotate3 = useTransform(smoothProgress, [0, 1], [0, -12]);

  const opacity2 = useTransform(smoothProgress, [0, 0.8, 1], [1, 0.9, 0.6]);
  const opacity3 = useTransform(smoothProgress, [0, 0.8, 1], [1, 0.9, 0.6]);

  return (
    <div
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="brush-texture">
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
          <filter id="spray-texture">
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
          <filter id="noise-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
        </defs>
      </svg>

      {/* Base gradient background - darker turquoise */}
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
              id="wireframeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="var(--effect-wireframe-start)" />
              <stop offset="50%" stopColor="var(--effect-wireframe-mid)" />
              <stop offset="100%" stopColor="var(--effect-wireframe-end)" />
            </linearGradient>
            <radialGradient id="cornerFade" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="70%" stopColor="white" stopOpacity="0.8" />
              <stop offset="100%" stopColor="white" stopOpacity="0.2" />
            </radialGradient>
            <mask id="wireframeMask">
              <rect width="100%" height="100%" fill="url(#cornerFade)" />
            </mask>
            <pattern
              id="wireframePattern"
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
            mask="url(#wireframeMask)"
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
            fill="url(#wireframeGradient)"
            opacity="0.5"
            mask="url(#wireframeMask)"
          />
        </svg>
      </div>

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

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
          opacity: 0.2,
        }}
      ></div>

      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, var(--effect-overlay-top), transparent, var(--effect-overlay-bottom))`,
        }}
      ></div>

      <div className="absolute inset-0 opacity-10 md:opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="geometric-pattern"
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
          <rect width="100%" height="100%" fill="url(#geometric-pattern)" />
        </svg>
      </div>

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

      <motion.div
        className="absolute top-[5%] right-[-3%] sm:top-[8%] sm:right-[2%] w-96 h-96 sm:w-[400px] sm:h-[400px] md:top-[10%] md:right-[5%] md:w-[400px] md:h-[400px] lg:top-[5%] lg:right-[0%] lg:w-[600px] lg:h-[600px] z-9"
        style={{
          y: y2,
          x: x2,
          rotate: rotate2,
          opacity: opacity2,
          willChange: "transform, opacity",
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 1, y: 0, x: 0 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
      >
        <Image
          width={600}
          height={600}
          src="/images/liquid-1.png"
          alt="Liquid 1"
          className="w-full h-full object-contain"
          style={{
            filter:
              language === "ar"
                ? "none"
                : "drop-shadow(0 15px 30px rgba(0, 0, 0, 0.3))",
          }}
          priority
        />
      </motion.div>

      <motion.div
        className="absolute bottom-[2%] left-[-9%] sm:bottom-[12%] sm:left-[5%] w-80 h-80 sm:w-[350px] sm:h-[350px] md:bottom-[15%] md:left-[10%] md:w-[350px] md:h-[350px] lg:bottom-[8%] lg:left-[0%] lg:w-[500px] lg:h-[500px] z-9"
        style={{
          y: y3,
          x: x3,
          rotate: rotate3,
          opacity: opacity3,
          willChange: "transform, opacity",
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Image
          width={500}
          height={400}
          src="/images/liquid-2.png"
          alt="Liquid 2"
          className="w-full h-full object-contain"
          style={{
            filter:
              language === "ar"
                ? "none"
                : "drop-shadow(0 15px 30px rgba(0, 0, 0, 0.3))",
          }}
          priority
        />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] sm:w-[1200px] sm:h-[900px] md:w-[1200px] md:h-[900px] lg:w-[1800px] lg:h-[1400px] z-8 pointer-events-none"
        style={{
          willChange: language === "ar" ? "auto" : "transform",
          transformStyle: language === "ar" ? "flat" : "preserve-3d",
        }}
        animate={
          language === "ar"
            ? {}
            : {
                y: [0, -15, 0],
                x: [0, 10, 0],
                scale: [1, 1.02, 1],
              }
        }
        transition={
          language === "ar"
            ? {}
            : {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      >
        <Image
          width={1800}
          height={1400}
          src="/images/cloud.png"
          alt="Cloud"
          className="w-full h-full object-contain"
          style={{
            filter:
              language === "ar"
                ? "none"
                : "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.2))",
          }}
          priority
        />
      </motion.div>

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center px-4">
          <h1
            className="text-5xl sm:text-6xl md:text-8xl lg:text-[200px] font-bold text-primary mb-4 drop-shadow-lg tracking-wider md:tracking-widest"
            style={{ fontFamily: "var(--font-devil-breeze)" }}
          >
            {t("hero.innovation")}
          </h1>
          <h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-primary drop-shadow-md"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {t("hero.title")}
          </h2>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: `linear-gradient(to top, var(--effect-bottom-fade), transparent)`,
        }}
      ></div>
    </div>
  );
};

export default Hero;
