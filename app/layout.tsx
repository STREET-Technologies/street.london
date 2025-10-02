import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import CookieConsent from "./components/CookieConsent";

const barlow = Barlow({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "STREET - Your high street, instantly",
  description: "Discover your favourite local shops, all in one place. Browse, buy, and get it delivered in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={barlow.variable}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
