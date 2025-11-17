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
    question: "What is the difference between word tokenization and subword tokenization?",
    options: [
      "Word tokenization splits text into words only; subword tokenization further breaks words into smaller units",
      "They are the same thing",
      "Word tokenization is faster but less accurate",
      "Subword tokenization is only used for English"
    ],
    correct: 0,
    explanation: "Word tokenization treats each word as a token. Subword tokenization (like BPE) breaks words into smaller meaningful units, which helps handle rare words and morphological variations better."
  },
  {
    id: 2,
    question: "What is the main advantage of TF-IDF over Bag of Words?",
    options: [
      "TF-IDF captures semantic meaning between words",
      "TF-IDF weights words by their importance, reducing the impact of common words",
      "TF-IDF uses fewer features",
      "TF-IDF automatically learns word relationships"
    ],
    correct: 1,
    explanation: "TF-IDF (Term Frequency-Inverse Document Frequency) weighs words by how often they appear in a document versus how common they are across all documents. This reduces the impact of common words like 'the' and emphasizes more meaningful, distinguishing terms."
  },
  {
    id: 3,
    question: "Which NLP task involves identifying and classifying named entities in text?",
    options: [
      "Sentiment Analysis",
      "Named Entity Recognition (NER)",
      "Machine Translation",
      "Text Classification"
    ],
    correct: 1,
    explanation: "Named Entity Recognition (NER) identifies and classifies named entities (people, organizations, locations, dates) in text. It's crucial for information extraction and knowledge base building."
  },
  {
    id: 4,
    question: "How does a language model predict the next word in a sequence?",
    options: [
      "By randomly selecting from the vocabulary",
      "By calculating probability distribution over all words and selecting the most likely one",
      "By following hand-coded grammatical rules",
      "By looking up patterns in a database"
    ],
    correct: 1,
    explanation: "Language models learn probability distributions over the vocabulary. During generation, the model computes P(next_word | previous_words) for each word in the vocabulary and typically selects the word with highest probability."
  },
  {
    id: 5,
    question: "What is the challenge with using stop word removal in sentiment analysis?",
    options: [
      "It makes the process slower",
      "It increases the vocabulary size",
      "Words like 'not' are stop words but crucial for sentiment (e.g., 'not good' vs 'good')",
      "It requires additional training data"
    ],
    correct: 2,
    explanation: "While stop words like 'not' are technically stop words, they're essential for understanding negation in sentiment analysis. Removing them can lose important contextual information that flips the sentiment meaning."
  }
]

export function NLPFundamentalsQuiz() {
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
