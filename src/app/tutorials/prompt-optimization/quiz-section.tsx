'use client'

import { Quiz } from '@/components/tutorials/quiz'

export function PromptOptimizationQuiz() {
  const questions = [
    {
      question: "Qu'est-ce que l'optimisation de prompts ?",
      options: [
        "Rendre les prompts plus courts",
        "Itérer et améliorer les prompts pour obtenir de meilleurs résultats",
        "Utiliser uniquement des mots compliqués",
        "Copier les prompts des autres"
      ],
      correctAnswer: 1,
      explanation: "L'optimisation consiste à tester, analyser et améliorer itérativement vos prompts pour obtenir des résultats de meilleure qualité, plus précis ou plus adaptés à votre besoin."
    },
    {
      question: "Quelle est la première étape pour optimiser un prompt ?",
      options: [
        "Le rendre plus long",
        "Mesurer les résultats actuels et définir ce qui doit être amélioré",
        "Changer tous les mots",
        "Demander à quelqu'un d'autre"
      ],
      correctAnswer: 1,
      explanation: "Avant d'optimiser, il faut d'abord mesurer les résultats actuels et identifier précisément ce qui ne fonctionne pas ou pourrait être amélioré."
    },
    {
      question: "Comment mesurer l'efficacité d'un prompt ?",
      options: [
        "Au feeling seulement",
        "Définir des métriques claires (pertinence, précision, format, cohérence)",
        "Compter le nombre de mots",
        "Ne jamais mesurer"
      ],
      correctAnswer: 1,
      explanation: "Il faut définir des critères mesurables : pertinence de la réponse, précision des informations, respect du format demandé, cohérence, etc."
    },
    {
      question: "Quelle technique d'optimisation est la plus efficace ?",
      options: [
        "Changer au hasard",
        "A/B testing : tester plusieurs variations et comparer les résultats",
        "Ne rien changer",
        "Toujours utiliser le prompt le plus long possible"
      ],
      correctAnswer: 1,
      explanation: "L'A/B testing permet de comparer objectivement plusieurs variations d'un prompt et d'identifier ce qui fonctionne le mieux. C'est une approche scientifique et efficace."
    },
    {
      question: "Quand faut-il arrêter d'optimiser un prompt ?",
      options: [
        "Jamais, optimiser à l'infini",
        "Après la première modification",
        "Quand les résultats atteignent les objectifs fixés et que les gains marginaux ne justifient plus l'effort",
        "Quand on en a marre"
      ],
      correctAnswer: 2,
      explanation: "L'optimisation doit s'arrêter quand les résultats sont satisfaisants et que les améliorations supplémentaires seraient minimes par rapport à l'effort investi. C'est une question de ROI (retour sur investissement)."
    }
  ]

  return (
    <Quiz
      tutorialId="prompt-optimization"
      title="Quiz de validation"
      description="Valide tes connaissances en optimisation de prompts"
      questions={questions}
      rewardPoints={100}
      rewardBadge="Intermédiaire Certifié 🧠"
    />
  )
}
