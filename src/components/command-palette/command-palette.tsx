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
import { useTranslations } from 'next-intl'

export function CommandPalette() {
  const t = useTranslations('commandPalette')
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
        placeholder={t('placeholder')}
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandList>
        <CommandEmpty>{t('noResults')}</CommandEmpty>

        {searchResults.length > 0 && (
          <>
            <CommandGroup heading={t('searchResults')}>
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

        <CommandGroup heading={t('quickActions')}>
          <CommandItem onSelect={() => navigate('/prompts/new')}>
            <Plus className="mr-2 h-4 w-4" />
            <span>{t('actions.createPrompt')}</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/search')}>
            <Search className="mr-2 h-4 w-4" />
            <span>{t('actions.advancedSearch')}</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={t('navigation')}>
          <CommandItem onSelect={() => navigate('/')}>
            <Home className="mr-2 h-4 w-4" />
            <span>{t('nav.home')}</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/trending')}>
            <TrendingUp className="mr-2 h-4 w-4" />
            <span>{t('nav.trending')}</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/following')}>
            <Users className="mr-2 h-4 w-4" />
            <span>{t('nav.following')}</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/collections')}>
            <FolderOpen className="mr-2 h-4 w-4" />
            <span>{t('nav.collections')}</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/bookmarks')}>
            <Clock className="mr-2 h-4 w-4" />
            <span>{t('nav.bookmarks')}</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={t('proFeatures')}>
          <CommandItem onSelect={() => navigate('/analytics')}>
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>{t('pro.analytics')}</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/api-access')}>
            <Key className="mr-2 h-4 w-4" />
            <span>{t('pro.apiAccess')}</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/design-system-new')}>
            <Palette className="mr-2 h-4 w-4" />
            <span>{t('pro.designSystem')}</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={t('account')}>
          <CommandItem onSelect={() => navigate('/profile')}>
            <User className="mr-2 h-4 w-4" />
            <span>{t('accountMenu.profile')}</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/notifications')}>
            <Bell className="mr-2 h-4 w-4" />
            <span>{t('accountMenu.notifications')}</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            <span>{t('accountMenu.settings')}</span>
          </CommandItem>
          <CommandItem onSelect={signOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t('accountMenu.signOut')}</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
