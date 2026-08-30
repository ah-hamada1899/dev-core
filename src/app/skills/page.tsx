import SkillsView from "@/views/SkillsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "React, Next.js, TypeScript, TanStack Query, Zustand, next-intl, and RTL — the stack Ahmed Hamada uses in production.",
};

export default function SkillsPage(): React.ReactElement {
  return <SkillsView />;
}