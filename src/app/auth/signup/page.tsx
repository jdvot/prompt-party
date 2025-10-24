import { AuthForm } from '@/components/auth/auth-form'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('auth')
  return {
    title: t('signup_page_title'),
    description: t('signup_page_description'),
  }
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <AuthForm mode="signup" />
      </div>
    </div>
  )
}
