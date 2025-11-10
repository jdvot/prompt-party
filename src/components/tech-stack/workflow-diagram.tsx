'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { LucideIcon, ArrowRight } from 'lucide-react'

interface WorkflowStep {
  number: number
  title: string
  description: string
  icon: LucideIcon
  metric?: string
  gradient: string
}

interface WorkflowDiagramProps {
  steps: WorkflowStep[]
}

export function WorkflowDiagram({ steps }: WorkflowDiagramProps) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-6 lg:gap-3">
        {steps.map((step, idx) => {
          const Icon = step.icon
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="relative"
            >
              {/* Arrow */}
              {idx < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ delay: idx * 0.15 + 0.3, duration: 0.6 }}
                  className="absolute top-20 -right-3 lg:-right-4 w-6 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 origin-left"
                />
              )}

              <div className={`p-6 rounded-lg border-2 border-gradient-to-r ${step.gradient} bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950`}>
                {/* Step number */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                    {step.number}
                  </div>
                  {step.metric && (
                    <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                      {step.metric}
                    </span>
                  )}
                </div>

                {/* Icon */}
                <div className="mb-4 w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-foreground" />
                </div>

                {/* Title and description */}
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-4">
        {steps.map((step, idx) => {
          const Icon = step.icon
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="flex gap-4"
            >
              {/* Step number circle */}
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                  {step.number}
                </div>
                {idx < steps.length - 1 && (
                  <div className="w-1 h-12 bg-gradient-to-b from-indigo-500 to-purple-500 mx-auto mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="pb-4 flex-1">
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5 text-foreground" />
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                  {step.metric && (
                    <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded inline-block">
                      {step.metric}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
