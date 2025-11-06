'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations('common.notFoundPage')

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Illustration */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/branding/illustrations/errors/404-not-found.svg"
            alt={t('notFoundAlt')}
            width={400}
            height={400}
            priority
            className="w-full max-w-md h-auto"
          />
        </div>

        <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          {t('title')}
        </h1>
        <h2 className="text-3xl font-semibold mb-4">{t('heading')}</h2>
        <p className="text-muted-foreground mb-8 text-lg">
          {t('description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-md hover:from-indigo-700 hover:to-violet-700 transition-all shadow-lg hover:shadow-xl"
          >
            {t('goHome')}
          </Link>
          <Link
            href="/tutorials"
            className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors"
          >
            {t('browseTutorials')}
          </Link>
        </div>
      </div>
    </div>
  )
}
