"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";

const Contact = () => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
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

  return (
    <div
      id="contact"
      className="relative w-full overflow-hidden py-20 md:py-32"
    >
      {/* Light cyan background - matching About section */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "#f0fdfa" }}
      ></div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Title and Subtitle */}
        <div className="mb-6 md:mb-8">
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-3 md:mb-4"
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
            className="text-xl md:text-2xl lg:text-3xl max-w-3xl mb-4"
            style={{
              fontFamily: "var(--font-poppins)",
              color: "#155e75",
            }}
          >
            {t("contact.subtitle")}
          </p>
          <p
            className="text-lg md:text-xl leading-relaxed max-w-4xl"
            style={{
              fontFamily: "var(--font-poppins)",
              color: "#0f766e",
            }}
          >
            {t("contact.description")}
          </p>
        </div>

        {/* Contact Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Contact Form */}
          <div
            className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(160deg, rgba(10, 52, 63, 0.95), rgba(16, 93, 108, 0.9))",
              border: "2px solid rgba(20, 184, 166, 0.3)",
              boxShadow: "0 30px 80px rgba(5, 25, 32, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(30px)",
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 relative">
              <div>
                <label
                  htmlFor="name"
                  className="block text-base font-semibold mb-3 text-primary"
                  style={{
                    fontFamily: "var(--font-poppins)",
                  }}
                >
                  {t("contact.form.name")}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-xl border-2 focus:outline-none transition-all text-primary placeholder-secondary/50"
                    style={{
                      fontFamily: "var(--font-poppins)",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      borderColor: "rgba(20, 184, 166, 0.2)",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(20, 184, 166, 0.5)";
                      e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(20, 184, 166, 0.2)";
                      e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
                    }}
                    placeholder={t("contact.form.namePlaceholder")}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-semibold mb-3 text-primary"
                  style={{
                    fontFamily: "var(--font-poppins)",
                  }}
                >
                  {t("contact.form.email")}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-xl border-2 focus:outline-none transition-all text-primary placeholder-secondary/50"
                    style={{
                      fontFamily: "var(--font-poppins)",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      borderColor: "rgba(20, 184, 166, 0.2)",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(20, 184, 166, 0.5)";
                      e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(20, 184, 166, 0.2)";
                      e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
                    }}
                    placeholder={t("contact.form.emailPlaceholder")}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-base font-semibold mb-3 text-primary"
                  style={{
                    fontFamily: "var(--font-poppins)",
                  }}
                >
                  {t("contact.form.message")}
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-5 py-4 rounded-xl border-2 focus:outline-none transition-all resize-none text-primary placeholder-secondary/50"
                    style={{
                      fontFamily: "var(--font-poppins)",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      borderColor: "rgba(20, 184, 166, 0.2)",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(20, 184, 166, 0.5)";
                      e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(20, 184, 166, 0.2)";
                      e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
                    }}
                    placeholder={t("contact.form.messagePlaceholder")}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-95 relative overflow-hidden group text-primary cursor-pointer"
                style={{
                  fontFamily: "var(--font-poppins)",
                  background: "linear-gradient(135deg, #0f766e 0%, #0e7490 50%, #155e75 100%)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                }}
              >
                <span className="relative z-10">{t("contact.form.submit")}</span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(135deg, #0e7490 0%, #0f766e 50%, #155e75 100%)",
                  }}
                ></div>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div
            className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(160deg, rgba(10, 52, 63, 0.95), rgba(16, 93, 108, 0.9))",
              border: "2px solid rgba(20, 184, 166, 0.3)",
              boxShadow: "0 30px 80px rgba(5, 25, 32, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(30px)",
            }}
          >
            <h3
              className="text-3xl md:text-4xl font-bold mb-8 relative text-primary"
              style={{
                fontFamily: "var(--font-devil-breeze)",
              }}
            >
              {t("contact.info.title")}
            </h3>

            <div className="space-y-6 relative">
              <div
                className="flex items-start gap-5 p-4 rounded-xl transition-all duration-300"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(20, 184, 166, 0.2)",
                }}
                onMouseEnter={(e) => {
                  const isRTL = document.documentElement.dir === "rtl";
                  e.currentTarget.style.transform = isRTL ? "translateX(-8px)" : "translateX(8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #0f766e 0%, #0e7490 50%, #155e75 100%)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <svg
                    className="w-6 h-6 text-primary"
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
                    className="text-sm mb-2 font-semibold text-secondary"
                    style={{
                      fontFamily: "var(--font-poppins)",
                    }}
                  >
                    {t("contact.info.emailLabel")}
                  </p>
                  <a
                    href="mailto:info@inno.com"
                    className="text-lg font-bold transition-colors text-primary"
                    style={{
                      fontFamily: "var(--font-poppins)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#14b8a6";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "";
                    }}
                  >
                    info@inno.com
                  </a>
                </div>
              </div>

              <div
                className="flex items-start gap-5 p-4 rounded-xl transition-all duration-300"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(20, 184, 166, 0.2)",
                }}
                onMouseEnter={(e) => {
                  const isRTL = document.documentElement.dir === "rtl";
                  e.currentTarget.style.transform = isRTL ? "translateX(-8px)" : "translateX(8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #0f766e 0%, #0e7490 50%, #155e75 100%)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <svg
                    className="w-6 h-6 text-primary"
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
                    className="text-sm mb-2 font-semibold text-secondary"
                    style={{
                      fontFamily: "var(--font-poppins)",
                    }}
                  >
                    {t("contact.info.phoneLabel")}
                  </p>
                  <a
                    href="tel:+1234567890"
                    className="text-lg font-bold transition-colors text-primary"
                    style={{
                      fontFamily: "var(--font-poppins)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#14b8a6";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "";
                    }}
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div
                className="flex items-start gap-5 p-4 rounded-xl transition-all duration-300"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(20, 184, 166, 0.2)",
                }}
                onMouseEnter={(e) => {
                  const isRTL = document.documentElement.dir === "rtl";
                  e.currentTarget.style.transform = isRTL ? "translateX(-8px)" : "translateX(8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #0f766e 0%, #0e7490 50%, #155e75 100%)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <svg
                    className="w-6 h-6 text-primary"
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
                    className="text-sm mb-2 font-semibold text-secondary"
                    style={{
                      fontFamily: "var(--font-poppins)",
                    }}
                  >
                    {t("contact.info.addressLabel")}
                  </p>
                  <p
                    className="text-lg font-bold text-primary"
                    style={{
                      fontFamily: "var(--font-poppins)",
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
  );
};

export default Contact;
