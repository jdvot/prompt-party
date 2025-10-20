'use client'

import { useState, useRef, useEffect } from 'react'
import type { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface UserMenuProps {
  user: User
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const userEmail = user.email || ''
  const initials = userEmail.slice(0, 2).toUpperCase()

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium hover:bg-primary/90 transition-colors"
      >
        {initials}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-background border rounded-md shadow-lg py-1 z-50">
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-medium">{user.email}</p>
          </div>

          <Link
            href="/profile/me"
            className="block px-4 py-2 text-sm hover:bg-accent transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Your Profile
          </Link>

          <Link
            href="/collections"
            className="block px-4 py-2 text-sm hover:bg-accent transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Collections
          </Link>

          <Link
            href="/profile/settings"
            className="block px-4 py-2 text-sm hover:bg-accent transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Settings
          </Link>

          <div className="border-t mt-1 pt-1">
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
