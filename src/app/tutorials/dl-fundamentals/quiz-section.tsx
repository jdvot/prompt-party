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
    question: "What is the primary advantage of deep learning over traditional machine learning?",
    options: [
      "It requires less data",
      "It can automatically learn hierarchical representations from raw data",
      "It's faster to train",
      "It's easier to understand"
    ],
    correct: 1,
    explanation: "Deep learning's key advantage is its ability to automatically learn hierarchical features from raw data without manual feature engineering, especially for complex tasks like image and language understanding."
  },
  {
    id: 2,
    question: "What does backpropagation do in neural networks?",
    options: [
      "Initializes the weights randomly",
      "Computes gradients and updates weights to minimize loss",
      "Prevents overfitting",
      "Normalizes the input data"
    ],
    correct: 1,
    explanation: "Backpropagation is the algorithm that computes gradients of the loss function with respect to each weight and updates the weights in the direction that minimizes the loss."
  },
  {
    id: 3,
    question: "Which architecture is best suited for sequential data like text or time series?",
    options: [
      "Convolutional Neural Networks (CNNs)",
      "Recurrent Neural Networks (RNNs) and LSTMs",
      "Generative Adversarial Networks (GANs)",
      "Fully connected networks"
    ],
    correct: 1,
    explanation: "RNNs and LSTMs are designed to process sequential data by maintaining memory of previous inputs, making them ideal for tasks involving sequences like text, speech, or time series."
  },
  {
    id: 4,
    question: "What is the vanishing gradient problem?",
    options: [
      "When the model becomes too large",
      "When gradients become very small during backpropagation, making weight updates ineffective",
      "When the learning rate is too high",
      "When data preprocessing fails"
    ],
    correct: 1,
    explanation: "The vanishing gradient problem occurs when gradients become exponentially smaller during backpropagation through many layers, making it hard to train deep networks. This is why LSTMs and residual connections were invented."
  },
  {
    id: 5,
    question: "What is the main innovation of Transformer architecture?",
    options: [
      "Using convolutional layers",
      "Self-attention mechanism that processes sequences in parallel",
      "Fully connected layers only",
      "Recurrent processing of data"
    ],
    correct: 1,
    explanation: "Transformers introduced the self-attention mechanism, which allows the model to process all sequence elements in parallel and captures dependencies between all pairs of elements, making them much faster and more effective than RNNs."
  }
]

export function DLFundamentalsQuiz() {
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
            {percentage === 100 && <p className="text-green-600 font-semibold">Perfect score! You're a deep learning master! 🎉</p>}
            {percentage >= 80 && percentage < 100 && <p className="text-green-600 font-semibold">Excellent work! You've mastered deep learning fundamentals. 👏</p>}
            {percentage >= 60 && percentage < 80 && <p className="text-amber-600 font-semibold">Good understanding! Keep practicing to solidify your knowledge.</p>}
            {percentage < 60 && <p className="text-orange-600 font-semibold">Keep learning! Deep learning concepts take time to master. 📚</p>}
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
