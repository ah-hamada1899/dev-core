"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion";

interface HomeStat {
  id: "seo" | "projects" | "satisfaction" | "available";
  value: number;
  suffix: string;
}

const STATS: HomeStat[] = [
  { id: "seo", value: 100, suffix: "%" },
  { id: "projects", value: 70, suffix: "+" },
  { id: "satisfaction", value: 100, suffix: "%" },
  { id: "available", value: 24, suffix: "/7" },
];

export default function HomeStats(): React.ReactElement {
  const t = useTranslations("home.stats");
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const items = root.querySelectorAll<HTMLElement>("[data-stat]");

      if (prefersReducedMotion()) {
        items.forEach((item) => {
          const node = item.querySelector("[data-stat-value]");
          const rule = item.querySelector("[data-stat-rule]");
          if (node) node.textContent = String(item.dataset.value ?? "");
          gsap.set(rule, { scaleX: 1 });
        });
        return;
      }

      items.forEach((item, index) => {
        const node = item.querySelector("[data-stat-value]");
        const rule = item.querySelector("[data-stat-rule]");
        const target = Number(item.dataset.value);
        const counter = { n: 0 };

        gsap.set(item, { autoAlpha: 0, y: 28 });
        gsap.set(rule, { scaleX: 0 });
        if (node) node.textContent = "0";

        const tl = gsap.timeline({
          delay: index * 0.1,
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
          defaults: { ease: "expo.out" },
        });

        tl.to(item, { autoAlpha: 1, y: 0, duration: 0.8 }, 0);
        tl.to(
          counter,
          {
            n: target,
            duration: 1.45,
            ease: "power2.out",
            onUpdate: () => {
              if (node) node.textContent = String(Math.round(counter.n));
            },
          },
          0.08
        );
        tl.to(rule, { scaleX: 1, duration: 0.65, ease: "power3.out" }, 0.28);
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} aria-label={t("aria")} className="border-y border-outline-variant/20 bg-surface-container-low">
      <div className="home-stats-grid mx-auto grid max-w-container-max grid-cols-2 px-margin-mobile md:grid-cols-4 md:px-margin-desktop">
        {STATS.map((stat) => (
          <div
            key={stat.id}
            data-stat=""
            data-value={stat.value}
            className="flex flex-col items-center justify-center px-4 py-10 text-center md:py-14"
          >
            <p
              dir="ltr"
              className="font-headline-lg text-[2.5rem] font-extrabold leading-none tracking-tight text-primary tabular-nums md:text-[3.25rem]"
              aria-hidden="true"
            >
              <span data-stat-value="">0</span>
              {stat.suffix}
            </p>
            <p className="mt-3 max-w-[13rem] font-label-caps text-[10px] uppercase tracking-[0.18em] text-on-surface-variant md:text-[11px]">
              {t(stat.id)}
            </p>
            <span
              data-stat-rule=""
              className="mt-4 h-px w-10 origin-center bg-primary"
              aria-hidden="true"
            />
            <span className="sr-only">
              {stat.value}
              {stat.suffix} {t(stat.id)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
