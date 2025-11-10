'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface CountUpProps {
  from?: number
  to: number
  duration?: number
  decimals?: number
  suffix?: string
  prefix?: string
  format?: (value: number) => string
}

export function CountUp({
  from = 0,
  to,
  duration = 2,
  decimals = 0,
  suffix = '',
  prefix = '',
  format,
}: CountUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState(from)

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = (timestamp - startTime) / (duration * 1000)

      if (progress < 1) {
        const current = from + (to - from) * progress
        setDisplayValue(current)
        animationFrame = requestAnimationFrame(animate)
      } else {
        setDisplayValue(to)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, from, to, duration])

  const formattedValue = format
    ? format(Math.round(displayValue * Math.pow(10, decimals)) / Math.pow(10, decimals))
    : `${prefix}${Math.round(displayValue * Math.pow(10, decimals)) / Math.pow(10, decimals)}${suffix}`

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {formattedValue}
    </motion.span>
  )
}
