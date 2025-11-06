'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MarkdownEditor } from '@/components/editor/markdown-editor'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, FileEdit, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function NewPromptPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'choice' | 'manual' | 'wizard'>('choice')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const t = useTranslations('prompts')
  const tCommon = useTranslations('common')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          body,
          tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean),
          is_public: isPublic,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create prompt')
      }

      // Redirect to the new prompt
      router.push(`/prompts/${data.prompt.id}`)
    } catch (error: any) {
      setError(error.message)
      setLoading(false)
    }
  }

  // Choice screen
  if (mode === 'choice') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 gradient-text">{t('create_choice_title')}</h1>
            <p className="text-xl text-muted-foreground">
              {t('create_choice_subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Wizard Option */}
            <Card
              className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 group"
              onClick={() => router.push('/prompts/wizard')}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-colors">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{t('wizard_title')}</CardTitle>
                    <CardDescription className="mt-1">{t('wizard_subtitle')}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {t('wizard_description')}
                </p>

                <div className="space-y-2">
                  <p className="text-sm font-medium">{t('wizard_includes')}</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>{t('wizard_feature_1')}</li>
                    <li>{t('wizard_feature_2')}</li>
                    <li>{t('wizard_feature_3')}</li>
                    <li>{t('wizard_feature_4')}</li>
                    <li>{t('wizard_feature_5')}</li>
                  </ul>
                </div>

                <Button className="w-full gap-2 mt-4" size="lg">
                  <span className="leading-none">{t('start_wizard')}</span>
                  <ArrowRight className="w-4 h-4 leading-none" />
                </Button>
              </CardContent>
            </Card>

            {/* Manual Option */}
            <Card
              className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 group"
              onClick={() => setMode('manual')}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/10 group-hover:from-blue-500/30 group-hover:to-blue-500/20 transition-colors">
                    <FileEdit className="w-8 h-8 text-blue-500" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{t('manual_mode')}</CardTitle>
                    <CardDescription className="mt-1">{t('manual_subtitle')}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {t('manual_description')}
                </p>

                <div className="space-y-2">
                  <p className="text-sm font-medium">{t('manual_ideal')}</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>{t('manual_feature_1')}</li>
                    <li>{t('manual_feature_2')}</li>
                    <li>{t('manual_feature_3')}</li>
                    <li>{t('manual_feature_4')}</li>
                    <li>{t('manual_feature_5')}</li>
                  </ul>
                </div>

                <Button variant="outline" className="w-full gap-2 mt-4" size="lg">
                  <span className="leading-none">{t('manual_creation')}</span>
                  <ArrowRight className="w-4 h-4 leading-none" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              className="gap-2"
            >
              <span className="leading-none">{tCommon('cancel')}</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Manual mode
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => setMode('choice')}
            className="mb-4 gap-2"
          >
            {t('back_to_choice')}
          </Button>
          <h1 className="text-3xl font-bold mb-2">{t('create_manually')}</h1>
          <p className="text-muted-foreground">
            {t('share_with_community')}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              {t('title_label')} <span className="text-destructive">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder={t('title_placeholder')}
              className="w-full px-4 py-2 border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Body */}
          <div>
            <label htmlFor="body" className="block text-sm font-medium mb-2">
              {t('body_label')} <span className="text-destructive">*</span>
            </label>
            <MarkdownEditor
              value={body}
              onChange={setBody}
              placeholder={t('body_placeholder')}
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-2">
              {t('tags_label')}
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder={t('tags_placeholder')}
              className="w-full px-4 py-2 border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {t('tags_help')}
            </p>
          </div>

          {/* Visibility */}
          <div className="flex items-center gap-2">
            <input
              id="is_public"
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="is_public" className="text-sm">
              {t('make_public')}
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading || !title.trim() || !body.trim()}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {loading ? t('creating') : t('create_prompt')}
            </button>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-6 py-2 border rounded-md hover:bg-accent transition-colors"
            >
              {tCommon('cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
