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
  title: {
    default: "DEV_CORE | Building Digital Experiences with Precision",
    template: "%s | DEV_CORE",
  },
  description: "Full-stack engineer specializing in high-performance web applications, scalable cloud architecture, and clean maintainable codebases.",
  keywords: ["Full Stack Developer", "Web Development", "React", "Next.js", "TypeScript", "AWS", "Portfolio"],
  authors: [{ name: "DEV_CORE Engineering" }],
  creator: "DEV_CORE Engineering",
  publisher: "DEV_CORE Engineering",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devcore.engineering",
    siteName: "DEV_CORE Engineering",
    title: "DEV_CORE | Building Digital Experiences with Precision",
    description: "Full-stack engineer specializing in high-performance web applications.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DEV_CORE Engineering Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DEV_CORE | Building Digital Experiences with Precision",
    description: "Full-stack engineer specializing in high-performance web applications.",
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