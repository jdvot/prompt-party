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
    question: "Why do we need a separate test set if we already have a validation set?",
    options: [
      "The validation set is only used during training, the test set measures final performance on unseen data",
      "They serve the same purpose, we only need one",
      "The test set is used to prevent overfitting, the validation set is for model selection",
      "The validation set is reserved for hyperparameter tuning, the test set is for reporting final metrics"
    ],
    correct: 0,
    explanation: "The validation set is used during training to monitor performance and guide hyperparameter tuning. The test set should only be evaluated once at the very end to provide an unbiased estimate of generalization performance."
  },
  {
    id: 2,
    question: "What is data leakage and why is it problematic?",
    options: [
      "Information from test data accidentally influencing training, causing unrealistically high performance estimates",
      "Losing data during the preprocessing phase",
      "Data being stolen by unauthorized users",
      "When the dataset is too small and overused"
    ],
    correct: 0,
    explanation: "Data leakage occurs when information from outside the training set is used to create the model, leading to overly optimistic performance metrics that don't generalize to real-world data."
  },
  {
    id: 3,
    question: "When would you use stratified sampling instead of random sampling?",
    options: [
      "When your dataset has imbalanced classes to ensure each split has similar class proportions",
      "When data points are randomly distributed",
      "When you have a very large dataset",
      "When features are all continuous variables"
    ],
    correct: 0,
    explanation: "Stratified sampling is crucial for imbalanced datasets. It ensures that each train/test split maintains approximately the same class proportions as the original dataset, preventing biased performance estimates."
  },
  {
    id: 4,
    question: "Which preprocessing step should typically happen BEFORE train/test splitting?",
    options: [
      "Normalization and feature scaling",
      "Removing duplicates and handling missing values",
      "Fitting a scaler/encoder on the entire dataset, then transforming each split",
      "Training feature importance analyses"
    ],
    correct: 1,
    explanation: "Data cleaning (removing duplicates, handling missing values) should happen before splitting. However, normalization/encoding parameters must be fit only on training data to avoid leakage."
  },
  {
    id: 5,
    question: "A dataset has 95% negative samples and 5% positive samples. Which metric is most important?",
    options: [
      "Accuracy, since it reflects overall performance",
      "F1 Score or AUC, since accuracy can be misleading with imbalanced classes",
      "Precision only, to minimize false positives",
      "Recall only, to catch all positive cases"
    ],
    correct: 1,
    explanation: "With highly imbalanced data, accuracy is misleading (a model could achieve 95% accuracy by always predicting negative). F1 Score or AUC provide better representations of true performance on both classes."
  }
]

export function DataFundamentalsQuiz() {
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
      <Card className="bg-gradient-to-r from-green-600/10 to-green-600/10 border-green-600/20">
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
    <Card className="bg-gradient-to-r from-green-600/10 to-green-600/10 border-green-600/20">
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
