'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FloatingElementProps {
  children: ReactNode
  className?: string
  duration?: number
  delay?: number
  intensity?: number
}

export function FloatingElement({
  children,
  className,
  duration = 3,
  delay = 0,
  intensity = 10
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-intensity, intensity, -intensity],
        rotate: [-2, 2, -2]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  )
}
