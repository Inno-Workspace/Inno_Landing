"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/contexts/language-context";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Simple text splitting utility
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

const Contact = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

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

      // Text content animation
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

      // Form animation
      if (formRef.current) {
        const formElements = formRef.current.querySelectorAll(".form-element");
        gsap.fromTo(
          formElements,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [language]);

  return (
    <div
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden py-20 md:py-32"
    >
      {/* Light background */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "#f0fdfa" }}
      ></div>

      {/* Subtle gradient overlays */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 30% 40%, rgba(240, 253, 250, 0.8) 0%, transparent 70%)`,
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Title and Subtitle */}
        <div className="mb-16 md:mb-24">
          <h2
            ref={titleRef}
            className="title text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-devil-breeze)",
              background: "linear-gradient(135deg, #0f766e 0%, #0e7490 50%, #155e75 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("contact.title")}
          </h2>
          <p
            ref={subtitleRef}
            className="subtitle text-xl md:text-2xl lg:text-3xl max-w-3xl"
            style={{
              fontFamily: "var(--font-poppins)",
              color: "#155e75",
            }}
          >
            {t("contact.subtitle")}
          </p>
        </div>

        {/* Text Content */}
        <div ref={textContentRef} className="text-content mb-16 md:mb-20 max-w-4xl">
          <p
            className="text text-lg md:text-xl leading-relaxed"
            style={{
              fontFamily: "var(--font-poppins)",
              color: "#0f766e",
            }}
          >
            {t("contact.description")}
          </p>
        </div>

        {/* Contact Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div
            ref={formRef}
            className="rounded-2xl p-8 md:p-10"
            style={{
              background: "linear-gradient(160deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))",
              border: "1px solid rgba(15, 118, 110, 0.2)",
              boxShadow: "0 20px 60px rgba(15, 118, 110, 0.15), 0 0 0 1px rgba(20, 184, 166, 0.1)",
              backdropFilter: "blur(20px)",
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-element">
                <label
                  htmlFor="name"
                  className="block text-lg font-medium mb-2"
                  style={{
                    fontFamily: "var(--font-poppins)",
                    color: "#0f766e",
                  }}
                >
                  {t("contact.form.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  style={{
                    fontFamily: "var(--font-poppins)",
                    backgroundColor: "rgba(240, 253, 250, 0.5)",
                    borderColor: "rgba(15, 118, 110, 0.3)",
                    color: "#0f766e",
                  }}
                  placeholder={t("contact.form.namePlaceholder")}
                />
              </div>

              <div className="form-element">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium mb-2"
                  style={{
                    fontFamily: "var(--font-poppins)",
                    color: "#0f766e",
                  }}
                >
                  {t("contact.form.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  style={{
                    fontFamily: "var(--font-poppins)",
                    backgroundColor: "rgba(240, 253, 250, 0.5)",
                    borderColor: "rgba(15, 118, 110, 0.3)",
                    color: "#0f766e",
                  }}
                  placeholder={t("contact.form.emailPlaceholder")}
                />
              </div>

              <div className="form-element">
                <label
                  htmlFor="message"
                  className="block text-lg font-medium mb-2"
                  style={{
                    fontFamily: "var(--font-poppins)",
                    color: "#0f766e",
                  }}
                >
                  {t("contact.form.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
                  style={{
                    fontFamily: "var(--font-poppins)",
                    backgroundColor: "rgba(240, 253, 250, 0.5)",
                    borderColor: "rgba(15, 118, 110, 0.3)",
                    color: "#0f766e",
                  }}
                  placeholder={t("contact.form.messagePlaceholder")}
                />
              </div>

              <div className="form-element">
                <button
                  type="submit"
                  className="w-full px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 active:scale-95"
                  style={{
                    fontFamily: "var(--font-poppins)",
                    backgroundColor: "#0f766e",
                    color: "#ffffff",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#115e59";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#0f766e";
                  }}
                >
                  {t("contact.form.submit")}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-8">
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{
                background: "linear-gradient(160deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))",
                border: "1px solid rgba(15, 118, 110, 0.2)",
                boxShadow: "0 20px 60px rgba(15, 118, 110, 0.15), 0 0 0 1px rgba(20, 184, 166, 0.1)",
                backdropFilter: "blur(20px)",
              }}
            >
              <h3
                className="text-3xl md:text-4xl font-bold mb-8"
                style={{
                  fontFamily: "var(--font-devil-breeze)",
                  background: "linear-gradient(135deg, #0f766e 0%, #0e7490 50%, #155e75 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t("contact.info.title")}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(15, 118, 110, 0.1)" }}>
                    <svg
                      className="w-6 h-6"
                      style={{ color: "#0f766e" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="text-sm mb-1"
                      style={{
                        fontFamily: "var(--font-poppins)",
                        color: "#155e75",
                      }}
                    >
                      {t("contact.info.emailLabel")}
                    </p>
                    <a
                      href="mailto:info@inno.com"
                      className="text-lg font-medium hover:underline transition-colors"
                      style={{
                        fontFamily: "var(--font-poppins)",
                        color: "#0f766e",
                      }}
                    >
                      info@inno.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(15, 118, 110, 0.1)" }}>
                    <svg
                      className="w-6 h-6"
                      style={{ color: "#0f766e" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="text-sm mb-1"
                      style={{
                        fontFamily: "var(--font-poppins)",
                        color: "#155e75",
                      }}
                    >
                      {t("contact.info.phoneLabel")}
                    </p>
                    <a
                      href="tel:+1234567890"
                      className="text-lg font-medium hover:underline transition-colors"
                      style={{
                        fontFamily: "var(--font-poppins)",
                        color: "#0f766e",
                      }}
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(15, 118, 110, 0.1)" }}>
                    <svg
                      className="w-6 h-6"
                      style={{ color: "#0f766e" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="text-sm mb-1"
                      style={{
                        fontFamily: "var(--font-poppins)",
                        color: "#155e75",
                      }}
                    >
                      {t("contact.info.addressLabel")}
                    </p>
                    <p
                      className="text-lg font-medium"
                      style={{
                        fontFamily: "var(--font-poppins)",
                        color: "#0f766e",
                      }}
                    >
                      {t("contact.info.address")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20"
        style={{
          background: `linear-gradient(to top, rgba(240, 253, 250, 0.8), transparent)`,
        }}
      ></div>
    </div>
  );
};

export default Contact;

