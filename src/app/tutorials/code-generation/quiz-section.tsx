'use client'

import { Quiz } from '@/components/tutorials/quiz'

export function CodeGenerationQuiz() {
  const questions = [
    {
      question: "Quelle est la clé pour obtenir du code de qualité avec l'IA ?",
      options: [
        "Demander simplement 'écris du code'",
        "Fournir contexte, contraintes, stack technique, et exemples",
        "Copier-coller sans lire",
        "Utiliser uniquement des mots techniques"
      ],
      correctAnswer: 1,
      explanation: "Pour du bon code, il faut spécifier : le contexte du projet, la stack technique (langages, frameworks), les contraintes (performance, sécurité), et idéalement des exemples du style de code attendu."
    },
    {
      question: "Comment demander du code sécurisé et robuste ?",
      options: [
        "Ne rien spécifier, l'IA sait",
        "Demander explicitement gestion d'erreurs, validation, et bonnes pratiques",
        "Demander du code court uniquement",
        "Utiliser des variables courtes"
      ],
      correctAnswer: 1,
      explanation: "Il faut explicitement demander : la gestion d'erreurs (try/catch), la validation des inputs, le respect des bonnes pratiques de sécurité, et les tests si nécessaire. L'IA ne le fait pas automatiquement."
    },
    {
      question: "Quelle approche donne les meilleurs résultats ?",
      options: [
        "Demander tout le projet d'un coup",
        "Approche incrémentale : fonction par fonction, avec feedback",
        "Copier du code existant",
        "Ne jamais tester le code généré"
      ],
      correctAnswer: 1,
      explanation: "L'approche incrémentale (générer une fonction, la tester, donner du feedback, puis continuer) donne de bien meilleurs résultats que demander un projet complet d'un coup."
    },
    {
      question: "Que faire si le code généré ne fonctionne pas ?",
      options: [
        "Abandonner",
        "Fournir l'erreur exacte et le contexte pour que l'IA corrige",
        "Recommencer de zéro sans explication",
        "Changer d'IA"
      ],
      correctAnswer: 1,
      explanation: "Copiez l'erreur exacte, expliquez ce qui ne fonctionne pas, donnez le contexte, et demandez une correction. L'IA apprend de ses erreurs quand vous lui donnez du feedback précis."
    },
    {
      question: "Comment obtenir du code maintenable et documenté ?",
      options: [
        "L'IA documente toujours automatiquement",
        "Demander explicitement comments, documentation, et naming clair",
        "Ne jamais documenter",
        "Utiliser des noms de variables d'une lettre"
      ],
      correctAnswer: 1,
      explanation: "Il faut explicitement demander : des commentaires explicatifs, de la documentation (docstrings, JSDoc), et un naming clair et descriptif. Spécifiez le niveau de documentation souhaité."
    }
  ]

  return (
    <Quiz
      tutorialId="code-generation"
      title="Quiz de validation"
      description="Teste ta maîtrise de la génération de code avec l'IA"
      questions={questions}
      rewardPoints={150}
      rewardBadge="Expert Certifié 🚀"
    />
  )
}
