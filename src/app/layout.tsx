import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Work_Sans } from "next/font/google";
import "./globals.css";

// Font configurations with proper types
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "600"],
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["700", "800"],
  display: "swap",
});

// Metadata with proper typing
export const metadata: Metadata = {
  metadataBase: new URL("https://dev-core-kappa.vercel.app"),
  title: {
    default: "Ahmed Hamada | Front-End Developer — DEV_CORE",
    template: "%s | DEV_CORE",
  },
  description:
    "Front-end developer in Giza, Egypt. React, Next.js, and TypeScript — bilingual product UIs, dashboards, CRM, and marketing sites.",
  keywords: [
    "Ahmed Hamada",
    "Front-End Developer",
    "React",
    "Next.js",
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
    title: "Ahmed Hamada | Front-End Developer",
    description:
      "Bilingual product UIs, dashboards, and marketing sites built with React and Next.js.",
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
    title: "Ahmed Hamada | Front-End Developer",
    description:
      "Bilingual product UIs, dashboards, and marketing sites built with React and Next.js.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#111415" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.ReactElement {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${workSans.variable} bg-background text-on-surface font-body-md antialiased selection:bg-primary selection:text-on-primary`}
      >
        {children}
      </body>
    </html>
  );
}