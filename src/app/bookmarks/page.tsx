import { getTranslations } from 'next-intl/server'
import { EmptyState } from '@/components/ui/empty-state'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export async function generateMetadata() {
  const t = await getTranslations('metadata')
  return {
    title: t('bookmarks_title'),
    description: t('bookmarks_description'),
  }
}

export default async function BookmarksPage() {
  const t = await getTranslations('pages')
  const emptyT = await getTranslations('emptyStates.noBookmarks')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('bookmarks_heading')}</h1>

      <EmptyState
        illustrationSrc="/branding/illustrations/empty-states/empty-bookmarks.svg"
        title={emptyT('title')}
        description={emptyT('description')}
        size="lg"
        action={{
          label: emptyT('action'),
          href: '/tutorials',
        }}
        secondaryAction={{
          label: emptyT('secondaryAction'),
          href: '/prompts',
        }}
      />
    </div>
  )
}
