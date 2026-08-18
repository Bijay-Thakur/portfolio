import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/ui/PageLoader";
import ScrollProgress from "@/components/ui/ScrollProgress";

// Load only the two weights we actually use — cuts download by ~60%
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bijay Thakur | AI Engineer",
  description:
    "Portfolio of Bijay Thakur — AI Engineer, GenAI Systems Builder, Computer Science @ Queens College. Building research-driven AI systems, RAG pipelines, and practical ML products.",
  openGraph: {
    title: "Bijay Thakur | AI Engineer",
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
        {/* Ambient depth layer behind every section (negative z paints under content). */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_12%,rgba(13,214,200,0.07),transparent_42%),radial-gradient(circle_at_85%_78%,rgba(69,190,255,0.06),transparent_46%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(13,214,200,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(13,214,200,0.9) 1px, transparent 1px)",
            backgroundSize: "clamp(52px, 5vw, 84px) clamp(52px, 5vw, 84px)",
          }}
        />
        <PageLoader />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
