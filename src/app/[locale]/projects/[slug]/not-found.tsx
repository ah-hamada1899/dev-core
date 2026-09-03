"use client";

import { Link } from "@/i18n/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

export default function ProjectNotFound(): React.ReactElement {
  const t = useTranslations("projectDetail");

  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-margin-mobile pt-32 text-center">
        <span className="mb-4 font-label-caps text-label-caps text-primary">404</span>
        <h1 className="mb-4 font-headline-lg text-headline-lg">{t("notFoundTitle")}</h1>
        <p className="mb-8 max-w-md font-body-md text-body-md text-on-surface-variant">
          {t("notFoundBody")}
        </p>
        <Link
          href="/projects"
          className="btn-primary inline-flex min-h-12 rounded-sm px-8 py-3 font-label-caps text-label-caps"
        >
          {t("back")}
        </Link>
      </main>
      <Footer />
    </>
  );
}
