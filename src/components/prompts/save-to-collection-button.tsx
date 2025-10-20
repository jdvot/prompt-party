'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface SaveToCollectionButtonProps {
  promptId: string
  userId?: string
}

interface Collection {
  id: string
  name: string
  description: string | null
}

export function SaveToCollectionButton({ promptId, userId }: SaveToCollectionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    if (isOpen && userId) {
      loadCollections()
    }
  }, [isOpen, userId])

  const loadCollections = async () => {
    if (!userId) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('collections')
        .select('id, name, description')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (!error && data) {
        setCollections(data)
      }
    } catch (error) {
      console.error('Error loading collections:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClick = () => {
    if (!userId) {
      router.push('/auth/login')
      return
    }
    setIsOpen(true)
  }

  const addToCollection = async (collectionId: string) => {
    setSaving(true)
    try {
      const { error } = await supabase
        .from('collection_items')
        .insert({
          collection_id: collectionId,
          prompt_id: promptId,
        })

      if (error) {
        if (error.code === '23505') {
          alert('This prompt is already in this collection')
        } else {
          throw error
        }
      } else {
        alert('Prompt added to collection!')
        setIsOpen(false)
      }
    } catch (error) {
      console.error('Error adding to collection:', error)
      alert('Failed to add prompt to collection')
    } finally {
      setSaving(false)
    }
  }

  const createNewCollection = () => {
    setIsOpen(false)
    router.push('/collections/new')
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-accent transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
        <span>Save</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-background border rounded-lg max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">Save to Collection</h2>

            {loading ? (
              <div className="text-center py-8">Loading collections...</div>
            ) : collections.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  You don&apos;t have any collections yet.
                </p>
                <button
                  onClick={createNewCollection}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Create a Collection
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-2 max-h-96 overflow-y-auto mb-4">
                  {collections.map((collection) => (
                    <button
                      key={collection.id}
                      onClick={() => addToCollection(collection.id)}
                      disabled={saving}
                      className="w-full text-left p-3 border rounded-md hover:bg-accent transition-colors disabled:opacity-50"
                    >
                      <div className="font-medium">{collection.name}</div>
                      {collection.description && (
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {collection.description}
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <button
                  onClick={createNewCollection}
                  className="w-full px-4 py-2 border border-dashed rounded-md hover:bg-accent transition-colors"
                >
                  + Create New Collection
                </button>
              </>
            )}

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border rounded-md hover:bg-accent"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
