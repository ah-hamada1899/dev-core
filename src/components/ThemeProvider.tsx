"use client";

import { ThemeProvider } from "next-themes";

export default function ThemeProviderClient({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      themes={["light", "dark"]}
    >
      {children}
    </ThemeProvider>
  );
}
