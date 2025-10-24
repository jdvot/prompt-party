import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('privacy')
  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default function PrivacyPage() {
  const t = useTranslations('privacy')

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{t('title')}</h1>

        <div className="space-y-6 text-muted-foreground">
          <p className="text-sm">{t('last_updated')} {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">{t('info_collect_title')}</h2>
            <p>
              {t('info_collect_text')}
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>{t('info_collect_1')}</li>
              <li>{t('info_collect_2')}</li>
              <li>{t('info_collect_3')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">{t('how_use_title')}</h2>
            <p>{t('how_use_text')}</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>{t('how_use_1')}</li>
              <li>{t('how_use_2')}</li>
              <li>{t('how_use_3')}</li>
              <li>{t('how_use_4')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">{t('data_storage_title')}</h2>
            <p>
              {t('data_storage_text')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">{t('sharing_title')}</h2>
            <p>
              {t('sharing_text')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">{t('rights_title')}</h2>
            <p>{t('rights_text')}</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>{t('rights_1')}</li>
              <li>{t('rights_2')}</li>
              <li>{t('rights_3')}</li>
              <li>{t('rights_4')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">{t('cookies_title')}</h2>
            <p>
              {t('cookies_text')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">{t('changes_title')}</h2>
            <p>
              {t('changes_text')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">{t('contact_title')}</h2>
            <p>
              {t('contact_text')}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
