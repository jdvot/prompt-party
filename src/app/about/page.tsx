import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Prompt Party',
  description: 'Learn more about Prompt Party - the social network for AI prompts',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Prompt Party</h1>

        <div className="space-y-6 text-lg">
          <p>
            Prompt Party is a social network for AI prompts where creators can share,
            discover, and remix prompts for various AI models.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            We believe that great prompts should be shared, celebrated, and built upon.
            Prompt Party provides a platform for the AI community to collaborate and
            improve their prompting skills together.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Share and discover AI prompts</li>
            <li>Like and comment on prompts</li>
            <li>Remix and build upon existing prompts</li>
            <li>Organize prompts in collections</li>
            <li>Follow trending prompts</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
