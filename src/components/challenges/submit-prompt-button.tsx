'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { SparklesIcon } from 'lucide-react'

interface SubmitPromptButtonProps {
  challengeId: string
}

export function SubmitPromptButton({ challengeId }: SubmitPromptButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [promptUrl, setPromptUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const t = useTranslations('challenges')
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      // Extract prompt ID from URL
      const match = promptUrl.match(/\/prompts\/([a-f0-9-]+)/)
      if (!match) {
        setError(t('invalid_url'))
        setIsSubmitting(false)
        return
      }

      const promptId = match[1]

      // Check if prompt exists and belongs to user
      const { data: prompt, error: promptError } = await supabase
        .from('prompts')
        .select('id, author')
        .eq('id', promptId)
        .single()

      if (promptError || !prompt) {
        setError(t('prompt_not_found'))
        setIsSubmitting(false)
        return
      }

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user || prompt.author !== user.id) {
        setError(t('must_own_prompt'))
        setIsSubmitting(false)
        return
      }

      // Submit to challenge
      const { error: submitError } = await supabase
        .from('challenge_submissions')
        .insert({
          challenge_id: challengeId,
          prompt_id: promptId,
          user_id: user.id,
        })

      if (submitError) {
        setError(t('submission_error'))
        setIsSubmitting(false)
        return
      }

      // Refresh page to show submission
      router.refresh()
      setIsOpen(false)
    } catch (err) {
      setError(t('submission_error'))
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className="w-full md:w-auto gap-2"
      >
        <SparklesIcon className="w-5 h-5" />
        {t('submit_prompt')}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('submit_your_prompt')}</DialogTitle>
            <DialogDescription>
              {t('submit_description')}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="promptUrl">{t('prompt_url')}</Label>
              <Input
                id="promptUrl"
                type="url"
                placeholder={t('components.submitPromptButton.urlPlaceholder')}
                value={promptUrl}
                onChange={(e) => setPromptUrl(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                {t('prompt_url_hint')}
              </p>
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded">
                {error}
              </div>
            )}

            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                {t('cancel')}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t('submitting') : t('submit')}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
