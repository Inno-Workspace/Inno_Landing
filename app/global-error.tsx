"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          backgroundColor: "#072436",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ maxWidth: "34rem" }}>
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "0.22em",
              color: "#4FC7A3",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            ERROR
          </div>
          <h1
            style={{
              fontSize: "clamp(1.8rem, 6vw, 2.8rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              margin: "20px 0 0",
            }}
          >
            صار خطأ غير متوقع
          </h1>
          <p
            style={{
              margin: "14px 0 0",
              fontSize: "17px",
              lineHeight: 1.85,
              color: "rgba(255,255,255,0.62)",
            }}
          >
            حاول مرة ثانية، أو تواصل معنا وبنساعدك.
          </p>
          <button
            onClick={() => reset()}
            style={{
              marginTop: "32px",
              padding: "15px 28px",
              backgroundColor: "#4FC7A3",
              color: "#072436",
              fontSize: "16px",
              fontWeight: 600,
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            حاول مرة ثانية
          </button>
        </div>
      </body>
    </html>
  );
}
