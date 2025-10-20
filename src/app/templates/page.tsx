import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SparklesIcon, LockIcon } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prompt Templates | Prompt Party',
  description: 'Browse and use professional prompt templates',
}

export default async function TemplatesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get user plan
  let userPlan = 'free'
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single()
    userPlan = profile?.plan || 'free'
  }

  const hasPro = ['pro', 'team', 'business'].includes(userPlan)

  // Get all templates
  const { data: allTemplates } = await supabase
    .from('prompt_templates')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('use_count', { ascending: false })

  const templates = allTemplates || []
  const categories = Array.from(new Set(templates.map((t: any) => t.category)))

  const categoryIcons: Record<string, string> = {
    marketing: '📈',
    writing: '✍️',
    code: '💻',
    business: '💼',
    education: '🎓',
    creative: '🎨',
    other: '🌟',
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <SparklesIcon className="w-4 h-4" />
            <span>Prompt Templates</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Ready-to-Use Prompt Templates
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional templates with customizable variables. Start creating amazing prompts in seconds.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <Badge key={category} variant="outline" className="cursor-pointer hover:bg-primary/10">
              {categoryIcons[category]} {category}
            </Badge>
          ))}
        </div>

        {/* Templates grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template: any) => {
            const isPremium = template.is_premium
            const canAccess = !isPremium || hasPro

            return (
              <Card
                key={template.id}
                className={`relative ${
                  template.is_featured ? 'border-primary/50' : ''
                } ${!canAccess ? 'opacity-75' : ''}`}
              >
                {template.is_featured && (
                  <div className="absolute -top-3 left-4">
                    <Badge className="bg-primary">Featured</Badge>
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-2xl">{categoryIcons[template.category]}</span>
                    <div className="flex items-center gap-2">
                      {isPremium && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <LockIcon className="h-3 w-3" />
                          Pro
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {template.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{template.use_count || 0} uses</span>
                    <span className="capitalize">{template.category}</span>
                  </div>

                  {canAccess ? (
                    <Button asChild className="w-full">
                      <Link href={`/templates/${template.id}`}>
                        Use Template
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/pricing">
                        <LockIcon className="mr-2 h-4 w-4" />
                        Upgrade to Pro
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {templates.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <SparklesIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-20 mb-4" />
              <p className="text-muted-foreground">No templates available yet</p>
            </CardContent>
          </Card>
        )}

        {/* CTA for template creation */}
        {user && (
          <div className="mt-12 text-center">
            <Card className="bg-primary/5 border-primary/20 max-w-2xl mx-auto">
              <CardContent className="py-8">
                <h3 className="text-2xl font-bold mb-2">Create Your Own Template</h3>
                <p className="text-muted-foreground mb-4">
                  Share your expertise by creating templates for the community
                </p>
                <Button asChild>
                  <Link href="/templates/new">
                    Create Template
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
