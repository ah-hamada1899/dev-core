import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectMedia from "@/components/ProjectMedia";
import { Project } from "@/types";
import { displayHost, projects } from "@/data/projects";

interface ProjectDetailViewProps {
  project: Project;
}

export default function ProjectDetailView({
  project,
}: ProjectDetailViewProps): React.ReactElement {
  const related = projects.filter((item) => item.id !== project.id).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-stack-lg">
        <article className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 font-label-caps text-label-caps text-primary transition-all hover:gap-3"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            ALL PROJECTS
          </Link>

          <div className="mb-8 flex flex-wrap gap-2">
            <span className="border border-outline-variant/30 px-3 py-1 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">
              {project.category}
            </span>
            <span className="border border-outline-variant/30 px-3 py-1 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">
              {project.year}
            </span>
          </div>

          <h1 className="mb-4 font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl">
            {project.title}
          </h1>
          <p className="mb-10 max-w-3xl font-body-lg text-body-lg text-on-surface-variant">
            {project.subtitle}
          </p>

          <div className="mb-4 aspect-[16/8] overflow-hidden border border-outline-variant/20">
            <ProjectMedia
              project={project}
              className="h-full w-full"
              sizes="(min-width: 1280px) 1200px, 100vw"
            />
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-12 inline-flex items-center gap-2 font-code-sm text-code-sm text-primary hover:underline"
            >
              <span className="material-symbols-outlined text-base">language</span>
              {displayHost(project.liveUrl)}
            </a>
          )}

          <div className="grid gap-stack-md lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="mb-8 font-body-lg text-body-lg text-on-surface">
                {project.longDescription}
              </p>
              <h2 className="mb-4 font-headline-lg text-[24px]">What I built</h2>
              <ul className="space-y-3">
                {project.highlights.map((item) => (
                  <li key={item} className="flex gap-3 font-body-md text-body-md text-on-surface-variant">
                    <span className="mt-1 text-primary">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <aside className="space-y-6 lg:col-span-4">
              <div className="border border-outline-variant/20 bg-surface-container-low p-6">
                <dl className="space-y-5">
                  <div>
                    <dt className="mb-1 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">
                      Role
                    </dt>
                    <dd className="font-body-md text-body-md">{project.role}</dd>
                  </div>
                  {project.company && (
                    <div>
                      <dt className="mb-1 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">
                        Company
                      </dt>
                      <dd className="font-body-md text-body-md">{project.company}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="mb-1 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">
                      Stack
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-primary/20 bg-primary/10 px-2 py-1 font-label-caps text-[10px] uppercase tracking-widest text-primary"
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
                    className="inline-flex items-center justify-center gap-2 bg-primary px-6 py-3 font-label-caps text-label-caps text-on-primary transition-transform hover:scale-[1.02]"
                  >
                    OPEN LIVE SITE
                    <span className="material-symbols-outlined text-base">open_in_new</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-outline px-6 py-3 font-label-caps text-label-caps text-primary transition-colors hover:bg-primary/5"
                  >
                    VIEW ON GITHUB
                    <span className="material-symbols-outlined text-base">code</span>
                  </a>
                )}
                {!project.liveUrl && !project.githubUrl && (
                  <p className="border border-outline-variant/20 bg-surface-container p-4 font-code-sm text-code-sm text-on-surface-variant">
                    Internal Ellwaa product — not public.
                  </p>
                )}
              </div>
            </aside>
          </div>
        </article>

        <section className="mx-auto mt-stack-lg max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-headline-lg text-headline-lg">More from the archive</h2>
            <Link href="/projects" className="font-label-caps text-label-caps text-primary">
              VIEW ALL
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/projects/${item.id}`}
                className="group border border-outline-variant/20 bg-surface-container-low p-6 transition-colors hover:border-primary"
              >
                <span className="mb-3 block font-label-caps text-[10px] tracking-widest text-primary">
                  {item.category.toUpperCase()}
                </span>
                <h3 className="mb-2 font-headline-lg text-[20px] transition-colors group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{item.subtitle}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
