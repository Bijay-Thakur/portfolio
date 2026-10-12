import type { Metadata } from "next";
import PortfolioGame from "@/components/v2/PortfolioGame";
import "./world.css";

export const metadata: Metadata = {
  title: "Portfolio V2 · Bijay Thakur",
  description: "Explore Bijay Thakur's work in a playable monochrome world, or browse every section without driving.",
};

export default function V2Page() { return <PortfolioGame />; }
