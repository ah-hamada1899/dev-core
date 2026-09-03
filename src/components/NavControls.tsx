"use client";

import { useEffect, useRef, useState } from "react";
import * as Toggle from "@radix-ui/react-toggle";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion";

function localePath(pathname: string, next: AppLocale): string {
  if (next === routing.defaultLocale) return pathname || "/";
  return pathname === "/" ? `/${next}` : `/${next}${pathname}`;
}

const controlClass =
  "inline-flex h-9 w-9 items-center justify-center rounded-sm text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=on]:text-primary";

export default function NavControls(): React.ReactElement {
  const { resolvedTheme, setTheme } = useTheme();
  const tTheme = useTranslations("theme");
  const tLocale = useTranslations("locale");
  const locale = useLocale();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [pendingLocale, setPendingLocale] = useState(false);
  const iconRef = useRef<HTMLSpanElement>(null);
  const langRef = useRef<HTMLSpanElement>(null);
  const firstTheme = useRef(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || resolvedTheme !== "light";
  const nextLocale: AppLocale = locale === "ar" ? "en" : "ar";

  useGSAP(
    () => {
      const icon = iconRef.current;
      if (!icon || !mounted) return;
      if (firstTheme.current) {
        firstTheme.current = false;
        return;
      }
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        icon,
        { yPercent: 110, rotate: -40, autoAlpha: 0 },
        { yPercent: 0, rotate: 0, autoAlpha: 1, duration: 0.45, ease: "power3.out" }
      );
    },
    { dependencies: [isDark, mounted] }
  );

  const switchTheme = (dark: boolean) => {
    const icon = iconRef.current;
    if (!icon || prefersReducedMotion()) {
      setTheme(dark ? "dark" : "light");
      return;
    }
    gsap.to(icon, {
      yPercent: -110,
      rotate: 40,
      autoAlpha: 0,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => setTheme(dark ? "dark" : "light"),
    });
  };

  const switchLocale = () => {
    if (pendingLocale) return;
    setPendingLocale(true);
    const label = langRef.current;
    const nextLabel = nextLocale === "ar" ? "AR" : "EN";

    const go = () => {
      document.cookie = `NEXT_LOCALE=${nextLocale};path=/;max-age=31536000;SameSite=lax`;
      window.location.assign(localePath(pathname, nextLocale));
    };

    if (!label || prefersReducedMotion()) {
      go();
      return;
    }

    gsap.to(label, {
      duration: 0.45,
      scrambleText: { text: nextLabel, chars: "ENAR01", speed: 0.7 },
      ease: "none",
    });
    gsap.delayedCall(0.38, go);
  };

  return (
    <div className="flex items-center" dir="ltr">
      <Toggle.Root
        pressed={isDark}
        onPressedChange={switchTheme}
        disabled={!mounted}
        aria-label={isDark ? tTheme("switchToLight") : tTheme("switchToDark")}
        title={isDark ? tTheme("switchToLight") : tTheme("switchToDark")}
        className={controlClass}
      >
        <span className="relative flex h-5 w-5 items-center justify-center overflow-hidden">
          <span ref={iconRef} className="material-symbols-outlined text-[20px] leading-none">
            {isDark ? "dark_mode" : "light_mode"}
          </span>
        </span>
      </Toggle.Root>

      <span className="mx-0.5 h-4 w-px bg-outline-variant/40" aria-hidden="true" />

      <button
        type="button"
        dir="ltr"
        disabled={pendingLocale}
        onClick={switchLocale}
        aria-label={nextLocale === "ar" ? tLocale("switchToAr") : tLocale("switchToEn")}
        title={nextLocale === "ar" ? tLocale("switchToAr") : tLocale("switchToEn")}
        className={`${controlClass} w-auto min-w-9 px-2 font-label-caps text-[11px] tracking-[0.14em] ${
          pendingLocale ? "opacity-70" : ""
        }`}
      >
        <span ref={langRef}>{locale === "ar" ? "AR" : "EN"}</span>
      </button>
    </div>
  );
}
