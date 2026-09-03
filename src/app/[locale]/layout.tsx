import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Cairo, Inter, JetBrains_Mono, Work_Sans } from "next/font/google";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/i18n/locale";
import ThemeProvider from "@/components/ThemeProvider";
import MotionRoot from "@/components/MotionRoot";

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

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}): Promise<React.ReactElement> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  if (!hasLocale(routing.locales, localeParam)) {
    notFound();
  }

  setRequestLocale(locale);
  const isArabic = locale === "ar";
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={isArabic ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${workSans.variable} ${cairo.variable} bg-background text-on-surface font-body-md antialiased selection:bg-primary selection:text-on-primary ${isArabic ? "font-arabic" : ""}`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <MotionRoot>{children}</MotionRoot>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
