'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Container, Section, Grid } from '@/components/layout'

/**
 * Design System Demo Page
 *
 * This page showcases all the new components and utilities
 * from the Premium Design System 2025.
 *
 * Access at: /design-demo
 */
export default function DesignDemoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Section spacing="xl" variant="gradient">
        <Container>
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-brand-primary/20 text-sm font-semibold animate-scale-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
              </span>
              <span className="text-gradient-primary">Design System 2025</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-gradient-primary animate-gradient">
                Premium UI Components
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore the complete design system with modern components, animations, and utilities.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button variant="gradient" size="lg">
                Get Started
              </Button>
              <Button variant="outline" size="lg">
                Documentation
              </Button>
              <Button variant="soft" size="lg">
                Components
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Buttons Section */}
      <Section spacing="lg">
        <Container>
          <h2 className="text-3xl font-bold mb-8">Buttons</h2>

          <div className="space-y-6">
            {/* Variants */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="gradient">Gradient</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="soft">Soft</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="success">Success</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
                <Button size="icon">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Loading States */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Loading States</h3>
              <div className="flex flex-wrap gap-4">
                <Button loading>Loading</Button>
                <Button variant="secondary" loading>Processing</Button>
                <Button variant="gradient" loading>Saving</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Cards Section */}
      <Section spacing="lg" variant="muted">
        <Container>
          <h2 className="text-3xl font-bold mb-8">Cards</h2>

          <Grid cols={3} gap="lg">
            {/* Default Card */}
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Standard card with basic styling</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This is the default card variant with standard styling and spacing.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Learn More</Button>
              </CardFooter>
            </Card>

            {/* Interactive Card */}
            <Card variant="interactive">
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Hover to see the lift effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This card lifts up on hover with smooth animations.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="secondary">Explore</Button>
              </CardFooter>
            </Card>

            {/* Bento Card */}
            <Card variant="bento">
              <CardHeader>
                <CardTitle>Bento Card</CardTitle>
                <CardDescription>Trendy 2025 style</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Modern bento-style card with gradient border on hover.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="gradient">Try It</Button>
              </CardFooter>
            </Card>

            {/* Feature Card */}
            <Card variant="feature">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <CardTitle>Feature Card</CardTitle>
                <CardDescription>Perfect for feature sections</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Designed for showcasing product features with icons.
                </p>
              </CardContent>
            </Card>

            {/* Glass Card */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Glass Card</CardTitle>
                <CardDescription>Glassmorphism effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Frosted glass effect with backdrop blur.
                </p>
              </CardContent>
            </Card>

            {/* Elevated Card */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>Strong shadow elevation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Card with prominent shadow for emphasis.
                </p>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Utilities Section */}
      <Section spacing="lg">
        <Container>
          <h2 className="text-3xl font-bold mb-8">Utility Classes</h2>

          <div className="space-y-8">
            {/* Badges */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Badges</h3>
              <div className="flex flex-wrap gap-3">
                <span className="badge-primary">Primary Badge</span>
                <span className="badge-success">Success Badge</span>
                <span className="badge-glow">Glow Badge</span>
              </div>
            </div>

            {/* Text Gradients */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Text Gradients</h3>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-gradient-primary">
                  Primary Gradient Text
                </p>
                <p className="text-4xl font-bold text-gradient-vibrant">
                  Vibrant Gradient Text
                </p>
              </div>
            </div>

            {/* Elevation */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Elevation Shadows</h3>
              <Grid cols={5} gap="md">
                <div className="elevation-1 bg-card p-6 rounded-lg text-center">
                  <p className="text-sm font-semibold">Level 1</p>
                </div>
                <div className="elevation-2 bg-card p-6 rounded-lg text-center">
                  <p className="text-sm font-semibold">Level 2</p>
                </div>
                <div className="elevation-3 bg-card p-6 rounded-lg text-center">
                  <p className="text-sm font-semibold">Level 3</p>
                </div>
                <div className="elevation-4 bg-card p-6 rounded-lg text-center">
                  <p className="text-sm font-semibold">Level 4</p>
                </div>
                <div className="elevation-5 bg-card p-6 rounded-lg text-center">
                  <p className="text-sm font-semibold">Level 5</p>
                </div>
              </Grid>
            </div>

            {/* Skeleton Loaders */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Loading Skeletons</h3>
              <div className="space-y-4 max-w-md">
                <div className="h-8 w-3/4 skeleton-shimmer rounded-lg" />
                <div className="h-4 w-full skeleton-shimmer rounded" />
                <div className="h-4 w-5/6 skeleton-shimmer rounded" />
              </div>
            </div>

            {/* Animations */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Animations</h3>
              <div className="flex flex-wrap gap-4">
                <div className="animate-fade-in-up p-4 bg-brand-primary/10 rounded-lg">
                  <p className="font-semibold">Fade In Up</p>
                </div>
                <div className="animate-scale-in p-4 bg-brand-secondary/10 rounded-lg">
                  <p className="font-semibold">Scale In</p>
                </div>
                <div className="animate-pulse-glow p-4 bg-brand-accent/10 rounded-lg">
                  <p className="font-semibold">Pulse Glow</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Layout Components */}
      <Section spacing="lg" variant="gradient">
        <Container>
          <h2 className="text-3xl font-bold mb-8 text-center">Layout Components</h2>

          <div className="space-y-12">
            {/* Container Examples */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Containers</h3>
              <div className="space-y-4">
                <Container size="sm" className="bg-brand-primary/5 border border-brand-primary/20 rounded-lg p-4">
                  <p className="text-sm text-center">Small Container (768px)</p>
                </Container>
                <Container size="md" className="bg-brand-secondary/5 border border-brand-secondary/20 rounded-lg p-4">
                  <p className="text-sm text-center">Medium Container (1024px)</p>
                </Container>
                <Container size="lg" className="bg-brand-accent/5 border border-brand-accent/20 rounded-lg p-4">
                  <p className="text-sm text-center">Large Container (1280px)</p>
                </Container>
              </div>
            </div>

            {/* Grid Examples */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Grid Layouts</h3>

              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-3">2 Columns</p>
                  <Grid cols={2} gap="md">
                    <div className="bg-card p-6 rounded-lg border text-center">Item 1</div>
                    <div className="bg-card p-6 rounded-lg border text-center">Item 2</div>
                  </Grid>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-3">3 Columns</p>
                  <Grid cols={3} gap="md">
                    <div className="bg-card p-6 rounded-lg border text-center">Item 1</div>
                    <div className="bg-card p-6 rounded-lg border text-center">Item 2</div>
                    <div className="bg-card p-6 rounded-lg border text-center">Item 3</div>
                  </Grid>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-3">4 Columns</p>
                  <Grid cols={4} gap="sm">
                    <div className="bg-card p-4 rounded-lg border text-center">1</div>
                    <div className="bg-card p-4 rounded-lg border text-center">2</div>
                    <div className="bg-card p-4 rounded-lg border text-center">3</div>
                    <div className="bg-card p-4 rounded-lg border text-center">4</div>
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Footer CTA */}
      <Section spacing="xl" variant="gradient">
        <Container>
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient-primary">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use these premium components to create beautiful, accessible user interfaces.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="gradient" size="xl">
                View Documentation
              </Button>
              <Button variant="outline" size="xl">
                Browse Components
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
