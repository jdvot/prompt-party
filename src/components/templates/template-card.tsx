'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StarIcon, LockIcon, SparklesIcon, TrendingUpIcon } from 'lucide-react'
import { TemplateDetail } from './template-detail'
import { useTranslations } from 'next-intl'

interface TemplateCardProps {
  template: {
    id: string
    title: string
    description: string
    category: string
    template_body: string
    variables: any[]
    use_count: number
    is_featured: boolean
    is_premium: boolean
  }
}

export function TemplateCard({ template }: TemplateCardProps) {
  const [showDetail, setShowDetail] = useState(false)
  const t = useTranslations('templates')

  const categoryColors: Record<string, string> = {
    marketing: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    writing: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    code: 'bg-green-500/10 text-green-500 border-green-500/20',
    business: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    education: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    creative: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    other: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
  }

  return (
    <>
      <Card className="h-full hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer group">
        <CardHeader>
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge className={categoryColors[template.category] || categoryColors.other}>
              {t(`category_${template.category}`)}
            </Badge>
            <div className="flex gap-1">
              {template.is_featured && (
                <div className="w-6 h-6 rounded-full bg-yellow-500/10 flex items-center justify-center" title={t('featured')}>
                  <StarIcon className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                </div>
              )}
              {template.is_premium && (
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center" title={t('premium')}>
                  <LockIcon className="w-3.5 h-3.5 text-primary" />
                </div>
              )}
            </div>
          </div>
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
            {template.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {template.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <TrendingUpIcon className="w-4 h-4" />
              <span>{template.use_count || 0} {t('uses')}</span>
            </div>
            {template.variables && template.variables.length > 0 && (
              <div className="flex items-center gap-1">
                <SparklesIcon className="w-4 h-4" />
                <span>{template.variables.length} {t('variables')}</span>
              </div>
            )}
          </div>
          <Button
            onClick={() => setShowDetail(true)}
            className="w-full"
          >
            {t('use_template')}
          </Button>
        </CardContent>
      </Card>

      {showDetail && (
        <TemplateDetail
          template={template}
          isOpen={showDetail}
          onClose={() => setShowDetail(false)}
        />
      )}
    </>
  )
}
