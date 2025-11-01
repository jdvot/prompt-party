import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { cn } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('auth')
  return {
    title: t('error_page_title'),
    description: t('error_page_description'),
  }
}

export default async function AuthCodeErrorPage() {
  const t = await getTranslations('auth')

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <Card className="border-destructive/50">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="w-8 h-8 text-destructive" />
              <CardTitle className="text-2xl">{t('auth_error_title')}</CardTitle>
            </div>
            <CardDescription>{t('auth_error_subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-md">
              <p className="text-sm">{t('auth_error_description')}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">{t('auth_error_possible_causes')}</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>{t('auth_error_cause_1')}</li>
                <li>{t('auth_error_cause_2')}</li>
                <li>{t('auth_error_cause_3')}</li>
                <li>{t('auth_error_cause_4')}</li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">{t('auth_error_what_to_do')}</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>{t('auth_error_solution_1')}</li>
                <li>{t('auth_error_solution_2')}</li>
                <li>{t('auth_error_solution_3')}</li>
              </ul>
            </div>

            <div className="flex gap-2 pt-4">
              <Link href="/auth/login" className={cn(buttonVariants(), "flex-1")}>
                {t('back_to_login')}
              </Link>
              <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "flex-1")}>
                {t('back_to_home')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
