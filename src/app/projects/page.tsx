import ProjectsView from "@/views/ProjectsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Ellwaa product UIs and personal Next.js sites Ahmed Hamada shipped from this PC.",
};

export default function ProjectsPage(): React.ReactElement {
  return <ProjectsView />;
}