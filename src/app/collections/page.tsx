import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Collections | Prompt Party',
}

export default async function CollectionsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch user's collections with item counts
  const { data: collections } = await supabase
    .from('collections')
    .select(`
      *,
      collection_items (count)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Collections</h1>
          <Link
            href="/collections/new"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            New Collection
          </Link>
        </div>

        {!collections || collections.length === 0 ? (
          <div className="text-center py-16 border rounded-lg bg-muted/20">
            <p className="text-muted-foreground mb-4">
              You haven&apos;t created any collections yet.
            </p>
            <Link
              href="/collections/new"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Create Your First Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection: any) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.id}`}
                className="block border rounded-lg p-6 hover:shadow-lg transition-shadow bg-card"
              >
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-xl font-bold flex-1">{collection.name}</h2>
                  {!collection.is_public && (
                    <span className="text-xs text-amber-600 font-medium">Private</span>
                  )}
                </div>
                {collection.description && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {collection.description}
                  </p>
                )}
                <div className="text-sm text-muted-foreground">
                  {collection.collection_items?.[0]?.count || 0} prompt
                  {collection.collection_items?.[0]?.count !== 1 ? 's' : ''}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
