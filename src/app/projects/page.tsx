import ProjectsView from "@/views/ProjectsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | DEV_CORE",
  description: "Explore my portfolio of engineered solutions and digital experiences.",
};

export default function ProjectsPage(): React.ReactElement {
  return <ProjectsView />;
}