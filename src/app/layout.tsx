import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dev-core-kappa.vercel.app"),
  title: {
    default: "Ahmed Hamada | Full-Stack Developer — DEV_CORE",
    template: "%s | DEV_CORE",
  },
  description:
    "Software developer in Giza, Egypt. React, Next.js, Node.js, Express, and PostgreSQL — bilingual products, dashboards, CRM, and marketing sites.",
  keywords: [
    "Ahmed Hamada",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "PostgreSQL",
    "TypeScript",
    "RTL",
    "Portfolio",
    "Giza",
  ],
  authors: [{ name: "Ahmed Hamada" }],
  creator: "Ahmed Hamada",
  publisher: "Ahmed Hamada",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dev-core-kappa.vercel.app",
    siteName: "DEV_CORE",
    title: "Ahmed Hamada | Full-Stack Developer",
    description:
      "Bilingual products, dashboards, and marketing sites built with React, Next.js, Node.js, Express, and PostgreSQL.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ahmed Hamada — DEV_CORE portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Hamada | Full-Stack Developer",
    description:
      "Bilingual products, dashboards, and marketing sites built with React, Next.js, Node.js, Express, and PostgreSQL.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#111415" },
    { media: "(prefers-color-scheme: light)", color: "#F5F6F7" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return children as React.ReactElement;
}
