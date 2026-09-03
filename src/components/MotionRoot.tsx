"use client";

import { useRef } from "react";
import { usePathname } from "@/i18n/navigation";
import {
  gsap,
  useGSAP,
  hasFinePointer,
  isRtl,
  prefersReducedMotion,
} from "@/lib/motion";

function RouteFlash(): React.ReactElement {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useGSAP(
    () => {
      const bar = barRef.current;
      if (!bar || prefersReducedMotion()) return;
      if (first.current) {
        first.current = false;
        return;
      }

      const origin = isRtl() ? "100% 50%" : "0% 50%";
      gsap.fromTo(
        bar,
        { scaleX: 0, autoAlpha: 1, transformOrigin: origin },
        { scaleX: 1, duration: 0.55, ease: "power3.inOut" }
      );
      gsap.to(bar, { autoAlpha: 0, duration: 0.35, delay: 0.55, ease: "power2.out" });
    },
    { dependencies: [pathname] }
  );

  return (
    <div
      ref={barRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-primary opacity-0"
      aria-hidden="true"
    />
  );
}

function MotionCursor(): React.ReactElement | null {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      if (prefersReducedMotion() || !hasFinePointer()) {
        document.documentElement.removeAttribute("data-cursor");
        gsap.set(root, { autoAlpha: 0 });
        return;
      }

      document.documentElement.setAttribute("data-cursor", "on");
      const dot = root.querySelector<HTMLElement>("[data-cursor-dot]");
      const ring = root.querySelector<HTMLElement>("[data-cursor-ring]");
      if (!dot || !ring) return;

      gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });
      gsap.set(root, { autoAlpha: 0 });
      const xDot = gsap.quickTo(dot, "x", { duration: 0.16, ease: "power3.out" });
      const yDot = gsap.quickTo(dot, "y", { duration: 0.16, ease: "power3.out" });
      const xRing = gsap.quickTo(ring, "x", { duration: 0.38, ease: "power3.out" });
      const yRing = gsap.quickTo(ring, "y", { duration: 0.38, ease: "power3.out" });
      let shown = false;

      const onMove = (event: MouseEvent) => {
        if (!shown) {
          shown = true;
          gsap.to(root, { autoAlpha: 1, duration: 0.2, ease: "power2.out" });
        }
        xDot(event.clientX);
        yDot(event.clientY);
        xRing(event.clientX);
        yRing(event.clientY);
      };

      const hoverable = "a, button, input, textarea, [data-magnetic], [data-cursor-hover]";
      const onOver = (event: MouseEvent) => {
        if (!(event.target instanceof Element) || !event.target.closest(hoverable)) return;
        gsap.to(ring, { scale: 2.15, duration: 0.35, ease: "power3.out" });
        gsap.to(dot, { scale: 0.45, duration: 0.35, ease: "power3.out" });
      };
      const onOut = (event: MouseEvent) => {
        const related = event.relatedTarget;
        if (related instanceof Element && related.closest(hoverable)) return;
        gsap.to(ring, { scale: 1, duration: 0.4, ease: "power3.out" });
        gsap.to(dot, { scale: 1, duration: 0.4, ease: "power3.out" });
      };

      window.addEventListener("mousemove", onMove);
      document.addEventListener("mouseover", onOver);
      document.addEventListener("mouseout", onOut);

      return () => {
        document.documentElement.removeAttribute("data-cursor");
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseover", onOver);
        document.removeEventListener("mouseout", onOut);
      };
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-[90] opacity-0 mix-blend-difference"
      aria-hidden="true"
    >
      <span
        data-cursor-dot=""
        className="absolute top-0 left-0 size-1.5 rounded-full bg-white"
      />
      <span
        data-cursor-ring=""
        className="absolute top-0 left-0 size-8 rounded-full border border-white"
      />
    </div>
  );
}

export default function MotionRoot({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <>
      <RouteFlash />
      <MotionCursor />
      {children}
    </>
  );
}
