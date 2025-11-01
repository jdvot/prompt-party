'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge, StatusBadge, CountBadge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Stack, VStack, HStack } from '@/components/layout/stack'
import { Grid } from '@/components/layout/grid'
import { EmptyState } from '@/components/ui/empty-state'
import { LoadingSkeleton, LoadingSpinner } from '@/components/ui/loading-skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Heart, Share2, Plus, Sparkles } from 'lucide-react'

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-mesh border-b">
        <div className="container-wide py-16 md:py-24">
          <VStack spacing="lg" align="center" className="text-center">
            <Badge variant="glow">v1.0.0</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gradient-brand">
              Prompt Party Design System
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance">
              A comprehensive, production-ready design system built for scalability,
              accessibility, and premium aesthetics.
            </p>
            <HStack spacing="md" className="flex-wrap justify-center">
              <Button variant="gradient" size="lg">
                <Sparkles className="h-5 w-5" />
                Explore Components
              </Button>
              <Button variant="outline" size="lg">
                View Documentation
              </Button>
            </HStack>
          </VStack>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-wide py-12">
        <Tabs defaultValue="components" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
          </TabsList>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-12">
            {/* Buttons Section */}
            <Section
              title="Buttons"
              description="Versatile button component with multiple variants and sizes"
            >
              <VStack spacing="lg">
                <ComponentPreview title="Variants">
                  <HStack spacing="md" wrap className="flex-wrap">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="gradient">Gradient</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="soft">Soft</Button>
                  </HStack>
                </ComponentPreview>

                <ComponentPreview title="Sizes">
                  <HStack spacing="md" align="center" className="flex-wrap">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                    <Button size="xl">Extra Large</Button>
                  </HStack>
                </ComponentPreview>

                <ComponentPreview title="With Icons">
                  <HStack spacing="md" wrap className="flex-wrap">
                    <Button>
                      <Plus className="h-4 w-4" />
                      Create New
                    </Button>
                    <Button variant="outline">
                      <Heart className="h-4 w-4" />
                      Like
                    </Button>
                    <Button variant="ghost">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                    <Button loading>Processing...</Button>
                  </HStack>
                </ComponentPreview>
              </VStack>
            </Section>

            {/* Cards Section */}
            <Section
              title="Cards"
              description="Flexible card component with multiple variants"
            >
              <Grid cols={3} gap="lg">
                <Card variant="default">
                  <CardHeader>
                    <CardTitle>Default Card</CardTitle>
                    <CardDescription>
                      Standard card with border and subtle background
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    Perfect for content containers and information display.
                  </CardContent>
                </Card>

                <Card variant="bento">
                  <CardHeader>
                    <CardTitle>Bento Card</CardTitle>
                    <CardDescription>
                      Modern trendy card with gradient border on hover
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    Ideal for feature showcases and premium content.
                  </CardContent>
                </Card>

                <Card variant="glass">
                  <CardHeader>
                    <CardTitle>Glass Card</CardTitle>
                    <CardDescription>
                      Glassmorphism effect with backdrop blur
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    Great for overlays and modern UI aesthetics.
                  </CardContent>
                </Card>
              </Grid>
            </Section>

            {/* Badges Section */}
            <Section
              title="Badges"
              description="Flexible badge component with status support"
            >
              <VStack spacing="lg">
                <ComponentPreview title="Variants">
                  <HStack spacing="md" wrap className="flex-wrap">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="soft">Soft</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="gradient">Gradient</Badge>
                    <Badge variant="glow">Glow</Badge>
                  </HStack>
                </ComponentPreview>

                <ComponentPreview title="Status Badges">
                  <HStack spacing="md" wrap className="flex-wrap">
                    <StatusBadge status="active" />
                    <StatusBadge status="pending" />
                    <StatusBadge status="success" />
                    <StatusBadge status="error" />
                    <StatusBadge status="warning" />
                    <StatusBadge status="inactive" />
                  </HStack>
                </ComponentPreview>

                <ComponentPreview title="Count Badges">
                  <HStack spacing="md" align="center" className="flex-wrap">
                    <CountBadge count={5} />
                    <CountBadge count={42} />
                    <CountBadge count={150} max={99} />
                  </HStack>
                </ComponentPreview>

                <ComponentPreview title="With Icons & Removable">
                  <HStack spacing="md" wrap className="flex-wrap">
                    <Badge dot>Live</Badge>
                    <Badge dot dotColor="#10b981">Online</Badge>
                    <Badge removable onRemove={() => console.log('removed')}>
                      Tag
                    </Badge>
                  </HStack>
                </ComponentPreview>
              </VStack>
            </Section>

            {/* Inputs Section */}
            <Section
              title="Inputs"
              description="Enhanced input with validation and icons"
            >
              <VStack spacing="lg" className="max-w-2xl">
                <ComponentPreview title="Basic Input">
                  <Input placeholder="Enter text..." />
                </ComponentPreview>

                <ComponentPreview title="With Icons">
                  <Input
                    startIcon={<Search className="h-4 w-4" />}
                    placeholder="Search..."
                  />
                </ComponentPreview>

                <ComponentPreview title="Validation States">
                  <VStack spacing="md">
                    <Input
                      placeholder="Email"
                      errorText="Invalid email format"
                      defaultValue="invalid-email"
                    />
                    <Input
                      placeholder="Username"
                      successText="Username is available!"
                      defaultValue="johndoe"
                    />
                    <Input
                      placeholder="Warning"
                      warningText="This field will be deprecated soon"
                    />
                  </VStack>
                </ComponentPreview>

                <ComponentPreview title="With Character Limit">
                  <Input
                    placeholder="Bio (max 100 characters)"
                    maxCharacters={100}
                    showCharacterCount
                  />
                </ComponentPreview>

                <ComponentPreview title="Clearable">
                  <Input
                    placeholder="Clearable input"
                    clearable
                    defaultValue="Clear me"
                  />
                </ComponentPreview>
              </VStack>
            </Section>

            {/* Loading States Section */}
            <Section
              title="Loading States"
              description="Multiple loading patterns for different use cases"
            >
              <VStack spacing="lg">
                <ComponentPreview title="Loading Spinners">
                  <HStack spacing="lg" align="center" className="flex-wrap">
                    <LoadingSpinner size="xs" />
                    <LoadingSpinner size="sm" />
                    <LoadingSpinner size="md" />
                    <LoadingSpinner size="lg" />
                    <LoadingSpinner size="xl" />
                  </HStack>
                </ComponentPreview>

                <ComponentPreview title="Skeleton Variants">
                  <Grid cols={2} gap="lg">
                    <LoadingSkeleton variant="card" />
                    <LoadingSkeleton variant="profile" />
                  </Grid>
                </ComponentPreview>
              </VStack>
            </Section>

            {/* Empty States Section */}
            <Section
              title="Empty States"
              description="Consistent empty state patterns"
            >
              <Grid cols={2} gap="lg">
                <Card>
                  <CardContent>
                    <EmptyState
                      variant="no-results"
                      size="sm"
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <EmptyState
                      variant="empty-inbox"
                      size="sm"
                      action={{
                        label: 'Create New',
                        onClick: () => console.log('create'),
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Section>
          </TabsContent>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-12">
            <Section
              title="Brand Colors"
              description="Premium purple/pink/blue gradient palette"
            >
              <Grid cols={3} gap="md">
                <ColorSwatch name="Primary" color="hsl(var(--brand-primary))" />
                <ColorSwatch name="Secondary" color="hsl(var(--brand-secondary))" />
                <ColorSwatch name="Accent" color="hsl(var(--brand-accent))" />
              </Grid>
            </Section>

            <Section
              title="Semantic Colors"
              description="Status and feedback colors"
            >
              <Grid cols={4} gap="md">
                <ColorSwatch name="Success" color="hsl(var(--color-success))" />
                <ColorSwatch name="Error" color="hsl(var(--color-error))" />
                <ColorSwatch name="Warning" color="hsl(var(--color-warning))" />
                <ColorSwatch name="Info" color="hsl(var(--color-info))" />
              </Grid>
            </Section>

            <Section
              title="Gradients"
              description="Pre-defined gradient combinations"
            >
              <Grid cols={3} gap="md">
                <div className="h-32 rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent" />
                <div className="h-32 rounded-xl bg-gradient-to-r from-brand-secondary to-brand-secondary-light" />
                <div className="h-32 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600" />
              </Grid>
            </Section>
          </TabsContent>

          {/* Typography Tab */}
          <TabsContent value="typography" className="space-y-12">
            <Section
              title="Headings"
              description="Hierarchy from H1 to H6"
            >
              <VStack spacing="md">
                <h1 className="text-4xl font-bold">Heading 1</h1>
                <h2 className="text-3xl font-semibold">Heading 2</h2>
                <h3 className="text-2xl font-semibold">Heading 3</h3>
                <h4 className="text-xl font-semibold">Heading 4</h4>
                <h5 className="text-lg font-semibold">Heading 5</h5>
                <h6 className="text-base font-semibold">Heading 6</h6>
              </VStack>
            </Section>

            <Section
              title="Body Text"
              description="Different text sizes and styles"
            >
              <VStack spacing="md">
                <p className="text-lg">Large body text for emphasis and introductions.</p>
                <p className="text-base">Standard body text for most content.</p>
                <p className="text-sm">Small text for captions and metadata.</p>
                <p className="text-xs">Extra small text for fine print.</p>
              </VStack>
            </Section>

            <Section
              title="Text Styles"
              description="Utility classes for common patterns"
            >
              <VStack spacing="md">
                <p className="text-gradient-brand text-2xl font-bold">
                  Gradient Text
                </p>
                <p className="text-muted-foreground">
                  Muted foreground text
                </p>
                <p className="font-mono text-sm">
                  Monospace font for code
                </p>
              </VStack>
            </Section>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Helper Components
function Section({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section>
      <VStack spacing="md" className="mb-6">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-muted-foreground text-lg">{description}</p>
      </VStack>
      {children}
    </section>
  )
}

function ComponentPreview({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-3">
        {title}
      </h3>
      <Card variant="outlined" padding="lg">
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  )
}

function ColorSwatch({ name, color }: { name: string; color: string }) {
  return (
    <div className="space-y-2">
      <div
        className="h-24 rounded-lg"
        style={{ backgroundColor: color }}
      />
      <div className="text-sm font-medium">{name}</div>
      <div className="text-xs text-muted-foreground font-mono">{color}</div>
    </div>
  )
}
