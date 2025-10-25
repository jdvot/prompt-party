'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

type IntlProviderProps = {
  messages: Record<string, unknown>;
  locale: string;
  children: ReactNode;
};

export function IntlProvider({ messages, locale, children }: IntlProviderProps) {
  return (
    <NextIntlClientProvider messages={messages} locale={locale} timeZone="UTC">
      {children}
    </NextIntlClientProvider>
  );
}
