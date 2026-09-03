"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SkillCategory } from "@/types";
import {
  gsap,
  useGSAP,
  animateIntro,
  bindMagnetic,
  prefersReducedMotion,
  revealOnScroll,
} from "@/lib/motion";

export default function SkillsView() {
  const t = useTranslations("skills");
  const ref = useRef<HTMLElement>(null);

  const skillCategories: SkillCategory[] = [
    {
      title: t("frontend"),
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
      title: t("backend"),
      icon: "dns",
      skills: [
        { name: "Node.js" },
        { name: "Express" },
        { name: "PostgreSQL" },
        { name: "Next.js" },
        { name: "REST APIs" },
      ],
    },
    {
      title: t("state"),
      icon: "hub",
      skills: [
        { name: "TanStack Query" },
        { name: "Zustand" },
        { name: "Redux" },
        { name: "React Hook Form" },
        { name: "Zod" },
      ],
    },
    {
      title: t("i18n"),
      icon: "translate",
      skills: [
        { name: "next-intl" },
        { name: "i18next" },
        { name: "Arabic RTL" },
        { name: "Accessibility (a11y)" },
        { name: "GSAP" },
        { name: "Framer Motion" },
        { name: "Radix UI" },
      ],
    },
    {
      title: t("perf"),
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

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const unbind = bindMagnetic(root);
      animateIntro(root);
      if (prefersReducedMotion()) return unbind;

      const cards = root.querySelectorAll("[data-skill-card]");
      gsap.from(cards, {
        y: 42,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "expo.out",
        delay: 0.18,
      });

      const chips = root.querySelectorAll("[data-skill-chip]");
      gsap.from(chips, {
        y: 12,
        autoAlpha: 0,
        duration: 0.45,
        stagger: 0.025,
        ease: "power2.out",
        delay: 0.35,
      });

      revealOnScroll(root);
      return unbind;
    },
    { scope: ref }
  );

  const renderSkillCard = (category: SkillCategory) => (
    <div
      key={category.title}
      data-skill-card=""
      className="group flex h-full flex-col rounded-sm border border-outline-variant/20 bg-surface-container-low p-5 transition-colors duration-300 hover:border-primary/60 md:p-8"
    >
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-outline-variant/30 bg-surface-variant text-primary transition-colors group-hover:border-primary/60">
          <span className="material-symbols-outlined text-2xl">{category.icon}</span>
        </div>
        <h2 className="font-headline-lg text-[22px] leading-tight md:text-[24px]">{category.title}</h2>
      </div>
      <div className="flex flex-1 flex-wrap content-start gap-2.5">
        {category.skills.map((skill) => (
          <span
            key={skill.name}
            data-skill-chip=""
            className="rounded-sm border border-outline-variant/20 bg-surface-container-high px-3.5 py-1.5 font-code-sm text-code-sm text-on-surface-variant transition-colors hover:border-primary/60 hover:text-primary"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <main
        ref={ref}
        className="pt-[calc(4rem+env(safe-area-inset-top)+1.5rem)] pb-16 md:pt-32 md:pb-stack-lg"
      >
        <header className="mx-auto mb-10 max-w-container-max px-margin-mobile md:mb-16 md:px-margin-desktop">
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
        </header>

        <section className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col gap-gutter">
            <div className="grid grid-cols-1 items-stretch gap-gutter md:grid-cols-3">
              {skillCategories.slice(0, 3).map(renderSkillCard)}
            </div>
            <div className="grid grid-cols-1 items-stretch gap-gutter md:grid-cols-2">
              {skillCategories.slice(3).map(renderSkillCard)}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-container-max px-margin-mobile md:mt-stack-lg md:px-margin-desktop">
          <div
            data-reveal=""
            className="flex flex-col items-center rounded-sm border border-outline-variant/20 bg-primary p-6 text-center md:p-stack-md"
          >
            <h2 className="mb-4 font-headline-lg text-[1.75rem] text-on-primary md:text-headline-lg">
              {t("ctaTitle")}
            </h2>
            <p className="mb-8 max-w-xl font-body-lg text-body-lg text-on-primary/80">{t("ctaBody")}</p>
            <Link
              href="/contact"
              data-magnetic=""
              className="btn-on-primary inline-flex min-h-12 w-full max-w-sm rounded-sm px-8 py-3 font-label-caps text-label-caps md:w-auto"
            >
              {t("ctaButton")}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
