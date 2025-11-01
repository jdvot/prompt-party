'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import {
  FileText,
  Search,
  Heart,
  MessageCircle,
  Users,
  FolderOpen,
  Bell,
  Bookmark,
  TrendingUp,
  Sparkles,
  Plus,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-12 text-center">
        <div className="mb-4 text-muted-foreground opacity-50">
          {icon || <FileText className="w-16 h-16" />}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
        {action && (
          <>
            {action.href ? (
              <Link href={action.href}>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  {action.label}
                </Button>
              </Link>
            ) : (
              <Button onClick={action.onClick}>
                <Plus className="w-4 h-4 mr-2" />
                {action.label}
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export function NoPromptsFound() {
  const t = useTranslations('emptyStates')
  return (
    <EmptyState
      icon={<FileText className="w-16 h-16" />}
      title={t('noPrompts.title')}
      description={t('noPrompts.description')}
      action={{
        label: t('noPrompts.action'),
        href: '/prompts/new',
      }}
    />
  )
}

export function NoSearchResults() {
  const t = useTranslations('emptyStates')
  return (
    <EmptyState
      icon={<Search className="w-16 h-16" />}
      title={t('noResults.title')}
      description={t('noResults.description')}
    />
  )
}

export function NoLikes() {
  const t = useTranslations('emptyStates')
  return (
    <EmptyState
      icon={<Heart className="w-16 h-16" />}
      title={t('noLikes.title')}
      description={t('noLikes.description')}
      action={{
        label: t('noLikes.action'),
        href: '/',
      }}
    />
  )
}

export function NoComments() {
  const t = useTranslations('emptyStates')
  return (
    <EmptyState
      icon={<MessageCircle className="w-16 h-16" />}
      title={t('noComments.title')}
      description={t('noComments.description')}
    />
  )
}

export function NoFollowers() {
  const t = useTranslations('emptyStates')
  return (
    <EmptyState
      icon={<Users className="w-16 h-16" />}
      title={t('noFollowers.title')}
      description={t('noFollowers.description')}
      action={{
        label: t('noFollowers.action'),
        href: '/prompts/new',
      }}
    />
  )
}

export function NoCollections() {
  const t = useTranslations('emptyStates')
  return (
    <EmptyState
      icon={<FolderOpen className="w-16 h-16" />}
      title={t('noCollections.title')}
      description={t('noCollections.description')}
      action={{
        label: t('noCollections.action'),
        href: '/collections/new',
      }}
    />
  )
}

export function NoNotifications() {
  const t = useTranslations('emptyStates')
  return (
    <EmptyState
      icon={<Bell className="w-16 h-16" />}
      title={t('noNotifications.title')}
      description={t('noNotifications.description')}
    />
  )
}

export function NoBookmarks() {
  const t = useTranslations('emptyStates')
  return (
    <EmptyState
      icon={<Bookmark className="w-16 h-16" />}
      title={t('noBookmarks.title')}
      description={t('noBookmarks.description')}
      action={{
        label: t('noBookmarks.action'),
        href: '/',
      }}
    />
  )
}

export function NoActivity() {
  const t = useTranslations('emptyStates')
  return (
    <EmptyState
      icon={<TrendingUp className="w-16 h-16" />}
      title={t('noActivity.title')}
      description={t('noActivity.description')}
    />
  )
}

export function NoData() {
  const t = useTranslations('emptyStates')
  return (
    <EmptyState
      icon={<Sparkles className="w-16 h-16" />}
      title={t('noData.title')}
      description={t('noData.description')}
    />
  )
}

// Compact versions for smaller spaces
export function CompactEmptyState({ title, icon }: { title: string; icon?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-3 text-muted-foreground opacity-50">
        {icon || <FileText className="w-12 h-12" />}
      </div>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  )
}
