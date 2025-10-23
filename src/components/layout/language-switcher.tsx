'use client';

import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslations } from 'next-intl';
import { useTransition, useState, useEffect } from 'react';
import { useLocale } from 'next-intl';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export function LanguageSwitcher() {
  const t = useTranslations('languages');
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const changeLanguage = (newLocale: string) => {
    // Set cookie to persist language preference
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    // Use router.push to navigate without full reload
    window.location.href = window.location.pathname + window.location.search;
  };

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" disabled={isPending}>
          <Globe className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">{currentLanguage.flag} {currentLanguage.name}</span>
          <span className="sm:hidden">{currentLanguage.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-dropdown">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={locale === language.code ? 'bg-accent' : ''}
          >
            <span className="mr-2">{language.flag}</span>
            {t(language.code)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
