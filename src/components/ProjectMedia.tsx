import Image from "next/image";
import { Project } from "@/types";
import ProjectCover from "@/components/ProjectCover";

interface ProjectMediaProps {
  project: Project;
  className?: string;
  sizes?: string;
}

export default function ProjectMedia({
  project,
  className = "",
  sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
}: ProjectMediaProps): React.ReactElement {
  if (project.image) {
    return (
      <div className={`relative overflow-hidden bg-surface-container-high ${className}`}>
        <Image
          src={project.image}
          alt={`${project.title} website screenshot`}
          fill
          className="project-image object-cover object-top transition-transform duration-700 ease-out"
          sizes={sizes}
          key={typeof project.image === "string" ? project.image : project.image.src}
        />
      </div>
    );
  }

  return (
    <ProjectCover
      project={project}
      className={`project-image h-full w-full transition-transform duration-700 ease-out ${className}`}
    />
  );
}
