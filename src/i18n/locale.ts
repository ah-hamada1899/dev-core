import { hasLocale } from "next-intl";
import { routing, type AppLocale } from "./routing";

export function resolveLocale(locale: string): AppLocale {
  return hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
}
