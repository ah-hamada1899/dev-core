import Link from "next/link";
import { Project } from "@/types";
import { displayHost } from "@/data/projects";
import ProjectMedia from "@/components/ProjectMedia";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps): React.ReactElement {
  const href = `/projects/${project.id}`;

  return (
    <article className="group project-card relative flex h-full flex-col overflow-hidden border border-outline-variant/20 bg-[#121212] transition-all duration-300 hover:border-primary">
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden" aria-label={`${project.title} screenshot`}>
        <ProjectMedia project={project} className="h-full w-full" />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="border border-primary/20 bg-primary/10 px-2 py-1 font-label-caps text-[10px] uppercase tracking-widest text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mb-2 font-headline-lg text-[24px] leading-tight transition-colors group-hover:text-primary">
          <Link href={href}>{project.title}</Link>
        </h3>
        <p className="mb-6 font-body-md text-body-md text-on-surface-variant">
          {project.description}
        </p>
        <div className="mt-auto flex flex-col gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-code-sm text-code-sm text-primary hover:underline"
            >
              <span className="material-symbols-outlined text-base">language</span>
              {displayHost(project.liveUrl)}
            </a>
          ) : (
            <span className="font-code-sm text-code-sm text-on-surface-variant">
              Live URL needed
            </span>
          )}
          <div className="flex items-center justify-between gap-4">
            <Link
              href={href}
              className="inline-flex items-center gap-2 font-label-caps text-label-caps text-primary transition-all hover:gap-4"
            >
              VIEW CASE{" "}
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
            <span className="font-code-sm text-code-sm text-on-surface-variant">
              {project.year}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
