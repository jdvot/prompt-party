import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Documentation | Prompt Party',
  description: 'Learn how to use Prompt Party',
}

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Documentation</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <p className="mb-4">
              Welcome to Prompt Party! Here&apos;s how to get started:
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <Link href="/auth/signup" className="text-primary hover:underline">
                  Sign up
                </Link> for a free account
              </li>
              <li>Browse the feed to discover prompts</li>
              <li>
                <Link href="/prompts/new" className="text-primary hover:underline">
                  Create
                </Link> your first prompt
              </li>
              <li>Like, comment, and remix prompts you find interesting</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Creating Prompts</h2>
            <p className="mb-4">
              Prompts support Markdown formatting. You can add:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Headers with # ## ###</li>
              <li>Bold text with **bold**</li>
              <li>Italic text with *italic*</li>
              <li>Code blocks with ```</li>
              <li>Links and images</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Collections</h2>
            <p className="mb-4">
              Organize your favorite prompts into collections. Collections can be:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Public - visible to everyone</li>
              <li>Private - only visible to you</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Remixing</h2>
            <p>
              Found a prompt you like? Click &quot;Remix&quot; to create your own version based on it.
              Your remix will credit the original creator.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
