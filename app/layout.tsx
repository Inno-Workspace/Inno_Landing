import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "INNO - Your Best Technical Partner",
  description:
    "Inno is a technology company specialized in empowering businesses through building advanced digital solutions.",
  icons: {
    icon: "/inno_logo.png",
    shortcut: "/inno_logo.png",
    apple: "/inno_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link
          rel="preload"
          href="/fonts/HT_Moshreq_Pro_Black.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
