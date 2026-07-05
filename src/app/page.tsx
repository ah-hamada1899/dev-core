import HomeView from "@/views/HomeView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | DEV_CORE",
  description: "Full-stack engineer building digital experiences with precision.",
};

export default function HomePage(): React.ReactElement {
  return <HomeView />;
}