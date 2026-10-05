import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito } from "next/font/google";
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

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
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
    <html lang="en" className={`${cormorant.variable} ${nunito.variable}`}>
      <body className="clay-canvas min-h-screen text-snow">
        <PageLoader />
        <ScrollProgress />
        <div className="relative z-[1]">{children}</div>
      </body>
    </html>
  );
}
