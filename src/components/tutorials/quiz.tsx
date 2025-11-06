'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { CheckCircle, XCircle, Trophy, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { completeLessonClient } from '@/lib/gamification-client'

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuizProps {
  tutorialId?: string
  title?: string
  description?: string
  questions: QuizQuestion[]
  rewardPoints: number
  rewardBadge?: string
  onComplete?: () => void
}

export function Quiz({
  tutorialId,
  title = 'Quiz de validation',
  description = 'Réponds correctement à toutes les questions pour valider cette leçon',
  questions,
  rewardPoints,
  rewardBadge,
  onComplete
}: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1))
  const [showResults, setShowResults] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [isAwarding, setIsAwarding] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    return selectedAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length
  }

  const score = calculateScore()
  const totalQuestions = questions.length
  const passed = score === totalQuestions

  const handleComplete = async () => {
    setIsAwarding(true)

    // Award points via API route
    if (tutorialId) {
      try {
        await completeLessonClient(tutorialId, rewardPoints)
      } catch (error) {
        console.error('Error awarding points:', error)
      }
    }

    setIsAwarding(false)
    setCompleted(true)

    if (onComplete) {
      onComplete()
    }
  }

  if (completed) {
    return (
      <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
        <CardContent className="p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <Trophy className="w-20 h-20 mx-auto mb-4 text-green-600" />
          </motion.div>
          <h3 className="text-2xl font-bold mb-2">Leçon validée !</h3>
          <p className="text-muted-foreground mb-6">
            Tu as gagné <strong className="text-green-600">+{rewardPoints} points</strong>
            {rewardBadge && <> et le badge <strong className="text-violet-600">{rewardBadge}</strong></>}
          </p>
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            Complété ✓
          </Badge>
        </CardContent>
      </Card>
    )
  }

  if (showResults) {
    return (
      <Card className={cn(
        "border-2",
        passed ? "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20" : "bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20"
      )}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {passed ? (
              <>
                <CheckCircle className="w-6 h-6 text-green-600" />
                Parfait ! 100% de réussite
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-orange-600" />
                Pas tout à fait...
              </>
            )}
          </CardTitle>
          <CardDescription>
            {passed
              ? `Tu as répondu correctement aux ${totalQuestions} questions !`
              : `${score}/${totalQuestions} bonnes réponses. Réessaie pour valider la leçon.`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Review wrong answers */}
          {!passed && (
            <div className="space-y-3">
              <h4 className="font-semibold">Tes réponses :</h4>
              {questions.map((question, index) => {
                const isCorrect = selectedAnswers[index] === question.correctAnswer
                return (
                  <Alert key={index} className={cn(!isCorrect && "border-orange-500/20 bg-orange-500/5")}>
                    <AlertDescription>
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-1">{question.question}</p>
                          {!isCorrect && (
                            <p className="text-sm text-muted-foreground">
                              💡 {question.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                )
              })}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            {!passed && (
              <Button onClick={() => {
                setShowResults(false)
                setCurrentQuestion(0)
                setSelectedAnswers(new Array(questions.length).fill(-1))
              }} variant="outline" className="flex-1">
                Réessayer
              </Button>
            )}
            {passed && (
              <Button onClick={handleComplete} className="flex-1" disabled={isAwarding}>
                <Sparkles className="w-4 h-4 mr-2" />
                {isAwarding ? 'Attribution des points...' : `Valider la leçon (+${rewardPoints} points)`}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  return (
    <Card className="bg-gradient-to-br from-violet-600/5 to-violet-600/5 border-violet-600/20">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="soft">Question {currentQuestion + 1}/{totalQuestions}</Badge>
          <Badge variant="soft" className="bg-green-500/10 text-green-700 dark:text-green-400">
            +{rewardPoints} points
          </Badge>
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">{question.question}</h3>

            <RadioGroup
              value={selectedAnswers[currentQuestion]?.toString()}
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
            >
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <RadioGroupItem value={index.toString()} id={`q${currentQuestion}-option${index}`} />
                    <Label
                      htmlFor={`q${currentQuestion}-option${index}`}
                      className="flex-1 cursor-pointer text-base leading-relaxed"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="leading-none">Précédent</span>
          </Button>
          <div className="text-sm text-muted-foreground">
            {selectedAnswers.filter(a => a !== -1).length}/{totalQuestions} réponses
          </div>
          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === -1}
          >
            <span className="leading-none">{currentQuestion === totalQuestions - 1 ? 'Terminer' : 'Suivant'}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
