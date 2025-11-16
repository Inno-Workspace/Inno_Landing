"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Solid background - soft and light */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "#f0fdfa" }}
      ></div>

      {/* Shape 4 - Right Side */}
      <motion.div
        className="absolute top-1/2 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] z-0"
        style={{ transform: "translateY(-50%)" }}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div style={{ transform: "rotate(160deg)" }}>
          <Image
            width={500}
            height={500}
            src="/images/shape-4.png"
            alt="Shape 4"
            className="w-full h-full object-contain"
            style={{
              filter:
                "drop-shadow(0 15px 35px rgba(0, 0, 0, 0.3)) drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2))",
            }}
          />
        </div>
      </motion.div>

      {/* Shape 5 - Right Side, above Shape 4 */}
      <motion.div
        className="absolute top-[20%] right-16 sm:right-24 md:right-32 lg:right-40 w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] z-0"
        style={{ transform: "rotate(-15deg)" }}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <Image
          width={400}
          height={400}
          src="/images/shape-5.png"
          alt="Shape 5"
          className="w-full h-full object-contain"
          style={{
            filter:
              "drop-shadow(0 15px 35px rgba(0, 0, 0, 0.3)) drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2))",
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-24 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 md:mb-8 leading-tight text-dark"
            style={{
              fontFamily: "var(--font-devil-breeze)",
            }}
          >
            Al-Hook
          </h1>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-12 md:mb-16 text-dark"
            style={{
              fontFamily: "var(--font-poppins)",
            }}
          >
            Your Best Technical Partner
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl space-y-6 text-lg md:text-xl leading-relaxed text-dark"
          style={{
            fontFamily: "var(--font-poppins)",
            fontWeight: 400,
          }}
        >
          <p>
            A technology company specialized in empowering businesses through
            building advanced digital solutions. We work as a technical partner
            that provides vision, execution, and operation of systems that help
            companies grow, develop their way of working, and improve their
            customer experience.
          </p>

          <p>
            We develop digital platforms and provide automation and AI
            solutions, working to transform traditional processes into flexible
            workflows that operate with higher efficiency and clearer results.
            Our focus is on building scalable, understandable, and easy-to-use
            solutions with solid technical architecture that lasts for years.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
