import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design System | Prompt Party',
  description: 'Prompt Party design system showcase and documentation',
}

export default function DesignSystemPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4">Design System</h1>
        <p className="text-xl text-muted-foreground">
          Visual design language and component library for Prompt Party
        </p>
      </div>

      {/* Colors Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Colors</h2>

        {/* Brand Colors */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Brand Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <ColorSwatch
              name="Primary"
              className="bg-primary text-primary-foreground"
            />
            <ColorSwatch
              name="Secondary"
              className="bg-secondary text-secondary-foreground"
            />
            <ColorSwatch
              name="Accent"
              className="bg-accent text-accent-foreground"
            />
          </div>
        </div>

        {/* Semantic Colors */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Semantic Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch
              name="Destructive"
              className="bg-destructive text-destructive-foreground"
            />
            <ColorSwatch
              name="Success"
              className="bg-success text-success-foreground"
            />
            <ColorSwatch
              name="Warning"
              className="bg-warning text-warning-foreground"
            />
            <ColorSwatch
              name="Info"
              className="bg-info text-info-foreground"
            />
          </div>
        </div>

        {/* Neutral Colors */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Neutral Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <ColorSwatch
              name="Background"
              className="bg-background text-foreground border"
            />
            <ColorSwatch
              name="Muted"
              className="bg-muted text-muted-foreground"
            />
            <ColorSwatch
              name="Card"
              className="bg-card text-card-foreground border"
            />
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Typography</h2>

        <div className="space-y-4 bg-card border rounded-lg p-6">
          <div>
            <span className="text-xs text-muted-foreground">text-5xl</span>
            <p className="text-5xl font-bold">The quick brown fox</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">text-4xl</span>
            <p className="text-4xl font-bold">The quick brown fox</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">text-3xl</span>
            <p className="text-3xl font-semibold">The quick brown fox</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">text-2xl</span>
            <p className="text-2xl font-semibold">The quick brown fox</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">text-xl</span>
            <p className="text-xl font-semibold">The quick brown fox</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">text-lg</span>
            <p className="text-lg">The quick brown fox jumps over the lazy dog</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">text-base</span>
            <p className="text-base">The quick brown fox jumps over the lazy dog</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">text-sm</span>
            <p className="text-sm">The quick brown fox jumps over the lazy dog</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">text-xs</span>
            <p className="text-xs">The quick brown fox jumps over the lazy dog</p>
          </div>
        </div>
      </section>

      {/* Spacing Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Spacing</h2>
        <div className="bg-card border rounded-lg p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 6, 8, 12, 16].map((size) => (
              <div key={size} className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground w-16">
                  {size * 4}px
                </span>
                <div
                  className="bg-primary h-8"
                  style={{ width: `${size * 4}px` }}
                />
                <span className="text-xs text-muted-foreground">
                  p-{size}, m-{size}, gap-{size}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Border Radius Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Border Radius</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="bg-primary h-24 rounded-sm mb-2" />
            <span className="text-sm">rounded-sm</span>
          </div>
          <div className="text-center">
            <div className="bg-primary h-24 rounded-md mb-2" />
            <span className="text-sm">rounded-md</span>
          </div>
          <div className="text-center">
            <div className="bg-primary h-24 rounded-lg mb-2" />
            <span className="text-sm">rounded-lg</span>
          </div>
          <div className="text-center">
            <div className="bg-primary h-24 rounded-xl mb-2" />
            <span className="text-sm">rounded-xl</span>
          </div>
          <div className="text-center">
            <div className="bg-primary h-24 w-24 mx-auto rounded-full mb-2" />
            <span className="text-sm">rounded-full</span>
          </div>
        </div>
      </section>

      {/* Shadows Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Shadows</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {['sm', 'md', 'lg', 'xl', '2xl'].map((shadow) => (
            <div key={shadow} className="text-center">
              <div
                className={`bg-card border rounded-lg p-6 h-24 flex items-center justify-center shadow-${shadow}`}
              >
                shadow-{shadow}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Buttons Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Buttons</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Variants</h3>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
                Primary
              </button>
              <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-medium hover:bg-secondary/90 transition-colors">
                Secondary
              </button>
              <button className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md font-medium hover:bg-destructive/90 transition-colors">
                Destructive
              </button>
              <button className="bg-success text-success-foreground px-4 py-2 rounded-md font-medium hover:bg-success/90 transition-colors">
                Success
              </button>
              <button className="border border-input bg-background px-4 py-2 rounded-md font-medium hover:bg-muted transition-colors">
                Outline
              </button>
              <button className="text-foreground px-4 py-2 rounded-md font-medium hover:bg-muted transition-colors">
                Ghost
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <button className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                Small
              </button>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
                Medium
              </button>
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md text-lg font-medium hover:bg-primary/90 transition-colors">
                Large
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Forms</h2>
        <div className="bg-card border rounded-lg p-6 max-w-md space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">
              Text Input
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
              placeholder="Enter text..."
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Textarea</label>
            <textarea
              className="w-full px-3 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
              rows={3}
              placeholder="Enter description..."
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Select</label>
            <select className="w-full px-3 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="checkbox"
              className="w-4 h-4 rounded border-input"
            />
            <label htmlFor="checkbox" className="text-sm">
              Checkbox
            </label>
          </div>
        </div>
      </section>

      {/* Alerts Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Alerts</h2>
        <div className="space-y-4 max-w-2xl">
          <div className="bg-success text-success-foreground p-4 rounded-md border border-success/20">
            <strong className="font-semibold">Success!</strong>
            <p className="mt-1">Your prompt has been published successfully.</p>
          </div>

          <div className="bg-destructive text-destructive-foreground p-4 rounded-md border border-destructive/20">
            <strong className="font-semibold">Error!</strong>
            <p className="mt-1">Something went wrong. Please try again.</p>
          </div>

          <div className="bg-warning text-warning-foreground p-4 rounded-md border border-warning/20">
            <strong className="font-semibold">Warning!</strong>
            <p className="mt-1">This action cannot be undone.</p>
          </div>

          <div className="bg-info text-info-foreground p-4 rounded-md border border-info/20">
            <strong className="font-semibold">Info</strong>
            <p className="mt-1">Your session will expire in 5 minutes.</p>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Cards</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Basic Card</h3>
            <p className="text-muted-foreground mb-4">
              This is a basic card component with shadow and hover effect.
            </p>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
              Action
            </button>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">Prompt Title</h3>
                <p className="text-sm text-muted-foreground">by username</p>
              </div>
              <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">
                Featured
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              Example of a prompt card with tags and metadata.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-md">
                #ai
              </span>
              <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-md">
                #chatgpt
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>❤️ 42</span>
              <span>💬 12</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tags Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Tags</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-3">Rectangular</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">
                #prompt-engineering
              </span>
              <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-md">
                #chatgpt
              </span>
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                #ai
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Pills</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
                Featured
              </span>
              <span className="px-3 py-1 bg-success text-success-foreground text-sm rounded-full">
                New
              </span>
              <span className="px-3 py-1 bg-info text-info-foreground text-sm rounded-full">
                Popular
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t">
        <p className="text-sm text-muted-foreground">
          For detailed documentation, see{' '}
          <code className="px-2 py-1 bg-muted rounded text-xs">
            DESIGN_SYSTEM.md
          </code>
        </p>
      </div>
    </div>
  )
}

function ColorSwatch({
  name,
  className,
}: {
  name: string
  className: string
}) {
  return (
    <div className="text-center">
      <div className={`h-24 rounded-lg mb-2 ${className}`} />
      <span className="text-sm">{name}</span>
    </div>
  )
}
