'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LucideIcon } from 'lucide-react'

interface TechStackCardProps {
  title: string
  description: string
  version: string
  features: string[]
  icon: LucideIcon
  gradient: string
  lightGradient: string
}

export function TechStackCard({
  title,
  description,
  version,
  features,
  icon: Icon,
  gradient,
  lightGradient,
}: TechStackCardProps) {
  return (
    <Card className="h-full overflow-hidden border-0 bg-white dark:bg-slate-950 hover:shadow-lg transition-all duration-300">
      <div className={`h-1 bg-gradient-to-r ${gradient}`} />

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${lightGradient}`}>
            <Icon className="w-6 h-6" />
          </div>
          <Badge variant="outline" className={`bg-gradient-to-r ${lightGradient} border-transparent`}>
            v{version}
          </Badge>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base font-medium text-foreground/70">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
