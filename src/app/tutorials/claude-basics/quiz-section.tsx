'use client'

import { Quiz } from '@/components/tutorials/quiz'

export function ClaudeBasicsQuiz() {
  const questions = [
    {
      question: "Quelle est la principale différence de Claude par rapport aux autres IA ?",
      options: [
        "Il est plus rapide",
        "Il excelle dans les conversations longues et complexes avec une fenêtre de contexte étendue",
        "Il est gratuit",
        "Il ne fait que de la génération de code"
      ],
      correctAnswer: 1,
      explanation: "Claude se distingue par sa capacité à gérer des conversations longues et complexes grâce à une fenêtre de contexte très étendue (jusqu'à 200k tokens), ce qui lui permet de maintenir le fil d'une discussion approfondie."
    },
    {
      question: "Qu'est-ce qui caractérise le style de réponse de Claude ?",
      options: [
        "Très court et concis",
        "Uniquement technique",
        "Nuancé, détaillé et conversationnel",
        "Toujours en bullet points"
      ],
      correctAnswer: 2,
      explanation: "Claude est connu pour son style nuancé et conversationnel. Il fournit des réponses détaillées, prend en compte les subtilités et peut ajuster son ton selon le contexte."
    },
    {
      question: "Pourquoi la fenêtre de contexte étendue de Claude est-elle importante ?",
      options: [
        "Pour rendre les réponses plus courtes",
        "Pour analyser de longs documents, maintenir des conversations complexes et garder la cohérence",
        "Pour générer plus de code",
        "Pour répondre plus rapidement"
      ],
      correctAnswer: 1,
      explanation: "Une grande fenêtre de contexte permet à Claude d'analyser de très longs documents (rapports, livres), de maintenir des conversations complexes sur plusieurs échanges sans perdre le fil, et de garder une cohérence dans ses réponses."
    },
    {
      question: "Quelle bonne pratique améliore significativement les réponses de Claude ?",
      options: [
        "Utiliser uniquement des prompts très courts",
        "Ne jamais donner d'exemples",
        "Donner du contexte détaillé et structurer clairement la demande",
        "Poser plusieurs questions différentes en même temps"
      ],
      correctAnswer: 2,
      explanation: "Claude fonctionne mieux avec du contexte riche et des demandes bien structurées. Plus vous êtes clair sur ce que vous attendez et pourquoi, meilleure sera la réponse."
    },
    {
      question: "Dans quel domaine Claude excelle-t-il particulièrement ?",
      options: [
        "Uniquement les mathématiques",
        "L'analyse de documents longs, la rédaction nuancée et les conversations complexes",
        "Uniquement la génération d'images",
        "Uniquement les traductions"
      ],
      correctAnswer: 1,
      explanation: "Claude excelle dans l'analyse de documents longs (contrats, rapports), la rédaction nuancée (articles, essais), et les conversations complexes nécessitant de maintenir le contexte sur de nombreux échanges."
    }
  ]

  return (
    <Quiz
      tutorialId="claude-basics"
      title="Quiz de validation"
      description="Teste tes connaissances sur Claude et ses particularités"
      questions={questions}
      rewardPoints={50}
      rewardBadge="Premier Pas ✨"
    />
  )
}
