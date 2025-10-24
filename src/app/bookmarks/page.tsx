import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('metadata')
  return {
    title: t('bookmarks_title'),
    description: t('bookmarks_description'),
  }
}

export default function BookmarksPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Bookmarks</h1>
      <p className="text-muted-foreground">Your bookmarked prompts will appear here.</p>
    </div>
  )
}
