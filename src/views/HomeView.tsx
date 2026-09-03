"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeStats from "@/components/HomeStats";
import HomeFeaturedProjects from "@/components/HomeFeaturedProjects";
import HomeHero from "@/components/HomeHero";
import TechMarquee from "@/components/TechMarquee";
import {
  gsap,
  useGSAP,
  SplitText,
  bindMagnetic,
  isRtl,
  prefersReducedMotion,
  revealOnScroll,
} from "@/lib/motion";

export default function HomeView() {
  const t = useTranslations("home");
  const tSite = useTranslations("site");
  const restRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = restRef.current;
      if (!root) return;

      const unbind = bindMagnetic(root);
      if (prefersReducedMotion()) return unbind;

      const quote = root.querySelector<HTMLElement>("[data-about-quote]");
      if (quote) {
        const split = SplitText.create(quote, {
          type: "lines",
          mask: "lines",
          aria: "auto",
        });
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: quote, start: "top 82%", once: true },
        });
      }

      revealOnScroll(root);
      const ctaTitle = root.querySelector<HTMLElement>("[data-cta-title]");
      if (ctaTitle) {
        const split = SplitText.create(ctaTitle, {
          type: isRtl() ? "words" : "words,chars",
          mask: "words",
          aria: "auto",
        });
        const units = !isRtl() && split.chars.length > 0 ? split.chars : split.words;
        gsap.from(units, {
          yPercent: 120,
          duration: 0.95,
          stagger: 0.03,
          ease: "expo.out",
          scrollTrigger: { trigger: ctaTitle, start: "top 85%", once: true },
        });
      }

      return unbind;
    },
    { scope: restRef }
  );

  return (
    <>
      <Navbar />
      <main className="pt-[calc(4rem+env(safe-area-inset-top)+1.5rem)] md:pt-32">
        <HomeHero />
        <HomeStats />
        <TechMarquee />
        <HomeFeaturedProjects />

        <div ref={restRef}>
          <section className="mx-auto max-w-container-max px-margin-mobile py-16 md:px-margin-desktop md:py-stack-lg">
            <div className="relative mx-auto max-w-3xl">
              <div className="absolute top-0 h-24 w-24 border-t border-primary/20 md:h-40 md:w-40 ltr:left-0 ltr:border-l rtl:right-0 rtl:border-r" />
              <div className="relative rounded-sm border border-outline-variant/30 bg-surface-container-low p-5 md:p-10">
                <p
                  data-about-quote=""
                  className="mb-8 font-body-lg text-body-lg leading-relaxed text-on-surface"
                >
                  {t("aboutQuote")}
                </p>
                <div className="space-y-6">
                  <div data-reveal="start" className="flex gap-4">
                    <span className="material-symbols-outlined shrink-0 text-primary">translate</span>
                    <div>
                      <h4 className="mb-1 font-headline-lg text-[18px]">{t("bilingualTitle")}</h4>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        {t("bilingualBody")}
                      </p>
                    </div>
                  </div>
                  <div data-reveal="start" data-reveal-delay="0.08" className="flex gap-4">
                    <span className="material-symbols-outlined shrink-0 text-primary">speed</span>
                    <div>
                      <h4 className="mb-1 font-headline-lg text-[18px]">{t("perfTitle")}</h4>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        {t("perfBody")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden bg-primary py-16 text-center text-on-primary md:py-stack-lg">
            <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
              <h2
                data-cta-title=""
                className="mb-6 font-headline-xl-mobile text-[2.125rem] leading-tight selection-bg-text md:font-headline-xl md:text-headline-xl"
              >
                {t("ctaTitle")}
              </h2>
              <p
                data-reveal=""
                className="mx-auto mb-8 max-w-2xl font-body-lg text-body-lg text-on-primary opacity-80 md:mb-10"
              >
                {t("ctaBody", { availability: tSite("availability") })}
              </p>
              <Link
                href="/contact"
                data-magnetic=""
                className="btn-on-primary inline-flex min-h-12 w-full max-w-sm rounded-sm px-8 py-4 font-label-caps text-label-caps md:w-auto md:px-12 md:py-5"
              >
                {t("ctaButton")}
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
