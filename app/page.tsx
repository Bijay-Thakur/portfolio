import type { Metadata } from "next";
import PortfolioGame from "@/components/v2/PortfolioGame";
import "./v2/world.css";

export const metadata: Metadata = {
  title: "Bijay Thakur | Interactive Portfolio",
  description: "Explore Bijay Thakur's work in a playable 3D world, or skip to the classic portfolio.",
};

export default function HomePage() {
  return <PortfolioGame />;
}
