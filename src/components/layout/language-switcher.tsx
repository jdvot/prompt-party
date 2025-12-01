'use client';

import { Globe, Check } from 'lucide-react';
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
import { useRouter } from 'next/navigation';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
];

export function LanguageSwitcher() {
  const t = useTranslations('languages');
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const changeLanguage = (newLocale: string) => {
    startTransition(() => {
      // Set cookie to persist language preference
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
      // Use router.refresh() for smooth transition without full page reload
      router.refresh();
    });
  };

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={isPending}
          className="gap-2 min-w-[120px] justify-start"
        >
          <Globe className="h-4 w-4" />
          <span className="flex items-center gap-1.5">
            <span className="text-base leading-none">{currentLanguage.flag}</span>
            <span className="hidden sm:inline leading-none">{currentLanguage.name}</span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={locale === language.code ? 'bg-accent font-medium' : ''}
          >
            <span className="flex items-center gap-3 w-full">
              <span className="text-lg leading-none">{language.flag}</span>
              <span className="flex-1 leading-none">{t(language.code)}</span>
              {locale === language.code && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
