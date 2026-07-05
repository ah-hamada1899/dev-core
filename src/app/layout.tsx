import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Work_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "600"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "DEV_CORE | Building Digital Experiences with Precision",
  description: "Full-stack engineer specializing in high-performance web applications, scalable cloud architecture, and clean maintainable codebases.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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