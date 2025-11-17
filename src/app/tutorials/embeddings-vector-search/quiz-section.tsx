'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import * as Icons from 'lucide-react'
import { useState } from 'react'

const quizQuestions = [
  {
    id: 1,
    question: "What is an embedding?",
    options: [
      "A dense vector representation capturing semantic meaning",
      "A SQL database feature",
      "An image compression technique",
      "A programming library"
    ],
    correct: 0,
    explanation: "An embedding is a dense vector of numbers that represents the semantic meaning of a word, sentence, or document in a high-dimensional space."
  },
  {
    id: 2,
    question: "Why is cosine similarity preferred for embeddings?",
    options: [
      "It measures angle between vectors, capturing semantic similarity regardless of magnitude",
      "It's faster than Euclidean distance",
      "It's easier to implement",
      "It requires less memory"
    ],
    correct: 0,
    explanation: "Cosine similarity measures the angle between vectors, which captures how 'similar' two meaning representations are, independent of their magnitude."
  },
  {
    id: 3,
    question: "What is a vector database?",
    options: [
      "A specialized database for storing and searching embeddings efficiently",
      "A regular database that stores vectors",
      "A type of image database",
      "A NoSQL database"
    ],
    correct: 0,
    explanation: "Vector databases are optimized for storing embeddings and performing similarity searches, with specialized indexing like HNSW and IVF for fast nearest-neighbor retrieval."
  },
  {
    id: 4,
    question: "Which is a practical use case for embeddings?",
    options: [
      "All of the above: semantic search, recommendations, clustering",
      "Only semantic search",
      "Only recommendation systems",
      "Only clustering"
    ],
    correct: 0,
    explanation: "Embeddings enable multiple powerful applications: semantic search (finding similar meanings), recommendations (finding similar items), and clustering (grouping similar items)."
  },
  {
    id: 5,
    question: "How do contextual embeddings differ from static embeddings?",
    options: [
      "Contextual embeddings vary based on surrounding words, static embeddings are fixed per word",
      "They are the same thing",
      "Static embeddings are more accurate",
      "Contextual embeddings are slower"
    ],
    correct: 0,
    explanation: "Static embeddings (Word2Vec) assign one vector per word. Contextual embeddings (BERT) generate different vectors for the same word depending on context, better capturing nuanced meaning."
  }
]

export function EmbeddingsQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)

  const question = quizQuestions[currentQuestion]

  const handleSelectAnswer = (index: number) => {
    if (!showExplanation) setSelectedAnswer(index)
  }

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      if (selectedAnswer === question.correct) setScore(score + 1)
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
      <Card className="bg-gradient-to-r from-cyan-600/10 to-cyan-600/10 border-cyan-600/20">
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
            {percentage === 100 && <p className="text-green-600 font-semibold">Perfect score! 🎉</p>}
            {percentage >= 75 && percentage < 100 && <p className="text-green-600 font-semibold">Great job! 👏</p>}
            {percentage >= 50 && percentage < 75 && <p className="text-amber-600 font-semibold">Good effort! Review to strengthen your understanding.</p>}
            {percentage < 50 && <p className="text-orange-600 font-semibold">Keep learning! 📚</p>}
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
    <Card className="bg-gradient-to-r from-cyan-600/10 to-cyan-600/10 border-cyan-600/20">
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
              <div key={index} className={`h-2 w-2 rounded-full ${index <= currentQuestion ? 'bg-primary' : 'bg-muted'}`} />
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
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedAnswer === index ? 'border-primary' : 'border-muted-foreground'}`}>
                    {selectedAnswer === index && <div className="w-3 h-3 rounded-full bg-primary" />}
                  </div>
                  <span>{option}</span>
                  {showExplanation && index === question.correct && <Icons.Check className="w-5 h-5 text-green-600 ml-auto" />}
                  {showExplanation && selectedAnswer === index && index !== question.correct && <Icons.X className="w-5 h-5 text-red-600 ml-auto" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {showExplanation && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-sm"><strong>Explanation:</strong> {question.explanation}</p>
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
