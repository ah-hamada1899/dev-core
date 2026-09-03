"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { CustomEase } from "gsap/CustomEase";

let registered = false;

export function registerMotion(): void {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrambleTextPlugin, CustomEase);
  CustomEase.create("core", "0.16,1,0.3,1");
  gsap.config({ nullTargetWarn: false });
  registered = true;
}

registerMotion();

export { gsap, useGSAP, ScrollTrigger, SplitText };

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isRtl(): boolean {
  return document.documentElement.dir === "rtl";
}

export function hasFinePointer(): boolean {
  return window.matchMedia("(pointer: fine)").matches;
}

export function bindMagnetic(
  root: ParentNode,
  selector = "[data-magnetic]"
): () => void {
  if (prefersReducedMotion() || !hasFinePointer()) return () => undefined;

  const cleanups = Array.from(root.querySelectorAll<HTMLElement>(selector)).map((el) => {
    const intensity = Number(el.dataset.magnetic) || 0.32;
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      xTo((event.clientX - (rect.left + rect.width / 2)) * intensity);
      yTo((event.clientY - (rect.top + rect.height / 2)) * intensity);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  });

  return () => cleanups.forEach((fn) => fn());
}

export function bindScramble(
  root: ParentNode,
  selector = "[data-scramble]"
): () => void {
  if (prefersReducedMotion() || isRtl()) return () => undefined;

  const cleanups = Array.from(root.querySelectorAll<HTMLElement>(selector)).map((el) => {
    const original = el.dataset.scrambleText || el.textContent || "";
    const chars = el.dataset.scrambleChars || "01<>/_#";

    const onEnter = () => {
      gsap.to(el, {
        duration: 0.7,
        scrambleText: { text: original, chars, speed: 0.6 },
        ease: "none",
      });
    };

    el.addEventListener("mouseenter", onEnter);
    return () => el.removeEventListener("mouseenter", onEnter);
  });

  return () => cleanups.forEach((fn) => fn());
}

export function animateIntro(root: HTMLElement): void {
  if (prefersReducedMotion()) return;

  const rtl = isRtl();
  const kicker = root.querySelector<HTMLElement>("[data-intro-kicker]");
  const title = root.querySelector<HTMLElement>("[data-intro-title]");
  const lead = root.querySelector<HTMLElement>("[data-intro-lead]");
  const extra = root.querySelector<HTMLElement>("[data-intro-extra]");
  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

  if (kicker) {
    tl.from(kicker, { y: 16, autoAlpha: 0, duration: 0.7 }, 0);
  }

  if (title) {
    const split = SplitText.create(title, {
      type: rtl ? "words" : "words,chars",
      mask: "words",
      aria: "auto",
    });
    const units = !rtl && split.chars.length > 0 ? split.chars : split.words;
    tl.from(units, { yPercent: 115, duration: 0.95, stagger: rtl ? 0.05 : 0.018 }, 0.06);
  }

  if (lead) {
    tl.from(lead, { y: 22, autoAlpha: 0, duration: 0.75 }, 0.22);
  }

  if (extra) {
    tl.from(extra, { y: 22, autoAlpha: 0, duration: 0.7 }, 0.32);
  }
}

export function revealOnScroll(root: ParentNode, selector = "[data-reveal]"): void {
  if (prefersReducedMotion()) return;

  root.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    const axis = el.dataset.reveal;
    const fromX = axis === "start" ? (isRtl() ? 28 : -28) : axis === "end" ? (isRtl() ? -28 : 28) : 0;

    gsap.from(el, {
      y: fromX ? 0 : 36,
      x: fromX,
      autoAlpha: 0,
      duration: 0.9,
      delay: Number(el.dataset.revealDelay) || 0,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });
}

export function tiltCard(el: HTMLElement): () => void {
  if (prefersReducedMotion() || !hasFinePointer()) return () => undefined;

  const rotateY = gsap.quickTo(el, "rotateY", { duration: 0.5, ease: "power3.out" });
  const rotateX = gsap.quickTo(el, "rotateX", { duration: 0.5, ease: "power3.out" });

  const onMove = (event: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY(px * 8);
    rotateX(py * -6);
  };

  const onLeave = () => {
    rotateY(0);
    rotateX(0);
  };

  el.addEventListener("mousemove", onMove);
  el.addEventListener("mouseleave", onLeave);
  return () => {
    el.removeEventListener("mousemove", onMove);
    el.removeEventListener("mouseleave", onLeave);
  };
}
