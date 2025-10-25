'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Search,
  FileText,
  TrendingUp,
  Clock,
  Users,
  FolderOpen,
  Settings,
  LogOut,
  Home,
  Sparkles,
  BarChart3,
  Key,
  Bell,
  User,
  Plus,
  Palette,
} from 'lucide-react'

export function CommandPalette() {
  const router = useRouter()
  const supabase = createClient()
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([])
      return
    }

    const searchTimeout = setTimeout(async () => {
      const { data: prompts } = await supabase
        .from('prompts')
        .select('id, title, body')
        .or(`title.ilike.%${searchQuery}%,body.ilike.%${searchQuery}%`)
        .eq('is_public', true)
        .limit(5)

      setSearchResults(prompts || [])
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [searchQuery, supabase])

  const navigate = (path: string) => {
    router.push(path)
    setOpen(false)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    navigate('/auth/login')
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Type a command or search..."
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {searchResults.length > 0 && (
          <>
            <CommandGroup heading="Search Results">
              {searchResults.map((prompt) => (
                <CommandItem
                  key={prompt.id}
                  onSelect={() => navigate(`/prompts/${prompt.id}`)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <div className="flex-1">
                    <div className="font-medium">{prompt.title}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {prompt.body.substring(0, 60)}...
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => navigate('/prompts/new')}>
            <Plus className="mr-2 h-4 w-4" />
            <span>Create new prompt</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/search')}>
            <Search className="mr-2 h-4 w-4" />
            <span>Advanced search</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => navigate('/')}>
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/trending')}>
            <TrendingUp className="mr-2 h-4 w-4" />
            <span>Trending</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/following')}>
            <Users className="mr-2 h-4 w-4" />
            <span>Following</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/collections')}>
            <FolderOpen className="mr-2 h-4 w-4" />
            <span>Collections</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/bookmarks')}>
            <Clock className="mr-2 h-4 w-4" />
            <span>Bookmarks</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Pro Features">
          <CommandItem onSelect={() => navigate('/analytics')}>
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Analytics</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/api-access')}>
            <Key className="mr-2 h-4 w-4" />
            <span>API Access</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/design-system-new')}>
            <Palette className="mr-2 h-4 w-4" />
            <span>Design System</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Account">
          <CommandItem onSelect={() => navigate('/profile')}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/notifications')}>
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
          <CommandItem onSelect={signOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
