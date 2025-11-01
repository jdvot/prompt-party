'use client'

import { Quiz } from '@/components/tutorials/quiz'

export function IntroPromptsQuiz() {
  const questions = [
    {
      question: "Qu'est-ce qui fait un bon prompt ?",
      options: [
        "Un prompt court et vague",
        "Un prompt spécifique avec du contexte et des contraintes",
        "Un prompt très long avec beaucoup de détails inutiles",
        "Un prompt qui pose plusieurs questions à la fois"
      ],
      correctAnswer: 1,
      explanation: "Un bon prompt est spécifique, fournit du contexte et définit clairement la tâche avec les contraintes appropriées."
    },
    {
      question: "Quels sont les 4 éléments essentiels d'un prompt structuré ?",
      options: [
        "Titre, description, tags, exemple",
        "Contexte, tâche, contraintes, format",
        "Introduction, développement, conclusion, résumé",
        "Question, réponse, feedback, validation"
      ],
      correctAnswer: 1,
      explanation: "Un prompt bien structuré contient : le contexte (qui es-tu), la tâche (que faire), les contraintes (limitations), et le format de sortie souhaité."
    },
    {
      question: "Quelle est l'erreur la plus courante en prompting ?",
      options: [
        "Utiliser trop de mots",
        "Être trop spécifique",
        "Être trop vague et manquer de contexte",
        "Demander plusieurs choses en une seule requête"
      ],
      correctAnswer: 2,
      explanation: "L'erreur la plus courante est d'être trop vague. Sans contexte ni précision, l'IA ne peut pas comprendre exactement ce que vous attendez."
    },
    {
      question: "Pourquoi est-il important de spécifier le format de sortie ?",
      options: [
        "Pour rendre le prompt plus long",
        "Pour guider l'IA vers une réponse structurée et exploitable",
        "C'est obligatoire",
        "Pour impressionner l'IA"
      ],
      correctAnswer: 1,
      explanation: "Spécifier le format (JSON, liste, tableau, paragraphe) aide l'IA à structurer sa réponse de manière exploitable pour votre cas d'usage."
    },
    {
      question: "Que signifie 'donner du contexte' dans un prompt ?",
      options: [
        "Raconter sa vie personnelle",
        "Expliquer le domaine, le rôle attendu de l'IA, et le cadre d'utilisation",
        "Donner des exemples de mauvaises réponses",
        "Poser plusieurs questions"
      ],
      correctAnswer: 1,
      explanation: "Donner du contexte signifie expliquer le domaine (ex: marketing, code), définir le rôle de l'IA (ex: expert SEO), et préciser le cadre d'utilisation."
    }
  ]

  return (
    <Quiz
      tutorialId="intro-prompts"
      title="Quiz de validation"
      description="Réponds à ces 5 questions pour valider ta compréhension des prompts"
      questions={questions}
      rewardPoints={50}
      rewardBadge="Premier Pas ✨"
    />
  )
}
