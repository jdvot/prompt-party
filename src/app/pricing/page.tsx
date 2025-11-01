import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { CheckIcon, HeartIcon, SparklesIcon } from 'lucide-react'
import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { cn } from '@/lib/utils'

export async function generateMetadata() {
  return {
    title: 'Soutenir le projet | Prompt Party',
    description: 'Soutiens le projet Prompt Party et aide-nous à garder l\'éducation IA gratuite pour tous',
  }
}

export default function PricingPage() {
  const freePlan = {
    name: 'Gratuit',
    price: '0€',
    period: 'toujours',
    description: 'Tout ce dont tu as besoin pour apprendre l\'IA',
    features: [
      'Tous les parcours d\'apprentissage',
      'Tous les tutoriels et concepts',
      'Playground (20 tests/mois)',
      'Bibliothèque de prompts complète',
      'Challenges et leaderboard',
      'Communauté et forum',
      'Collections et bookmarks',
      'Certificats de complétion'
    ]
  }

  const supportPlan = {
    name: 'Soutien',
    price: '5€',
    period: 'mois',
    description: 'Soutiens le projet et aide-nous à rester gratuit',
    features: [
      'Tout du plan Gratuit +',
      'Badge "Supporter" 💎',
      'Tests playground illimités',
      'Vidéos bonus exclusives',
      'Accès early aux nouveautés',
      'Ton nom dans les crédits',
      'Sentiment de faire le bien 💚',
      'Notre gratitude éternelle'
    ]
  }

  return (
    <>
      {/* Hero Section */}
      <Section variant="gradient" spacing="xl">
        <Container size="lg">
          <div className="text-center animate-fade-in-up">
            <Badge variant="soft" className="mb-4">
              <HeartIcon className="w-3 h-3 mr-1" />
              100% Gratuit
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              L'éducation IA doit rester <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">gratuite</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tous nos cours, tutoriels et outils sont 100% gratuits. Si tu souhaites soutenir le projet, voici comment aider.
            </p>
          </div>
        </Container>
      </Section>

      {/* Pricing Cards */}
      <Section spacing="xl">
        <Container size="lg">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="relative border-2">
              <CardHeader>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 mb-4">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl mb-2">{freePlan.name}</CardTitle>
                <div className="mb-3">
                  <span className="text-5xl font-bold">{freePlan.price}</span>
                  <span className="text-muted-foreground ml-2">
                    / {freePlan.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {freePlan.description}
                </p>
              </CardHeader>

              <CardContent>
                <Link
                  href="/auth/signup"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full mb-6")}
                >
                  Commencer gratuitement
                </Link>

                <ul className="space-y-3">
                  {freePlan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 flex-shrink-0 mt-0.5">
                        <CheckIcon className="w-3 h-3 text-primary" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Support Plan */}
            <Card className="relative border-2 border-primary shadow-xl scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-1 shadow-md">
                  Recommandé
                </Badge>
              </div>

              <CardHeader className="pt-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 mb-4">
                  <HeartIcon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl mb-2">{supportPlan.name}</CardTitle>
                <div className="mb-3">
                  <span className="text-5xl font-bold">{supportPlan.price}</span>
                  <span className="text-muted-foreground ml-2">
                    / {supportPlan.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {supportPlan.description}
                </p>
              </CardHeader>

              <CardContent>
                <Link
                  href="/auth/signup?plan=support"
                  className={cn(buttonVariants({ size: "lg" }), "w-full mb-6")}
                >
                  Soutenir le projet
                </Link>

                <ul className="space-y-3">
                  {supportPlan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 flex-shrink-0 mt-0.5">
                        <CheckIcon className="w-3 h-3 text-primary" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Why Support Section */}
      <Section spacing="xl" className="bg-muted/30">
        <Container size="md">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Pourquoi ton soutien compte
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-lg">💚 Garder l'éducation gratuite</h3>
                <p className="text-muted-foreground">
                  Ton soutien nous permet de maintenir tous les cours, tutoriels et outils 100% gratuits pour tout le monde, sans publicité.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-lg">🚀 Créer du nouveau contenu</h3>
                <p className="text-muted-foreground">
                  Nous investissons dans de nouveaux parcours, tutoriels vidéo, webinaires et outils pour la communauté.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-lg">🌍 Rendre l'IA accessible</h3>
                <p className="text-muted-foreground">
                  Nous vulgarisons l'IA en français pour la rendre accessible à tous, sans barrière de langue ou de prix.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-lg">⚡ Améliorer la plateforme</h3>
                <p className="text-muted-foreground">
                  Serveurs, outils de développement, intégrations API - tout ça a un coût que ton soutien couvre.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section spacing="xl">
        <Container size="md">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Questions fréquentes
            </h2>
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-lg">C'est vraiment gratuit pour toujours ?</h3>
                <p className="text-muted-foreground">
                  Oui. Tous les cours, tutoriels, outils et fonctionnalités principales restent 100% gratuits, sans limite de temps. C'est notre engagement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-lg">Puis-je annuler mon soutien ?</h3>
                <p className="text-muted-foreground">
                  Bien sûr ! Tu peux annuler à tout moment, sans engagement. Tu conserves tes avantages jusqu'à la fin de ton mois en cours.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-lg">Y a-t-il d'autres moyens de soutenir ?</h3>
                <p className="text-muted-foreground">
                  Oui ! Partage la plateforme, contribue des prompts, aide dans le forum, ou fais un don ponctuel. Chaque contribution compte.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-lg">Que se passe-t-il si je ne peux pas payer ?</h3>
                <p className="text-muted-foreground">
                  Rien ne change ! Tout reste gratuit et accessible. Le soutien est 100% optionnel et n'affecte pas l'accès au contenu éducatif.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section spacing="xl" variant="gradient">
        <Container size="md">
          <Card className="border-2 border-primary/20 bg-background/95 backdrop-blur">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-bold mb-3">Prêt à commencer ?</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Rejoins des milliers d'apprenants dès aujourd'hui
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/auth/signup" className={cn(buttonVariants({ size: "lg" }))}>
                  Commencer gratuitement
                </Link>
                <Link href="/tutorials" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                  Explorer les cours
                </Link>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </>
  )
}
