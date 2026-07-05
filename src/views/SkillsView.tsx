"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SkillCategory } from "@/types";

// Skills data with proper typing
const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "code",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "WebGL" }
    ],
  },
  {
    title: "Backend",
    icon: "storage",
    skills: [
      { name: "Node.js" },
      { name: "Go" },
      { name: "Python" },
      { name: "gRPC" },
      { name: "GraphQL" }
    ],
  },
  {
    title: "Database",
    icon: "database",
    skills: [
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Redis" },
      { name: "Elasticsearch" }
    ],
  },
  {
    title: "DevOps",
    icon: "cloud",
    skills: [
      { name: "AWS" },
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "CI/CD" },
      { name: "Terraform" }
    ],
  },
];

// Stats data
interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: "8+", label: "YEARS EXPERIENCE" },
  { value: "50+", label: "PROJECTS DELIVERED" },
  { value: "∞", label: "LINES OF CODE" },
];

export default function SkillsView() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-stack-lg">
        <header className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-label-caps text-label-caps text-primary mb-4 block">
                TECHNICAL EXPERTISE
              </span>
              <h1 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl">
                Skills & Technologies
              </h1>
            </div>
            <div className="max-w-md">
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                A comprehensive overview of my technical stack and the tools I leverage to build exceptional digital experiences.
              </p>
            </div>
          </div>
        </header>

        {/* Skills Grid */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {skillCategories.map((category: SkillCategory) => (
              <div
                key={category.title}
                className="bg-surface-container-low p-8 border border-outline-variant/20 hover:border-primary transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-surface-variant text-primary border border-outline-variant/30 group-hover:border-primary transition-colors">
                    <span className="material-symbols-outlined text-2xl">
                      {category.icon}
                    </span>
                  </div>
                  <h2 className="font-headline-lg text-[24px]">
                    {category.title}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="font-code-sm text-code-sm px-4 py-2 bg-surface-container-high border border-outline-variant/20 text-on-surface-variant hover:border-primary hover:text-primary transition-all"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience & Expertise Section */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-stack-lg">
          <div className="bg-surface-container-high p-stack-md border border-outline-variant/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {stats.map((stat: Stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-headline-xl text-headline-xl text-primary mb-2">
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

        {/* CTA Section */}
        <section className="mt-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="bg-primary p-stack-md flex flex-col items-center text-center border border-outline-variant/20">
            <h2 className="font-headline-lg text-headline-lg mb-4 text-on-primary">
              Ready to Build Something Great?
            </h2>
            <p className="font-body-lg text-body-lg mb-8 max-w-xl text-on-primary/80">
              Let's combine our expertise to create something extraordinary.
            </p>
            <Link
              href="/contact"
              className="bg-deep-charcoal text-primary px-8 py-3 font-label-caps text-label-caps hover:scale-105 transition-transform inline-block"
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