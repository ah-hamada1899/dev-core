"use client";

import { useRef } from "react";
import { site } from "@/data/site";
import {
  gsap,
  useGSAP,
  prefersReducedMotion,
} from "@/lib/motion";

const ITEMS = [...site.stack, "GSAP", "RTL", "TanStack Query", "next-intl"];

export default function TechMarquee(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const track = ref.current?.querySelector<HTMLElement>("[data-marquee-track]");
      if (!track || prefersReducedMotion()) return;

      const tween = gsap.to(track, {
        xPercent: -50,
        duration: 32,
        ease: "none",
        repeat: -1,
      });

      const pause = () => tween.pause();
      const play = () => tween.play();
      const root = ref.current;
      root?.addEventListener("mouseenter", pause);
      root?.addEventListener("mouseleave", play);
      root?.addEventListener("focusin", pause);
      root?.addEventListener("focusout", play);

      return () => {
        root?.removeEventListener("mouseenter", pause);
        root?.removeEventListener("mouseleave", play);
        root?.removeEventListener("focusin", pause);
        root?.removeEventListener("focusout", play);
      };
    },
    { scope: ref }
  );

  const row = (
    <div className="flex shrink-0 items-center gap-8 pe-8 md:gap-12 md:pe-12">
      {ITEMS.map((item) => (
        <span
          key={item}
          className="flex items-center gap-8 font-label-caps text-[11px] uppercase tracking-[0.22em] text-on-surface-variant md:gap-12 md:text-[12px]"
        >
          <span className="text-primary">✦</span>
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <section
      ref={ref}
      aria-hidden="true"
      className="tech-marquee overflow-hidden border-y border-outline-variant/20 bg-surface-container-lowest py-4 md:py-5"
    >
      <div dir="ltr" className="flex w-max" data-marquee-track="">
        {row}
        {row}
      </div>
    </section>
  );
}
