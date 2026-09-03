"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectMedia from "@/components/ProjectMedia";
import { Project } from "@/types";
import { displayHost, projects } from "@/data/projects";
import { useProjectCopy } from "@/hooks/useProjectCopy";
import {
  gsap,
  useGSAP,
  SplitText,
  bindMagnetic,
  isRtl,
  prefersReducedMotion,
  revealOnScroll,
} from "@/lib/motion";

interface ProjectDetailViewProps {
  project: Project;
}

export default function ProjectDetailView({
  project,
}: ProjectDetailViewProps): React.ReactElement {
  const related = projects.filter((item) => item.id !== project.id).slice(0, 3);
  const copy = useProjectCopy(project);
  const t = useTranslations("projectDetail");
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const unbind = bindMagnetic(root);

      if (prefersReducedMotion()) return unbind;

      const rtl = isRtl();
      const title = root.querySelector<HTMLElement>("[data-intro-title]");
      const media = root.querySelector<HTMLElement>("[data-detail-media]");
      const shot = root.querySelector<HTMLElement>("[data-detail-shot]");

      gsap.from(root.querySelector("[data-detail-back]"), {
        x: rtl ? 16 : -16,
        autoAlpha: 0,
        duration: 0.55,
        ease: "power3.out",
      });
      gsap.from(root.querySelectorAll("[data-detail-chip]"), {
        y: 10,
        autoAlpha: 0,
        duration: 0.45,
        stagger: 0.06,
        delay: 0.08,
        ease: "power2.out",
      });

      if (title) {
        const split = SplitText.create(title, {
          type: rtl ? "words" : "words,chars",
          mask: "words",
          aria: "auto",
        });
        const units = !rtl && split.chars.length > 0 ? split.chars : split.words;
        gsap.from(units, {
          yPercent: 115,
          duration: 0.95,
          stagger: rtl ? 0.05 : 0.02,
          delay: 0.1,
          ease: "expo.out",
        });
      }

      gsap.from(root.querySelector("[data-intro-lead]"), {
        y: 18,
        autoAlpha: 0,
        duration: 0.7,
        delay: 0.22,
        ease: "expo.out",
      });

      if (media && shot) {
        gsap.set(shot, { scale: 1.12 });
        gsap.fromTo(
          media,
          { clipPath: "inset(8% 8% 8% 8%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.15, ease: "power4.inOut", delay: 0.12 }
        );
        gsap.to(shot, { scale: 1, duration: 1.4, ease: "power3.out", delay: 0.12 });
      }

      revealOnScroll(root);
      return unbind;
    },
    { scope: ref, dependencies: [project.id] }
  );

  return (
    <>
      <Navbar />
      <main
        ref={ref}
        className="pt-[calc(4rem+env(safe-area-inset-top)+1.5rem)] pb-16 md:pt-32 md:pb-stack-lg"
      >
        <article className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <Link
            href="/projects"
            data-detail-back=""
            className="mb-6 inline-flex items-center gap-2 font-label-caps text-label-caps text-primary transition-all hover:gap-3 md:mb-8"
          >
            <span className="material-symbols-outlined text-base rtl:rotate-180">arrow_back</span>
            {t("allProjects")}
          </Link>

          <div className="mb-8 flex flex-wrap gap-2">
            <span
              data-detail-chip=""
              className="rounded-sm border border-outline-variant/30 px-3 py-1 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant"
            >
              {copy.category}
            </span>
            <span
              data-detail-chip=""
              className="rounded-sm border border-outline-variant/30 px-3 py-1 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant"
            >
              {project.year}
            </span>
          </div>

          <h1
            data-intro-title=""
            className="mb-4 font-headline-xl-mobile text-[2.125rem] leading-tight md:font-headline-xl md:text-headline-xl"
          >
            {copy.title}
          </h1>
          <p
            data-intro-lead=""
            className="mb-10 max-w-3xl font-body-lg text-body-lg text-on-surface-variant"
          >
            {copy.subtitle}
          </p>

          <div
            data-detail-media=""
            className="relative mb-4 aspect-[16/10] overflow-hidden rounded-sm border border-outline-variant/20 md:aspect-[16/8]"
          >
            <div data-detail-shot="" className="absolute inset-0">
              <ProjectMedia
                project={project}
                className="h-full w-full"
                sizes="(min-width: 1280px) 1200px, 100vw"
              />
            </div>
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-10 inline-flex max-w-full items-center gap-2 break-all font-code-sm text-code-sm text-primary hover:underline md:mb-12"
            >
              <span className="material-symbols-outlined text-base">language</span>
              {displayHost(project.liveUrl)}
            </a>
          )}

          <div className="grid gap-stack-md lg:grid-cols-12">
            <div data-reveal="start" className="lg:col-span-8">
              <p className="mb-8 font-body-lg text-body-lg text-on-surface">{copy.longDescription}</p>
              <h2 className="mb-4 font-headline-lg text-[24px]">{t("whatIBuilt")}</h2>
              <ul className="space-y-3">
                {copy.highlights.map((item) => (
                  <li key={item} className="flex gap-3 font-body-md text-body-md text-on-surface-variant">
                    <span className="mt-1 text-primary">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <aside data-reveal="end" className="space-y-6 lg:col-span-4">
              <div className="rounded-sm border border-outline-variant/20 bg-surface-container-low p-6">
                <dl className="space-y-5">
                  <div>
                    <dt className="mb-1 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">
                      {t("role")}
                    </dt>
                    <dd className="font-body-md text-body-md">{copy.role}</dd>
                  </div>
                  {copy.company && (
                    <div>
                      <dt className="mb-1 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">
                        {t("company")}
                      </dt>
                      <dd className="font-body-md text-body-md">{copy.company}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="mb-1 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">
                      {t("stack")}
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-sm border border-primary/20 bg-primary/10 px-2 py-1 font-label-caps text-[10px] uppercase tracking-widest text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="flex flex-col gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-magnetic=""
                    className="btn-primary inline-flex min-h-12 w-full gap-2 rounded-sm px-6 py-3 font-label-caps text-label-caps"
                  >
                    {t("openLive")}
                    <span className="material-symbols-outlined text-base">open_in_new</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-magnetic=""
                    className="btn-secondary inline-flex min-h-12 w-full gap-2 rounded-sm px-6 py-3 font-label-caps text-label-caps"
                  >
                    {t("viewGithub")}
                    <span className="material-symbols-outlined text-base">code</span>
                  </a>
                )}
                {!project.liveUrl && !project.githubUrl && (
                  <p className="rounded-sm border border-outline-variant/20 bg-surface-container p-4 font-code-sm text-code-sm text-on-surface-variant">
                    {t("internal")}
                  </p>
                )}
              </div>
            </aside>
          </div>
        </article>

        <section className="mx-auto mt-16 max-w-container-max px-margin-mobile md:mt-stack-lg md:px-margin-desktop">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-headline-lg text-[1.75rem] md:text-headline-lg">{t("more")}</h2>
            <Link href="/projects" className="font-label-caps text-label-caps text-primary">
              {t("viewAll")}
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
            {related.map((item) => (
              <RelatedCard key={item.id} project={item} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function RelatedCard({ project }: { project: Project }) {
  const copy = useProjectCopy(project);

  return (
    <Link
      href={`/projects/${project.id}`}
      data-reveal=""
      className="group rounded-sm border border-outline-variant/20 bg-surface-container-low p-6 transition-colors hover:border-primary"
    >
      <span className="mb-3 block font-label-caps text-[10px] tracking-widest text-primary">
        {copy.category}
      </span>
      <h3 className="mb-2 font-headline-lg text-[20px] transition-colors group-hover:text-primary">
        {copy.title}
      </h3>
      <p className="font-body-md text-body-md text-on-surface-variant">{copy.subtitle}</p>
    </Link>
  );
}
