import { AuthForm } from '@/components/auth/auth-form'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('auth')
  return {
    title: t('login_page_title'),
    description: t('login_page_description'),
  }
}

export default async function LoginPage() {
  const t = await getTranslations('auth')

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left: Auth Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0 animate-in fade-in slide-in-from-left-4 duration-500">
            <AuthForm mode="login" />
          </div>

          {/* Right: Illustration */}
          <div className="hidden lg:block relative">
            <div className="relative aspect-square max-w-lg mx-auto animate-in fade-in slide-in-from-right-4 duration-700">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-violet-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
              <Image
                src="/branding/illustrations/onboarding/authentication.svg"
                alt={t('secure_authentication')}
                width={500}
                height={500}
                className="relative z-10 drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
