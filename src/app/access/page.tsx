import { Metadata } from 'next'
import { AccessForm } from '@/components/access/access-form'

export const metadata: Metadata = {
  title: 'Access Protected - Prompt Party',
  description: 'Enter password to access Prompt Party',
  robots: 'noindex, nofollow', // Don't index the access page
}

export default async function AccessPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>
}) {
  const params = await searchParams

  // Translations - can be extended with next-intl later
  const translations = {
    title: 'Access Protected',
    description: 'Enter the password to continue to Prompt Party',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter password',
    submitButton: 'Continue',
    submitting: 'Verifying...',
    errorMessage: 'Invalid password. Please try again.',
    contactSupport: 'Need access? Contact support for assistance.',
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-primary/5 via-background to-brand-secondary/5 p-4">
      <AccessForm redirect={params.redirect} translations={translations} />
    </div>
  )
}
