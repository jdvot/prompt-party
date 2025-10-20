'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

interface SettingsFormProps {
  user: User
  profile: {
    name: string | null
    avatar_url: string | null
  } | null
}

export function SettingsForm({ user, profile }: SettingsFormProps) {
  const router = useRouter()
  const [name, setName] = useState(profile?.name || '')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ name })
        .eq('user_id', user.id)

      if (error) throw error

      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      router.refresh()
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Settings */}
      <div className="bg-card border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded-md ${
              message.type === 'success'
                ? 'bg-green-500/10 text-green-600'
                : 'bg-destructive/10 text-destructive'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-2 border rounded-md bg-muted text-muted-foreground cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Email cannot be changed
            </p>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Display Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      {/* Account Actions */}
      <div className="bg-card border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Account</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Signed in as <strong>{user.email}</strong>
            </p>
          </div>

          <form action="/auth/logout" method="POST">
            <button
              type="submit"
              className="px-4 py-2 border border-destructive text-destructive rounded-md hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
