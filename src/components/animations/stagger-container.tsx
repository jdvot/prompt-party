'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useRef, ReactNode, Children, useState, useEffect } from 'react'

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  duration?: number
  once?: boolean
}

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  duration = 0.5,
  once = true
}: StaggerContainerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-50px' })
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration mismatch by only enabling animations after mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const customContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay
      }
    }
  }

  const customItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={isMounted ? 'hidden' : false}
      animate={isInView ? 'visible' : 'hidden'}
      variants={customContainer}
      className={className}
    >
      {Children.map(children, (child, index) => (
        <motion.div key={index} variants={customItem}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
