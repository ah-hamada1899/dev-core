"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsView() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return projects;
    return projects.filter((project) => {
      const haystack = [
        project.title,
        project.subtitle,
        project.description,
        project.category,
        project.company ?? "",
        project.liveUrl ?? "",
        ...project.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [query]);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-stack-lg">
        <header className="mx-auto mb-12 max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="mb-4 block font-label-caps text-label-caps text-primary">
                {projects.length} PROJECTS
              </span>
              <h1 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl">
                Selected Projects
              </h1>
            </div>
            <div className="max-w-md">
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Product UIs and sites I designed, built, and shipped from this PC — each card
                links out to the live website when I have one.
              </p>
            </div>
          </div>

          <label className="relative mt-10 block w-full border border-outline-variant/20 bg-surface-container-low p-4 md:max-w-md">
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search stack, title, website..."
              className="w-full border-0 border-b border-outline-variant bg-transparent px-1 py-2 font-code-sm text-code-sm text-on-surface outline-none placeholder:text-outline-variant/60 focus:border-primary"
            />
          </label>
        </header>

        <section className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          {filtered.length === 0 ? (
            <div className="border border-outline-variant/20 bg-surface-container-low p-12 text-center">
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                No projects match that search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </section>

        <section className="mx-auto mt-stack-lg max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col items-center border border-outline-variant/20 bg-surface-container-high p-stack-md text-center">
            <h2 className="mb-4 font-headline-lg text-headline-lg">Intrigued by the craft?</h2>
            <p className="mb-8 max-w-xl font-body-lg text-body-lg text-on-surface-variant">
              Need a bilingual dashboard, CRM, or marketing site? I can take it from design to deploy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-primary px-8 py-3 font-label-caps text-label-caps text-on-primary transition-transform hover:scale-105"
              >
                START A PROJECT
              </Link>
              <Link
                href="/cv/Ah_Hamada_CV.pdf"
                className="border border-outline px-8 py-3 font-label-caps text-label-caps text-primary transition-colors hover:bg-primary/5"
              >
                DOWNLOAD CV
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
