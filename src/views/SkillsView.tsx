"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SkillCategory } from "@/types";
import { projects } from "@/data/projects";

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "code",
    skills: [
      { name: "React.js" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "JavaScript (ES6+)" },
      { name: "Tailwind CSS" },
      { name: "HTML5 / CSS3 / SASS" },
      { name: "Vite" },
    ],
  },
  {
    title: "State & Data",
    icon: "hub",
    skills: [
      { name: "TanStack Query" },
      { name: "Zustand" },
      { name: "Redux" },
      { name: "React Hook Form" },
      { name: "Zod" },
      { name: "REST APIs" },
    ],
  },
  {
    title: "i18n & UX",
    icon: "translate",
    skills: [
      { name: "next-intl" },
      { name: "i18next" },
      { name: "Arabic RTL" },
      { name: "Accessibility (a11y)" },
      { name: "Framer Motion" },
      { name: "Radix UI" },
    ],
  },
  {
    title: "Performance & DX",
    icon: "speed",
    skills: [
      { name: "App Router / SSR / SSG / ISR" },
      { name: "Core Web Vitals" },
      { name: "Git / GitHub / Jira" },
      { name: "ESLint / Prettier" },
      { name: "Storybook" },
      { name: "CI/CD" },
    ],
  },
];

const stats = [
  { value: `${projects.length}`, label: "SHIPPED UIs" },
  { value: "AR + EN", label: "BILINGUAL / RTL" },
  { value: "Next.js", label: "DAILY STACK" },
];

export default function SkillsView() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-stack-lg">
        <header className="mx-auto mb-16 max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="mb-4 block font-label-caps text-label-caps text-primary">
                TECHNICAL EXPERTISE
              </span>
              <h1 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl">
                Skills & Technologies
              </h1>
            </div>
            <div className="max-w-md">
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                The stack I actually use on Ellwaa products and personal Next.js sites — not a
                wishlist.
              </p>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
            {skillCategories.map((category: SkillCategory) => (
              <div
                key={category.title}
                className="group border border-outline-variant/20 bg-surface-container-low p-8 transition-all duration-300 hover:border-primary"
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center border border-outline-variant/30 bg-surface-variant text-primary transition-colors group-hover:border-primary">
                    <span className="material-symbols-outlined text-2xl">{category.icon}</span>
                  </div>
                  <h2 className="font-headline-lg text-[24px]">{category.title}</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="border border-outline-variant/20 bg-surface-container-high px-4 py-2 font-code-sm text-code-sm text-on-surface-variant transition-all hover:border-primary hover:text-primary"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-stack-lg max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="border border-outline-variant/20 bg-surface-container-high p-stack-md">
            <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="mb-2 font-headline-xl text-headline-xl text-primary">
                    {stat.value}
                  </div>
                  <div className="font-label-caps text-label-caps text-on-surface-variant">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-stack-lg max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col items-center border border-outline-variant/20 bg-primary p-stack-md text-center">
            <h2 className="mb-4 font-headline-lg text-headline-lg text-on-primary">
              Ready to build something great?
            </h2>
            <p className="mb-8 max-w-xl font-body-lg text-body-lg text-on-primary/80">
              Need a bilingual product UI, dashboard, or marketing site? Let&apos;s talk.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-deep-charcoal px-8 py-3 font-label-caps text-label-caps text-primary transition-transform hover:scale-105"
            >
              GET IN TOUCH
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
