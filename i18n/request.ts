import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "fr" || value === "en";
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = isLocale(requested) ? requested : DEFAULT_LOCALE;
  const messages = (await import(`../messages/${locale}.json`)).default;
  return { locale, messages };
});
