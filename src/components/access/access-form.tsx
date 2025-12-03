'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, AlertCircle, Lock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface AccessFormProps {
  redirect?: string
  translations: {
    title: string
    description: string
    passwordLabel: string
    passwordPlaceholder: string
    submitButton: string
    submitting: string
    errorMessage: string
    contactSupport: string
  }
}

export function AccessForm({ redirect, translations }: AccessFormProps) {
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          password,
          redirect: redirect || '/',
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Redirect to the original page or home
        router.push(data.redirect || '/')
        router.refresh()
      } else {
        setError(data.error || translations.errorMessage)
      }
    } catch {
      setError(translations.errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10">
          <Lock className="h-6 w-6 text-brand-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">{translations.title}</CardTitle>
        <CardDescription>{translations.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">{translations.passwordLabel}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={translations.passwordPlaceholder}
              required
              disabled={isSubmitting}
              aria-label={translations.passwordLabel}
              autoFocus
              className="h-11"
            />
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <AlertDescription className="text-sm flex-1">
                  {error}
                </AlertDescription>
              </div>
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !password}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {translations.submitting}
              </>
            ) : (
              translations.submitButton
            )}
          </Button>

          {/* Support Text */}
          <p className="text-xs text-center text-muted-foreground">
            {translations.contactSupport}
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
