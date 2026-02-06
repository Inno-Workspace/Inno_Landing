import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

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
    <html lang="en" suppressHydrationWarning>
      <head />

      <body className="antialiased" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
