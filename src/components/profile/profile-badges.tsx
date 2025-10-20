import { Badge } from '@/components/ui/badge'
import { TrophyIcon, SparklesIcon, FlameIcon, StarIcon, ZapIcon } from 'lucide-react'

interface ProfileBadgesProps {
  totalPrompts: number
  totalLikes: number
  totalViews: number
  accountAge: number // in days
}

interface BadgeConfig {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  earned: boolean
}

export function ProfileBadges({
  totalPrompts,
  totalLikes,
  totalViews,
  accountAge,
}: ProfileBadgesProps) {
  const badges: BadgeConfig[] = [
    {
      id: 'creator',
      name: 'Creator',
      description: 'Created 10+ prompts',
      icon: SparklesIcon,
      color: 'text-blue-500',
      earned: totalPrompts >= 10,
    },
    {
      id: 'popular',
      name: 'Popular',
      description: 'Received 100+ likes',
      icon: FlameIcon,
      color: 'text-orange-500',
      earned: totalLikes >= 100,
    },
    {
      id: 'influencer',
      name: 'Influencer',
      description: '1,000+ total views',
      icon: StarIcon,
      color: 'text-yellow-500',
      earned: totalViews >= 1000,
    },
    {
      id: 'veteran',
      name: 'Veteran',
      description: 'Member for 30+ days',
      icon: TrophyIcon,
      color: 'text-purple-500',
      earned: accountAge >= 30,
    },
    {
      id: 'prolific',
      name: 'Prolific',
      description: 'Created 50+ prompts',
      icon: ZapIcon,
      color: 'text-green-500',
      earned: totalPrompts >= 50,
    },
  ]

  const earnedBadges = badges.filter((b) => b.earned)

  if (earnedBadges.length === 0) {
    return null
  }

  return (
    <div className="bg-card border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Badges</h3>
      <div className="flex flex-wrap gap-3">
        {earnedBadges.map((badge) => {
          const Icon = badge.icon
          return (
            <div
              key={badge.id}
              className="group relative"
              title={badge.description}
            >
              <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-full border border-border hover:border-primary/50 transition-colors cursor-help">
                <Icon className={`w-4 h-4 ${badge.color}`} />
                <span className="text-sm font-medium">{badge.name}</span>
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-popover border rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                <p className="text-xs">{badge.description}</p>
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                  <div className="border-4 border-transparent border-t-border" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
