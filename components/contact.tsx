"use client";

import { useLanguage } from "@/contexts/language-context";

const WHATSAPP_NUMBER = "966552658605";

const Contact = () => {
  const { t } = useLanguage();

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t("contact.whatsapp.prefill"))}`,
      "_blank"
    );
  };

  const panelStyle = {
    background: "rgba(224, 251, 252, 0.5)",
    border: "1px solid rgba(14, 116, 144, 0.2)",
    boxShadow: "0 25px 60px rgba(14, 116, 144, 0.08)",
  };

  const infoCardStyle = {
    background: "rgba(207, 250, 254, 0.5)",
    border: "1px solid rgba(14, 116, 144, 0.12)",
    boxShadow: "0 4px 12px rgba(14, 116, 144, 0.06)",
  };

  return (
    <div
      id="contact"
      className="relative w-full overflow-hidden py-20 md:py-32"
    >
      {/* Light cyan-teal background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ecfeff] via-[#f0fdfa] to-[#ecfeff]" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(14, 116, 144, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14, 116, 144, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Soft glow orbs */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-cyan-300/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-teal-300/20 rounded-full blur-[120px]" />

      <div className="relative z-10 container mx-auto px-6">
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
            style={{ fontFamily: "var(--font-moshreq)", color: "#155e75" }}
          >
            {t("contact.subtitle")}
          </p>
          <p
            className="text-lg md:text-xl leading-relaxed max-w-4xl"
            style={{ fontFamily: "var(--font-moshreq)", color: "#0f766e" }}
          >
            {t("contact.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* WhatsApp Card */}
          <div
            className="rounded-2xl p-8 md:p-10 relative overflow-hidden flex flex-col"
            style={panelStyle}
          >
            {/* Decorative top line */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-24 rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, #14b8a6, transparent)" }}
            ></div>

            {/* Icon */}
            <div className="flex-1 flex items-center justify-center py-8">
              <div className="relative">
                <div
                  className="w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #0f766e, #0e7490)",
                    boxShadow: "0 8px 24px rgba(15, 118, 110, 0.3)",
                  }}
                >
                  <svg className="w-12 h-12 md:w-14 md:h-14 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Text + Button */}
            <div className="text-center">
              <h3
                className="text-3xl md:text-4xl font-bold mb-3"
                style={{ fontFamily: "var(--font-devil-breeze)", color: "#155e75" }}
              >
                {t("contact.whatsapp.title")}
              </h3>
              <p
                className="text-sm md:text-base leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-moshreq)", color: "#0e7490" }}
              >
                {t("contact.whatsapp.description")}
              </p>

              <button
                onClick={handleWhatsApp}
                className="w-full px-8 py-5 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.03] active:scale-95 relative overflow-hidden group text-white cursor-pointer"
                style={{
                  fontFamily: "var(--font-moshreq)",
                  background: "linear-gradient(135deg, #0f766e 0%, #0e7490 50%, #155e75 100%)",
                  boxShadow: "0 10px 30px rgba(15, 118, 110, 0.3)",
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {t("contact.whatsapp.button")}
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, #14b8a6 0%, #06b6d4 50%, #0891b2 100%)" }}
                ></div>
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div
            className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
            style={panelStyle}
          >
            <h3
              className="text-3xl md:text-4xl font-bold mb-8"
              style={{ fontFamily: "var(--font-devil-breeze)", color: "#155e75" }}
            >
              {t("contact.info.title")}
            </h3>

            <div className="space-y-6 relative">
              {/* Email Card */}
              <div
                className="flex items-start gap-5 p-5 rounded-xl transition-all duration-300 cursor-pointer group"
                style={infoCardStyle}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, #0f766e, #0e7490)",
                    boxShadow: "0 8px 20px rgba(15, 118, 110, 0.25)",
                  }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm mb-2 font-semibold" style={{ fontFamily: "var(--font-moshreq)", color: "#0e7490" }}>
                    {t("contact.info.emailLabel")}
                  </p>
                  <a className="text-lg font-bold" style={{ fontFamily: "var(--font-moshreq)", color: "#155e75" }}>
                    contact@inno.sa
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div
                className="flex items-start gap-5 p-5 rounded-xl transition-all duration-300 cursor-pointer group"
                style={infoCardStyle}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, #0f766e, #0e7490)",
                    boxShadow: "0 8px 20px rgba(15, 118, 110, 0.25)",
                  }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm mb-2 font-semibold" style={{ fontFamily: "var(--font-moshreq)", color: "#0e7490" }}>
                    {t("contact.info.phoneLabel")}
                  </p>
                  <a
                    className="text-lg font-bold"
                    style={{ fontFamily: "var(--font-moshreq)", color: "#155e75", direction: "ltr", unicodeBidi: "plaintext" }}
                  >
                    +966 55 265 8605
                  </a>
                </div>
              </div>

              {/* Address Card */}
              <div
                className="flex items-start gap-5 p-5 rounded-xl transition-all duration-300 cursor-pointer group"
                style={infoCardStyle}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, #0f766e, #0e7490)",
                    boxShadow: "0 8px 20px rgba(15, 118, 110, 0.25)",
                  }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm mb-2 font-semibold" style={{ fontFamily: "var(--font-moshreq)", color: "#0e7490" }}>
                    {t("contact.info.addressLabel")}
                  </p>
                  <p className="text-lg font-bold" style={{ fontFamily: "var(--font-moshreq)", color: "#155e75" }}>
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
