'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { IconContainer } from '@/components/ui/icon-container'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

interface TutorialCardProps {
  tutorial: {
    id: string
    title: string
    description: string
    duration: string
    level: string
    iconName: string
    topics: string[]
    link: string
    color?: string
  }
  buttonLabel?: string
}

export function TutorialCard({ tutorial, buttonLabel = "Start Tutorial" }: TutorialCardProps) {
  const Icon = Icons[tutorial.iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration mismatch by only enabling animations after mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const levelColors = {
    Beginner: 'bg-green-500/10 text-green-500 border-green-500/20',
    Intermediate: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    Advanced: 'bg-red-500/10 text-red-500 border-red-500/20',
  }

  const gradientColor = tutorial.color || 'from-violet-500 to-purple-500'

  return (
    <motion.div
      initial={isMounted ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <Card className="h-full group relative overflow-hidden border-2 hover:border-violet-500/50 hover:shadow-2xl transition-all duration-300">
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

        <CardHeader className="relative">
          <div className="flex items-center justify-between mb-3">
            <IconContainer
              size="md"
              variant="gradient"
              gradientFrom={gradientColor.split(' ')[0]}
              gradientTo={gradientColor.split(' ')[1]}
              className="group-hover:scale-110 transition-transform duration-300"
            >
              <Icon className="w-7 h-7 text-white" />
            </IconContainer>
            <Badge
              variant="outline"
              className={levelColors[tutorial.level as keyof typeof levelColors]}
            >
              {tutorial.level}
            </Badge>
          </div>
          <CardTitle className="text-xl mb-2">{tutorial.title}</CardTitle>
          <CardDescription className="text-base">{tutorial.description}</CardDescription>
        </CardHeader>
        <CardContent className="relative space-y-4">
          {/* Topics */}
          <div className="flex flex-wrap gap-2">
            {tutorial.topics.map((topic) => (
              <Badge key={topic} variant="secondary" className="text-xs">
                {topic}
              </Badge>
            ))}
          </div>

          {/* Duration Badge */}
          <Badge variant="outline" startIcon={<Icons.Clock className="w-4 h-4" />}>
            {tutorial.duration}
          </Badge>

          {/* Action Button */}
          <Link href={tutorial.link} className={cn(buttonVariants({ variant: "outline" }), "w-full group/btn")}>
            {buttonLabel}
            <Icons.ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}
