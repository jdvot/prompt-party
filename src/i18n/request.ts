import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

export const locales = ['en', 'fr', 'nl'] as const;
export type Locale = (typeof locales)[number];

/**
 * Parse Accept-Language header and return the best matching locale
 * @param acceptLanguage - The Accept-Language header value
 * @returns The best matching locale or null if none found
 */
function getBrowserLocale(acceptLanguage: string | null): Locale | null {
  if (!acceptLanguage) return null;

  // Parse Accept-Language header (e.g., "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7")
  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const [code, qValue] = lang.trim().split(';q=');
      return {
        code: code.toLowerCase().split('-')[0], // Get base language (fr from fr-FR)
        q: qValue ? parseFloat(qValue) : 1,
      };
    })
    .sort((a, b) => b.q - a.q); // Sort by quality value descending

  // Find the first matching locale
  for (const lang of languages) {
    if (locales.includes(lang.code as Locale)) {
      return lang.code as Locale;
    }
  }

  return null;
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headerStore = await headers();

  // 1. Check for existing locale cookie (user preference)
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value as Locale | undefined;

  // 2. If no cookie, try to detect from browser's Accept-Language header
  const acceptLanguage = headerStore.get('accept-language');
  const browserLocale = getBrowserLocale(acceptLanguage);

  // 3. Use cookie > browser detection > default (en)
  const locale = cookieLocale || browserLocale || 'en';

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    timeZone: 'UTC'
  };
});
