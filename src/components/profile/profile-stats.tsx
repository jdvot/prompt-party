import { createClient } from '@/lib/supabase/server'
import { FileTextIcon, HeartIcon, EyeIcon, CopyIcon } from 'lucide-react'

interface ProfileStatsProps {
  userId: string
}

export async function ProfileStats({ userId }: ProfileStatsProps) {
  const supabase = await createClient()

  // Get total prompts
  const { count: totalPrompts } = await supabase
    .from('prompts')
    .select('*', { count: 'exact', head: true })
    .eq('author', userId)

  // Get total likes received
  const { data: prompts } = await supabase
    .from('prompts')
    .select('likes_count')
    .eq('author', userId)

  const totalLikes = prompts?.reduce((sum, p) => sum + (p.likes_count || 0), 0) || 0

  // Get total views
  const { data: viewsData } = await supabase
    .from('prompts')
    .select('views_count')
    .eq('author', userId)

  const totalViews = viewsData?.reduce((sum, p) => sum + (p.views_count || 0), 0) || 0

  // Get total remixes (forks)
  const { count: totalRemixes } = await supabase
    .from('forks')
    .select('*', { count: 'exact', head: true })
    .eq('original_prompt_id', userId)

  const stats = [
    {
      label: 'Prompts',
      value: totalPrompts || 0,
      icon: FileTextIcon,
      color: 'text-blue-500',
    },
    {
      label: 'Likes',
      value: totalLikes,
      icon: HeartIcon,
      color: 'text-red-500',
    },
    {
      label: 'Views',
      value: totalViews,
      icon: EyeIcon,
      color: 'text-green-500',
    },
    {
      label: 'Remixes',
      value: totalRemixes || 0,
      icon: CopyIcon,
      color: 'text-purple-500',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="bg-card border rounded-lg p-4 text-center hover:border-primary/50 transition-colors"
          >
            <div className="flex justify-center mb-2">
              <Icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold mb-1">
              {stat.value.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        )
      })}
    </div>
  )
}
