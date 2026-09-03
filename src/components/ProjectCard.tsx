"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Project } from "@/types";
import { displayHost } from "@/data/projects";
import ProjectMedia from "@/components/ProjectMedia";
import { useProjectCopy } from "@/hooks/useProjectCopy";
import { gsap, useGSAP, hasFinePointer, prefersReducedMotion, tiltCard } from "@/lib/motion";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps): React.ReactElement {
  const href = `/projects/${project.id}`;
  const copy = useProjectCopy(project);
  const t = useTranslations("projectCard");
  const host = project.liveUrl ? displayHost(project.liveUrl) : null;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const card = ref.current;
      if (!card) return;

      const unbindTilt = tiltCard(card);
      const shine = card.querySelector<HTMLElement>("[data-card-shine]");

      if (prefersReducedMotion() || !hasFinePointer() || !shine) return unbindTilt;

      const onEnter = () => {
        gsap.fromTo(
          shine,
          { xPercent: -120, autoAlpha: 0.9 },
          { xPercent: 120, autoAlpha: 0, duration: 0.85, ease: "power2.in" }
        );
      };

      card.addEventListener("mouseenter", onEnter);
      return () => {
        unbindTilt();
        card.removeEventListener("mouseenter", onEnter);
      };
    },
    { scope: ref }
  );

  return (
    <article
      ref={ref}
      data-project-card=""
      className="group project-card relative flex h-full flex-col overflow-hidden rounded-sm border border-outline-variant/20 bg-surface-container-low transition-[border-color,background-color] duration-300 will-change-transform hover:border-primary/70 hover:bg-surface-container [transform-style:preserve-3d]"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-outline-variant/15 bg-surface-container-high">
        <ProjectMedia project={project} className="h-full w-full" />
        <span
          data-card-shine=""
          className="project-card-shine pointer-events-none absolute inset-0 z-[2] opacity-0"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-primary/10 px-2 py-0.5 font-code-sm text-[11px] leading-none text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mb-2 font-headline-lg text-[20px] leading-snug text-on-surface transition-colors duration-300 group-hover:text-primary md:text-[22px]">
          <Link href={href} className="before:absolute before:inset-0">
            {copy.title}
          </Link>
        </h3>

        <p className="mb-5 line-clamp-3 font-body-md text-body-md leading-relaxed text-on-surface-variant">
          {copy.description}
        </p>

        <div className="mt-auto flex min-w-0 items-center justify-between gap-2 border-t border-outline-variant/15 pt-4">
          <span className="inline-flex shrink-0 items-center gap-2 font-label-caps text-[11px] uppercase tracking-widest text-primary">
            {t("viewCase")}
            <span className="material-symbols-outlined text-[16px] transition-transform duration-300 ltr:group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5">
              arrow_forward
            </span>
          </span>
          {host && project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("openLive", { host })}
              className="relative z-10 inline-flex min-w-0 max-w-[58%] items-center gap-1.5 font-body-md text-[12px] text-on-surface-variant transition-colors hover:text-primary"
            >
              <span className="material-symbols-outlined shrink-0 text-[16px]">open_in_new</span>
              <span className="truncate">{host}</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
