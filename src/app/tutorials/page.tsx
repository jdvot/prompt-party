import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TutorialCard } from '@/components/tutorials/tutorial-card'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.index')

  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function TutorialsPage() {
  const t = await getTranslations('tutorials.index')

  const tutorials = {
    beginner: [
      {
        id: 'intro-prompts',
        title: t('tutorial_intro_prompts_title'),
        description: t('tutorial_intro_prompts_description'),
        duration: t('tutorial_intro_prompts_duration'),
        level: t('tutorial_intro_prompts_level'),
        iconName: 'BookOpen',
        topics: [t('tutorial_intro_prompts_topic1'), t('tutorial_intro_prompts_topic2'), t('tutorial_intro_prompts_topic3')],
        link: '/tutorials/intro-prompts',
        color: 'from-blue-500 to-cyan-500'
      },
      {
        id: 'claude-basics',
        title: t('tutorial_claude_basics_title'),
        description: t('tutorial_claude_basics_description'),
        duration: t('tutorial_claude_basics_duration'),
        level: t('tutorial_claude_basics_level'),
        iconName: 'MessageSquare',
        topics: [t('tutorial_claude_basics_topic1'), t('tutorial_claude_basics_topic2'), t('tutorial_claude_basics_topic3')],
        link: '/tutorials/claude-basics',
        color: 'from-green-500 to-emerald-500'
      },
      {
        id: 'prompt-templates',
        title: t('tutorial_prompt_templates_title'),
        description: t('tutorial_prompt_templates_description'),
        duration: t('tutorial_prompt_templates_duration'),
        level: t('tutorial_prompt_templates_level'),
        iconName: 'Layers',
        topics: [t('tutorial_prompt_templates_topic1'), t('tutorial_prompt_templates_topic2'), t('tutorial_prompt_templates_topic3')],
        link: '/tutorials/prompt-templates',
        color: 'from-purple-500 to-pink-500'
      }
    ],
    intermediate: [
      {
        id: 'advanced-prompting',
        title: t('tutorial_advanced_prompting_title'),
        description: t('tutorial_advanced_prompting_description'),
        duration: t('tutorial_advanced_prompting_duration'),
        level: t('tutorial_advanced_prompting_level'),
        iconName: 'Brain',
        topics: [t('tutorial_advanced_prompting_topic1'), t('tutorial_advanced_prompting_topic2'), t('tutorial_advanced_prompting_topic3')],
        link: '/tutorials/advanced-prompting',
        color: 'from-orange-500 to-red-500'
      },
      {
        id: 'claude-agents',
        title: t('tutorial_claude_agents_title'),
        description: t('tutorial_claude_agents_description'),
        duration: t('tutorial_claude_agents_duration'),
        level: t('tutorial_claude_agents_level'),
        iconName: 'Sparkles',
        topics: [t('tutorial_claude_agents_topic1'), t('tutorial_claude_agents_topic2'), t('tutorial_claude_agents_topic3')],
        link: '/tutorials/claude-agents',
        color: 'from-violet-500 to-purple-500'
      },
      {
        id: 'prompt-optimization',
        title: t('tutorial_prompt_optimization_title'),
        description: t('tutorial_prompt_optimization_description'),
        duration: t('tutorial_prompt_optimization_duration'),
        level: t('tutorial_prompt_optimization_level'),
        iconName: 'Zap',
        topics: [t('tutorial_prompt_optimization_topic1'), t('tutorial_prompt_optimization_topic2'), t('tutorial_prompt_optimization_topic3')],
        link: '/tutorials/prompt-optimization',
        color: 'from-yellow-500 to-orange-500'
      }
    ],
    advanced: [
      {
        id: 'multi-agent-systems',
        title: t('tutorial_multi_agent_systems_title'),
        description: t('tutorial_multi_agent_systems_description'),
        duration: t('tutorial_multi_agent_systems_duration'),
        level: t('tutorial_multi_agent_systems_level'),
        iconName: 'Rocket',
        topics: [t('tutorial_multi_agent_systems_topic1'), t('tutorial_multi_agent_systems_topic2'), t('tutorial_multi_agent_systems_topic3')],
        link: '/tutorials/multi-agent-systems',
        color: 'from-red-500 to-pink-500'
      },
      {
        id: 'code-generation',
        title: t('tutorial_code_generation_title'),
        description: t('tutorial_code_generation_description'),
        duration: t('tutorial_code_generation_duration'),
        level: t('tutorial_code_generation_level'),
        iconName: 'Code',
        topics: [t('tutorial_code_generation_topic1'), t('tutorial_code_generation_topic2'), t('tutorial_code_generation_topic3')],
        link: '/tutorials/code-generation',
        color: 'from-indigo-500 to-blue-500'
      }
    ]
  }

  const learningPaths = [
    {
      title: t('path_beginner_title'),
      description: t('path_beginner_description'),
      steps: t('path_beginner_lessons'),
      duration: t('path_beginner_duration'),
      iconName: 'GraduationCap',
      color: 'from-green-500 to-emerald-500',
      link: '/tutorials/paths/beginner'
    },
    {
      title: t('path_expert_title'),
      description: t('path_expert_description'),
      steps: t('path_expert_lessons'),
      duration: t('path_expert_duration'),
      iconName: 'Sparkles',
      color: 'from-violet-500 to-purple-500',
      link: '/tutorials/paths/expert'
    },
    {
      title: t('path_pro_title'),
      description: t('path_pro_description'),
      steps: t('path_pro_lessons'),
      duration: t('path_pro_duration'),
      iconName: 'Brain',
      color: 'from-orange-500 to-red-500',
      link: '/tutorials/paths/pro'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Hero Section - Atlas Style */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-transparent opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-500/20 via-transparent to-transparent" />

        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20">
              <Icons.BookMarked className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              <span className="text-sm font-medium text-violet-600 dark:text-violet-400">
                {t('hero_badge')}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                {t('hero_title')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('hero_subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="group relative overflow-hidden bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white border-0 min-w-[200px]">
                <span className="relative z-10 flex items-center gap-2">
                  <Icons.Play className="w-5 h-5" />
                  {t('start_learning')}
                  <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              <Button size="lg" variant="outline" className="min-w-[200px] group" asChild>
                <Link href="#beginner">
                  <Icons.BookOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  {t('browse_tutorials')}
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
              <div className="space-y-2">
                <div className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  {t('stat_tutorials')}
                </div>
                <div className="text-sm text-muted-foreground">{t('stat_tutorials_label')}</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  {t('stat_examples')}
                </div>
                <div className="text-sm text-muted-foreground">{t('stat_examples_label')}</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  {t('stat_free')}
                </div>
                <div className="text-sm text-muted-foreground">{t('stat_free_label')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('choose_path')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('choose_path_subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => {
              const Icon = Icons[path.iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>
              return (
                <Card key={index} className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-violet-500/50">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-5 group-hover:opacity-10 transition-opacity`} />

                  <CardHeader className="relative">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl">{path.title}</CardTitle>
                    <CardDescription className="text-base">
                      {path.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{path.steps}</span>
                      <span className="text-muted-foreground">{path.duration}</span>
                    </div>
                    <Button className="w-full group/btn" variant="outline" asChild>
                      <Link href={path.link}>
                        {t('start_path')}
                        <Icons.ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tutorials Grid */}
      <section className="container mx-auto px-4 py-20" id="beginner">
        <div className="max-w-7xl mx-auto space-y-20">
          {/* Beginner */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Icons.BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{t('beginner_title')}</h2>
                <p className="text-muted-foreground">{t('beginner_subtitle')}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.beginner.map((tutorial) => (
                <TutorialCard key={tutorial.id} tutorial={tutorial} />
              ))}
            </div>
          </div>

          {/* Intermediate */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                <Icons.Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{t('intermediate_title')}</h2>
                <p className="text-muted-foreground">{t('intermediate_subtitle')}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.intermediate.map((tutorial) => (
                <TutorialCard key={tutorial.id} tutorial={tutorial} />
              ))}
            </div>
          </div>

          {/* Advanced */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                <Icons.Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{t('advanced_title')}</h2>
                <p className="text-muted-foreground">{t('advanced_subtitle')}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.advanced.map((tutorial) => (
                <TutorialCard key={tutorial.id} tutorial={tutorial} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-5xl mx-auto bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-violet-500/5 border-violet-500/20">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl mb-2">{t('resources_title')}</CardTitle>
            <CardDescription className="text-base">
              {t('resources_subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <Icons.BookMarked className="w-5 h-5 text-violet-600" />
                  {t('resources_official_docs')}
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a href="https://docs.anthropic.com/claude/docs" target="_blank" rel="noopener" className="group flex items-center gap-2 text-muted-foreground hover:text-violet-600 transition-colors">
                      <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      {t('resource_claude_docs')}
                    </a>
                  </li>
                  <li>
                    <a href="https://platform.openai.com/docs" target="_blank" rel="noopener" className="group flex items-center gap-2 text-muted-foreground hover:text-violet-600 transition-colors">
                      <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      {t('resource_openai_docs')}
                    </a>
                  </li>
                  <li>
                    <a href="https://www.promptingguide.ai/" target="_blank" rel="noopener" className="group flex items-center gap-2 text-muted-foreground hover:text-violet-600 transition-colors">
                      <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      {t('resource_prompting_guide')}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <Icons.Sparkles className="w-5 h-5 text-fuchsia-600" />
                  {t('resources_community')}
                </h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/prompts?tag=tutorial" className="group flex items-center gap-2 text-muted-foreground hover:text-fuchsia-600 transition-colors">
                      <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      {t('resource_community_tutorials')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/challenges" className="group flex items-center gap-2 text-muted-foreground hover:text-fuchsia-600 transition-colors">
                      <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      {t('resource_challenges')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/teams" className="group flex items-center gap-2 text-muted-foreground hover:text-fuchsia-600 transition-colors">
                      <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      {t('resource_teams')}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
