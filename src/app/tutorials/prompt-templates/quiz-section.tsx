'use client'

import { Quiz } from '@/components/tutorials/quiz'

export function PromptTemplatesQuiz() {
  const questions = [
    {
      question: "Pourquoi utiliser des templates de prompts ?",
      options: [
        "Pour gagner du temps et assurer la cohérence",
        "Parce que c'est obligatoire",
        "Pour impressionner l'IA",
        "Pour rendre les prompts plus longs"
      ],
      correctAnswer: 0,
      explanation: "Les templates permettent de gagner du temps, d'assurer la cohérence des prompts, et de réutiliser des structures qui fonctionnent bien."
    },
    {
      question: "Qu'est-ce qu'une bonne structure de template ?",
      options: [
        "Juste le texte final attendu",
        "Contexte + Tâche + Variables + Format de sortie",
        "Uniquement des variables",
        "Un prompt très long et compliqué"
      ],
      correctAnswer: 1,
      explanation: "Un bon template structure clairement : le contexte, la tâche à accomplir, les variables à remplacer, et le format de sortie attendu."
    },
    {
      question: "Comment bien utiliser les variables dans un template ?",
      options: [
        "Les mettre n'importe où",
        "Les identifier clairement (ex: [VARIABLE]) et documenter leur usage",
        "Éviter d'en utiliser",
        "Les cacher dans le texte"
      ],
      correctAnswer: 1,
      explanation: "Les variables doivent être clairement identifiées (souvent entre crochets ou en majuscules) et accompagnées d'une documentation expliquant quoi y mettre."
    },
    {
      question: "Quelle est la différence entre un template générique et spécialisé ?",
      options: [
        "Il n'y a pas de différence",
        "Le générique fonctionne pour plusieurs cas, le spécialisé est optimisé pour un usage précis",
        "Le spécialisé est toujours meilleur",
        "Le générique est uniquement pour les débutants"
      ],
      correctAnswer: 1,
      explanation: "Un template générique est polyvalent mais peut manquer de précision. Un template spécialisé est optimisé pour un cas d'usage précis et donne généralement de meilleurs résultats dans ce contexte."
    },
    {
      question: "Comment tester l'efficacité d'un template ?",
      options: [
        "Ne jamais le tester",
        "Le tester une seule fois suffit",
        "Le tester avec plusieurs jeux de données/variables et comparer les résultats",
        "Demander à l'IA si le template est bon"
      ],
      correctAnswer: 2,
      explanation: "Il faut tester un template avec différentes données pour vérifier sa robustesse et la qualité constante des résultats. C'est l'itération qui permet d'améliorer un template."
    }
  ]

  return (
    <Quiz
      tutorialId="prompt-templates"
      title="Quiz de validation"
      description="Teste ta compréhension des templates de prompts"
      questions={questions}
      rewardPoints={50}
      rewardBadge="Premier Pas ✨"
    />
  )
}
