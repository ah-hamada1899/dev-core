"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import DownloadCVButton from "@/components/DownloadCVButton";
import HeroBackground from "@/components/HeroBackground";
import { site } from "@/data/site";
import portfolio from "../img/portfolio.png";
import {
  gsap,
  useGSAP,
  SplitText,
  bindMagnetic,
  hasFinePointer,
  isRtl,
  prefersReducedMotion,
  tiltCard,
} from "@/lib/motion";

export default function HomeHero(): React.ReactElement {
  const t = useTranslations("home");
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const kicker = root.querySelector("[data-hero-kicker]");
      const rule = root.querySelector("[data-hero-rule]");
      const title = root.querySelector<HTMLElement>("[data-hero-title]");
      const summary = root.querySelector("[data-hero-summary]");
      const actions = root.querySelector("[data-hero-actions]");
      const frame = root.querySelector<HTMLElement>("[data-hero-frame]");
      const shot = root.querySelector<HTMLElement>("[data-hero-shot]");
      const stack = root.querySelector<HTMLElement>("[data-hero-stack]");

      const unbindMagnetic = bindMagnetic(root);
      const unbindTilt = frame ? tiltCard(frame) : () => undefined;

      if (prefersReducedMotion()) {
        return () => {
          unbindMagnetic();
          unbindTilt();
        };
      }

      const rtl = isRtl();
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      if (rule) gsap.set(rule, { scaleX: 0, transformOrigin: rtl ? "100% 50%" : "0% 50%" });
      if (shot) gsap.set(shot, { scale: 1.12 });
      if (frame) gsap.set(frame, { y: 28, clipPath: "inset(8% 8% 8% 8% round 0.125rem)" });
      if (stack) gsap.set(stack, { y: 28, autoAlpha: 0, rotate: rtl ? -8 : 8 });

      if (rule) tl.to(rule, { scaleX: 1, duration: 0.8 }, 0.05);
      if (kicker) tl.from(kicker, { y: 14, autoAlpha: 0, duration: 0.7 }, 0.08);

      if (title) {
        const split = SplitText.create(title, {
          type: rtl ? "words" : "words,chars",
          mask: "words",
          aria: "auto",
        });
        const units = !rtl && split.chars.length > 0 ? split.chars : split.words;
        tl.from(units, { yPercent: 120, duration: 1.05, stagger: rtl ? 0.05 : 0.02 }, 0.12);
      }

      if (summary) tl.from(summary, { y: 22, autoAlpha: 0, duration: 0.8 }, 0.32);
      if (actions) {
        tl.from(actions.children, { y: 18, autoAlpha: 0, duration: 0.65, stagger: 0.1 }, 0.42);
      }

      if (frame) {
        tl.to(frame, { y: 0, clipPath: "inset(0% 0% 0% 0% round 0.125rem)", duration: 1.15 }, 0.18);
      }
      if (shot) tl.to(shot, { scale: 1, duration: 1.45, ease: "power3.out" }, 0.22);
      if (stack) tl.to(stack, { y: 0, autoAlpha: 1, rotate: 0, duration: 0.9 }, 0.55);

      if (stack && !prefersReducedMotion()) {
        gsap.to(stack, {
          y: -8,
          duration: 4.8,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: 1.4,
        });
      }

      if (hasFinePointer() && shot) {
        const enter = () => gsap.to(shot, { scale: 1.05, duration: 0.8, ease: "power2.out" });
        const leave = () => gsap.to(shot, { scale: 1, duration: 0.7, ease: "power2.out" });
        frame?.addEventListener("mouseenter", enter);
        frame?.addEventListener("mouseleave", leave);
        return () => {
          unbindMagnetic();
          unbindTilt();
          frame?.removeEventListener("mouseenter", enter);
          frame?.removeEventListener("mouseleave", leave);
        };
      }

      return () => {
        unbindMagnetic();
        unbindTilt();
      };
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative isolate overflow-hidden pb-16 md:pb-stack-lg">
      <HeroBackground />
      <div className="relative z-10 mx-auto grid w-full max-w-container-max items-center gap-10 px-margin-mobile md:min-h-[80vh] md:px-margin-desktop lg:grid-cols-2 lg:gap-gutter">
        <div className="w-full max-w-2xl">
          <div className="mb-4 flex items-center gap-2">
            <span
              data-hero-rule=""
              className="h-px w-8 shrink-0 origin-left bg-primary md:w-12 rtl:origin-right"
            />
            <span
              data-hero-kicker=""
              className="font-body-md text-[15px] font-semibold leading-relaxed tracking-wide text-primary md:text-xl"
            >
              {t("kicker", { role: "Full-Stack Developer", location: "Giza, Egypt" })}
            </span>
          </div>
          <h1
            data-hero-title=""
            className="mb-5 font-headline-xl-mobile text-[2.125rem] leading-tight text-on-surface md:mb-6 md:font-headline-xl md:text-headline-xl"
          >
            <span dir="ltr" className="inline-block">
              {t("title", { name: site.name })}
            </span>{" "}
            <span className="text-primary">{t("titleAccent")}</span>
            {t("titleEnd")}
          </h1>
          <p
            data-hero-summary=""
            className="mb-8 max-w-lg font-body-lg text-body-lg text-on-surface-variant md:mb-10"
          >
            {t("summary")}
          </p>
          <div data-hero-actions="" className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/projects"
              data-magnetic=""
              className="btn-primary inline-flex min-h-12 w-full rounded-sm px-8 py-4 font-label-caps text-label-caps sm:w-auto"
            >
              {t("viewProjects")}
            </Link>
            <DownloadCVButton variant="secondary" className="w-full sm:w-auto" />
          </div>
        </div>
        <div className="relative" style={{ perspective: "1200px" }}>
          <div
            data-hero-frame=""
            className="relative aspect-square overflow-hidden rounded-sm border border-outline-variant/30 bg-surface-container-low will-change-transform [transform-style:preserve-3d]"
          >
            <div data-hero-shot="" className="absolute inset-0 overflow-hidden rounded-sm will-change-transform">
              <Image
                src={portfolio}
                alt={t("photoAlt", { name: site.name })}
                fill
                className="rounded-sm object-cover object-[center_12%] saturate-[.92] contrast-[.97]"
                sizes="(min-width: 1024px) 36vw, 90vw"
                priority
              />
              <span
                className="pointer-events-none absolute inset-0 rounded-sm bg-gradient-to-t from-background/35 via-transparent to-black/20"
                aria-hidden="true"
              />
            </div>
          </div>
          <div
            data-hero-stack=""
            className="mt-4 rounded-sm border border-outline-variant bg-surface-container p-5 lg:absolute lg:-bottom-6 lg:mt-0 lg:max-w-[220px] lg:p-6 ltr:lg:-left-6 rtl:lg:-right-6"
          >
            <div className="mb-2 font-label-caps text-label-caps text-primary">{t("stack")}</div>
            <div className="font-code-sm text-code-sm leading-relaxed text-on-surface-variant">
              {site.stack.join(", ")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
