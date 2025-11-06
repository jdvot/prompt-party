'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ScaleOnHoverProps {
  children: ReactNode
  className?: string
  scale?: number
  duration?: number
}

export function ScaleOnHover({
  children,
  className,
  scale = 1.05,
  duration = 0.3
}: ScaleOnHoverProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}
