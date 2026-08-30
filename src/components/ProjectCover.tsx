import { Project } from "@/types";

const accentGlow: Record<Project["accent"], string> = {
  lavender: "from-[#2a2b4d] via-[#1a1c28] to-[#111415]",
  gold: "from-[#3d3420] via-[#1c1a14] to-[#111415]",
  teal: "from-[#163836] via-[#141c1d] to-[#111415]",
  rose: "from-[#3a1c24] via-[#1c1418] to-[#111415]",
  slate: "from-[#2a3136] via-[#16191b] to-[#111415]",
  amber: "from-[#3d2e14] via-[#1c1810] to-[#111415]",
};

const accentInk: Record<Project["accent"], string> = {
  lavender: "text-primary",
  gold: "text-[#E8C572]",
  teal: "text-[#7ED4C8]",
  rose: "text-[#F0A8B8]",
  slate: "text-[#C5D0D4]",
  amber: "text-[#F0C36A]",
};

interface ProjectCoverProps {
  project: Project;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function ProjectCover({
  project,
  className = "",
  size = "md",
}: ProjectCoverProps): React.ReactElement {
  const iconSize = size === "lg" ? "text-7xl" : size === "sm" ? "text-4xl" : "text-5xl";

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${accentGlow[project.accent]} ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-[0.12] project-cover-grid" />
      <div className="absolute -top-16 -right-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <span className={`material-symbols-outlined ${iconSize} ${accentInk[project.accent]}`}>
          {project.icon}
        </span>
        <span className="font-label-caps text-[10px] tracking-[0.28em] text-on-surface-variant/80">
          {project.category.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
