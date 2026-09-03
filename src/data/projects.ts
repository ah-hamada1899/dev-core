import { Project } from "@/types";
import ellwaaWebsiteImage from "../img/ellwaa-website.png";
import assisServiceImage from "../img/assis-service.png";

export const projects: Project[] = [
  {
    id: "los-reyes",
    title: "LOS REYES Tourism",
    subtitle: "Egypt travel and trip planning",
    description:
      "Next.js tourism site for Egypt — destinations, experiences, trip planning, Framer Motion, and booking emails via Resend and React Email.",
    longDescription:
      "Personal tourism website for travel in Egypt. Built with Next.js App Router, TypeScript, and i18n: destination and experience routing, trip planning, inquiry forms, Framer Motion, and booking emails through Resend and React Email.",
    highlights: [
      "Destination and experience routing with trip planning",
      "Inquiry forms and booking emails via Resend + React Email",
      "Framer Motion and bilingual-ready App Router structure",
    ],
    tags: ["Next.js", "TypeScript", "i18n", "Framer Motion", "Resend"],
    kind: "personal",
    category: "Travel",
    featured: true,
    year: "2026",
    role: "Solo developer",
    liveUrl: "https://losreyes-tours.com/",
    githubUrl: "https://github.com/ah-hamada1899/LOS-REYES-Tourism",
    image: "/projects/los-reyes.png",
    icon: "map",
    accent: "amber",
  },
  {
    id: "ellwaa-website",
    title: "Ellwaa Corporate Website",
    subtitle: "Bilingual legal & company-formation platform",
    description:
      "Production Next.js site for Ellwaa — industries, careers, insights, blogs, and contact flows in Arabic and English with full RTL.",
    longDescription:
      "I develop and maintain ellwaa.com inside Ellwaa’s Turbo monorepo. The site is a Next.js App Router marketing and content platform with next-intl, Tailwind CSS, and bilingual Arabic/English (RTL) layouts covering industries, careers, insights, blogs, and contact.",
    highlights: [
      "App Router pages for industries, careers, insights, blogs, and contact",
      "Arabic/English with next-intl and first-class RTL layout",
      "Shipped in Agile/Jira sprints inside a Turbo monorepo",
    ],
    tags: ["Next.js", "TypeScript", "next-intl", "Tailwind CSS", "RTL"],
    kind: "work",
    category: "Marketing",
    featured: true,
    year: "2026",
    company: "Ellwaa Software",
    role: "Software Developer",
    liveUrl: "https://ellwaa.com",
    image: ellwaaWebsiteImage,
    icon: "domain",
    accent: "lavender",
  },
  {
    id: "assis-website",
    title: "Assis Website",
    subtitle: "Company-formation product site",
    description:
      "Bilingual Assis marketing and onboarding website — Next.js, next-intl, forms, and RTL — for launching a company online with Ellwaa’s Assis service.",
    longDescription:
      "Assis is Ellwaa’s digital company-formation service. I built the public website in Next.js and TypeScript with next-intl, Zod-validated forms, Framer Motion, and a bilingual Arabic/English experience that walks founders through formation.",
    highlights: [
      "Next.js App Router with next-intl and RTL",
      "Validated inquiry and onboarding forms (React Hook Form + Zod)",
      "Motion-led marketing sections for the Assis product",
    ],
    tags: ["Next.js", "TypeScript", "next-intl", "Framer Motion", "Zod"],
    kind: "work",
    category: "Marketing",
    year: "2026",
    company: "Ellwaa Software",
    role: "Software Developer",
    liveUrl: "https://assis.ellwaa.com",
    image: assisServiceImage,
    icon: "travel_explore",
    accent: "gold",
  },
  {
    id: "sales-crm",
    title: "Sales CRM",
    subtitle: "Lead pipeline and bulk assignment",
    description:
      "Sales CRM frontend on REST APIs — lead pipeline, bulk assignment, user management, TanStack Query caching, and Zustand, with Zoho CRM integration.",
    longDescription:
      "Internal sales CRM used by Ellwaa teams. I implemented the frontend against REST APIs: lead pipeline, bulk assignment, user management, TanStack Query caching, Zustand state, and staging/production deploys. Contracts include Zoho CRM integrations.",
    highlights: [
      "Lead pipeline and bulk assignment flows",
      "TanStack Query caching and Zustand state",
      "Zoho CRM integration and staging/production deploys",
    ],
    tags: ["React", "TypeScript", "TanStack Query", "Zustand", "Zoho CRM"],
    kind: "work",
    category: "CRM",
    featured: true,
    year: "2026",
    company: "Ellwaa Software",
    role: "Software Developer",
    icon: "monitoring",
    accent: "teal",
  },
  {
    id: "assis-dashboard",
    title: "Assis Operations Dashboard",
    subtitle: "Client, project, and team administration",
    description:
      "React + Vite operations console: clients, projects, onboarding, user admin, audit-log export, and role-based access in Arabic and English.",
    longDescription:
      "Assis is Ellwaa’s internal operations product. I built the dashboard UI in React, TypeScript, and Vite — client management, project tracking, onboarding, user administration, audit-log export, and RBAC — with a bilingual Arabic/English interface.",
    highlights: [
      "Client, project, and onboarding workflows",
      "User administration, audit-log export, and RBAC",
      "Arabic/English UI with Vite, TypeScript, and React Router",
    ],
    tags: ["React", "TypeScript", "Vite", "i18next", "RBAC"],
    kind: "work",
    category: "Dashboard",
    featured: true,
    year: "2026",
    company: "Ellwaa Software",
    role: "Software Developer",
    icon: "dashboard",
    accent: "gold",
  },
  {
    id: "assis-brands",
    title: "Assis for Brands",
    subtitle: "AI customer care for e-commerce",
    description:
      "Marketing site for Assis — an AI customer assistant for high-AOV stores, with demo booking, results, and channel integrations.",
    longDescription:
      "A Vite + React marketing site for Assis as a customer-care product for e-commerce brands. I built the public pages: positioning, methodology, reviews, pricing narrative, and demo/get-started flows.",
    highlights: [
      "Vite + React + TypeScript marketing site",
      "Demo and get-started flows for Shopify-focused brands",
      "Live on Vercel at assis-website.vercel.app",
    ],
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    kind: "work",
    category: "Marketing",
    year: "2026",
    company: "Ellwaa Software",
    role: "Software Developer",
    liveUrl: "https://assis-website.vercel.app",
    image: "/projects/assis-website.png",
    icon: "favorite",
    accent: "lavender",
  },
  {
    id: "internal-hr",
    title: "Internal HR Portal",
    subtitle: "Arabic-first people operations",
    description:
      "Arabic RTL HR portal for employees, attendance, departments, offices, and tasks — React Query against the internal people API.",
    longDescription:
      "An Arabic-first HR portal for Ellwaa. I shipped the frontend with React, TypeScript, and TanStack Query for employees, attendance, departments, offices, and tasks, with ADMIN/HR role views and an RTL layout.",
    highlights: [
      "Employees, attendance, departments, offices, and tasks",
      "Arabic RTL interface with ADMIN and HR roles",
      "React Query data layer against the internal people API",
    ],
    tags: ["React", "TypeScript", "TanStack Query", "RTL", "Vite"],
    kind: "work",
    category: "HR",
    year: "2026",
    company: "Ellwaa Software",
    role: "Software Developer",
    icon: "groups",
    accent: "rose",
  },
  {
    id: "internal-tickets",
    title: "Internal Ticket Desk",
    subtitle: "Ellwaa support and ops tickets",
    description:
      "React + TypeScript SPA for Ellwaa’s internal ticket desk — queues, assignment, and status — talking to the Ticket System API.",
    longDescription:
      "Internal ticket desk for Ellwaa operations. I built a React and TypeScript SPA that talks to the Ticket System API: queues, assignment, status, and session-aware API proxying so cookies stay on localhost in development.",
    highlights: [
      "Ticket queues, assignment, and status workflows",
      "Typed SPA against the Ticket System API",
      "Dev proxy that keeps session cookies on localhost",
    ],
    tags: ["React", "TypeScript", "Vite", "TanStack Query", "Radix UI"],
    kind: "work",
    category: "Operations",
    year: "2026",
    company: "Ellwaa Software",
    role: "Software Developer",
    githubUrl: "https://github.com/ah-hamada1899/internal-tickets",
    icon: "confirmation_number",
    accent: "slate",
  },
  {
    id: "whatsapp-instances",
    title: "WhatsApp Instances",
    subtitle: "Instance and session console",
    description:
      "Internal console to manage WhatsApp instances — create, monitor, and control sessions with React Hook Form, Zod, and TanStack Query.",
    longDescription:
      "An internal Vite + React console for managing WhatsApp instances. I built the UI for creating, monitoring, and controlling sessions with React Hook Form, Zod validation, TanStack Query, and Radix dialogs.",
    highlights: [
      "Instance create, monitor, and control flows",
      "React Hook Form + Zod validation",
      "TanStack Query against the instances API",
    ],
    tags: ["React", "TypeScript", "Vite", "TanStack Query", "Zod"],
    kind: "work",
    category: "Operations",
    year: "2026",
    company: "Ellwaa Software",
    role: "Software Developer",
    icon: "chat",
    accent: "teal",
  },
  {
    id: "sales-dashboard",
    title: "Sales Analytics Dashboard",
    subtitle: "Charts, filters, and data toggle",
    description:
      "Interactive Next.js dashboard with bar, line, and pie charts, year and threshold filters, mock/API toggle, atomic design, and dark mode.",
    longDescription:
      "A personal analytics dashboard for exploring sales data. I built it in Next.js and TypeScript with Recharts, Tailwind CSS, year and threshold filters, a mock/API data toggle, atomic components, and dark mode.",
    highlights: [
      "Bar, line, and pie charts with Recharts",
      "Year and threshold filters plus mock/API toggle",
      "Atomic design system and dark mode",
    ],
    tags: ["Next.js", "TypeScript", "Recharts", "Tailwind CSS"],
    kind: "personal",
    category: "Analytics",
    year: "2026",
    role: "Solo developer",
    liveUrl: "https://sales-dashboard-six-steel.vercel.app",
    githubUrl: "https://github.com/ah-hamada1899/sales-dashboard",
    image: "/projects/sales-dashboard.png",
    icon: "bar_chart",
    accent: "teal",
  },
  {
    id: "flash-tech",
    title: "FlashTech Store",
    subtitle: "High-voltage hardware shop",
    description:
      "TypeScript storefront for performance hardware — categories, featured products, and a high-contrast shopping experience.",
    longDescription:
      "A personal e-commerce concept for performance hardware. FlashTech is a TypeScript storefront with category browsing, featured products, and a high-contrast shopping UI deployed on Vercel.",
    highlights: [
      "Category browsing for laptops, monitors, and components",
      "Featured product grid with pricing and stock states",
      "Live Vercel deployment",
    ],
    tags: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    kind: "personal",
    category: "Commerce",
    year: "2026",
    role: "Solo developer",
    liveUrl: "https://flash-tech-chi.vercel.app",
    githubUrl: "https://github.com/ah-hamada1899/flash-tech",
    image: "/projects/flash-tech.png",
    icon: "bolt",
    accent: "lavender",
  },
];

export const getProjectById = (id: string): Project | undefined =>
  projects.find((project) => project.id === id);

export const displayHost = (url: string): string =>
  url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export const homeShowcase = projects.slice(0, 3);
