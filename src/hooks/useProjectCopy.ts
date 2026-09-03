"use client";

import { useTranslations } from "next-intl";
import { Project } from "@/types";

export function useProjectCopy(project: Project) {
  const t = useTranslations(`projects.${project.id}` as "projects.ellwaa-website");
  const tRoles = useTranslations("roles");
  const tCompanies = useTranslations("companies");

  return {
    title: t("title"),
    subtitle: t("subtitle"),
    description: t("description"),
    longDescription: t("longDescription"),
    category: t("category"),
    highlights: [0, 1, 2].map((index) => t(`highlights.${index}`)),
    role: project.role === "Solo developer" ? tRoles("solo") : tRoles("software"),
    company: project.company ? tCompanies("ellwaa") : undefined,
  };
}
