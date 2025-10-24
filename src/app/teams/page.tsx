import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('metadata')
  return {
    title: t('teams_title'),
    description: t('teams_description'),
  }
}

export default function TeamsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Teams</h1>
      <p className="text-muted-foreground">Your team workspaces will appear here.</p>
    </div>
  )
}
