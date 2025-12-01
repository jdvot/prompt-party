import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('terms')
  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default function TermsPage() {
  const t = useTranslations('terms')

  return (
    <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{t('title')}</h1>

        <div className="space-y-6 text-muted-foreground">
          <p className="text-sm">{t('last_updated')} {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">{t('acceptance_title')}</h2>
            <p>
              {t('acceptance_text')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">{t('accounts_title')}</h2>
            <p>
              {t('accounts_text')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">{t('content_title')}</h2>
            <p>
              {t('content_text')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">{t('acceptable_title')}</h2>
            <p>{t('acceptable_text')}</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>{t('acceptable_1')}</li>
              <li>{t('acceptable_2')}</li>
              <li>{t('acceptable_3')}</li>
              <li>{t('acceptable_4')}</li>
              <li>{t('acceptable_5')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">{t('moderation_title')}</h2>
            <p>
              {t('moderation_text')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">{t('intellectual_title')}</h2>
            <p>
              {t('intellectual_text')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">{t('disclaimer_title')}</h2>
            <p>
              {t('disclaimer_text')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">{t('liability_title')}</h2>
            <p>
              {t('liability_text')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">{t('termination_title')}</h2>
            <p>
              {t('termination_text')}
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
