'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface QuizQuestion {
  id: string
  question: string
  options: Array<{
    id: string
    label: string
  }>
  correct: string
  explanation: string
}

export function RagasEvaluationQuiz() {
  const t = useTranslations('tutorials.ragas_evaluation')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [completed, setCompleted] = useState(false)

  const questions: QuizQuestion[] = [
    {
      id: 'q1',
      question: t('quiz_q1'),
      options: [
        { id: 'o1', label: t('quiz_q1_o1') },
        { id: 'o2', label: t('quiz_q1_o2') },
        { id: 'o3', label: t('quiz_q1_o3') },
        { id: 'o4', label: t('quiz_q1_o4') },
      ],
      correct: 'o1',
      explanation: t('quiz_q1_exp'),
    },
    {
      id: 'q2',
      question: t('quiz_q2'),
      options: [
        { id: 'o1', label: t('quiz_q2_o1') },
        { id: 'o2', label: t('quiz_q2_o2') },
        { id: 'o3', label: t('quiz_q2_o3') },
        { id: 'o4', label: t('quiz_q2_o4') },
      ],
      correct: 'o2',
      explanation: t('quiz_q2_exp'),
    },
    {
      id: 'q3',
      question: t('quiz_q3'),
      options: [
        { id: 'o1', label: t('quiz_q3_o1') },
        { id: 'o2', label: t('quiz_q3_o2') },
        { id: 'o3', label: t('quiz_q3_o3') },
        { id: 'o4', label: t('quiz_q3_o4') },
      ],
      correct: 'o3',
      explanation: t('quiz_q3_exp'),
    },
  ]

  const question = questions[currentQuestion]
  const isAnsweredCorrectly = selectedAnswer === question.correct

  const handleSelectAnswer = (optionId: string) => {
    if (!showResult) {
      setSelectedAnswer(optionId)
      setShowResult(true)
      if (optionId === question.correct) {
        setScore(score + 1)
      }
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setCompleted(true)
    }
  }

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <Card className="bg-gradient-to-r from-violet-600/10 to-violet-600/10 border-violet-600/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            {t('quiz_title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">{percentage}%</div>
            <p className="text-lg text-muted-foreground">
              {score} out of {questions.length} correct
            </p>
          </div>
          <Button onClick={() => {
            setCurrentQuestion(0)
            setScore(0)
            setSelectedAnswer(null)
            setShowResult(false)
            setCompleted(false)
          }} className="w-full">
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-primary" />
          {t('quiz_title')}
        </CardTitle>
        <CardDescription>
          Question {currentQuestion + 1} of {questions.length}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelectAnswer(option.id)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedAnswer === option.id
                    ? isAnsweredCorrectly
                      ? 'border-green-500 bg-green-50 dark:bg-green-950'
                      : 'border-red-500 bg-red-50 dark:bg-red-950'
                    : showResult && option.id === question.correct
                    ? 'border-green-500 bg-green-50 dark:bg-green-950'
                    : 'border-slate-200 dark:border-slate-700 hover:border-primary'
                }`}
              >
                <div className="flex items-center gap-3">
                  {selectedAnswer === option.id && (
                    isAnsweredCorrectly ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )
                  )}
                  {showResult && option.id === question.correct && selectedAnswer !== option.id && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  <span>{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {showResult && (
          <Alert className={isAnsweredCorrectly ? 'border-green-200 bg-green-50 dark:bg-green-950' : 'border-red-200 bg-red-50 dark:bg-red-950'}>
            <AlertCircle className={`w-4 h-4 ${isAnsweredCorrectly ? 'text-green-600' : 'text-red-600'}`} />
            <AlertDescription>
              <strong>{isAnsweredCorrectly ? 'Correct!' : 'Incorrect'}</strong> {question.explanation}
            </AlertDescription>
          </Alert>
        )}

        <Button onClick={handleNext} className="w-full">
          {currentQuestion === questions.length - 1 ? 'See Results' : 'Next Question'}
        </Button>
      </CardContent>
    </Card>
  )
}
