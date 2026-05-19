import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bijay Thakur | AI/ML Engineer Portfolio",
  description:
    "Portfolio of Bijay Thakur, a Computer Science student focused on AI/ML engineering, GenAI systems, and practical software development.",
  openGraph: {
    title: "Bijay Thakur | AI/ML Engineer Portfolio",
    description:
      "Portfolio of Bijay Thakur, a Computer Science student focused on AI/ML engineering, GenAI systems, and practical software development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#fafafa] text-slate-900">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
