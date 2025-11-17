import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import { LanguageProvider } from "@/contexts/language-context";
import TransitionOverlay from "@/components/transition-overlay";

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
          href="https://fonts.cdnfonts.com/css/devil-breeze"
          rel="stylesheet"
        />
        <link href="https://fonts.cdnfonts.com/css/poppins" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/bimbo" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          <TransitionOverlay />
          <Header />
          <div className="page-content">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  );
}
