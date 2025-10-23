import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Code, Database, Zap, ArrowRight, CheckCircle2, XCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'MCP vs RAG : Comprendre les Différences | Prompt Party',
  description: 'Guide complet pour comprendre les différences entre MCP (Model Context Protocol) et RAG (Retrieval-Augmented Generation)',
}

export default function MCPvsRAGPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glow-on-hover text-sm font-medium mb-4">
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="gradient-text font-semibold">Guide Technique</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          MCP vs RAG
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Comprendre les différences entre deux paradigmes fondamentaux de l'IA moderne
        </p>
      </div>

      {/* Quick Comparison */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* RAG Card */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-blue-600" />
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Database className="w-6 h-6 text-blue-500" />
              </div>
              <CardTitle className="text-2xl">RAG</CardTitle>
            </div>
            <CardDescription className="text-base">
              Retrieval-Augmented Generation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">
              <strong>C'est comme donner un livre ouvert à l'IA</strong> avec les pages pertinentes déjà trouvées.
            </p>

            <div>
              <p className="text-sm font-semibold mb-2">🎯 Pour quoi ?</p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Chercher dans des documents</li>
                <li>• Base de connaissances</li>
                <li>• Support client avec doc</li>
                <li>• Réponses avec sources</li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Forces
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary" className="text-xs">Données à jour</Badge>
                <Badge variant="secondary" className="text-xs">Sources traçables</Badge>
                <Badge variant="secondary" className="text-xs">Moins cher</Badge>
                <Badge variant="secondary" className="text-xs">Scalable</Badge>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-500" />
                Limites
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="outline" className="text-xs">Lecture seule</Badge>
                <Badge variant="outline" className="text-xs">Pas d'actions</Badge>
                <Badge variant="outline" className="text-xs">Latence recherche</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MCP Card */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-purple-600" />
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Zap className="w-6 h-6 text-purple-500" />
              </div>
              <CardTitle className="text-2xl">MCP</CardTitle>
            </div>
            <CardDescription className="text-base">
              Model Context Protocol
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">
              <strong>C'est comme donner une boîte à outils à l'IA</strong> qu'elle peut utiliser pour agir.
            </p>

            <div>
              <p className="text-sm font-semibold mb-2">🎯 Pour quoi ?</p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Exécuter des actions</li>
                <li>• Appeler des APIs</li>
                <li>• Modifier des données</li>
                <li>• Automatiser des workflows</li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Forces
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary" className="text-xs">Actions réelles</Badge>
                <Badge variant="secondary" className="text-xs">APIs externes</Badge>
                <Badge variant="secondary" className="text-xs">Temps réel</Badge>
                <Badge variant="secondary" className="text-xs">Extensible</Badge>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-500" />
                Limites
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="outline" className="text-xs">Sécurité critique</Badge>
                <Badge variant="outline" className="text-xs">Plus complexe</Badge>
                <Badge variant="outline" className="text-xs">Coûts APIs</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analogie */}
      <Card className="mb-12 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💡 Analogie simple
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="font-semibold mb-2 text-blue-600 dark:text-blue-400">
              📚 RAG = Bibliothèque
            </p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• L'IA peut <strong>lire</strong> tous les livres</li>
              <li>• Elle trouve les passages pertinents</li>
              <li>• Elle cite ses sources</li>
              <li>• Mais elle ne peut rien <strong>modifier</strong></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2 text-purple-600 dark:text-purple-400">
              🔧 MCP = Atelier
            </p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• L'IA a des <strong>outils</strong></li>
              <li>• Elle peut <strong>construire</strong> des choses</li>
              <li>• Elle peut <strong>agir</strong> sur le monde</li>
              <li>• Mais elle n'a pas de mémoire longue</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Comparaison détaillée</CardTitle>
          <CardDescription>Les critères techniques</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Critère</th>
                  <th className="text-left py-3 px-4">
                    <span className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-blue-500" />
                      RAG
                    </span>
                  </th>
                  <th className="text-left py-3 px-4">
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-500" />
                      MCP
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Nature', rag: 'Données statiques', mcp: 'Outils dynamiques' },
                  { label: 'Action', rag: 'Lecture seule', mcp: 'Lecture + Écriture' },
                  { label: 'Latence', rag: 'Moyenne', mcp: 'Variable' },
                  { label: 'Complexité', rag: 'Moyenne', mcp: 'Élevée' },
                  { label: 'Scalabilité', rag: 'Excellente', mcp: 'Bonne' },
                  { label: 'Sécurité', rag: 'Faible risque', mcp: 'Haut risque' },
                  { label: 'Temps réel', rag: 'Non', mcp: 'Oui' },
                  { label: 'Sources', rag: 'Traçables', mcp: 'N/A' },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-3 px-4 font-medium">{row.label}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.rag}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.mcp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Use Cases */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Exemples RAG</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-semibold mb-1">🎧 Chatbot support</p>
              <p className="text-muted-foreground">Répondre aux questions avec la documentation produit</p>
            </div>
            <div>
              <p className="font-semibold mb-1">⚖️ Assistant juridique</p>
              <p className="text-muted-foreground">Recherche dans 10,000+ documents légaux</p>
            </div>
            <div>
              <p className="font-semibold mb-1">📚 Base de connaissances</p>
              <p className="text-muted-foreground">Employés cherchent dans Confluence/Notion</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Exemples MCP</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-semibold mb-1">💻 Assistant dev</p>
              <p className="text-muted-foreground">Créer des PRs, lire des issues, déployer</p>
            </div>
            <div>
              <p className="font-semibold mb-1">🛒 E-commerce</p>
              <p className="text-muted-foreground">Chercher produits, créer commandes, suivre livraisons</p>
            </div>
            <div>
              <p className="font-semibold mb-1">✅ Gestionnaire de tâches</p>
              <p className="text-muted-foreground">Créer tâches, envoyer notifs, générer rapports</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hybrid Approach */}
      <Card className="mb-12 bg-gradient-to-br from-green-500/5 to-transparent border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🚀 La vraie puissance : RAG + MCP
          </CardTitle>
          <CardDescription>
            Combinez les deux pour des cas d'usage avancés
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-background rounded-lg p-4 border">
            <p className="font-semibold mb-2">Exemple : Assistant RH</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-blue-600 dark:text-blue-400">RAG :</strong> Cherche dans les politiques RH
              </p>
              <p>
                <strong className="text-purple-600 dark:text-purple-400">MCP :</strong> Crée une demande de congé
              </p>
              <p className="pt-2 border-t">
                <strong>Question :</strong> "Combien de jours de congé me reste-t-il ?"
              </p>
              <p>
                <strong>Réponse :</strong> "Selon notre politique (RAG), vous avez droit à 25 jours.
                Il vous reste 12 jours cette année (MCP → API RH)."
              </p>
            </div>
          </div>

          <div className="bg-background rounded-lg p-4 border">
            <p className="font-semibold mb-2">Exemple : Analyste financier IA</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-blue-600 dark:text-blue-400">RAG :</strong> Rapports financiers historiques
              </p>
              <p>
                <strong className="text-purple-600 dark:text-purple-400">MCP :</strong> Prix actions temps réel
              </p>
              <p className="pt-2 border-t">
                <strong>Question :</strong> "Analyse AAPL et compare aux derniers trimestres"
              </p>
              <p>
                <strong>Réponse :</strong> Synthèse avec contexte historique (RAG) + données live (MCP)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Decision Tree */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Comment choisir ?</CardTitle>
          <CardDescription>Arbre de décision simple</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="font-semibold mb-3">
                ❓ Avez-vous besoin d'ACTIONS (modifier/créer/supprimer) ?
              </p>
              <div className="ml-4 space-y-3">
                <div>
                  <p className="font-medium text-green-600 dark:text-green-400">✅ OUI → MCP</p>
                  <p className="ml-4 text-sm text-muted-foreground">
                    Aussi besoin de chercher dans des docs ?
                  </p>
                  <div className="ml-8 space-y-1 text-sm">
                    <p className="text-green-600 dark:text-green-400">✅ OUI → MCP + RAG</p>
                    <p className="text-muted-foreground">❌ NON → MCP seul</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium text-blue-600 dark:text-blue-400">❌ NON → Besoin de chercher dans docs ?</p>
                  <div className="ml-8 space-y-1 text-sm">
                    <p className="text-blue-600 dark:text-blue-400">✅ OUI → RAG</p>
                    <p className="text-muted-foreground">❌ NON → LLM simple</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center">
        <Link href="/prompts/wizard">
          <Button size="lg" className="gap-2">
            <Code className="w-5 h-5" />
            Créer un prompt optimisé
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <p className="text-sm text-muted-foreground mt-4">
          Utilisez notre wizard pour créer des prompts RAG ou MCP
        </p>
      </div>
    </div>
  )
}
