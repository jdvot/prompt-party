'use client'

import { Quiz } from '@/components/tutorials/quiz'

export function MultiAgentSystemsQuiz() {
  const questions = [
    {
      question: "Qu'est-ce qu'un système multi-agents ?",
      options: [
        "Utiliser plusieurs IA en même temps sans coordination",
        "Plusieurs agents IA spécialisés qui collaborent pour accomplir une tâche complexe",
        "Un seul agent très puissant",
        "Plusieurs humains qui travaillent ensemble"
      ],
      correctAnswer: 1,
      explanation: "Un système multi-agents est composé de plusieurs agents IA spécialisés, chacun avec son rôle, qui communiquent et collaborent pour accomplir ensemble des tâches complexes qu'un seul agent ne pourrait pas gérer efficacement."
    },
    {
      question: "Quel est l'avantage principal d'un système multi-agents ?",
      options: [
        "C'est plus rapide",
        "Spécialisation : chaque agent excelle dans son domaine",
        "C'est moins cher",
        "Ça fait plus professionnel"
      ],
      correctAnswer: 1,
      explanation: "Le principal avantage est la spécialisation : chaque agent est optimisé pour une tâche spécifique (recherche, analyse, synthèse, vérification), ce qui donne de meilleurs résultats qu'un agent généraliste."
    },
    {
      question: "Comment les agents communiquent-ils entre eux ?",
      options: [
        "Ils ne communiquent pas",
        "Via un orchestrateur ou par passage de messages structurés",
        "Par télépathie",
        "Uniquement par email"
      ],
      correctAnswer: 1,
      explanation: "Les agents communiquent soit via un orchestrateur central qui coordonne leurs actions, soit par passage de messages structurés (souvent en JSON) contenant les résultats de leurs tâches respectives."
    },
    {
      question: "Quel pattern d'orchestration est le plus courant ?",
      options: [
        "Pattern aléatoire",
        "Sequential (chaîne), Parallel (parallèle), ou Hierarchical (hiérarchique)",
        "Pattern circulaire infini",
        "Aucun pattern"
      ],
      correctAnswer: 1,
      explanation: "Les patterns les plus courants sont : Sequential (agents s'exécutent l'un après l'autre), Parallel (agents travaillent simultanément), Hierarchical (agents superviseurs + agents workers), ou Feedback Loop (boucle d'amélioration)."
    },
    {
      question: "Quand utiliser un système multi-agents plutôt qu'un seul agent ?",
      options: [
        "Toujours",
        "Jamais",
        "Quand la tâche est complexe, multi-domaine, et nécessite spécialisation",
        "Uniquement pour impressionner"
      ],
      correctAnswer: 2,
      explanation: "Utilisez multi-agents quand : la tâche requiert expertise multi-domaine, le workflow a des étapes distinctes, la qualité justifie la complexité. Pour des tâches simples, un agent unique suffit."
    }
  ]

  return (
    <Quiz
      tutorialId="multi-agent-systems"
      title="Quiz de validation"
      description="Valide ta maîtrise des systèmes multi-agents"
      questions={questions}
      rewardPoints={150}
      rewardBadge="Expert Certifié 🚀"
    />
  )
}
