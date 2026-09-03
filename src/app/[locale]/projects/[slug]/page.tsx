import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProjectDetailView from "@/views/ProjectDetailView";
import { getProjectById, projects } from "@/data/projects";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/i18n/locale";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = resolveLocale(localeParam);
  const project = getProjectById(slug);
  if (!project) {
    return { title: "Project not found" };
  }
  const t = await getTranslations({ locale, namespace: "projects" });
  return {
    title: t(`${project.id}.title` as "ellwaa-website.title"),
    description: t(`${project.id}.description` as "ellwaa-website.description"),
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);
  const project = getProjectById(slug);
  if (!project) {
    notFound();
  }
  return <ProjectDetailView project={project} />;
}
