'use client'

import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { SparklesIcon, FlameIcon, TrendingUpIcon } from 'lucide-react'

interface FeedFiltersProps {
  activeFilter: 'new' | 'top' | 'trending'
  onFilterChange: (filter: 'new' | 'top' | 'trending') => void
}

export function FeedFilters({ activeFilter, onFilterChange }: FeedFiltersProps) {
  const t = useTranslations('common')

  const filters = [
    {
      id: 'new' as const,
      label: t('new'),
      icon: SparklesIcon,
      color: 'from-indigo-500 to-violet-600',
      activeColor: 'from-indigo-600 to-violet-700',
      bgColor: 'from-indigo-500/10 to-violet-500/10',
    },
    {
      id: 'top' as const,
      label: t('top'),
      icon: FlameIcon,
      color: 'from-orange-500 to-red-600',
      activeColor: 'from-orange-600 to-red-700',
      bgColor: 'from-orange-500/10 to-red-500/10',
    },
    {
      id: 'trending' as const,
      label: t('trending'),
      icon: TrendingUpIcon,
      color: 'from-cyan-500 to-blue-600',
      activeColor: 'from-cyan-600 to-blue-700',
      bgColor: 'from-cyan-500/10 to-blue-500/10',
    },
  ]

  return (
    <div className="relative">
      {/* Glass background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40 dark:from-gray-800/60 dark:via-gray-800/40 dark:to-gray-800/20 backdrop-blur-xl rounded-2xl border border-border/40 dark:border-border/20 shadow-lg" />

      <div className="relative p-2 flex gap-2">
        {filters.map((filter) => {
          const Icon = filter.icon
          const isActive = activeFilter === filter.id

          return (
            <motion.button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={cn(
                'relative flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 overflow-hidden group',
                isActive
                  ? 'text-white shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              whileHover={{ scale: isActive ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Active background gradient */}
              {isActive && (
                <motion.div
                  className={cn('absolute inset-0 bg-gradient-to-br', filter.activeColor)}
                  layoutId="activeFilter"
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 35,
                  }}
                />
              )}

              {/* Hover background */}
              {!isActive && (
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                  filter.bgColor
                )} />
              )}

              {/* Glow effect on active */}
              {isActive && (
                <motion.div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-br blur-xl opacity-50',
                    filter.color
                  )}
                  animate={{
                    opacity: [0.5, 0.7, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}

              {/* Content */}
              <span className="relative flex items-center gap-2.5 leading-none">
                <Icon className={cn(
                  'w-5 h-5 leading-none transition-transform duration-300',
                  isActive ? 'scale-110' : 'group-hover:scale-110'
                )} />
                <span className="leading-none font-semibold text-sm md:text-base">
                  {filter.label}
                </span>
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 25,
                  }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
