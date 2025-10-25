import { createClient } from '@/lib/supabase/server'
import { TemplateCard } from '@/components/templates/template-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { SparklesIcon, LockIcon, TargetIcon, TrendingUpIcon } from 'lucide-react'
import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Grid } from '@/components/layout/grid'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('templates')
  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

interface TemplatesPageProps {
  searchParams: Promise<{
    category?: string
  }>
}

const CATEGORIES = [
  'all',
  'marketing',
  'writing',
  'code',
  'business',
  'education',
  'creative',
  'other',
]

export default async function TemplatesPage({ searchParams }: TemplatesPageProps) {
  const t = await getTranslations('templates')
  const supabase = await createClient()
  const params = await searchParams

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Check user plan
  const { data: profile } = user
    ? await supabase.from('profiles').select('plan').eq('id', user.id).single()
    : { data: null }

  const hasPro = profile?.plan === 'pro' || profile?.plan === 'team' || profile?.plan === 'business'

  const selectedCategory = params.category || 'all'

  // Build query for templates
  let templatesQuery = supabase
    .from('prompt_templates')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('use_count', { ascending: false })

  // Filter by category
  if (selectedCategory !== 'all') {
    templatesQuery = templatesQuery.eq('category', selectedCategory)
  }

  // If user doesn't have Pro, exclude premium templates
  if (!hasPro) {
    templatesQuery = templatesQuery.eq('is_premium', false)
  }

  const { data: templates, error } = await templatesQuery

  // Get stats
  const { count: totalCount } = await supabase
    .from('prompt_templates')
    .select('*', { count: 'exact', head: true })

  const { count: featuredCount } = await supabase
    .from('prompt_templates')
    .select('*', { count: 'exact', head: true })
    .eq('is_featured', true)

  return (
    <>
      {/* Hero Section */}
      <Section variant="gradient" spacing="xl">
        <Container size="lg">
          <div className="text-center animate-fade-in-up">
            <Badge variant="soft" className="mb-4">
              <SparklesIcon className="w-3 h-3 mr-1" />
              {t('badge')}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section spacing="lg">
        <Container size="lg">
          <Grid cols={4} gap="md" className="animate-fade-in-up">
            <Card variant="bento" className="text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-primary mb-4">
                  <TargetIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold mb-1">{totalCount || 0}</div>
                <div className="text-sm text-muted-foreground">{t('total_templates')}</div>
              </CardContent>
            </Card>

            <Card variant="bento" className="text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-secondary mb-4">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold mb-1">{featuredCount || 0}</div>
                <div className="text-sm text-muted-foreground">{t('featured_templates')}</div>
              </CardContent>
            </Card>

            <Card variant="bento" className="text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-vibrant mb-4">
                  <TrendingUpIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold mb-1">{CATEGORIES.length - 1}</div>
                <div className="text-sm text-muted-foreground">{t('categories')}</div>
              </CardContent>
            </Card>

            <Card variant="bento" className="text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-primary mb-4">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold mb-1">100%</div>
                <div className="text-sm text-muted-foreground">{t('free_to_use')}</div>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Category Filter Section */}
      <Section spacing="md">
        <Container size="lg">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-sm font-medium mb-4 text-center">{t('filter_by_category')}</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((category) => (
                <Link key={category} href={`/templates?category=${category}`}>
                  <Badge
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    className="cursor-pointer px-4 py-2 text-sm hover:bg-primary/10 transition-colors"
                  >
                    {t(`category_${category}`)}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Pro Upsell */}
      {!hasPro && (
        <Section spacing="md">
          <Container size="lg">
            <Card variant="feature" className="border-primary/20 bg-gradient-to-r from-primary/5 to-blue/5">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center">
                      <LockIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{t('unlock_premium')}</h3>
                    <p className="text-muted-foreground mb-4">
                      {t('unlock_premium_description')}
                    </p>
                    <Button asChild variant="gradient" size="lg">
                      <Link href="/pricing">{t('upgrade_to_pro')}</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Container>
        </Section>
      )}

      {/* Templates Grid Section */}
      <Section spacing="xl">
        <Container size="lg">
          {error ? (
            <div className="text-center py-16">
              <p className="text-destructive">{t('error')}</p>
            </div>
          ) : templates && templates.length > 0 ? (
            <Grid cols={3} gap="lg" className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {templates.map((template: any) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </Grid>
          ) : (
            <div className="text-center py-16 animate-fade-in-up">
              <SparklesIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h2 className="text-2xl font-semibold mb-2">{t('no_templates')}</h2>
              <p className="text-muted-foreground">{t('no_templates_description')}</p>
            </div>
          )}
        </Container>
      </Section>

      {/* CTA Section */}
      <Section spacing="xl" variant="gradient">
        <Container size="md">
          <Card variant="glass" className="text-center">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-3">{t('cta_title')}</h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t('cta_description')}
              </p>
              <Button asChild size="lg" variant="gradient">
                <Link href="/prompts/new">{t('cta_button')}</Link>
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </>
  )
}
