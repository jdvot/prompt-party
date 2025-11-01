'use client'

import { Quiz } from '@/components/tutorials/quiz'

export function ClaudeAgentsQuiz() {
  const questions = [
    {
      question: "Qu'est-ce qu'un agent IA ?",
      options: [
        "Un simple chatbot",
        "Un système IA autonome capable d'exécuter des tâches et prendre des décisions",
        "Un humain qui utilise l'IA",
        "Un plugin pour navigateur"
      ],
      correctAnswer: 1,
      explanation: "Un agent IA est un système autonome qui peut analyser une situation, planifier des actions, utiliser des outils, et exécuter des tâches de manière semi-autonome pour atteindre un objectif."
    },
    {
      question: "Quelle est la différence entre un prompt simple et un agent ?",
      options: [
        "Il n'y a pas de différence",
        "L'agent peut utiliser des outils, maintenir un état, et exécuter plusieurs étapes",
        "L'agent est toujours meilleur",
        "Le prompt est plus rapide"
      ],
      correctAnswer: 1,
      explanation: "Un prompt simple donne une réponse directe. Un agent peut utiliser des outils (API, bases de données), maintenir un contexte/état, planifier et exécuter plusieurs étapes pour accomplir une tâche complexe."
    },
    {
      question: "Quels sont les composants essentiels d'un agent Claude ?",
      options: [
        "Uniquement le prompt",
        "Prompt système + Outils (tools) + Boucle de raisonnement",
        "Juste une API",
        "Un prompt très long"
      ],
      correctAnswer: 1,
      explanation: "Un agent Claude nécessite : 1) Un prompt système définissant son rôle et objectifs, 2) Des outils qu'il peut utiliser (function calling), 3) Une boucle permettant le raisonnement et l'exécution itérative."
    },
    {
      question: "Qu'est-ce que le 'function calling' dans Claude ?",
      options: [
        "Appeler des fonctions JavaScript",
        "Permettre à Claude de décider quand et comment utiliser des outils externes",
        "Une erreur de code",
        "Une fonction spéciale de Python"
      ],
      correctAnswer: 1,
      explanation: "Le function calling permet à Claude de décider de façon autonome quand utiliser des outils externes (appels API, requêtes DB, calculs), avec quels paramètres, et comment interpréter les résultats."
    },
    {
      question: "Quel cas d'usage est idéal pour un agent Claude ?",
      options: [
        "Répondre à une question simple",
        "Rechercher des infos, analyser des données, et générer un rapport complet",
        "Afficher l'heure",
        "Traduire un mot"
      ],
      correctAnswer: 1,
      explanation: "Les agents excellent dans les tâches multi-étapes comme : rechercher des informations via APIs, analyser et croiser des données, prendre des décisions basées sur les résultats, et générer un livrable final."
    }
  ]

  return (
    <Quiz
      tutorialId="claude-agents"
      title="Quiz de validation"
      description="Teste ta compréhension des agents Claude"
      questions={questions}
      rewardPoints={150}
      rewardBadge="Expert Certifié 🚀"
    />
  )
}
