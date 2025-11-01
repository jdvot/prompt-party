import { createClient } from '@/lib/supabase/server'
import { FeedContent } from '@/components/feed/feed-content'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Grid } from '@/components/layout/grid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  BookOpenIcon,
  FlaskConicalIcon,
  UsersIcon,
  RocketIcon,
  BrainIcon,
  SparklesIcon,
  ArrowRightIcon,
  TrendingUpIcon,
  AwardIcon,
  ZapIcon
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default async function Home() {
  const supabase = await createClient()

  // Fetch initial prompts with comment counts
  const { data: prompts } = await supabase
    .from('prompts')
    .select(`
      *,
      comments:comments(count)
    `)
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(10)

  // Fetch profiles
  if (prompts && prompts.length > 0) {
    const authorIds = [...new Set(prompts.map(p => p.author))]
    const { data: profiles } = await supabase
      .from('profiles')
      .select('user_id, name, avatar_url')
      .in('user_id', authorIds)

    if (profiles) {
      const profileMap = new Map(profiles.map(p => [p.user_id, p]))
      prompts.forEach((p: any) => {
        p.profiles = profileMap.get(p.author)
        p.comments_count = p.comments?.[0]?.count || 0
      })
    }
  }

  // Get stats
  const { count: totalPrompts } = await supabase
    .from('prompts')
    .select('*', { count: 'exact', head: true })
    .eq('is_public', true)

  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  const learningPaths = [
    {
      title: 'Débutant',
      description: 'Découvre les bases du prompting et apprends à communiquer efficacement avec l\'IA',
      duration: '~2h',
      lessons: '5 leçons',
      icon: BookOpenIcon,
      color: 'from-green-500 to-emerald-600',
      link: '/tutorials/paths/beginner'
    },
    {
      title: 'Intermédiaire',
      description: 'Maîtrise les techniques avancées et explore MCP, RAG et les agents IA',
      duration: '~4h',
      lessons: '8 leçons',
      icon: BrainIcon,
      color: 'from-violet-500 to-purple-600',
      link: '/tutorials/paths/expert'
    },
    {
      title: 'Avancé',
      description: 'Deviens expert en systèmes multi-agents et optimisation de prompts',
      duration: '~6h',
      lessons: '10 leçons',
      icon: RocketIcon,
      color: 'from-orange-500 to-red-600',
      link: '/tutorials/paths/pro'
    }
  ]

  const concepts = [
    {
      title: 'MCP vs RAG',
      description: 'Comprends la différence entre ces deux approches IA',
      icon: '🧠',
      link: '/mcp-vs-rag'
    },
    {
      title: 'Prompt Wizard',
      description: 'Crée des prompts optimisés avec notre assistant IA',
      icon: '✨',
      link: '/prompts/wizard'
    },
    {
      title: 'Playground',
      description: 'Teste tes prompts sur GPT, Claude et Gemini',
      icon: '🧪',
      link: '/prompts/wizard'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <Section variant="gradient" spacing="xl">
        <Container size="lg">
          <div className="text-center max-w-4xl mx-auto space-y-8 py-12">
            <Badge variant="soft" className="mb-4">
              <SparklesIcon className="w-3 h-3 mr-1" />
              100% Gratuit
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-clip-text text-transparent">
                Apprends à parler à l'IA
              </span>
              <br />
              <span className="text-foreground">comme un pro</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Cours interactifs, exemples concrets, communauté bienveillante.<br />
              Maîtrise le prompting en quelques heures.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/tutorials/paths/beginner"
                className={cn(buttonVariants({ size: "lg" }), "min-w-[200px]")}
              >
                Commencer gratuitement
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/tutorials"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "min-w-[200px]")}
              >
                Explorer les cours
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  {totalUsers || 0}+
                </div>
                <div className="text-sm text-muted-foreground mt-1">Apprenants</div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  {totalPrompts || 0}+
                </div>
                <div className="text-sm text-muted-foreground mt-1">Prompts partagés</div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  100%
                </div>
                <div className="text-sm text-muted-foreground mt-1">Gratuit</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3 Cartes Principales */}
      <Section spacing="xl">
        <Container size="lg">
          <Grid cols={3} gap="lg">
            <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpenIcon className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-2xl">📚 Apprendre</CardTitle>
                <CardDescription className="text-base">
                  Parcours guidés de débutant à expert
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <li>• Cours interactifs avec quiz</li>
                  <li>• Exemples concrets</li>
                  <li>• Certificats de complétion</li>
                </ul>
                <Link
                  href="/tutorials"
                  className={cn(buttonVariants({ variant: "ghost" }), "w-full group/btn")}
                >
                  Commencer
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FlaskConicalIcon className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-2xl">🧪 Expérimenter</CardTitle>
                <CardDescription className="text-base">
                  Teste tes prompts en temps réel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <li>• Comparaison GPT vs Claude vs Gemini</li>
                  <li>• Templates pré-remplis</li>
                  <li>• 20 tests gratuits/mois</li>
                </ul>
                <Link
                  href="/prompts/wizard"
                  className={cn(buttonVariants({ variant: "ghost" }), "w-full group/btn")}
                >
                  Essayer
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UsersIcon className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-2xl">💬 Communauté</CardTitle>
                <CardDescription className="text-base">
                  Partage et apprends avec les autres
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <li>• Challenges hebdomadaires</li>
                  <li>• Entraide bienveillante</li>
                  <li>• Badges et progression</li>
                </ul>
                <Link
                  href="/challenges"
                  className={cn(buttonVariants({ variant: "ghost" }), "w-full group/btn")}
                >
                  Rejoindre
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Parcours d'apprentissage */}
      <Section spacing="xl" className="bg-muted/30">
        <Container size="lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choisis ton parcours
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des cours structurés pour passer de débutant à expert, à ton rythme
            </p>
          </div>

          <Grid cols={3} gap="lg">
            {learningPaths.map((path) => {
              const Icon = path.icon
              return (
                <Card key={path.title} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle>{path.title}</CardTitle>
                    <CardDescription>{path.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>{path.lessons}</span>
                      <span>{path.duration}</span>
                    </div>
                    <Link
                      href={path.link}
                      className={cn(buttonVariants({ variant: "outline" }), "w-full")}
                    >
                      Commencer
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </Grid>
        </Container>
      </Section>

      {/* Concepts clés */}
      <Section spacing="xl">
        <Container size="lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Concepts clés expliqués
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprends les fondamentaux de l'IA avec des explications simples
            </p>
          </div>

          <Grid cols={3} gap="lg">
            {concepts.map((concept) => (
              <Link
                key={concept.title}
                href={concept.link}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl mb-4">{concept.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {concept.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {concept.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Prompts Communautaires */}
      <Section spacing="xl" className="bg-muted/30">
        <Container size="lg">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Prompts de la communauté
              </h2>
              <p className="text-muted-foreground">
                Découvre les meilleurs prompts partagés par les apprenants
              </p>
            </div>
            <Link href="/trending" className={cn(buttonVariants({ variant: "outline" }))}>
              Voir tout
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <FeedContent initialPrompts={prompts || []} />
          </div>
        </Container>
      </Section>

      {/* CTA Final */}
      <Section spacing="xl" variant="gradient">
        <Container size="md">
          <Card className="border-2 border-primary/20 bg-background/95 backdrop-blur">
            <CardContent className="p-12 text-center">
              <AwardIcon className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h3 className="text-3xl font-bold mb-4">
                Prêt à devenir un expert du prompting ?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Rejoins des milliers d'apprenants qui maîtrisent déjà l'IA.
                Commence gratuitement dès maintenant.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/tutorials/paths/beginner"
                  className={cn(buttonVariants({ size: "lg" }), "min-w-[200px]")}
                >
                  Commencer gratuitement
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  href="/about"
                  className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "min-w-[200px]")}
                >
                  En savoir plus
                </Link>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </>
  )
}
