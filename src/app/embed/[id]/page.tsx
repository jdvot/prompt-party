import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { MarkdownPreview } from '@/components/editor/markdown-preview'
import { HeartIcon, EyeIcon } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ theme?: 'light' | 'dark' }>
}

export default async function EmbedPage({ params, searchParams }: PageProps) {
  const { id } = await params
  const { theme } = await searchParams
  const supabase = await createClient()

  const { data: prompt, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !prompt || !prompt.is_public) {
    notFound()
  }

  const { data: author } = await supabase
    .from('profiles')
    .select('name, avatar_url')
    .eq('user_id', prompt.author)
    .single()

  const themeClass = theme === 'dark' ? 'dark' : ''

  return (
    <html lang="en" className={themeClass}>
      <head>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            line-height: 1.5;
          }
          .light {
            --bg: #ffffff;
            --fg: #0f172a;
            --border: #e2e8f0;
            --muted: #64748b;
            --link: #3b82f6;
          }
          .dark {
            --bg: #0f172a;
            --fg: #f1f5f9;
            --border: #334155;
            --muted: #94a3b8;
            --link: #60a5fa;
          }
          body {
            background: var(--bg);
            color: var(--fg);
          }
          .container {
            padding: 1.5rem;
            max-width: 100%;
          }
          .header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--border);
          }
          .avatar {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 9999px;
            background: var(--link);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
          }
          .title {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 0.25rem;
          }
          .author {
            font-size: 0.875rem;
            color: var(--muted);
          }
          .content {
            margin-bottom: 1rem;
            font-size: 0.9375rem;
          }
          .footer {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding-top: 1rem;
            border-top: 1px solid var(--border);
            font-size: 0.875rem;
            color: var(--muted);
          }
          .stat {
            display: flex;
            align-items: center;
            gap: 0.375rem;
          }
          .link {
            color: var(--link);
            text-decoration: none;
            font-weight: 500;
          }
          .link:hover {
            text-decoration: underline;
          }
          .prose {
            color: var(--fg);
          }
          .prose h1, .prose h2, .prose h3 {
            margin-top: 1em;
            margin-bottom: 0.5em;
            font-weight: 600;
          }
          .prose p {
            margin-bottom: 1em;
          }
          .prose code {
            background: var(--border);
            padding: 0.125rem 0.375rem;
            border-radius: 0.25rem;
            font-size: 0.875em;
          }
          .prose pre {
            background: var(--border);
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin-bottom: 1em;
          }
        `}</style>
      </head>
      <body className={theme === 'dark' ? 'dark' : 'light'}>
        <div className="container">
          <div className="header">
            <div className="avatar">
              {author?.avatar_url ? (
                <img
                  src={author.avatar_url}
                  alt={author.name || 'User'}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '9999px',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                (author?.name || 'A').charAt(0).toUpperCase()
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div className="title">{prompt.title}</div>
              <div className="author">by {author?.name || 'Anonymous'}</div>
            </div>
          </div>

          <div className="content prose">
            <MarkdownPreview content={prompt.body.substring(0, 500) + (prompt.body.length > 500 ? '...' : '')} />
          </div>

          <div className="footer">
            <div className="stat">
              <HeartIcon style={{ width: '1rem', height: '1rem' }} />
              <span>{prompt.likes_count || 0}</span>
            </div>
            <div className="stat">
              <EyeIcon style={{ width: '1rem', height: '1rem' }} />
              <span>{prompt.views_count || 0}</span>
            </div>
            <div style={{ flex: 1 }} />
            <a
              href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://promptparty.app'}/prompts/${prompt.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              View on Prompt Party →
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
