import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nils — Start your agency in a day",
  description:
    "Nils generates a complete, sellable local service business — offer, brand, website, ads, sales kit, and delivery playbook — in under 24 hours. Built natively for Nordic and DACH markets.",
  keywords: [
    "agency",
    "freelancer",
    "Nordic",
    "DACH",
    "AI business generator",
    "local marketing",
    "Sweden",
    "Germany",
  ],
  openGraph: {
    title: "Nils — Start your agency in a day",
    description:
      "From prompt to paying client in under 24 hours. Built for the Nordics and DACH.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nils — Start your agency in a day",
    description: "From prompt to paying client in under 24 hours.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
