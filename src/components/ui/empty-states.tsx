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
  return (
    <EmptyState
      icon={<FileText className="w-16 h-16" />}
      title="No prompts yet"
      description="Start sharing your amazing AI prompts with the community"
      action={{
        label: 'Create your first prompt',
        href: '/prompts/new',
      }}
    />
  )
}

export function NoSearchResults() {
  return (
    <EmptyState
      icon={<Search className="w-16 h-16" />}
      title="No results found"
      description="Try adjusting your search terms or filters"
    />
  )
}

export function NoLikes() {
  return (
    <EmptyState
      icon={<Heart className="w-16 h-16" />}
      title="No likes yet"
      description="Prompts you like will appear here"
      action={{
        label: 'Explore prompts',
        href: '/',
      }}
    />
  )
}

export function NoComments() {
  return (
    <EmptyState
      icon={<MessageCircle className="w-16 h-16" />}
      title="No comments yet"
      description="Be the first to share your thoughts on this prompt"
    />
  )
}

export function NoFollowers() {
  return (
    <EmptyState
      icon={<Users className="w-16 h-16" />}
      title="No followers yet"
      description="Share great prompts to attract followers"
      action={{
        label: 'Create a prompt',
        href: '/prompts/new',
      }}
    />
  )
}

export function NoCollections() {
  return (
    <EmptyState
      icon={<FolderOpen className="w-16 h-16" />}
      title="No collections yet"
      description="Organize your favorite prompts into collections"
      action={{
        label: 'Create collection',
        href: '/collections/new',
      }}
    />
  )
}

export function NoNotifications() {
  return (
    <EmptyState
      icon={<Bell className="w-16 h-16" />}
      title="No notifications"
      description="When you get notifications, they'll appear here"
    />
  )
}

export function NoBookmarks() {
  return (
    <EmptyState
      icon={<Bookmark className="w-16 h-16" />}
      title="No bookmarks yet"
      description="Save prompts you want to revisit later"
      action={{
        label: 'Explore prompts',
        href: '/',
      }}
    />
  )
}

export function NoActivity() {
  return (
    <EmptyState
      icon={<TrendingUp className="w-16 h-16" />}
      title="No activity yet"
      description="Your activity will be shown here once you start interacting"
    />
  )
}

export function NoData() {
  return (
    <EmptyState
      icon={<Sparkles className="w-16 h-16" />}
      title="No data available"
      description="Data will appear here once it becomes available"
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
