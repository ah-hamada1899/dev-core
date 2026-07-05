"use client";

import { useEffect, RefObject } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Project } from "@/types";

// Project data with proper typing
const projects: Project[] = [
  {
    id: "neural-nexus",
    title: "Neural Nexus Dashboard",
    description: "A real-time telemetry monitoring system for distributed neural networks, utilizing WebGL for high-performance data rendering.",
    tags: [{ name: "React" }, { name: "Node.js" }, { name: "Three.js" }],
    featured: true,
    category: "FEATURED",
    link: "#"
  },
  {
    id: "ethereal-commerce",
    title: "Ethereal Commerce",
    description: "Bespoke e-commerce architecture designed for ultra-low latency and seamless checkout transitions.",
    tags: [{ name: "Next.js" }, { name: "Stripe" }],
    featured: false,
    link: "#"
  },
  {
    id: "vanguard-engine",
    title: "Vanguard Engine",
    description: "High-performance asset processing engine compiled to WebAssembly for browser-side heavy lifting.",
    tags: [{ name: "Rust" }, { name: "WASM" }],
    featured: false,
    link: "#"
  },
  {
    id: "omnibridge-api",
    title: "OmniBridge API",
    description: "A unified microservices mesh capable of handling 50k+ requests per second with sub-millisecond overhead.",
    tags: [{ name: "Go" }, { name: "gRPC" }, { name: "AWS" }],
    featured: false,
    link: "#"
  }
];

export default function ProjectsView() {
  useEffect(() => {
    // Subtle micro-interaction for project cards
    document.querySelectorAll(".project-card").forEach((card: Element) => {
      card.addEventListener("mousemove", (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = card.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;
        (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      });
    });
  }, []);

  const featuredProject = projects.find((p: Project) => p.featured);
  const otherProjects = projects.filter((p: Project) => !p.featured);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-stack-lg">
        <header className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-label-caps text-label-caps text-primary mb-4 block">
                PORTFOLIO EXCELLENCE
              </span>
              <h1 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl">
                Selected Projects
              </h1>
            </div>
            <div className="max-w-md">
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                A curated collection of engineered solutions where technical precision meets creative visual storytelling.
              </p>
            </div>
          </div>
        </header>

        {/* Projects Bento/Grid Layout */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter">
            {/* Large Featured Project */}
            {featuredProject && (
              <article className="lg:col-span-8 group project-card relative overflow-hidden bg-[#121212] border border-outline-variant/20 hover:border-primary transition-all duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <div className="project-image w-full h-full bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-transform duration-700 ease-out">
                    <span className="font-code-sm">[Project Image]</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                  <div className="absolute top-6 right-6 flex gap-2">
                    <span className="bg-surface-container-highest px-3 py-1 font-code-sm text-code-sm border border-outline-variant/30 text-primary">
                      {featuredProject.category?.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredProject.tags.map((tag) => (
                      <span key={tag.name} className="font-label-caps text-[10px] uppercase tracking-widest px-2 py-1 bg-primary/10 border border-primary/20 text-primary">
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-headline-lg text-headline-lg mb-2">
                    {featuredProject.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                    {featuredProject.description}
                  </p>
                  <Link
                    href={featuredProject.link || "#"}
                    className="inline-flex items-center gap-2 font-label-caps text-label-caps text-primary hover:gap-4 transition-all"
                  >
                    VIEW CASE STUDY{" "}
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                </div>
              </article>
            )}

            {/* Other Projects */}
            {otherProjects.map((project: Project, index: number) => {
              if (index === 0) {
                // Ethereal Commerce - Small card
                return (
                  <article key={project.id} className="lg:col-span-4 group project-card relative overflow-hidden bg-[#121212] border border-outline-variant/20 hover:border-primary transition-all duration-300 flex flex-col">
                    <div className="h-64 relative overflow-hidden">
                      <div className="project-image w-full h-full bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-transform duration-700 ease-out">
                        <span className="font-code-sm">[Project Image]</span>
                      </div>
                    </div>
                    <div className="p-6 flex-grow">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span key={tag.name} className="font-label-caps text-[10px] uppercase tracking-widest px-2 py-1 bg-primary/10 border border-primary/20 text-primary">
                            {tag.name}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-headline-lg text-[24px] mb-2 leading-tight">
                        {project.title}
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                        {project.description}
                      </p>
                      <Link
                        href={project.link || "#"}
                        className="inline-flex items-center gap-2 font-label-caps text-label-caps text-primary hover:gap-4 transition-all mt-auto"
                      >
                        EXPLORE{" "}
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </Link>
                    </div>
                  </article>
                );
              } else if (index === 1) {
                // Vanguard Engine - Small card
                return (
                  <article key={project.id} className="lg:col-span-4 group project-card relative overflow-hidden bg-[#121212] border border-outline-variant/20 hover:border-primary transition-all duration-300 flex flex-col">
                    <div className="h-64 relative overflow-hidden">
                      <div className="project-image w-full h-full bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-transform duration-700 ease-out">
                        <span className="font-code-sm">[Project Image]</span>
                      </div>
                    </div>
                    <div className="p-6 flex-grow">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span key={tag.name} className="font-label-caps text-[10px] uppercase tracking-widest px-2 py-1 bg-primary/10 border border-primary/20 text-primary">
                            {tag.name}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-headline-lg text-[24px] mb-2 leading-tight">
                        {project.title}
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                        {project.description}
                      </p>
                      <Link
                        href={project.link || "#"}
                        className="inline-flex items-center gap-2 font-label-caps text-label-caps text-primary hover:gap-4 transition-all mt-auto"
                      >
                        EXPLORE{" "}
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </Link>
                    </div>
                  </article>
                );
              } else {
                // OmniBridge API - Medium card
                return (
                  <article key={project.id} className="lg:col-span-8 group project-card relative overflow-hidden bg-[#121212] border border-outline-variant/20 hover:border-primary transition-all duration-300 md:flex">
                    <div className="md:w-1/2 relative overflow-hidden min-h-[300px]">
                      <div className="project-image w-full h-full bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-transform duration-700 ease-out">
                        <span className="font-code-sm">[Project Image]</span>
                      </div>
                    </div>
                    <div className="p-8 md:w-1/2 flex flex-col justify-center">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span key={tag.name} className="font-label-caps text-[10px] uppercase tracking-widest px-2 py-1 bg-primary/10 border border-primary/20 text-primary">
                            {tag.name}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-headline-lg text-headline-lg mb-2">
                        {project.title}
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                        {project.description}
                      </p>
                      <Link
                        href={project.link || "#"}
                        className="inline-flex items-center gap-2 font-label-caps text-label-caps text-primary hover:gap-4 transition-all mt-auto"
                      >
                        VIEW PROJECT{" "}
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </Link>
                    </div>
                  </article>
                );
              }
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="bg-surface-container-high p-stack-md flex flex-col items-center text-center border border-outline-variant/20">
            <h2 className="font-headline-lg text-headline-lg mb-4">
              Intrigued by the Craft?
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-xl">
              Let's discuss how we can build your next high-performance digital experience together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                type="button"
                className="bg-primary text-on-primary px-8 py-3 font-label-caps text-label-caps hover:scale-105 transition-transform"
              >
                START A PROJECT
              </button>
              <button 
                type="button"
                className="border border-outline px-8 py-3 font-label-caps text-label-caps text-primary hover:bg-primary/5 transition-colors"
              >
                DOWNLOAD CV
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}