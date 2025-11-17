import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CodeBlock } from '@/components/tutorials/code-block'
import { TutorialLayout } from '@/components/tutorials/tutorial-layout'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.prompt_templates')

  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function PromptTemplatesTutorial() {
  const t = await getTranslations('tutorials.prompt_templates')
  const tCommon = await getTranslations('tutorials')

  return (
    <TutorialLayout
      tutorialId="prompt-templates"
      level="beginner"
      title={t('title')}
      subtitle={t('subtitle')}
      badge={t('badge_beginner')}
      duration={t('duration')}
      objectives={[
        t('learn_what'),
        t('learn_create'),
        t('learn_common'),
        t('learn_customize'),
      ]}
      rewardBadge={t('reward_badge')}
      whatYouLearnTitle={tCommon('what_you_learn')}
    containerSize="xl"
    >
        {/* Section 2 */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('template_structure')}</h2>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>{t('anatomy')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{t('anatomy_1')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('anatomy_1_desc')}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">{t('anatomy_2')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('anatomy_2_desc')}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">{t('anatomy_3')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('anatomy_3_desc')}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">{t('anatomy_4')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('anatomy_4_desc')}
                </p>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Icons.Lightbulb className="w-4 h-4" />
            <AlertDescription>
              <strong>{tCommon('pro_tip')}:</strong> {t('placeholder_tip')}
            </AlertDescription>
          </Alert>
        </section>

        {/* Section 3: Ready-to-Use Templates */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('ready_to_use')}</h2>

          <div className="space-y-6">
            {/* Email Template */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icons.Mail className="w-5 h-5 text-blue-500" />
                  {t('email_template')}
                </CardTitle>
                <CardDescription>{t('email_desc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="text"
                  code={`Write a professional email to [RECIPIENT] about [TOPIC].

Tone: [FORMAL/FRIENDLY/URGENT]
Purpose: [INFORM/REQUEST/THANK/APOLOGIZE]
Key points to include:
- [POINT 1]
- [POINT 2]
- [POINT 3]

Include:
- Appropriate greeting
- Clear subject line
- Professional closing
- Keep it under [WORD COUNT] words`}
                />
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm font-semibold mb-2">{t('email_example')}</p>
                  <p className="text-sm text-muted-foreground">
                    Write a professional email to <strong>our design team</strong> about <strong>the new branding guidelines</strong>. Tone: <strong>Friendly</strong>. Purpose: <strong>Inform</strong>...
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Code Review Template */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icons.Code className="w-5 h-5 text-green-500" />
                  {t('code_review')}
                </CardTitle>
                <CardDescription>{t('code_review_desc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="text"
                  code={`Review this [LANGUAGE] code for [PURPOSE].

Focus on:
- Code quality and best practices
- Potential bugs or issues
- Performance optimizations
- Security concerns
- [SPECIFIC ASPECT]

Provide:
1. Overall assessment
2. Specific issues found (with line references if possible)
3. Suggested improvements with code examples
4. Security or performance recommendations

Code to review:
\`\`\`[LANGUAGE]
[YOUR CODE HERE]
\`\`\``}
                />
              </CardContent>
            </Card>

            {/* Content Summary Template */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icons.FileText className="w-5 h-5 text-purple-500" />
                  {t('content_summary')}
                </CardTitle>
                <CardDescription>{t('content_summary_desc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="text"
                  code={`Summarize the following [TYPE: article/meeting/document/video transcript]:

Title: [TITLE]

Target audience: [WHO WILL READ THIS]
Desired length: [BRIEF/MODERATE/DETAILED]

Include:
- Main topics covered
- Key takeaways ([NUMBER] most important points)
- Action items (if any)
- [SPECIFIC ASPECT TO HIGHLIGHT]

Format as:
- Executive summary (2-3 sentences)
- Key points (bullet list)
- Action items (if applicable)

Content to summarize:
[PASTE CONTENT HERE]`}
                />
              </CardContent>
            </Card>

            {/* Social Media Template */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icons.Share2 className="w-5 h-5 text-cyan-500" />
                  {t('social_media')}
                </CardTitle>
                <CardDescription>{t('social_media_desc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="text"
                  code={`Create a [PLATFORM: Twitter/LinkedIn/Instagram/Facebook] post about [TOPIC].

Tone: [PROFESSIONAL/CASUAL/ENTHUSIASTIC/EDUCATIONAL]
Goal: [INFORM/ENGAGE/PROMOTE/EDUCATE]

Key message: [MAIN MESSAGE]

Include:
- Attention-grabbing hook
- [NUMBER] relevant hashtags
- Call-to-action: [WHAT YOU WANT PEOPLE TO DO]
- Character limit: [LIMIT] (if applicable)

Additional context:
[ANY RELEVANT BACKGROUND INFO]`}
                />
              </CardContent>
            </Card>

            {/* Learning/Tutorial Template */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icons.GraduationCap className="w-5 h-5 text-orange-500" />
                  {t('learning_tutorial')}
                </CardTitle>
                <CardDescription>{t('learning_desc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="text"
                  code={`Explain [CONCEPT/TOPIC] to someone with [KNOWLEDGE LEVEL: beginner/intermediate/advanced] knowledge.

Format as a tutorial with:
1. Brief introduction (what it is and why it matters)
2. Key concepts explained simply
3. [NUMBER] practical examples
4. Step-by-step guide if applicable
5. Common mistakes to avoid
6. Next steps for further learning

Use:
- Simple language
- Real-world analogies
- Code examples (if technical topic)
- Visual descriptions where helpful

Focus on: [SPECIFIC ASPECT]`}
                />
              </CardContent>
            </Card>

            {/* Problem-Solving Template */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icons.Lightbulb className="w-5 h-5 text-yellow-500" />
                  {t('problem_solving')}
                </CardTitle>
                <CardDescription>{t('problem_solving_desc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="text"
                  code={`Help me solve this problem: [PROBLEM STATEMENT]

Context:
- Current situation: [DESCRIBE]
- Constraints: [LIST ANY LIMITATIONS]
- Goal: [WHAT SUCCESS LOOKS LIKE]
- Resources available: [WHAT YOU HAVE]

Please provide:
1. Problem analysis (break down the core issues)
2. [NUMBER] potential solutions (with pros/cons for each)
3. Recommended approach with reasoning
4. Step-by-step implementation plan
5. Potential risks and how to mitigate them

Additional information:
[ANY RELEVANT BACKGROUND]`}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 4: Customizing Templates */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('customizing')}</h2>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>{t('tips_adaptation')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Icons.Settings className="w-4 h-4 text-primary" />
                  {t('mix_match')}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t('mix_match_desc')}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Icons.Layers className="w-4 h-4 text-primary" />
                  {t('domain_specific')}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t('domain_desc')}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Icons.Save className="w-4 h-4 text-primary" />
                  {t('save_best')}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t('save_desc')}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Icons.Users className="w-4 h-4 text-primary" />
                  {t('share_team')}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t('share_desc')}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 5: Advanced Template Techniques */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('advanced_techniques')}</h2>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('nested_templates')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {t('nested_desc')}
                </p>
                <CodeBlock
                  language="text"
                  code={`Create a [PROJECT TYPE] with the following components:

1. Component A:
   [Use Template A with parameters X, Y, Z]

2. Component B:
   [Use Template B with parameters...]

3. Integration:
   [Specify how components work together]`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('conditional_templates')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {t('conditional_desc')}
                </p>
                <CodeBlock
                  language="text"
                  code={`[TASK DESCRIPTION]

Required sections:
- [ALWAYS INCLUDE THIS]

Optional (include if relevant):
- [IF TECHNICAL: Include code examples]
- [IF FOR BEGINNERS: Use simple language and analogies]
- [IF URGENT: Prioritize quick solutions over perfect ones]`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('template_variables')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {t('variables_desc')}
                </p>
                <CodeBlock
                  language="text"
                  code={`[TASK]

Tone: [TONE, default: professional]
Length: [LENGTH, default: 500 words]
Format: [FORMAT, default: markdown]
Audience: [AUDIENCE, default: general readers]`}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Practice Exercise */}
        <section>
          <Card className="bg-gradient-to-r from-violet-600/10 to-violet-600/10 border-violet-600/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.BookOpen className="w-5 h-5 text-primary" />
                {tCommon('practice_exercise')}
              </CardTitle>
              <CardDescription>{t('create_your_own')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {t('practice_text')}
              </p>

              <ol className="text-sm space-y-3">
                <li className="flex gap-2">
                  <span className="font-semibold">1.</span>
                  <span>{t('step_1')}</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">2.</span>
                  <span>{t('step_2')}</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">3.</span>
                  <span>{t('step_3')}</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">4.</span>
                  <span>{t('step_4')}</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">5.</span>
                  <span>{t('step_5')}</span>
                </li>
              </ol>

              <Alert>
                <Icons.Rocket className="w-4 h-4" />
                <AlertDescription>
                  <strong>{t('challenge')}</strong> {t('challenge_text')}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </section>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-violet-600/10 to-violet-600/10 border-violet-600/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.Lightbulb className="w-5 h-5 text-primary" />
              {tCommon('next_steps')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/tutorials/advanced-prompting" className={cn(buttonVariants())}>
                {t('next_advanced_prompting')}
              </Link>
              <Link href="/prompts/wizard" className={cn(buttonVariants({ variant: "outline" }))}>
                {t('next_wizard')}
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold mb-2">{tCommon('keep_learning')}</p>
              <ul className="space-y-1">
                <li>• <Link href="/prompts" className="text-primary hover:underline">{t('browse_templates')}</Link></li>
                <li>• <Link href="/teams" className="text-primary hover:underline">{t('share_with_team')}</Link></li>
                <li>• <Link href="/challenges" className="text-primary hover:underline">{t('join_challenge')}</Link></li>
              </ul>
            </div>
          </CardContent>
        </Card>
  
    </TutorialLayout>
  )
}

