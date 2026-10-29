import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";
import { NavigationProgress } from "@/components/layout/navigation-progress";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant", subsets: ["latin"], weight: ["400", "500", "600"], display: "swap"
});

export const metadata: Metadata = {
  title: { default: "Arun Paul — Wildlife & Travel", template: "%s — Arun Paul" },
  description: "A photographic journal of wildlife, wild places, and the stories found along the way.",
  openGraph: {
    title: "Arun Paul — Wildlife & Travel",
    description: "Wildlife, wilderness and stories from the road.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${cormorant.variable}`}>
        <NavigationProgress />
        {children}
      </body>
    </html>
  );
}
