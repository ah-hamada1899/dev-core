import SkillsView from "@/views/SkillsView";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { resolveLocale } from "@/i18n/locale";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "skills" });
  return {
    title: t("title"),
    description: t("lead"),
  };
}

export default async function SkillsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<React.ReactElement> {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);
  return <SkillsView />;
}
