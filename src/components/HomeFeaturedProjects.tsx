"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/types";
import { displayHost, homeShowcase } from "@/data/projects";
import ProjectMedia from "@/components/ProjectMedia";
import { useProjectCopy } from "@/hooks/useProjectCopy";
import { bindMagnetic } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function TitleWords({ text }: { text: string }): React.ReactElement {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <span data-showcase-word="" className="inline-block will-change-transform">
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </>
  );
}

function ShowcaseRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}): React.ReactElement {
  const href = `/projects/${project.id}`;
  const copy = useProjectCopy(project);
  const t = useTranslations("projectCard");
  const host = project.liveUrl ? displayHost(project.liveUrl) : null;
  const flip = index === 1;

  return (
    <article
      data-showcase-row=""
      data-flip={flip ? "true" : "false"}
      className="group relative grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
    >
      <div className={flip ? "lg:order-2" : undefined} style={{ perspective: "1200px" }}>
        <Link href={href} className="block cursor-pointer" aria-label={`${t("viewCase")}: ${copy.title}`}>
          <div data-showcase-frame="" className="will-change-transform">
            <div
              data-showcase-tilt=""
              className="overflow-hidden rounded-sm border border-outline-variant/25 bg-surface-container-lowest will-change-transform [transform-style:preserve-3d]"
            >
              <div
                data-showcase-chrome=""
                className="flex items-center gap-3 border-b border-outline-variant/20 bg-surface-container px-3 py-2.5"
              >
                <span className="flex shrink-0 gap-1" aria-hidden="true">
                  <span data-chrome-dot="" className="size-2 rounded-full bg-outline-variant/80" />
                  <span data-chrome-dot="" className="size-2 rounded-full bg-outline-variant/80" />
                  <span data-chrome-dot="" className="size-2 rounded-full bg-outline-variant/80" />
                </span>
                <p
                  dir="ltr"
                  className="min-w-0 flex-1 truncate text-center font-code-sm text-[11px] text-on-surface-variant"
                >
                  {host ?? "localhost"}
                </p>
              </div>
              <div data-showcase-media="" className="relative aspect-[16/10] overflow-hidden bg-surface-container-high">
                <div data-showcase-shot="" className="absolute inset-x-0 -top-[12%] h-[124%] w-full will-change-transform">
                  <ProjectMedia
                    project={project}
                    className="h-full w-full"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
                <span
                  data-showcase-veil=""
                  className="absolute inset-0 z-[2] bg-surface-container-high"
                />
                <span
                  data-showcase-scan=""
                  className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-28 bg-gradient-to-b from-primary/30 to-transparent opacity-0"
                />
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div data-showcase-copy="" className={flip ? "lg:order-1" : undefined}>
        <p className="mb-4 flex items-center gap-3 font-label-caps text-[10px] uppercase tracking-[0.18em] text-primary">
          <span data-showcase-rule="" className="h-px w-8 origin-left bg-primary rtl:origin-right" />
          {copy.category}
        </p>
        <h3 className="mb-4 font-headline-lg text-[1.85rem] leading-tight text-on-surface md:text-[2.15rem]">
          <Link href={href} className="transition-colors hover:text-primary">
            <TitleWords text={copy.title} />
          </Link>
        </h3>
        <p
          data-showcase-lead=""
          className="mb-6 max-w-md font-body-md text-body-md leading-relaxed text-on-surface-variant"
        >
          {copy.description}
        </p>
        <div className="mb-8 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              data-showcase-tag=""
              className="bg-primary/10 px-2 py-0.5 font-code-sm text-[11px] leading-none text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href={href}
            data-showcase-cta=""
            className="relative z-10 inline-flex items-center gap-2 font-label-caps text-[11px] uppercase tracking-widest text-primary"
          >
            {t("viewCase")}
            <span className="material-symbols-outlined text-[16px] rtl:rotate-180">arrow_forward</span>
          </Link>
          {host && project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("openLive", { host })}
              className="relative z-10 inline-flex min-w-0 items-center gap-1.5 font-body-md text-[13px] text-on-surface-variant transition-colors hover:text-primary"
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

export default function HomeFeaturedProjects(): React.ReactElement {
  const t = useTranslations("home");
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const unbindMagnetic = bindMagnetic(root);
      const header = root.querySelector("[data-showcase-head]");
      const rows = root.querySelectorAll<HTMLElement>("[data-showcase-row]");

      if (prefersReducedMotion()) {
        gsap.set(
          root.querySelectorAll("[data-showcase-frame], [data-showcase-copy] > *, [data-showcase-word], [data-showcase-veil]"),
          { clearProps: "all" }
        );
        gsap.set(root.querySelectorAll("[data-showcase-veil]"), { autoAlpha: 0 });
        return unbindMagnetic;
      }

      const rtl = document.documentElement.dir === "rtl";
      const finePointer = window.matchMedia("(pointer: fine)").matches;

      if (header) {
        const kicker = header.querySelector("[data-head-kicker]");
        gsap.from(header.children, {
          y: 28,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: header, start: "top 85%", once: true },
        });
        if (kicker) {
          gsap.from(kicker, {
            letterSpacing: "0.4em",
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: header, start: "top 85%", once: true },
          });
        }
      }

      rows.forEach((row) => {
        const flip = row.dataset.flip === "true";
        const frame = row.querySelector<HTMLElement>("[data-showcase-frame]");
        const tilt = row.querySelector<HTMLElement>("[data-showcase-tilt]");
        const chrome = row.querySelector("[data-showcase-chrome]");
        const veil = row.querySelector<HTMLElement>("[data-showcase-veil]");
        const shot = row.querySelector<HTMLElement>("[data-showcase-shot]");
        const scan = row.querySelector("[data-showcase-scan]");
        const words = row.querySelectorAll("[data-showcase-word]");
        const copyItems = row.querySelectorAll("[data-showcase-copy] > *");
        const tags = row.querySelectorAll("[data-showcase-tag]");
        const rule = row.querySelector("[data-showcase-rule]");
        const dots = row.querySelectorAll("[data-chrome-dot]");
        const image = row.querySelector(".project-image");
        const cta = row.querySelector("[data-showcase-cta]");
        const lead = row.querySelector("[data-showcase-lead]");

        const fromEnd = flip !== rtl;
        const dir = fromEnd ? 1 : -1;

        gsap.set(frame, { y: 56, autoAlpha: 0, rotateY: dir * 14, transformPerspective: 1200 });
        gsap.set(chrome, { yPercent: -100 });
        gsap.set(veil, { xPercent: 0 });
        gsap.set(shot, { scale: 1.22, transformOrigin: "50% 50%" });
        gsap.set(words, { yPercent: 120 });
        gsap.set(copyItems, { autoAlpha: 0, y: 22 });
        gsap.set(rule, { scaleX: 0 });
        gsap.set(lead, { clipPath: "inset(0 0 100% 0)" });

        const intro = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 76%", once: true },
          defaults: { ease: "expo.out" },
        });

        intro.to(frame, { y: 0, autoAlpha: 1, rotateY: 0, duration: 1.2 }, 0);
        intro.to(chrome, { yPercent: 0, duration: 0.7, ease: "power3.out" }, 0.18);
        intro.to(
          veil,
          { xPercent: dir * 101, duration: 1.15, ease: "power4.inOut" },
          0.08
        );
        intro.to(shot, { scale: 1, duration: 1.45, ease: "power3.out" }, 0.08);
        intro.to(rule, { scaleX: 1, duration: 0.7, ease: "power3.out" }, 0.28);
        intro.to(words, { yPercent: 0, duration: 0.95, stagger: 0.07 }, 0.28);
        intro.to(copyItems, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }, 0.22);
        intro.to(lead, { clipPath: "inset(0 0 0% 0)", duration: 0.85, ease: "power3.inOut" }, 0.4);
        intro.from(tags, { y: 14, autoAlpha: 0, duration: 0.45, stagger: 0.06, ease: "power2.out" }, 0.48);

        if (image) {
          gsap.fromTo(
            image,
            { yPercent: -10, scale: 1.06 },
            {
              yPercent: 10,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            }
          );
        }

        row.querySelectorAll("img").forEach((img) => {
          if (!img.complete) {
            img.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
          }
        });

        if (!finePointer || !frame || !tilt) return;

        const rotateY = gsap.quickTo(tilt, "rotateY", { duration: 0.55, ease: "power3.out" });
        const rotateX = gsap.quickTo(tilt, "rotateX", { duration: 0.55, ease: "power3.out" });

        const onMove = (event: MouseEvent) => {
          const rect = tilt.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width - 0.5;
          const py = (event.clientY - rect.top) / rect.height - 0.5;
          rotateY(px * 9);
          rotateX(py * -7);
        };

        const enter = () => {
          gsap.to(tilt, {
            y: -10,
            borderColor: "color-mix(in srgb, var(--c-primary) 60%, transparent)",
            boxShadow: "0 28px 60px -32px color-mix(in srgb, var(--c-primary) 45%, transparent)",
            duration: 0.5,
            ease: "power3.out",
          });
          gsap.to(shot, { scale: 1.04, duration: 0.8, ease: "power2.out" });
          gsap.to(dots, { backgroundColor: "var(--c-primary)", duration: 0.28, stagger: 0.05 });
          gsap.to(cta, { x: rtl ? -6 : 6, duration: 0.35, ease: "power2.out" });
          if (scan) {
            gsap.fromTo(
              scan,
              { yPercent: -130, autoAlpha: 1 },
              { yPercent: 240, autoAlpha: 0, duration: 0.9, ease: "power2.in" }
            );
          }
        };

        const leave = () => {
          rotateY(0);
          rotateX(0);
          gsap.to(tilt, {
            y: 0,
            borderColor: "color-mix(in srgb, var(--c-outline-variant) 25%, transparent)",
            boxShadow: "0 0 0 0 transparent",
            duration: 0.5,
            ease: "power3.out",
          });
          gsap.to(shot, { scale: 1, duration: 0.65, ease: "power2.out" });
          gsap.to(dots, {
            backgroundColor: "color-mix(in srgb, var(--c-outline-variant) 80%, transparent)",
            duration: 0.3,
          });
          gsap.to(cta, { x: 0, duration: 0.35, ease: "power2.out" });
        };

        row.addEventListener("mousemove", onMove);
        row.addEventListener("mouseenter", enter);
        row.addEventListener("mouseleave", leave);
      });

      return unbindMagnetic;
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="border-y border-outline-variant/20 bg-surface-container-low"
      id="projects"
    >
      <div className="mx-auto max-w-container-max px-margin-mobile py-16 md:px-margin-desktop md:py-stack-lg">
        <div
          data-showcase-head=""
          className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-16 md:gap-6"
        >
          <div className="min-w-0 max-w-xl">
            <span
              data-head-kicker=""
              className="mb-3 block font-label-caps text-label-caps text-primary"
            >
              {t("projectsKicker")}
            </span>
            <h2 className="mb-2 font-headline-lg text-[1.75rem] text-on-surface md:text-headline-lg">
              {t("projectsTitle")}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">{t("projectsLead")}</p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center font-label-caps text-label-caps text-primary transition-colors hover:text-primary-hover group"
          >
            {t("viewAll")}{" "}
            <span className="material-symbols-outlined ms-2 transition-transform ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              arrow_forward
            </span>
          </Link>
        </div>

        <div className="flex flex-col gap-16 md:gap-28">
          {homeShowcase.map((project, index) => (
            <ShowcaseRow key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-16 flex justify-center md:mt-24">
          <Link
            href="/projects"
            data-magnetic=""
            className="btn-primary inline-flex min-h-12 rounded-sm px-8 py-3 font-label-caps text-label-caps"
          >
            {t("viewAll")}
            <span className="material-symbols-outlined ms-2 text-[18px] rtl:rotate-180">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
