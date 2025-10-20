import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'New Collection | Prompt Party',
}

export default async function NewCollectionPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  async function createCollection(formData: FormData) {
    'use server'

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect('/auth/login')
    }

    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const is_public = formData.get('is_public') === 'true'

    if (!name) {
      return
    }

    const { data: collection, error } = await supabase
      .from('collections')
      .insert({
        name,
        description: description || null,
        is_public,
        user_id: user.id,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating collection:', error)
      return
    }

    redirect(`/collections/${collection.id}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Collection</h1>

        <form action={createCollection} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Collection Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="My Favorite Prompts"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description (optional)
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="A curated collection of prompts for..."
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_public"
              name="is_public"
              value="true"
              defaultChecked={true}
              className="w-4 h-4"
            />
            <label htmlFor="is_public" className="text-sm">
              Make this collection public
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Create Collection
            </button>
            <Link
              href="/collections"
              className="px-6 py-2 border rounded-md hover:bg-accent transition-colors inline-flex items-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
