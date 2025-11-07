import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { TutorialsPageClient } from '@/components/pages/tutorials-page-client'

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
        color: 'from-purple-500 to-cyan-500'
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
      },
      {
        id: 'ml-basics',
        title: t('tutorial_ml_basics_title'),
        description: t('tutorial_ml_basics_description'),
        duration: t('tutorial_ml_basics_duration'),
        level: t('tutorial_ml_basics_level'),
        iconName: 'Brain',
        topics: [t('tutorial_ml_basics_topic1'), t('tutorial_ml_basics_topic2'), t('tutorial_ml_basics_topic3')],
        link: '/tutorials/ml-basics',
        color: 'from-blue-500 to-cyan-500'
      },
      {
        id: 'dl-fundamentals',
        title: t('tutorial_dl_fundamentals_title'),
        description: t('tutorial_dl_fundamentals_description'),
        duration: t('tutorial_dl_fundamentals_duration'),
        level: t('tutorial_dl_fundamentals_level'),
        iconName: 'Zap',
        topics: [t('tutorial_dl_fundamentals_topic1'), t('tutorial_dl_fundamentals_topic2'), t('tutorial_dl_fundamentals_topic3')],
        link: '/tutorials/dl-fundamentals',
        color: 'from-emerald-500 to-green-500'
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
        color: 'from-red-500 to-cyan-500'
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

  // Get translations as an object to pass to client component
  const translations = {
    hero_badge: t('hero_badge'),
    hero_title: t('hero_title'),
    hero_subtitle: t('hero_subtitle'),
    start_learning: t('start_learning'),
    browse_tutorials: t('browse_tutorials'),
    stat_tutorials: t('stat_tutorials'),
    stat_tutorials_label: t('stat_tutorials_label'),
    stat_examples: t('stat_examples'),
    stat_examples_label: t('stat_examples_label'),
    stat_free: t('stat_free'),
    stat_free_label: t('stat_free_label'),
    choose_path: t('choose_path'),
    choose_path_subtitle: t('choose_path_subtitle'),
    start_path: t('start_path'),
    beginner_title: t('beginner_title'),
    beginner_subtitle: t('beginner_subtitle'),
    intermediate_title: t('intermediate_title'),
    intermediate_subtitle: t('intermediate_subtitle'),
    advanced_title: t('advanced_title'),
    advanced_subtitle: t('advanced_subtitle'),
    resources_title: t('resources_title'),
    resources_subtitle: t('resources_subtitle'),
    resources_official_docs: t('resources_official_docs'),
    resources_community: t('resources_community'),
    resource_claude_docs: t('resource_claude_docs'),
    resource_openai_docs: t('resource_openai_docs'),
    resource_prompting_guide: t('resource_prompting_guide'),
    resource_community_tutorials: t('resource_community_tutorials'),
    resource_challenges: t('resource_challenges'),
    resource_teams: t('resource_teams')
  }

  return (
    <TutorialsPageClient
      tutorials={tutorials}
      learningPaths={learningPaths}
      t={translations}
    />
  )
}
