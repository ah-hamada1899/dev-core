"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DownloadCVButton from "@/components/DownloadCVButton";
import ProjectCard from "@/components/ProjectCard";
import { SectionRef } from "@/types";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import portfolio from "../img/portfolio.png";

export default function HomeView() {
  const sectionsRef = useRef<SectionRef[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section: SectionRef) => {
      if (section) {
        section.classList.add("transition-all", "duration-1000", "opacity-0", "translate-y-10");
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main className="overflow-hidden pt-20">
        <section
          ref={(el: SectionRef) => {
            sectionsRef.current[0] = el;
          }}
          className="relative mx-auto flex min-h-[80vh] max-w-container-max items-center px-margin-mobile py-stack-lg transition-all duration-1000 md:px-margin-desktop"
        >
          <div className="relative z-10 grid w-full items-center gap-gutter lg:grid-cols-2">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center space-x-2">
                <span className="h-[1px] w-12 bg-primary"></span>
                <span className="font-label-caps text-label-caps text-primary">
                  {site.role.toUpperCase()} · {site.location.toUpperCase()}
                </span>
              </div>
              <h1 className="mb-6 font-headline-xl-mobile text-headline-xl-mobile text-on-surface md:font-headline-xl md:text-headline-xl">
                {site.name}. <span className="text-primary">Real products</span> from this machine.
              </h1>
              <p className="mb-10 max-w-lg font-body-lg text-body-lg text-on-surface-variant">
                {site.summary}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/projects"
                  className="inline-block bg-primary px-8 py-4 text-center font-label-caps text-label-caps text-on-primary transition-all duration-300 hover:bg-primary-fixed"
                >
                  VIEW PROJECTS
                </Link>
                <DownloadCVButton variant="secondary" />
              </div>
            </div>
            <div className="relative hidden group lg:block">
              <div className="relative aspect-square overflow-hidden border border-outline-variant/30 bg-surface-container-low">
                <Image
                  src={portfolio}
                  alt={`${site.name} at a development workstation`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 max-w-[220px] animate-float border border-outline-variant bg-surface-container p-6">
                <div className="mb-2 font-label-caps text-label-caps text-primary">
                  CURRENT STACK
                </div>
                <div className="font-code-sm text-code-sm leading-relaxed text-on-surface-variant">
                  {site.stack.join(", ")}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={(el: SectionRef) => {
            sectionsRef.current[1] = el;
          }}
          className="mx-auto max-w-container-max bg-surface-container-lowest px-margin-mobile py-stack-lg transition-all duration-1000 md:px-margin-desktop"
          id="projects"
        >
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <h2 className="mb-2 font-headline-lg text-headline-lg text-on-surface">
                Projects
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Every product shipped from this PC — same layout, live link when I have one.
              </p>
            </div>
            <Link
              href="/projects"
              className="hidden items-center font-label-caps text-label-caps text-primary hover:text-primary-fixed group sm:flex"
            >
              VIEW ALL{" "}
              <span className="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section
          ref={(el: SectionRef) => {
            sectionsRef.current[2] = el;
          }}
          className="mx-auto max-w-container-max overflow-hidden px-margin-mobile py-stack-lg transition-all duration-1000 md:px-margin-desktop"
        >
          <div className="grid items-center gap-stack-lg lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -top-10 -left-10 h-40 w-40 border-t border-l border-primary/20"></div>
              <div className="relative border border-outline-variant/30 bg-surface-container-low p-8">
                <p className="mb-8 font-body-lg text-body-lg leading-relaxed text-on-surface">
                  I build production front ends at{" "}
                  <span className="text-primary">Ellwaa Software</span> — bilingual AR/EN sites,
                  dashboards, CRM, and Arabic RTL HR tools. Before that I shipped Next.js work
                  remotely for Springer Capital.
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <span className="material-symbols-outlined text-primary">translate</span>
                    <div>
                      <h4 className="mb-1 font-headline-lg text-[18px]">Arabic / English</h4>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        RTL layouts, next-intl, and UI that works for Egyptian and Gulf teams.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="material-symbols-outlined text-primary">speed</span>
                    <div>
                      <h4 className="mb-1 font-headline-lg text-[18px]">Performance first</h4>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        App Router, SSR/SSG/ISR, Core Web Vitals, and code splitting on every ship.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="mb-6 font-headline-xl-mobile text-headline-xl-mobile md:font-headline-lg md:text-headline-lg">
                Meticulous front end, <br />
                <span className="text-primary">clear UX</span>.
              </h2>
              <p className="mb-8 font-body-md text-body-md text-on-surface-variant">
                Customer-service years at Concentrix and Teleperformance still show up in how I
                write interfaces: listen first, reduce friction, make the next step obvious.
              </p>
              <div className="grid grid-cols-2 gap-gutter">
                <div>
                  <div className="mb-1 font-headline-lg text-headline-lg">{projects.length}</div>
                  <div className="font-label-caps text-label-caps text-on-surface-variant">
                    PROJECTS ON THIS PC
                  </div>
                </div>
                <div>
                  <div className="mb-1 font-headline-lg text-headline-lg">AR + EN</div>
                  <div className="font-label-caps text-label-caps text-on-surface-variant">
                    BILINGUAL / RTL
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={(el: SectionRef) => {
            sectionsRef.current[3] = el;
          }}
          className="bg-primary py-stack-lg text-center text-on-primary transition-all duration-100"
        >
          <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
            <h2 className="mb-6 font-headline-xl-mobile text-headline-xl-mobile selection-bg-text md:font-headline-xl md:text-headline-xl">
              Let&apos;s ship the next one.
            </h2>
            <p className="mx-auto mb-10 max-w-2xl font-body-lg text-body-lg text-on-primary opacity-80">
              {site.availability}. Front-end and Next.js work worldwide.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-deep-charcoal px-12 py-5 font-label-caps text-label-caps text-primary shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-surface"
            >
              START A CONVERSATION
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
