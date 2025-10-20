import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookmarkIcon } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bookmarks | Prompt Party',
  description: 'Your saved prompts organized in folders',
}

export default async function BookmarksPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Get user's bookmark folders
  const { data: folders } = await supabase
    .from('bookmark_folders')
    .select('*')
    .eq('user_id', user.id)
    .order('name')

  // Get all bookmarks with prompts
  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('*, prompts(*, profiles(name, avatar_url))')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  // Group bookmarks by folder
  const bookmarksByFolder: Record<string, any[]> = {
    default: [],
  }

  folders?.forEach((folder) => {
    bookmarksByFolder[folder.name] = []
  })

  bookmarks?.forEach((bookmark) => {
    const folderName = bookmark.folder || 'default'
    if (!bookmarksByFolder[folderName]) {
      bookmarksByFolder[folderName] = []
    }
    bookmarksByFolder[folderName].push(bookmark)
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bookmarks</h1>
          <p className="text-muted-foreground">
            Your saved prompts organized in folders ({bookmarks?.length || 0} total)
          </p>
        </div>

        {bookmarks && bookmarks.length > 0 ? (
          <div className="space-y-8">
            {/* Default folder */}
            {bookmarksByFolder.default.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BookmarkIcon className="h-5 w-5" />
                  Favorites ({bookmarksByFolder.default.length})
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bookmarksByFolder.default.map((bookmark: any) => (
                    <Link
                      key={bookmark.id}
                      href={`/prompts/${bookmark.prompt_id}`}
                    >
                      <Card className="h-full hover:border-primary/50 transition-all hover:shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-lg line-clamp-2">
                            {bookmark.prompts?.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {bookmark.prompts?.body}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>by {bookmark.prompts?.profiles?.name}</span>
                            <span>•</span>
                            <span>❤️ {bookmark.prompts?.likes_count || 0}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Custom folders */}
            {folders?.map((folder: any) => {
              const folderBookmarks = bookmarksByFolder[folder.name] || []
              if (folderBookmarks.length === 0) return null

              return (
                <div key={folder.id}>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: folder.color }}
                    />
                    {folder.name} ({folderBookmarks.length})
                  </h2>
                  {folder.description && (
                    <p className="text-sm text-muted-foreground mb-4">
                      {folder.description}
                    </p>
                  )}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {folderBookmarks.map((bookmark: any) => (
                      <Link
                        key={bookmark.id}
                        href={`/prompts/${bookmark.prompt_id}`}
                      >
                        <Card className="h-full hover:border-primary/50 transition-all hover:shadow-lg">
                          <CardHeader>
                            <CardTitle className="text-lg line-clamp-2">
                              {bookmark.prompts?.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                              {bookmark.prompts?.body}
                            </p>
                            {bookmark.notes && (
                              <p className="text-xs text-muted-foreground italic mb-2">
                                Note: {bookmark.notes}
                              </p>
                            )}
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>by {bookmark.prompts?.profiles?.name}</span>
                              <span>•</span>
                              <span>❤️ {bookmark.prompts?.likes_count || 0}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <BookmarkIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-20 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No bookmarks yet</h3>
              <p className="text-muted-foreground mb-4">
                Start bookmarking prompts to organize your favorites
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
