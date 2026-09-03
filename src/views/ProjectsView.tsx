"use client";

import { useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import {
  gsap,
  useGSAP,
  animateIntro,
  bindMagnetic,
  prefersReducedMotion,
} from "@/lib/motion";

export default function ProjectsView() {
  const [query, setQuery] = useState("");
  const t = useTranslations("projectsPage");
  const tProjects = useTranslations("projects");
  const ref = useRef<HTMLElement>(null);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return projects;
    return projects.filter((project) => {
      const haystack = [
        tProjects(`${project.id}.title` as "ellwaa-website.title"),
        tProjects(`${project.id}.subtitle` as "ellwaa-website.subtitle"),
        tProjects(`${project.id}.description` as "ellwaa-website.description"),
        tProjects(`${project.id}.category` as "ellwaa-website.category"),
        project.company ?? "",
        project.liveUrl ?? "",
        ...project.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [query, tProjects]);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const unbind = bindMagnetic(root);
      animateIntro(root);
      return unbind;
    },
    { scope: ref }
  );

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;
      const cards = root.querySelectorAll("[data-project-card]");
      if (!cards.length) return;
      gsap.from(cards, {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: "expo.out",
      });
    },
    { scope: ref, dependencies: [filtered.map((project) => project.id).join()] }
  );

  return (
    <>
      <Navbar />
      <main
        ref={ref}
        className="pt-[calc(4rem+env(safe-area-inset-top)+1.5rem)] pb-16 md:pt-32 md:pb-stack-lg"
      >
        <header className="mx-auto mb-10 max-w-container-max px-margin-mobile md:mb-12 md:px-margin-desktop">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span
                data-intro-kicker=""
                className="mb-4 block font-label-caps text-label-caps text-primary"
              >
                {t("kicker")}
              </span>
              <h1
                data-intro-title=""
                className="font-headline-xl-mobile text-[2.125rem] leading-tight md:font-headline-xl md:text-headline-xl"
              >
                {t("title")}
              </h1>
            </div>
            <div data-intro-lead="" className="max-w-md">
              <p className="font-body-lg text-body-lg text-on-surface-variant">{t("lead")}</p>
            </div>
          </div>

          <label
            data-intro-extra=""
            className="relative mt-10 block w-full rounded-sm border border-outline-variant/20 bg-surface-container-low p-4 md:max-w-md"
          >
            <span className="sr-only">{t("search")}</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full border-0 border-b border-outline-variant bg-transparent px-1 py-2 font-body-md text-[16px] text-on-surface outline-none placeholder:text-outline-variant/60 focus:border-primary"
            />
          </label>
        </header>

        <section className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          {filtered.length === 0 ? (
            <div className="rounded-sm border border-outline-variant/20 bg-surface-container-low p-12 text-center">
              <p className="font-body-lg text-body-lg text-on-surface-variant">{t("empty")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-gutter md:grid-cols-3" style={{ perspective: "1200px" }}>
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </section>

        <section className="mx-auto mt-16 max-w-container-max px-margin-mobile md:mt-stack-lg md:px-margin-desktop">
          <div className="flex flex-col items-center rounded-sm border border-outline-variant/20 bg-surface-container-high p-6 text-center md:p-stack-md">
            <h2 className="mb-4 font-headline-lg text-[1.75rem] md:text-headline-lg">{t("ctaTitle")}</h2>
            <p className="mb-8 max-w-xl font-body-lg text-body-lg text-on-surface-variant">
              {t("ctaBody")}
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
              <Link
                href="/contact"
                data-magnetic=""
                className="btn-primary inline-flex min-h-12 w-full rounded-sm px-8 py-3 font-label-caps text-label-caps sm:w-auto"
              >
                {t("start")}
              </Link>
              <a
                href="/cv/Ah_Hamada_CV.pdf"
                data-magnetic=""
                className="btn-secondary inline-flex min-h-12 w-full rounded-sm px-8 py-3 font-label-caps text-label-caps sm:w-auto"
              >
                {t("downloadCv")}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
