import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-ar",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inno.sa"),
  title: "INNO — شريكك التقني",
  description:
    "إينو شركة تقنية تبني مواقع تعريفية وأنظمة تشغيل داخلية ومنصات حجز للشركات في السعودية — تسليم من ٧ إلى ١٢ يوم، بلوحة تحكم تديرها بنفسك.",
  keywords: [
    "تصميم مواقع",
    "أنظمة إدارة",
    "منصات حجز",
    "شركة برمجة الرياض",
    "INNO",
  ],
  icons: {
    icon: "/inno_logo.png",
    shortcut: "/inno_logo.png",
    apple: "/inno_logo.png",
  },
  openGraph: {
    title: "INNO — شريكك التقني",
    description:
      "مواقع تعريفية، أنظمة تشغيل داخلية، ومنصات حجز — بلوحة تحكم تديرها بنفسك.",
    type: "website",
    locale: "ar_SA",
  },
};

export const viewport: Viewport = {
  themeColor: "#072436",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${plexArabic.variable} ${plexMono.variable} ${grotesk.variable}`}
    >
      <head>
        {/* Reveal animations start hidden; without JS they must not stay hidden. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
