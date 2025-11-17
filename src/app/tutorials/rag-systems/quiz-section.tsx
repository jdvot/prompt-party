'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import * as Icons from 'lucide-react'
import { useState } from 'react'

const questions = [
  {id:1, q:"Why use RAG instead of fine-tuning?", o:["RAG: dynamic knowledge, no retraining; Fine-tuning: static knowledge, requires retraining","RAG is always better","Fine-tuning is faster","They serve the same purpose"], c:0, e:"RAG excels at dynamic information (news, docs), while fine-tuning bakes knowledge into parameters."},
  {id:2, q:"What does chunking do in RAG?", o:["Breaks documents into passages for focused semantic search","Makes documents smaller","Removes irrelevant text","Improves download speed"], c:0, e:"Chunking balances semantic coherence with retrieval precision—too small loses context, too large dilutes relevance."},
  {id:3, q:"What's the difference between dense and sparse retrieval?", o:["Dense: semantic similarity; Sparse: exact keywords","Dense is slower","Sparse is more accurate","They're identical"], c:0, e:"Dense (embeddings): 'car' matches 'automobile'; Sparse (BM25): exact lexical matching only."},
  {id:4, q:"When would you use hybrid retrieval?", o:["Combine dense and sparse for both semantics and keywords","Never, choose one","Only for very large datasets","Only for small datasets"], c:0, e:"Hybrid retrieval gets semantic understanding AND keyword matching—great for entity-heavy queries."},
  {id:5, q:"What's a key challenge in RAG?", o:["Retrieval quality directly impacts generation quality","LLMs don't work with retrieved context","Retrieval is always perfect","RAG has no challenges"], c:0, e:"If retrieval fails, generation fails. Garbage in = garbage out, even with a good LLM."}
]

export function RAGQuiz() {
  const [c,sc]=useState(0),[s,ss]=useState<number|null>(null),[sh,ssh]=useState(false),[sc2,ssc]=useState(0),[d,sd]=useState(false)
  const cur=questions[c]
  if(d) return <Card className="bg-gradient-to-r from-red-600/10"><CardHeader><CardTitle className="flex gap-2"><Icons.Trophy className="w-5" />Done!</CardTitle></CardHeader><CardContent className="space-y-4"><div className="text-center"><div className="text-5xl font-bold">{Math.round((sc2/5)*100)}%</div><p className="text-muted-foreground">{sc2}/5</p></div><Button onClick={()=>{sc(0);ss(null);ssh(false);ssc(0);sd(false)}} className="w-full"><Icons.RotateCcw className="w-4 mr-2" />Retake</Button></CardContent></Card>
  return <Card className="bg-gradient-to-r from-red-600/10"><CardHeader><CardTitle className="flex gap-2"><Icons.Brain className="w-5" />Test Knowledge</CardTitle></CardHeader><CardContent className="space-y-6"><h3 className="font-semibold text-lg">{cur.q}</h3><div className="space-y-3">{cur.o.map((opt,i)=><button key={i} onClick={()=>!sh&&ss(i)} className={`w-full p-3 rounded-lg border-2 text-left ${s===i?i===cur.c&&sh?'border-green-500 bg-green-500/10':'border-red-500 bg-red-500/10':sh&&i===cur.c?'border-green-500 bg-green-500/10':'border-muted hover:border-primary/50'}`} disabled={sh}><div className="flex items-center gap-2"><div className="w-5 h-5 rounded-full border-2">{s===i&&<div className="w-3 h-3 rounded-full bg-primary m-auto" />}</div><span>{opt}</span>{sh&&i===cur.c&&<Icons.Check className="ml-auto text-green-600 w-5" />}{sh&&s===i&&i!==cur.c&&<Icons.X className="ml-auto text-red-600 w-5" />}</div></button>)}</div>{sh&&<div className="bg-blue-500/10 border rounded p-4"><p className="text-sm"><strong>Explanation:</strong> {cur.e}</p></div>}{!sh?<Button onClick={()=>{if(s!==null){if(s===cur.c)ssc(sc2+1);ssh(true)}}} className="w-full" disabled={s===null}>Submit</Button>:<Button onClick={()=>{if(c<4){sc(c+1);ss(null);ssh(false)}else sd(true)}} className="w-full">{c===4?'Results':'Next'}</Button>}</CardContent></Card>
}
