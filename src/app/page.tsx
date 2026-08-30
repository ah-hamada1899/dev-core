import HomeView from "@/views/HomeView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Ahmed Hamada — front-end developer. Real Ellwaa and personal projects built on this machine.",
};

export default function HomePage(): React.ReactElement {
  return <HomeView />;
}