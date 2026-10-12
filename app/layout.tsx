import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import PageLoader from "@/components/ui/PageLoader";
import ScrollProgress from "@/components/ui/ScrollProgress";

// Use the same Latin font files locally so offline builds stay reproducible.
const cormorant = localFont({
  src: "./fonts/cormorant-garamond-latin.woff2",
  variable: "--font-cormorant",
  weight: "400 600",
  display: "swap",
});

const nunito = localFont({
  src: "./fonts/nunito-latin.woff2",
  variable: "--font-nunito",
  weight: "500 800",
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
