import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";
import { NavigationProgress } from "@/components/layout/navigation-progress";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://photography-portfolio-nine-wine.vercel.app/"),
  title: {
    default: "Arun Paul — Wildlife & Travel",
    template: "%s — Arun Paul",
  },
  description:
    "A photographic journal of wildlife, wild places, and the stories found along the way.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Arun Paul — Wildlife & Travel",
    description: "Wildlife, wilderness and stories from the road.",
    type: "website",
    siteName: "Arun Paul Photography",
    images: [
      {
        url: "/images/social-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Arun Paul — Wildlife & Travel Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arun Paul — Wildlife & Travel",
    description: "Wildlife, wilderness and stories from the road.",
    images: ["/images/social-preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${cormorant.variable}`}>
        <NavigationProgress />
        {children}
      </body>
    </html>
  );
}