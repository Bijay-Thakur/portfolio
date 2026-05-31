import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bijay Thakur | AI/ML Engineer",
  description:
    "Portfolio of Bijay Thakur — AI/ML Engineer, GenAI Systems Builder, Computer Science @ Queens College. Building research-driven AI systems, RAG pipelines, and practical ML products.",
  openGraph: {
    title: "Bijay Thakur | AI/ML Engineer",
    description:
      "Building research-driven AI systems, RAG pipelines, and practical ML products with real-world utility.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-ocean text-snow">
        {children}
      </body>
    </html>
  );
}
