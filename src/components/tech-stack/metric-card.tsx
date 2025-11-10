'use client'

import { LucideIcon } from 'lucide-react'
import { CountUp } from '@/components/animations/count-up'
import { Card, CardContent } from '@/components/ui/card'

interface MetricCardProps {
  icon: LucideIcon
  value: number
  suffix?: string
  prefix?: string
  label: string
  description?: string
  gradient: string
  lightGradient: string
}

export function MetricCard({
  icon: Icon,
  value,
  suffix = '',
  prefix = '',
  label,
  description,
  gradient,
  lightGradient,
}: MetricCardProps) {
  return (
    <Card className="overflow-hidden border-0 bg-white dark:bg-slate-950 hover:shadow-lg transition-all duration-300">
      <div className={`h-1 bg-gradient-to-r ${gradient}`} />
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${lightGradient}`}>
            <Icon className={`w-6 h-6`} />
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
              <CountUp to={value} prefix={prefix} suffix={suffix} duration={2.5} />
            </span>
          </div>
          <h3 className="font-semibold text-foreground text-sm sm:text-base">{label}</h3>
        </div>

        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}
