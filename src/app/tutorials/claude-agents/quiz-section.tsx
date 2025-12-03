'use client'

import { Quiz } from '@/components/tutorials/quiz'
import { useTranslations } from 'next-intl'

export function ClaudeAgentsQuiz() {
  const t = useTranslations('tutorials.claudeAgents.quiz')

  const questions = [
    {
      question: t('q1_question'),
      options: [
        t('q1_option_1'),
        t('q1_option_2'),
        t('q1_option_3'),
        t('q1_option_4')
      ],
      correctAnswer: 1,
      explanation: t('q1_explanation')
    },
    {
      question: t('q2_question'),
      options: [
        t('q2_option_1'),
        t('q2_option_2'),
        t('q2_option_3'),
        t('q2_option_4')
      ],
      correctAnswer: 1,
      explanation: t('q2_explanation')
    },
    {
      question: t('q3_question'),
      options: [
        t('q3_option_1'),
        t('q3_option_2'),
        t('q3_option_3'),
        t('q3_option_4')
      ],
      correctAnswer: 1,
      explanation: t('q3_explanation')
    },
    {
      question: t('q4_question'),
      options: [
        t('q4_option_1'),
        t('q4_option_2'),
        t('q4_option_3'),
        t('q4_option_4')
      ],
      correctAnswer: 1,
      explanation: t('q4_explanation')
    },
    {
      question: t('q5_question'),
      options: [
        t('q5_option_1'),
        t('q5_option_2'),
        t('q5_option_3'),
        t('q5_option_4')
      ],
      correctAnswer: 1,
      explanation: t('q5_explanation')
    }
  ]

  return (
    <Quiz
      tutorialId="claude-agents"
      title={t('title')}
      description={t('description')}
      questions={questions}
      rewardPoints={150}
      rewardBadge={t('reward_badge')}
    />
  )
}
