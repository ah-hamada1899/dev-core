import SkillsView from "@/views/SkillsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills | DEV_CORE",
  description: "Technical expertise and technologies I work with.",
};

export default function SkillsPage(): React.ReactElement {
  return <SkillsView />;
}