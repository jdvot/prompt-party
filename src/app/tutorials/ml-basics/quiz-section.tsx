'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import * as Icons from 'lucide-react'
import { useState } from 'react'

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the main goal of supervised learning?",
    options: [
      "To find patterns in unlabeled data",
      "To learn from labeled data and make predictions",
      "To reduce the dimensionality of data",
      "To classify data into multiple clusters"
    ],
    correct: 1,
    explanation: "Supervised learning uses labeled training data to learn a mapping function, which can then be used to make predictions on new, unseen data."
  },
  {
    id: 2,
    question: "What is overfitting in machine learning?",
    options: [
      "When the model performs too well on training data",
      "When the model learns to perform well on training data but poorly on new data",
      "When the model has too many features",
      "When the model is too simple"
    ],
    correct: 1,
    explanation: "Overfitting occurs when a model learns the training data too well, including its noise and peculiarities, causing it to perform poorly on new, unseen data."
  },
  {
    id: 3,
    question: "Which metric is best for imbalanced classification problems?",
    options: [
      "Accuracy",
      "F1 Score",
      "Mean Squared Error",
      "Loss"
    ],
    correct: 1,
    explanation: "F1 Score is better for imbalanced datasets because it considers both precision and recall, unlike accuracy which can be misleading when classes are imbalanced."
  },
  {
    id: 4,
    question: "What does normalization in data preprocessing do?",
    options: [
      "Removes missing values",
      "Scales features to a similar range",
      "Removes outliers",
      "Encodes categorical variables"
    ],
    correct: 1,
    explanation: "Normalization scales features to a similar range (usually 0-1 or with mean 0 and std 1), which helps many algorithms perform better and converge faster."
  }
]

export function MLBasicsQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)

  const question = quizQuestions[currentQuestion]

  const handleSelectAnswer = (index: number) => {
    if (!showExplanation) {
      setSelectedAnswer(index)
    }
  }

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      if (selectedAnswer === question.correct) {
        setScore(score + 1)
      }
      setShowExplanation(true)
    }
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setCompleted(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setCompleted(false)
  }

  if (completed) {
    const percentage = Math.round((score / quizQuestions.length) * 100)
    return (
      <Card className="bg-gradient-to-r from-violet-600/10 to-violet-600/10 border-violet-600/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.Trophy className="w-5 h-5 text-primary" />
            Quiz Completed!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">{percentage}%</div>
            <p className="text-lg text-muted-foreground mb-2">
              You scored {score} out of {quizQuestions.length}
            </p>
            {percentage === 100 && <p className="text-green-600 font-semibold">Perfect score! Outstanding work! 🎉</p>}
            {percentage >= 75 && percentage < 100 && <p className="text-green-600 font-semibold">Great job! You've mastered the concepts. 👏</p>}
            {percentage >= 50 && percentage < 75 && <p className="text-amber-600 font-semibold">Good effort! Review the concepts to strengthen your understanding.</p>}
            {percentage < 50 && <p className="text-orange-600 font-semibold">Keep learning! Review the material and try again. 📚</p>}
          </div>
          <Button onClick={handleRestart} className="w-full">
            <Icons.RotateCcw className="w-4 h-4 mr-2" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-r from-violet-600/10 to-violet-600/10 border-violet-600/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icons.Brain className="w-5 h-5 text-primary" />
          Test Your Knowledge
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </span>
          <div className="flex gap-1">
            {quizQuestions.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index <= currentQuestion ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-lg">{question.question}</h3>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                  selectedAnswer === index
                    ? index === question.correct && showExplanation
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-red-500 bg-red-500/10'
                    : showExplanation && index === question.correct
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-muted hover:border-primary/50'
                } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
                disabled={showExplanation}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index ? 'border-primary' : 'border-muted-foreground'
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    )}
                  </div>
                  <span>{option}</span>
                  {showExplanation && index === question.correct && (
                    <Icons.Check className="w-5 h-5 text-green-600 ml-auto" />
                  )}
                  {showExplanation && selectedAnswer === index && index !== question.correct && (
                    <Icons.X className="w-5 h-5 text-red-600 ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {showExplanation && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-sm">
              <strong>Explanation:</strong> {question.explanation}
            </p>
          </div>
        )}

        <div className="flex gap-2">
          {!showExplanation ? (
            <Button onClick={handleSubmit} className="w-full" disabled={selectedAnswer === null}>
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNext} className="w-full">
              {currentQuestion === quizQuestions.length - 1 ? 'See Results' : 'Next Question'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
