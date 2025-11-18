"use client";

import { motion } from "framer-motion";

const Marquee = () => {
  const text = "YOUR BEST TECHNICAL PARTNER";
  const repetitions = 7; // Number of times to repeat the text

  // Create duplicated content for seamless loop
  const marqueeContent = Array.from({ length: repetitions }).map((_, index) => (
    <h4
      key={index}
      className="inline-block pl-[3rem] text-[2.2rem] font-medium leading-[125%] tracking-[-0.04em] uppercase flex-shrink-0"
      style={{ 
        fontFamily: "var(--font-poppins)",
        color: "#0f766e"
      }}
    >
      {text}
    </h4>
  ));

  return (
    <section 
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#f0fdfa" }}
    >
      <div className="flex items-center h-[61px]">
        <motion.div
          className="flex items-center whitespace-nowrap"
          animate={{
            x: [0, -50 + "%"],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* First set of content */}
          {marqueeContent}
          {/* Duplicate for seamless loop */}
          {marqueeContent}
        </motion.div>
      </div>
    </section>
  );
};

export default Marquee;

