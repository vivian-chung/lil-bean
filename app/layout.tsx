import type { Metadata } from "next";
import { Fraunces, Lora } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lil' Bean Coffeehouse",
  description: "Toreshan Baby Shower — pre-order or order on the day of",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${lora.variable}`}>
      <body className="font-serif antialiased">{children}</body>
    </html>
  );
}
