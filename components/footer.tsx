"use client";

import { useLanguage } from "@/contexts/language-context";
import Image from "next/image";

const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      href: "https://www.linkedin.com/company/inno-ksa",
    },
    {
      name: "Instagram",
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      href: "https://www.instagram.com/inno.ksa/",
    },
    {
      name: "TikTok",
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
      href: "https://www.tiktok.com/@inno.ksa",
    },
    {
      name: "Brand Profile",
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM8 13h8v2H8v-2zm0 4h8v2H8v-2zm0-8h3v2H8V9z" />
        </svg>
      ),
      href: "/files/INNO-Brand-Profile.pdf",
    },
  ];

  return (
    <footer className="relative w-full overflow-hidden">
      {/* Deep dark background matching hero */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#001e2b] to-slate-950" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(103, 232, 249, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(103, 232, 249, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ambient glow orbs — desktop only */}
      <div className="hidden md:block absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/[0.07] rounded-full blur-[120px]" />
      <div className="hidden md:block absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/[0.07] rounded-full blur-[120px]" />

      <div className="relative z-10 container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
          {/* Logo and Tagline */}
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-lg flex-shrink-0 p-2 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #134e5e, #0f766e)", border: "1px solid rgba(103, 232, 249, 0.2)", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4), 0 0 15px rgba(103, 232, 249, 0.1)" }}
            >
              <Image
                src="/inno_logo.png"
                alt="INNO Logo"
                width={140}
                height={140}
                className="w-full h-full object-contain brightness-0 invert"
              />
            </div>
            <h3
              className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: "var(--font-devil-breeze)" }}
            >
              {t("footer.tagline")}
            </h3>
          </div>

          {/* Social Media */}
          <div className="flex flex-col">
            <h4
              className="text-lg md:text-xl font-semibold mb-6 text-white"
              style={{ fontFamily: "var(--font-moshreq)" }}
            >
              {t("footer.social.title")}
            </h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-lg text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
                  style={{
                    background: "rgba(0, 30, 43, 0.7)",
                    border: "1px solid rgba(103, 232, 249, 0.12)",
                  }}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col">
            <h4
              className="text-lg md:text-xl font-semibold mb-6 text-white"
              style={{ fontFamily: "var(--font-moshreq)" }}
            >
              {t("footer.contact.title")}
            </h4>
            <div className="space-y-4">
              <a
                href={`mailto:${t("footer.contact.email")}`}
                className="flex items-center gap-3 text-base text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                style={{ fontFamily: "var(--font-moshreq)" }}
              >
                <svg
                  className="w-5 h-5 shrink-0"
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
                <span>{t("footer.contact.email")}</span>
              </a>
              <a
                href="tel:+966552658605"
                className="flex items-center gap-3 text-base text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                style={{ fontFamily: "var(--font-moshreq)" }}
              >
                <svg
                  className="w-5 h-5 shrink-0"
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
                <span dir="ltr" className="font-system">+966 55 265 8605</span>
              </a>
              <div
                className="flex items-start gap-3 text-base text-slate-400"
                style={{ fontFamily: "var(--font-moshreq)" }}
              >
                <svg
                  className="w-5 h-5 shrink-0 mt-0.5"
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
                <span>{t("footer.contact.address")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="mt-12 pt-8 text-center text-sm text-slate-500"
          style={{
            fontFamily: "var(--font-moshreq)",
            borderTop: "1px solid rgba(103, 232, 249, 0.1)",
          }}
        >
          <p>
            © {new Date().getFullYear()} INNO. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
