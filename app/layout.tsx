import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language-context";
import { AuthProvider } from "@/contexts/auth-context";

export const metadata: Metadata = {
  title: "INNO - Your Best Technical Partner",
  description:
    "Inno is a technology company specialized in empowering businesses through building advanced digital solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/HT_Moshreq_Pro_Black.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.cdnfonts.com/css/devil-breeze"
          rel="stylesheet"
        />
        <link href="https://fonts.cdnfonts.com/css/bimbo" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
