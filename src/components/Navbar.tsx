"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { site } from "@/data/site";
import NavControls from "@/components/NavControls";
import {
  gsap,
  useGSAP,
  ScrollTrigger,
  bindMagnetic,
  bindScramble,
  isRtl,
  prefersReducedMotion,
} from "@/lib/motion";

const Navbar = (): React.ReactElement => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");
  const navRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/projects", label: t("projects") },
    { href: "/skills", label: t("skills") },
    { href: "/contact", label: t("contact") },
  ] as const;

  const isActive = (path: string): boolean =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setOpen(false));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      const unbindMagnetic = bindMagnetic(nav);
      const unbindScramble = bindScramble(nav);
      const bar = nav.querySelector<HTMLElement>("[data-scroll-progress]");
      const rtl = isRtl();

      if (prefersReducedMotion()) {
        return () => {
          unbindMagnetic();
          unbindScramble();
        };
      }

      gsap.from(nav, { yPercent: -100, duration: 0.7, ease: "power3.out" });

      if (bar) {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: rtl ? "100% 50%" : "0% 50%",
            scrollTrigger: { scrub: 0.25, start: 0, end: "max" },
          }
        );
      }

      let last = 0;
      const onScroll = () => {
        if (nav.dataset.menuOpen === "true") {
          gsap.to(nav, { yPercent: 0, duration: 0.35, ease: "power3.out", overwrite: "auto" });
          return;
        }
        const y = window.scrollY;
        if (y < 24) {
          gsap.to(nav, { yPercent: 0, duration: 0.4, ease: "power3.out", overwrite: "auto" });
        } else if (y > last + 8) {
          gsap.to(nav, { yPercent: -100, duration: 0.45, ease: "power3.out", overwrite: "auto" });
        } else if (y < last - 8) {
          gsap.to(nav, { yPercent: 0, duration: 0.45, ease: "power3.out", overwrite: "auto" });
        }
        last = y;
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);

      return () => {
        unbindMagnetic();
        unbindScramble();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
      };
    },
    { scope: navRef }
  );

  useGSAP(
    () => {
      if (!open || prefersReducedMotion()) return;
      const links = mobileRef.current?.querySelectorAll("[data-nav-mobile]");
      if (!links?.length) return;
      gsap.from(links, {
        x: isRtl() ? 28 : -28,
        autoAlpha: 0,
        duration: 0.45,
        stagger: 0.06,
        ease: "power3.out",
      });
    },
    { dependencies: [open], revertOnUpdate: true }
  );

  return (
    <>
      <nav
        ref={navRef}
        data-menu-open={open ? "true" : "false"}
        className="fixed top-0 z-50 w-full border-b border-outline-variant/30 bg-surface/90 pt-[env(safe-area-inset-top)] backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 max-w-container-max items-center justify-between gap-2 px-margin-mobile md:h-20 md:px-margin-desktop">
          <Link
            href="/"
            className="group flex min-w-0 shrink-0 flex-col leading-none"
            aria-label={t("homeAria")}
            onClick={() => setOpen(false)}
          >
            <span
              data-scramble=""
              data-scramble-text={site.brand}
              className="font-headline-lg text-[20px] font-bold tracking-tighter text-on-surface transition-colors group-hover:text-primary md:text-[22px]"
            >
              {site.brand}
            </span>
            <span className="font-label-caps text-[9px] tracking-[0.16em] text-on-surface-variant md:text-[10px] md:tracking-[0.18em]">
              {site.name.toUpperCase()}
            </span>
          </Link>

          <div className="hidden items-center gap-gutter md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body-md text-body-md transition-colors ${
                  isActive(link.href)
                    ? "border-b-2 border-primary pb-1 font-bold text-primary"
                    : "text-on-surface-variant hover:text-primary"
                }`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <NavControls />
            <Link
              href="/contact"
              data-magnetic=""
              className="btn-primary hidden rounded-sm px-5 py-2 font-label-caps text-label-caps md:inline-flex"
            >
              {t("hire")}
            </Link>
            <button
              type="button"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-outline-variant/40 text-on-surface md:hidden"
              aria-label={open ? t("closeMenu") : t("openMenu")}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="material-symbols-outlined">{open ? "close" : "menu"}</span>
            </button>
          </div>
        </div>
        <div
          data-scroll-progress=""
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-primary"
          aria-hidden="true"
        />
      </nav>

      {open ? (
        <div
          ref={mobileRef}
          className="fixed inset-x-0 bottom-0 top-[calc(4rem+env(safe-area-inset-top))] z-40 overflow-y-auto border-t border-outline-variant/30 bg-surface pb-[env(safe-area-inset-bottom)] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={t("openMenu")}
        >
          <div className="flex flex-col px-margin-mobile py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-nav-mobile=""
                onClick={() => setOpen(false)}
                className={`min-h-12 border-b border-outline-variant/15 py-3.5 font-body-md text-[17px] ${
                  isActive(link.href) ? "font-semibold text-primary" : "text-on-surface"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              data-nav-mobile=""
              onClick={() => setOpen(false)}
              className="btn-primary mt-5 inline-flex min-h-12 w-full rounded-sm px-6 py-3.5 font-label-caps text-label-caps"
            >
              {t("hire")}
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
