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
    question: "What problem do attention mechanisms solve that RNNs struggled with?",
    options: [
      "Attention allows parallel processing and captures long-range dependencies better",
      "Attention makes models smaller and faster",
      "Attention requires less training data",
      "Attention eliminates the need for word embeddings"
    ],
    correct: 0,
    explanation: "RNNs process sequences sequentially, limiting parallelization and struggling with long-range dependencies (vanishing gradients). Attention allows all positions to attend to all other positions directly, enabling parallelization and better long-range understanding."
  },
  {
    id: 2,
    question: "In the Query-Key-Value framework, what does the Query represent?",
    options: [
      "The information we're looking for or what we want to focus on",
      "The input sequence",
      "The output predictions",
      "The model's learned parameters"
    ],
    correct: 0,
    explanation: "The Query represents 'what are we looking for?' or 'what should we focus on?' It's matched against Keys to determine attention weights. Keys represent 'what do I contain?' and Values represent 'what information should I pass?'"
  },
  {
    id: 3,
    question: "Why do transformer models need positional encodings?",
    options: [
      "To inject information about the order of tokens, since transformers have no inherent sequence awareness",
      "To make embeddings smaller in size",
      "To speed up attention computation",
      "To prevent overfitting on sequence data"
    ],
    correct: 0,
    explanation: "Transformers process all positions in parallel with self-attention, so they don't inherently know sequence order. Positional encodings add this information by encoding position-dependent patterns that the model learns to interpret."
  },
  {
    id: 4,
    question: "What is the main difference between BERT and GPT architecture?",
    options: [
      "BERT is encoder-only (bidirectional context) for understanding; GPT is decoder-only (autoregressive) for generation",
      "BERT is faster than GPT",
      "BERT uses CNNs while GPT uses transformers",
      "They are identical, just trained differently"
    ],
    correct: 0,
    explanation: "BERT (Encoder-only) processes text bidirectionally and masks random tokens during training, making it great for understanding tasks. GPT (Decoder-only) uses causal masking and autoregressive generation (predicting next token), making it ideal for text generation."
  },
  {
    id: 5,
    question: "Why does attention have O(n²) complexity, and what does this mean for long contexts?",
    options: [
      "Attention computes a similarity matrix between all token pairs, limiting practical context window length",
      "It means attention never works on long sequences",
      "It's a bug in transformer implementations",
      "It makes transformers faster than RNNs on long sequences"
    ],
    correct: 0,
    explanation: "Self-attention creates a matrix of size (seq_len × seq_len) to compute attention weights between all pairs. With O(n²) memory and compute, a 4K token context uses ~16M operations, but 32K tokens use ~1B operations. This is why long contexts are expensive and practical limits exist."
  }
]

export function TransformersAttentionQuiz() {
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
      <Card className="bg-gradient-to-r from-amber-600/10 to-amber-600/10 border-amber-600/20">
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
    <Card className="bg-gradient-to-r from-amber-600/10 to-amber-600/10 border-amber-600/20">
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
