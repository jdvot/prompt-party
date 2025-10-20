import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { PromptCard } from '@/components/feed/prompt-card'
import Link from 'next/link'

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // Fetch user's prompts
  const { data: prompts } = await supabase
    .from('prompts')
    .select('*')
    .eq('author', user.id)
    .order('created_at', { ascending: false })

  // Attach profile to each prompt
  if (prompts) {
    prompts.forEach((p: any) => {
      p.profiles = profile
    })
  }

  const publicPromptsCount = prompts?.filter((p) => p.is_public).length || 0
  const privatePromptsCount = prompts?.filter((p) => !p.is_public).length || 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="mb-8 pb-8 border-b">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold">
              {(profile?.name || user.email || 'U').charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{profile?.name || 'Anonymous'}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="flex gap-6 text-sm">
            <div>
              <span className="font-semibold">{prompts?.length || 0}</span>{' '}
              <span className="text-muted-foreground">prompts</span>
            </div>
            <div>
              <span className="font-semibold">{publicPromptsCount}</span>{' '}
              <span className="text-muted-foreground">public</span>
            </div>
            <div>
              <span className="font-semibold">{privatePromptsCount}</span>{' '}
              <span className="text-muted-foreground">private</span>
            </div>
          </div>
        </div>

        {/* User's Prompts */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Prompts</h2>

          {prompts && prompts.length > 0 ? (
            <div className="space-y-4">
              {prompts.map((prompt) => (
                <div key={prompt.id} className="relative">
                  <PromptCard
                    id={prompt.id}
                    title={prompt.title}
                    body={prompt.body}
                    tags={prompt.tags}
                    author={{
                      name: prompt.profiles?.name || null,
                      avatar_url: prompt.profiles?.avatar_url || null,
                    }}
                    likes_count={prompt.likes_count}
                    created_at={prompt.created_at}
                  />
                  {!prompt.is_public && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-amber-500/10 text-amber-600 text-xs rounded-md">
                        Private
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <p className="text-muted-foreground mb-4">
                You haven&apos;t created any prompts yet
              </p>
              <Link
                href="/prompts/new"
                className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Create Your First Prompt
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
