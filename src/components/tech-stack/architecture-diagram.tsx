'use client'

import { ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface ArchitectureLayerProps {
  title: string
  items: {
    name: string
    description: string
  }[]
  color: string
  lightColor: string
}

function ArchitectureLayer({ title, items, color, lightColor }: ArchitectureLayerProps) {
  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold ${color}`}>{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className={`p-3 rounded-lg border ${lightColor} bg-gradient-to-br from-white/50 to-white/25 dark:from-slate-900/50 dark:to-slate-900/25 backdrop-blur hover:shadow-md transition-shadow`}
          >
            <p className="font-medium text-sm text-foreground">{item.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function ArchitectureDiagram() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true })

  const frontendItems = [
    { name: 'Next.js 15', description: 'React 19 with App Router' },
    { name: 'TypeScript', description: 'Type-safe code' },
    { name: 'Tailwind CSS', description: 'Utility-first styling' },
  ]

  const backendItems = [
    { name: 'Supabase DB', description: 'PostgreSQL database' },
    { name: 'Auth & RLS', description: 'Secure authentication' },
    { name: 'Realtime', description: 'Live updates' },
  ]

  const deploymentItems = [
    { name: 'Vercel', description: 'Edge functions & CDN' },
    { name: 'CI/CD', description: 'Automated deployments' },
    { name: 'Monitoring', description: 'Performance tracking' },
  ]

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Connection lines */}
      <div className="relative hidden md:block h-4">
        <div className="absolute inset-0 flex items-center">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 origin-left"
          />
        </div>
      </div>

      {/* Frontend Layer */}
      <ArchitectureLayer
        title="Frontend Layer"
        items={frontendItems}
        color="text-blue-600 dark:text-blue-400"
        lightColor="border-blue-200 dark:border-blue-900/50"
      />

      {/* Connection line 2 */}
      <div className="relative hidden md:block h-4">
        <div className="absolute inset-0 flex items-center">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left"
          />
        </div>
      </div>

      {/* Backend Layer */}
      <ArchitectureLayer
        title="Backend Layer"
        items={backendItems}
        color="text-purple-600 dark:text-purple-400"
        lightColor="border-purple-200 dark:border-purple-900/50"
      />

      {/* Connection line 3 */}
      <div className="relative hidden md:block h-4">
        <div className="absolute inset-0 flex items-center">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-emerald-500 origin-left"
          />
        </div>
      </div>

      {/* Deployment Layer */}
      <ArchitectureLayer
        title="Deployment Layer"
        items={deploymentItems}
        color="text-emerald-600 dark:text-emerald-400"
        lightColor="border-emerald-200 dark:border-emerald-900/50"
      />
    </motion.div>
  )
}
