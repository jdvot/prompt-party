'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { BookmarkIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

interface BookmarkButtonProps {
  promptId: string
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'default' | 'sm' | 'lg'
}

export function BookmarkButton({ promptId, variant = 'ghost', size = 'sm' }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [folders, setFolders] = useState<any[]>([])
  const [currentFolder, setCurrentFolder] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const checkBookmarkStatus = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await (supabase
      .from('bookmarks') as any)
      .select('folder')
      .eq('user_id', user.id)
      .eq('prompt_id', promptId)
      .single()

    setIsBookmarked(!!data)
    setCurrentFolder(data?.folder || null)
  }, [supabase, promptId])

  const loadFolders = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('bookmark_folders')
      .select('*')
      .eq('user_id', user.id)
      .order('name')

    setFolders(data || [])
  }, [supabase])

  useEffect(() => {
    checkBookmarkStatus()
    loadFolders()
  }, [promptId, checkBookmarkStatus, loadFolders])

  const handleBookmark = async (folderName: string) => {
    setLoading(true)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      window.location.href = '/auth/login'
      return
    }

    try {
      if (isBookmarked && currentFolder === folderName) {
        // Remove bookmark
        await supabase
          .from('bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('prompt_id', promptId)

        setIsBookmarked(false)
        setCurrentFolder(null)
      } else if (isBookmarked) {
        // Update folder
        await (supabase
          .from('bookmarks') as any)
          .update({ folder: folderName })
          .eq('user_id', user.id)
          .eq('prompt_id', promptId)

        setCurrentFolder(folderName)
      } else {
        // Add bookmark
        await (supabase.from('bookmarks') as any).insert({
          user_id: user.id,
          prompt_id: promptId,
          folder: folderName,
        })

        setIsBookmarked(true)
        setCurrentFolder(folderName)
      }
    } catch (error) {
      console.error('Bookmark error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant as any} size={size === 'default' ? 'md' : size} disabled={loading}>
          <span className="inline-flex items-center">
            <BookmarkIcon
              className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`}
            />
            {size !== 'sm' && (
              <span className="ml-2">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            )}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="px-2 py-1.5 text-sm font-semibold">
          {isBookmarked ? 'Move to folder' : 'Save to folder'}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleBookmark('default')}>
          <div className="flex items-center justify-between w-full">
            <span>Favorites</span>
            {currentFolder === 'default' && <span>✓</span>}
          </div>
        </DropdownMenuItem>
        {folders.map((folder) => (
          <DropdownMenuItem
            key={folder.id}
            onClick={() => handleBookmark(folder.name)}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: folder.color }}
                />
                <span>{folder.name}</span>
              </div>
              {currentFolder === folder.name && <span>✓</span>}
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => (window.location.href = '/bookmarks')}>
          <span className="text-primary">Manage folders...</span>
        </DropdownMenuItem>
        {isBookmarked && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleBookmark(currentFolder || 'default')}
              className="text-destructive"
            >
              Remove bookmark
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
