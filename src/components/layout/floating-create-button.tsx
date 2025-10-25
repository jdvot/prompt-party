'use client'

import Link from 'next/link'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

export function FloatingCreateButton() {
  const t = useTranslations('prompts')

  return (
    <Link href="/prompts/new">
      <Button
        size="lg"
        className="fixed bottom-20 right-4 z-40 lg:hidden rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow p-0"
        aria-label={t('create_title')}
      >
        <PlusIcon className="w-6 h-6" />
      </Button>
    </Link>
  )
}
