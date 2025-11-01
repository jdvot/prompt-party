'use client'

import { Quiz } from '@/components/tutorials/quiz'

export function AdvancedPromptingQuiz() {
  const questions = [
    {
      question: "Qu'est-ce que le 'Chain-of-Thought' (CoT) prompting ?",
      options: [
        "Demander plusieurs choses en même temps",
        "Guider l'IA à décomposer son raisonnement étape par étape",
        "Enchaîner plusieurs prompts rapidement",
        "Utiliser des chaînes de caractères dans les prompts"
      ],
      correctAnswer: 1,
      explanation: "Le Chain-of-Thought consiste à demander explicitement à l'IA de 'penser étape par étape', ce qui améliore significativement la qualité des réponses sur des problèmes complexes."
    },
    {
      question: "À quoi sert le 'Few-Shot Learning' en prompting ?",
      options: [
        "Limiter le nombre de mots dans la réponse",
        "Faire plusieurs tentatives rapides",
        "Fournir des exemples pour enseigner le pattern attendu à l'IA",
        "Poser peu de questions"
      ],
      correctAnswer: 2,
      explanation: "Le Few-Shot Learning consiste à fournir quelques exemples (2-5) dans le prompt pour montrer à l'IA le format ou le pattern de réponse attendu. C'est très efficace pour des tâches spécifiques."
    },
    {
      question: "Quelle est la meilleure approche pour obtenir un format de sortie précis ?",
      options: [
        "Espérer que l'IA devine",
        "Spécifier explicitement le format (JSON, tableau, liste) avec un exemple",
        "Répéter la même question plusieurs fois",
        "Utiliser uniquement des mots-clés"
      ],
      correctAnswer: 1,
      explanation: "Pour obtenir un format précis, il faut le spécifier explicitement dans le prompt et idéalement fournir un exemple de la structure attendue (template). Par exemple : 'Retourne un JSON avec les champs: {name: string, age: number}'"
    },
    {
      question: "Qu'est-ce que le 'Role Prompting' ?",
      options: [
        "Demander à l'IA de jouer un rôle d'acteur",
        "Assigner un rôle d'expert à l'IA pour orienter ses réponses (ex: 'Tu es un expert SEO')",
        "Créer des prompts pour des jeux de rôle",
        "Définir le rôle de l'utilisateur"
      ],
      correctAnswer: 1,
      explanation: "Le Role Prompting consiste à définir un rôle ou une expertise pour l'IA (ex: 'Tu es un développeur senior React', 'Tu es un expert en marketing digital'). Cela influence le ton, le niveau de détail et l'angle d'approche des réponses."
    },
    {
      question: "Quelle technique améliore la précision pour des tâches d'extraction d'information ?",
      options: [
        "Être très vague",
        "Combiner Few-Shot Learning + format structuré + contraintes claires",
        "Poser une seule question courte",
        "Ne jamais donner d'exemples"
      ],
      correctAnswer: 1,
      explanation: "Pour l'extraction d'information, la combinaison de Few-Shot (exemples), format structuré (JSON/tableau), et contraintes claires (quels champs extraire) donne les meilleurs résultats et la plus grande précision."
    }
  ]

  return (
    <Quiz
      tutorialId="advanced-prompting"
      title="Quiz de validation"
      description="Teste ta maîtrise des techniques avancées de prompting"
      questions={questions}
      rewardPoints={100}
      rewardBadge="Intermédiaire Certifié 🧠"
    />
  )
}
