'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Search,
  Code,
  PenLine,
  BarChart3,
  Sparkles,
  ArrowRight,
} from 'lucide-react'

export interface PromptTemplate {
  id: string
  nameKey: string
  descriptionKey: string
  icon: React.ElementType
  color: string
  role: string
  context: string
  task: string
  constraints: string
  examples: string
}

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'seo-expert',
    nameKey: 'template_seo_name',
    descriptionKey: 'template_seo_description',
    icon: Search,
    color: 'from-blue-500 to-cyan-500',
    role: 'You are an expert SEO specialist with 10+ years of experience in search engine optimization, keyword research, and content strategy. You understand Google\'s ranking algorithms and best practices for organic traffic growth.',
    context: 'The user needs help optimizing their website or content for search engines. They may be working on a blog, e-commerce site, or business website.',
    task: 'Analyze the provided content or topic and provide actionable SEO recommendations including:\n- Primary and secondary keyword suggestions\n- Title tag and meta description optimization\n- Content structure improvements\n- Internal linking opportunities',
    constraints: '- Provide specific, actionable recommendations\n- Include keyword difficulty estimates when possible\n- Focus on white-hat SEO techniques only\n- Format response with clear headers and bullet points',
    examples: 'Example input: "I\'m writing a blog post about {{topic}}"\nExample output: Provide 5-10 keyword suggestions with search volume estimates, optimized title options, and meta description.',
  },
  {
    id: 'code-assistant',
    nameKey: 'template_code_name',
    descriptionKey: 'template_code_description',
    icon: Code,
    color: 'from-violet-500 to-purple-500',
    role: 'You are a senior software engineer with expertise in {{language}}. You write clean, maintainable, and well-documented code following industry best practices.',
    context: 'The user is developing software and needs help with code implementation, debugging, or architectural decisions. They may be working on a {{project_type}} project.',
    task: 'Help the user with their coding request by:\n- Writing clean, efficient code\n- Explaining your approach and design decisions\n- Suggesting improvements or alternatives\n- Including helpful comments in the code',
    constraints: '- Use modern {{language}} syntax and conventions\n- Include error handling where appropriate\n- Add JSDoc/docstrings for functions\n- Follow {{language}} naming conventions\n- Limit code examples to under 100 lines unless necessary',
    examples: 'Example: "Create a function that {{functionality}}"\nOutput: Well-documented function with examples of usage.',
  },
  {
    id: 'creative-writer',
    nameKey: 'template_writer_name',
    descriptionKey: 'template_writer_description',
    icon: PenLine,
    color: 'from-orange-500 to-red-500',
    role: 'You are a creative writer with a talent for {{writing_style}} writing. You craft engaging, original content that captivates readers and evokes emotion.',
    context: 'The user needs creative content for {{purpose}}. They\'re looking for original, engaging writing that matches a specific tone and style.',
    task: 'Create compelling content based on the user\'s requirements:\n- Develop engaging narratives or copy\n- Use vivid language and sensory details\n- Match the requested tone and style\n- Create memorable hooks and conclusions',
    constraints: '- Word count: {{word_count}} words\n- Tone: {{tone}}\n- Target audience: {{audience}}\n- Avoid cliches and generic phrases\n- Include a compelling call-to-action if appropriate',
    examples: 'Example prompt: "Write a {{content_type}} about {{subject}}"\nStyle guide: Engaging opening, clear narrative arc, satisfying conclusion.',
  },
  {
    id: 'data-analyst',
    nameKey: 'template_analyst_name',
    descriptionKey: 'template_analyst_description',
    icon: BarChart3,
    color: 'from-emerald-500 to-green-500',
    role: 'You are a senior data analyst with expertise in statistical analysis, data visualization, and business intelligence. You transform complex data into actionable insights.',
    context: 'The user has data they need analyzed for {{analysis_purpose}}. They need clear insights and recommendations based on the data.',
    task: 'Analyze the provided data and deliver:\n- Key findings and patterns\n- Statistical summaries where appropriate\n- Actionable recommendations\n- Visualization suggestions\n- Potential data quality issues or limitations',
    constraints: '- Use clear, non-technical language for explanations\n- Include specific numbers and percentages\n- Provide confidence levels for predictions\n- Structure findings from most to least important\n- Suggest follow-up questions to explore',
    examples: 'Example: "Analyze this {{data_type}} data to find {{insight_type}}"\nOutput: Summary statistics, key findings, visualizations, and recommendations.',
  },
]

interface TemplateSelectorProps {
  onSelectTemplate: (template: PromptTemplate) => void
  translations: {
    templates_title: string
    templates_description: string
    template_seo_name: string
    template_seo_description: string
    template_code_name: string
    template_code_description: string
    template_writer_name: string
    template_writer_description: string
    template_analyst_name: string
    template_analyst_description: string
    use_template: string
    or_start_scratch: string
    start_blank: string
  }
}

export function TemplateSelector({ onSelectTemplate, translations: t }: TemplateSelectorProps) {
  const getTemplateName = (template: PromptTemplate) => {
    switch (template.id) {
      case 'seo-expert':
        return t.template_seo_name
      case 'code-assistant':
        return t.template_code_name
      case 'creative-writer':
        return t.template_writer_name
      case 'data-analyst':
        return t.template_analyst_name
      default:
        return template.nameKey
    }
  }

  const getTemplateDescription = (template: PromptTemplate) => {
    switch (template.id) {
      case 'seo-expert':
        return t.template_seo_description
      case 'code-assistant':
        return t.template_code_description
      case 'creative-writer':
        return t.template_writer_description
      case 'data-analyst':
        return t.template_analyst_description
      default:
        return template.descriptionKey
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          {t.templates_title}
        </div>
        <p className="text-muted-foreground max-w-lg mx-auto">
          {t.templates_description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROMPT_TEMPLATES.map((template) => {
          const Icon = template.icon
          return (
            <Card
              key={template.id}
              variant="interactive"
              className="group cursor-pointer"
              onClick={() => onSelectTemplate(template)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'p-3 rounded-xl bg-gradient-to-br shrink-0',
                      template.color,
                      'shadow-lg group-hover:shadow-xl transition-shadow'
                    )}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg group-hover:text-brand-primary transition-colors">
                      {getTemplateName(template)}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {getTemplateDescription(template)}
                    </p>
                    <Button
                      variant="link"
                      size="sm"
                      className="px-0 mt-2 text-brand-primary"
                    >
                      {t.use_template}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground mb-3">
          {t.or_start_scratch}
        </p>
        <Button
          variant="outline"
          onClick={() => onSelectTemplate({
            id: 'blank',
            nameKey: 'blank',
            descriptionKey: 'blank',
            icon: Sparkles,
            color: 'from-gray-500 to-gray-600',
            role: '',
            context: '',
            task: '',
            constraints: '',
            examples: '',
          })}
        >
          {t.start_blank}
        </Button>
      </div>
    </div>
  )
}
