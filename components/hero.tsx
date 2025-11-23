"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Dynamic import to avoid SSR issues with canvas
const AnimatedDrawingCanvas = dynamic(
  () => import("./animated-drawing-canvas"),
  { ssr: false }
);

const Hero = () => {
  const { language } = useLanguage();
  const [showScribblesText, setShowScribblesText] = useState(false);

  // Handle the interaction logic
  useEffect(() => {
    const handleUserDrawn = () => {
      setShowScribblesText(true);
      const timer = setTimeout(() => setShowScribblesText(false), 12000);
      return () => clearTimeout(timer);
    };

    window.addEventListener('userDrawn', handleUserDrawn);
    return () => window.removeEventListener('userDrawn', handleUserDrawn);
  }, []);

  const isAr = language === "ar";
  const fontHeading = "var(--font-devil-breeze)";
  const fontBody = "var(--font-poppins)";

  return (
    <div
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ perspective: "1000px" }}
    >
      {/* --- BACKGROUND LAYERS --- */}

      {/* 1. Deep Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#001e2b] to-slate-950" />

      {/* 2. Clean Architectural Grid (Replaces complex SVG) */}
      <div 
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(103, 232, 249, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(103, 232, 249, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 100%)"
        }}
      />

      {/* 3. Ambient Glow Orbs (Softened & Optimized) */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-500/10 blur-[120px] rounded-full mix-blend-screen" />

      {/* 4. Drawing Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatedDrawingCanvas />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 w-full max-w-7xl px-4 md:px-8 pointer-events-none">
        <div className="flex flex-col items-center text-center space-y-8">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/30 backdrop-blur-md"
          >
            <span className="text-cyan-400 text-xs md:text-sm font-medium tracking-wider" style={{ fontFamily: fontBody }}>
              {isAr ? "ابتكار • تطوير • تحويل رقمي" : "Innovation • Development • Digital Transformation"}
            </span>
          </motion.div>

          {/* Dynamic Heading Area */}
          <div className="min-h-[180px] sm:min-h-[240px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {showScribblesText ? (
                <motion.h1
                  key="scribbles"
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
                  style={{ fontFamily: fontHeading }}
                >
                  {isAr ? (
                    <>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-200">نحولك الشخابيط</span>
                      <br /> لواقع ملموس
                    </>
                  ) : (
                    <>
                      Let's turn
                      <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-200">the Scribbles to Reality</span>
                    </>
                  )}
                </motion.h1>
              ) : (
                <motion.h1
                  key="original"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
                  style={{ fontFamily: fontHeading }}
                >
                  {isAr ? (
                    <>
                      شريكك التقني
    
                    </>
                  ) : (
                    <>
                      Your  Technical Partner
                    </>
                  )}
                </motion.h1>
              )}
            </AnimatePresence>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-slate-300/80 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: fontBody }}
          >
            {isAr
              ? "فريق شغوف بتطوير التجربة الرقمية لدفع نمو الشركات"
              : "A team passionate about developing digital experiences to drive business growth."}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto pointer-events-auto"
          >
            {/* Primary Button */}
            <a
              href="#contact"
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-semibold shadow-lg shadow-cyan-900/20 overflow-hidden transition-transform hover:scale-105"
              style={{ fontFamily: fontBody }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative flex items-center justify-center gap-2">
                {isAr ? "ابدأ مشروعك" : "Start Your Project"}
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isAr ? "M11 17l-5-5m0 0l5-5m-5 5h12" : "M13 7l5 5m0 0l-5 5m5-5H6"} />
                </svg>
              </span>
            </a>

            {/* Secondary Button */}
            <a
              href="#works"
              className="group px-8 py-4 rounded-xl border border-slate-600/50 text-slate-300 font-semibold hover:bg-slate-800/50 hover:text-white hover:border-cyan-500/50 transition-all duration-300"
              style={{ fontFamily: fontBody }}
            >
              <span className="flex items-center justify-center gap-2">
                {isAr ? "استكشف أعمالنا" : "Explore Our Work"}
              </span>
            </a>
          </motion.div>

        </div>
      </div>

      {/* Bottom Fade for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </div>
  );
};

export default Hero;