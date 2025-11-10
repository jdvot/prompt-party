'use client'

import { Quiz } from '@/components/tutorials/quiz'
import { useTranslations } from 'next-intl'

export function ClaudeCodeBasicsQuiz() {
  const t = useTranslations('tutorials.claude_code_basics.quiz')

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
      correctAnswer: 2,
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
      correctAnswer: 0,
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
      correctAnswer: 2,
      explanation: t('q5_explanation')
    },
    {
      question: t('q6_question'),
      options: [
        t('q6_option_1'),
        t('q6_option_2'),
        t('q6_option_3'),
        t('q6_option_4')
      ],
      correctAnswer: 3,
      explanation: t('q6_explanation')
    },
    {
      question: t('q7_question'),
      options: [
        t('q7_option_1'),
        t('q7_option_2'),
        t('q7_option_3'),
        t('q7_option_4')
      ],
      correctAnswer: 1,
      explanation: t('q7_explanation')
    },
    {
      question: t('q8_question'),
      options: [
        t('q8_option_1'),
        t('q8_option_2'),
        t('q8_option_3'),
        t('q8_option_4')
      ],
      correctAnswer: 0,
      explanation: t('q8_explanation')
    },
    {
      question: t('q9_question'),
      options: [
        t('q9_option_1'),
        t('q9_option_2'),
        t('q9_option_3'),
        t('q9_option_4')
      ],
      correctAnswer: 2,
      explanation: t('q9_explanation')
    },
    {
      question: t('q10_question'),
      options: [
        t('q10_option_1'),
        t('q10_option_2'),
        t('q10_option_3'),
        t('q10_option_4')
      ],
      correctAnswer: 3,
      explanation: t('q10_explanation')
    }
  ]

  return (
    <Quiz
      tutorialId="claude-code-basics"
      title={t('title')}
      description={t('description')}
      questions={questions}
      rewardPoints={100}
      rewardBadge={t('reward_badge')}
    />
  )
}
