'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import * as Icons from 'lucide-react'
import { useState } from 'react'

const questions = [
  {id:1, q:"When should you fine-tune instead of prompting?", o:["Domain-specific tasks, consistent formats, repeated usage","Always","Never","Only with huge datasets"], c:0, e:"Fine-tune when prompting can't achieve performance or consistency needed for specialized domains."},
  {id:2, q:"What is LoRA?", o:["Trains small low-rank matrices instead of full weights","A learning algorithm","A language model type","A framework"], c:0, e:"LoRA (Low-Rank Adaptation) dramatically reduces trainable parameters by updating ΔW = BA instead of full weights."},
  {id:3, q:"Why is learning rate critical in fine-tuning?", o:["Too high causes instability, too low is slow; typically 1e-5 to 1e-4","Doesn't matter","Higher is always better","Only for initial training"], c:0, e:"LLMs are sensitive. Too high = catastrophic forgetting, too low = wasted computation."},
  {id:4, q:"What is catastrophic forgetting?", o:["Model forgets general knowledge when fine-tuning on new data","Running out of memory","Training too fast","Improper data shuffling"], c:0, e:"Fine-tuning can cause models to lose general capabilities if learning rate is too high or training continues too long."},
  {id:5, q:"How many epochs for fine-tuning?", o:["1-5; LLMs overfit quickly","100+","Until convergence","Variable by dataset"], c:0, e:"Unlike training from scratch, fine-tuning typically uses 1-5 epochs due to overfitting risk on smaller datasets."}
]

export function LLMQuiz() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [show, setShow] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const q = questions[current]

  if (done) {
    return (
      <Card className="bg-gradient-to-r from-red-600/10">
        <CardHeader><CardTitle className="flex gap-2"><Icons.Trophy className="w-5" />Done!</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-5xl font-bold">{Math.round((score/5)*100)}%</div>
            <p className="text-muted-foreground">{score}/5 correct</p>
          </div>
          <Button onClick={() => {setCurrent(0); setSelected(null); setShow(false); setScore(0); setDone(false)}} className="w-full">
            <Icons.RotateCcw className="w-4 mr-2" />Retake
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-r from-red-600/10">
      <CardHeader><CardTitle className="flex gap-2"><Icons.Brain className="w-5" />Test Knowledge</CardTitle></CardHeader>
      <CardContent className="space-y-6">
        <h3 className="font-semibold text-lg">{q.q}</h3>
        <div className="space-y-3">
          {q.o.map((opt, i) => (
            <button key={i} onClick={() => !show && setSelected(i)}
              className={`w-full p-3 rounded-lg border-2 text-left ${selected === i ? (i === q.c && show ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10') : (show && i === q.c ? 'border-green-500 bg-green-500/10' : 'border-muted hover:border-primary/50')}`}
              disabled={show}>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full border-2">{selected === i && <div className="w-3 h-3 rounded-full bg-primary m-auto" />}</div>
                <span>{opt}</span>
                {show && i === q.c && <Icons.Check className="ml-auto text-green-600 w-5" />}
                {show && selected === i && i !== q.c && <Icons.X className="ml-auto text-red-600 w-5" />}
              </div>
            </button>
          ))}
        </div>
        {show && <div className="bg-blue-500/10 border rounded p-4"><p className="text-sm"><strong>Explanation:</strong> {q.e}</p></div>}
        {!show ? <Button onClick={() => {if(selected !== null) {if(selected === q.c) setScore(score + 1); setShow(true)}}} className="w-full" disabled={selected === null}>Submit</Button>
          : <Button onClick={() => {if(current < 4) {setCurrent(current + 1); setSelected(null); setShow(false)} else setDone(true)}} className="w-full">{current === 4 ? 'Results' : 'Next'}</Button>}
      </CardContent>
    </Card>
  )
}
