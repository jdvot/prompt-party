'use client'

import { useTranslations } from 'next-intl'

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

export default function DesignSystemPage() {
  const t = useTranslations('design_system')

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>

      {/* Colors Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">{t('colors')}</h2>

        {/* Brand Colors */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{t('brand_colors')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <ColorSwatch
              name={t('primary')}
              className="bg-primary text-primary-foreground"
            />
            <ColorSwatch
              name={t('secondary')}
              className="bg-secondary text-secondary-foreground"
            />
            <ColorSwatch
              name={t('accent')}
              className="bg-accent text-accent-foreground"
            />
          </div>
        </div>

        {/* Semantic Colors */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{t('semantic_colors')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch
              name={t('destructive')}
              className="bg-destructive text-destructive-foreground"
            />
            <ColorSwatch
              name={t('success')}
              className="bg-success text-success-foreground"
            />
            <ColorSwatch
              name={t('warning')}
              className="bg-warning text-warning-foreground"
            />
            <ColorSwatch
              name={t('info')}
              className="bg-info text-info-foreground"
            />
          </div>
        </div>

        {/* Neutral Colors */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{t('neutral_colors')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <ColorSwatch
              name={t('background')}
              className="bg-background text-foreground border"
            />
            <ColorSwatch
              name={t('muted')}
              className="bg-muted text-muted-foreground"
            />
            <ColorSwatch
              name={t('card')}
              className="bg-card text-card-foreground border"
            />
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">{t('typography')}</h2>

        <div className="space-y-4 bg-card border rounded-lg p-6">
          <div>
            <span className="text-xs text-muted-foreground">text-5xl</span>
            <p className="text-5xl font-bold">{t('quick_brown_fox')}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">text-4xl</span>
            <p className="text-4xl font-bold">{t('quick_brown_fox')}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">text-3xl</span>
            <p className="text-3xl font-semibold">{t('quick_brown_fox')}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">text-2xl</span>
            <p className="text-2xl font-semibold">{t('quick_brown_fox')}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">text-xl</span>
            <p className="text-xl font-semibold">{t('quick_brown_fox')}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">text-lg</span>
            <p className="text-lg">{t('quick_brown_fox_full')}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">text-base</span>
            <p className="text-base">{t('quick_brown_fox_full')}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">text-sm</span>
            <p className="text-sm">{t('quick_brown_fox_full')}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">text-xs</span>
            <p className="text-xs">{t('quick_brown_fox_full')}</p>
          </div>
        </div>
      </section>

      {/* Spacing Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">{t('spacing')}</h2>
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
        <h2 className="text-3xl font-bold mb-6">{t('border_radius')}</h2>
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
        <h2 className="text-3xl font-bold mb-6">{t('shadows')}</h2>
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
        <h2 className="text-3xl font-bold mb-6">{t('buttons')}</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">{t('variants')}</h3>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
                {t('primary')}
              </button>
              <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-medium hover:bg-secondary/90 transition-colors">
                {t('secondary')}
              </button>
              <button className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md font-medium hover:bg-destructive/90 transition-colors">
                {t('destructive')}
              </button>
              <button className="bg-success text-success-foreground px-4 py-2 rounded-md font-medium hover:bg-success/90 transition-colors">
                {t('success')}
              </button>
              <button className="border border-input bg-background px-4 py-2 rounded-md font-medium hover:bg-muted transition-colors">
                {t('outline')}
              </button>
              <button className="text-foreground px-4 py-2 rounded-md font-medium hover:bg-muted transition-colors">
                {t('ghost')}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">{t('sizes')}</h3>
            <div className="flex flex-wrap items-center gap-4">
              <button className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                {t('small')}
              </button>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
                {t('medium')}
              </button>
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md text-lg font-medium hover:bg-primary/90 transition-colors">
                {t('large')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">{t('forms')}</h2>
        <div className="bg-card border rounded-lg p-6 max-w-md space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">
              {t('text_input')}
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
              placeholder={t('enter_text')}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">{t('textarea')}</label>
            <textarea
              className="w-full px-3 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
              rows={3}
              placeholder={t('enter_description')}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">{t('select')}</label>
            <select className="w-full px-3 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent">
              <option>{t('option_1')}</option>
              <option>{t('option_2')}</option>
              <option>{t('option_3')}</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="checkbox"
              className="w-4 h-4 rounded border-input"
            />
            <label htmlFor="checkbox" className="text-sm">
              {t('checkbox')}
            </label>
          </div>
        </div>
      </section>

      {/* Alerts Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">{t('alerts')}</h2>
        <div className="space-y-4 max-w-2xl">
          <div className="bg-success text-success-foreground p-4 rounded-md border border-success/20">
            <strong className="font-semibold">{t('success_title')}</strong>
            <p className="mt-1">{t('success_message')}</p>
          </div>

          <div className="bg-destructive text-destructive-foreground p-4 rounded-md border border-destructive/20">
            <strong className="font-semibold">{t('error_title')}</strong>
            <p className="mt-1">{t('error_message')}</p>
          </div>

          <div className="bg-warning text-warning-foreground p-4 rounded-md border border-warning/20">
            <strong className="font-semibold">{t('warning_title')}</strong>
            <p className="mt-1">{t('warning_message')}</p>
          </div>

          <div className="bg-info text-info-foreground p-4 rounded-md border border-info/20">
            <strong className="font-semibold">{t('info_title')}</strong>
            <p className="mt-1">{t('info_message')}</p>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">{t('cards')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">{t('basic_card')}</h3>
            <p className="text-muted-foreground mb-4">
              {t('basic_card_description')}
            </p>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
              {t('action')}
            </button>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">{t('prompt_title')}</h3>
                <p className="text-sm text-muted-foreground">{t('by_username')}</p>
              </div>
              <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">
                {t('featured')}
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              {t('card_description')}
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
        <h2 className="text-3xl font-bold mb-6">{t('tags')}</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-3">{t('rectangular')}</h3>
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
            <h3 className="text-lg font-semibold mb-3">{t('pills')}</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
                {t('featured')}
              </span>
              <span className="px-3 py-1 bg-success text-success-foreground text-sm rounded-full">
                {t('new')}
              </span>
              <span className="px-3 py-1 bg-info text-info-foreground text-sm rounded-full">
                {t('popular')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t">
        <p className="text-sm text-muted-foreground">
          {t('footer_text')}{' '}
          <code className="px-2 py-1 bg-muted rounded text-xs">
            DESIGN_SYSTEM.md
          </code>
        </p>
      </div>
    </div>
  )
}
