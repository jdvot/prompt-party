import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('docs')
  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default function DocsPage() {
  const t = useTranslations('docs')

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{t('title')}</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('getting_started')}</h2>
            <p className="mb-4">
              {t('getting_started_intro')}
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <Link href="/auth/signup" className="text-primary hover:underline">
                  {t('step1')}
                </Link>
              </li>
              <li>{t('step2')}</li>
              <li>
                <Link href="/prompts/new" className="text-primary hover:underline">
                  {t('step3')}
                </Link>
              </li>
              <li>{t('step4')}</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('creating_prompts')}</h2>
            <p className="mb-4">
              {t('creating_prompts_intro')}
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>{t('markdown_1')}</li>
              <li>{t('markdown_2')}</li>
              <li>{t('markdown_3')}</li>
              <li>{t('markdown_4')}</li>
              <li>{t('markdown_5')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('collections_title')}</h2>
            <p className="mb-4">
              {t('collections_intro')}
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>{t('collections_public')}</li>
              <li>{t('collections_private')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('remixing_title')}</h2>
            <p>
              {t('remixing_text')}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
