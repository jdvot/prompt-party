import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import {
  SparklesIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  InfoIcon,
  TrendingUpIcon,
  ZapIcon,
  HeartIcon,
  StarIcon,
  RocketIcon,
  BrainIcon,
} from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Badge Icon Alignment Test',
  description: 'Testing badge icon alignment across all sizes and variants',
}

export default function BadgeTestPage() {
  return (
    <div className="min-h-screen bg-background">
      <Section spacing="xl">
        <Container size="lg">
          <div className="space-y-16">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">Badge Icon Alignment Test</h1>
              <p className="text-lg text-muted-foreground">
                Testing all badge sizes and variants with icons to ensure perfect vertical alignment
              </p>
            </div>

            {/* Size Tests - Small */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Small Badges (size=&quot;sm&quot;)</h2>
              <div className="flex flex-wrap gap-4">
                <Badge
                  size="sm"
                  variant="soft"
                  startIcon={<SparklesIcon className="w-3 h-3" />}
                >
                  With Start Icon
                </Badge>
                <Badge
                  size="sm"
                  variant="soft"
                  endIcon={<CheckCircle2Icon className="w-3 h-3" />}
                >
                  With End Icon
                </Badge>
                <Badge
                  size="sm"
                  variant="soft"
                  startIcon={<SparklesIcon className="w-3 h-3" />}
                  endIcon={<CheckCircle2Icon className="w-3 h-3" />}
                >
                  Both Icons
                </Badge>
                <Badge size="sm" variant="soft" dot>
                  With Dot
                </Badge>
                <Badge
                  size="sm"
                  variant="gradient"
                  startIcon={<RocketIcon className="w-3 h-3" />}
                >
                  Gradient
                </Badge>
              </div>
            </div>

            {/* Size Tests - Medium */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Medium Badges (size=&quot;md&quot;)</h2>
              <div className="flex flex-wrap gap-4">
                <Badge
                  size="md"
                  variant="soft"
                  startIcon={<SparklesIcon className="w-3.5 h-3.5" />}
                >
                  Maîtrisez l&apos;ingénierie de prompts IA
                </Badge>
                <Badge
                  size="md"
                  variant="softSuccess"
                  endIcon={<CheckCircle2Icon className="w-3.5 h-3.5" />}
                >
                  Success with Icon
                </Badge>
                <Badge
                  size="md"
                  variant="softWarning"
                  startIcon={<AlertCircleIcon className="w-3.5 h-3.5" />}
                  endIcon={<InfoIcon className="w-3.5 h-3.5" />}
                >
                  Warning Both
                </Badge>
                <Badge size="md" variant="soft" dot dotColor="#6366F1">
                  Indigo Dot
                </Badge>
                <Badge
                  size="md"
                  variant="gradient"
                  startIcon={<TrendingUpIcon className="w-3.5 h-3.5" />}
                >
                  Trending
                </Badge>
              </div>
            </div>

            {/* Size Tests - Large */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Large Badges (size=&quot;lg&quot;)</h2>
              <div className="flex flex-wrap gap-4">
                <Badge
                  size="lg"
                  variant="soft"
                  startIcon={<SparklesIcon className="w-4 h-4" />}
                >
                  Large Badge with Icon
                </Badge>
                <Badge
                  size="lg"
                  variant="softSuccess"
                  endIcon={<CheckCircle2Icon className="w-4 h-4" />}
                >
                  Completed
                </Badge>
                <Badge
                  size="lg"
                  variant="softInfo"
                  startIcon={<InfoIcon className="w-4 h-4" />}
                  endIcon={<ZapIcon className="w-4 h-4" />}
                >
                  Information
                </Badge>
                <Badge size="lg" variant="soft" dot>
                  Active
                </Badge>
                <Badge
                  size="lg"
                  variant="glow"
                  startIcon={<BrainIcon className="w-4 h-4" />}
                >
                  AI Powered
                </Badge>
              </div>
            </div>

            {/* Variant Tests */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">All Variants (Medium Size)</h2>
              <div className="flex flex-wrap gap-4">
                <Badge
                  variant="default"
                  startIcon={<SparklesIcon className="w-3.5 h-3.5" />}
                >
                  Default
                </Badge>
                <Badge
                  variant="secondary"
                  startIcon={<SparklesIcon className="w-3.5 h-3.5" />}
                >
                  Secondary
                </Badge>
                <Badge
                  variant="destructive"
                  startIcon={<SparklesIcon className="w-3.5 h-3.5" />}
                >
                  Destructive
                </Badge>
                <Badge
                  variant="success"
                  startIcon={<CheckCircle2Icon className="w-3.5 h-3.5" />}
                >
                  Success
                </Badge>
                <Badge
                  variant="warning"
                  startIcon={<AlertCircleIcon className="w-3.5 h-3.5" />}
                >
                  Warning
                </Badge>
                <Badge
                  variant="info"
                  startIcon={<InfoIcon className="w-3.5 h-3.5" />}
                >
                  Info
                </Badge>
                <Badge
                  variant="soft"
                  startIcon={<SparklesIcon className="w-3.5 h-3.5" />}
                >
                  Soft
                </Badge>
                <Badge
                  variant="softSecondary"
                  startIcon={<SparklesIcon className="w-3.5 h-3.5" />}
                >
                  Soft Secondary
                </Badge>
                <Badge
                  variant="outline"
                  startIcon={<SparklesIcon className="w-3.5 h-3.5" />}
                >
                  Outline
                </Badge>
                <Badge
                  variant="gradient"
                  startIcon={<SparklesIcon className="w-3.5 h-3.5" />}
                >
                  Gradient
                </Badge>
                <Badge
                  variant="glow"
                  startIcon={<SparklesIcon className="w-3.5 h-3.5" />}
                >
                  Glow
                </Badge>
              </div>
            </div>

            {/* Shape Tests */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Shape Variants</h2>
              <div className="flex flex-wrap gap-4">
                <Badge
                  shape="default"
                  variant="soft"
                  startIcon={<SparklesIcon className="w-3.5 h-3.5" />}
                >
                  Default Shape
                </Badge>
                <Badge
                  shape="pill"
                  variant="soft"
                  startIcon={<HeartIcon className="w-3.5 h-3.5" />}
                >
                  Pill Shape
                </Badge>
                <Badge
                  shape="square"
                  variant="soft"
                  startIcon={<StarIcon className="w-3.5 h-3.5" />}
                >
                  Square Shape
                </Badge>
              </div>
            </div>

            {/* Removable Badges */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Removable Badges</h2>
              <div className="flex flex-wrap gap-4">
                <Badge
                  variant="soft"
                  startIcon={<SparklesIcon className="w-3.5 h-3.5" />}
                  removable
                  onRemove={() => console.log('Remove clicked')}
                >
                  Removable Badge
                </Badge>
                <Badge
                  variant="softSuccess"
                  size="sm"
                  startIcon={<CheckCircle2Icon className="w-3 h-3" />}
                  removable
                  onRemove={() => console.log('Remove clicked')}
                >
                  Small Removable
                </Badge>
                <Badge
                  variant="softWarning"
                  size="lg"
                  startIcon={<AlertCircleIcon className="w-4 h-4" />}
                  removable
                  onRemove={() => console.log('Remove clicked')}
                >
                  Large Removable
                </Badge>
              </div>
            </div>

            {/* Dark Mode Test */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Dark Mode Test</h2>
              <p className="text-muted-foreground">
                Toggle dark mode to test icon alignment in both themes
              </p>
              <div className="p-8 rounded-lg bg-background border-2">
                <div className="flex flex-wrap gap-4">
                  <Badge
                    variant="soft"
                    startIcon={<SparklesIcon className="w-3.5 h-3.5" />}
                  >
                    Light/Dark Test
                  </Badge>
                  <Badge
                    variant="gradient"
                    startIcon={<RocketIcon className="w-3.5 h-3.5" />}
                  >
                    Gradient Test
                  </Badge>
                  <Badge
                    variant="glow"
                    startIcon={<BrainIcon className="w-3.5 h-3.5" />}
                  >
                    Glow Test
                  </Badge>
                </div>
              </div>
              <div className="p-8 rounded-lg bg-muted border-2">
                <div className="flex flex-wrap gap-4">
                  <Badge
                    variant="soft"
                    startIcon={<SparklesIcon className="w-3.5 h-3.5" />}
                  >
                    On Muted Background
                  </Badge>
                  <Badge
                    variant="gradient"
                    startIcon={<RocketIcon className="w-3.5 h-3.5" />}
                  >
                    Gradient on Muted
                  </Badge>
                </div>
              </div>
            </div>

            {/* Real-world Examples */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Real-World Use Cases</h2>
              <div className="space-y-4">
                <div className="p-6 rounded-lg border-2">
                  <h3 className="text-lg font-semibold mb-3">Tutorial Header</h3>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="soft"
                      startIcon={<SparklesIcon className="w-3.5 h-3.5" />}
                    >
                      Maîtrisez l&apos;ingénierie de prompts IA
                    </Badge>
                    <Badge
                      variant="softSuccess"
                      size="sm"
                      startIcon={<CheckCircle2Icon className="w-3 h-3" />}
                    >
                      Beginner
                    </Badge>
                  </div>
                </div>

                <div className="p-6 rounded-lg border-2">
                  <h3 className="text-lg font-semibold mb-3">Status Indicators</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="softSuccess"
                      size="sm"
                      dot
                      dotColor="#22C55E"
                    >
                      Active
                    </Badge>
                    <Badge
                      variant="softWarning"
                      size="sm"
                      dot
                      dotColor="#F59E0B"
                    >
                      Pending
                    </Badge>
                    <Badge
                      variant="soft"
                      size="sm"
                      dot
                      dotColor="#94A3B8"
                    >
                      Inactive
                    </Badge>
                  </div>
                </div>

                <div className="p-6 rounded-lg border-2">
                  <h3 className="text-lg font-semibold mb-3">Feature Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="gradient"
                      startIcon={<ZapIcon className="w-3.5 h-3.5" />}
                    >
                      Premium
                    </Badge>
                    <Badge
                      variant="soft"
                      startIcon={<TrendingUpIcon className="w-3.5 h-3.5" />}
                    >
                      Trending
                    </Badge>
                    <Badge
                      variant="glow"
                      startIcon={<SparklesIcon className="w-3.5 h-3.5" />}
                    >
                      New
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
