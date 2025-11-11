import { getTranslations } from 'next-intl/server'
import { EmptyState } from '@/components/ui/empty-state'

export async function generateMetadata() {
  const t = await getTranslations('metadata')
  return {
    title: t('collections_title'),
    description: t('collections_description'),
  }
}

export default async function CollectionsPage() {
  const t = await getTranslations('pages')
  const emptyT = await getTranslations('emptyStates.noCollections')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">{t('collections_heading')}</h1>

      <EmptyState
        illustrationSrc="/branding/illustrations/empty-states/empty-collections.svg"
        title={emptyT('title')}
        description={emptyT('description')}
        size="lg"
        action={{
          label: emptyT('action'),
          onClick: () => window.location.href = '/collections/new',
        }}
        secondaryAction={{
          label: 'Browse Prompts',
          onClick: () => window.location.href = '/prompts',
        }}
      />
    </div>
  )
}
