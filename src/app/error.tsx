'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('common.errorPage')

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Illustration */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/branding/illustrations/errors/500-server-error.svg"
            alt={t('serverErrorAlt')}
            width={400}
            height={400}
            priority
            className="w-full max-w-md h-auto"
          />
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          {t('oops')}
        </h1>
        <h2 className="text-3xl font-semibold mb-4">{t('somethingWrong')}</h2>
        <p className="text-muted-foreground mb-8 text-lg">
          {t('description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-md hover:from-indigo-700 hover:to-violet-700 transition-all shadow-lg hover:shadow-xl"
          >
            {t('tryAgain')}
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors"
          >
            {t('goHome')}
          </button>
        </div>
      </div>
    </div>
  )
}
