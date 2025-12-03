'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Download, FileJson, FileText, FileCode } from 'lucide-react'
import jsPDF from 'jspdf'

interface ExportPromptProps {
  prompt: {
    id: string
    title: string
    body: string
    category?: string
    tags?: string[]
    author?: {
      name?: string
    }
    created_at?: string
    likes_count?: number
  }
}

export function ExportPrompt({ prompt }: ExportPromptProps) {
  const [isExporting, setIsExporting] = useState(false)

  const exportAsJSON = () => {
    setIsExporting(true)
    try {
      const data = {
        id: prompt.id,
        title: prompt.title,
        body: prompt.body,
        category: prompt.category,
        tags: prompt.tags,
        author: prompt.author?.name || 'Anonymous',
        created_at: prompt.created_at,
        likes_count: prompt.likes_count,
        exported_at: new Date().toISOString(),
        source: 'Prompt Party - https://prompt-party.netlify.app',
      }

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${prompt.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const exportAsMarkdown = () => {
    setIsExporting(true)
    try {
      const markdown = `# ${prompt.title}

**Author:** ${prompt.author?.name || 'Anonymous'}
**Category:** ${prompt.category || 'Uncategorized'}
**Tags:** ${prompt.tags?.map(t => `#${t}`).join(', ') || 'None'}
**Likes:** ${prompt.likes_count || 0}
**Created:** ${prompt.created_at ? new Date(prompt.created_at).toLocaleDateString() : 'Unknown'}

---

## Prompt

${prompt.body}

---

*Exported from [Prompt Party](https://prompt-party.netlify.app/prompts/${prompt.id})*
`

      const blob = new Blob([markdown], { type: 'text/markdown' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${prompt.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const exportAsPDF = () => {
    setIsExporting(true)
    try {
      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()
      const margin = 20
      const maxWidth = pageWidth - 2 * margin
      let y = 20

      // Title
      doc.setFontSize(20)
      doc.setFont('helvetica', 'bold')
      const titleLines = doc.splitTextToSize(prompt.title, maxWidth)
      doc.text(titleLines, margin, y)
      y += titleLines.length * 10 + 5

      // Metadata
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100)
      doc.text(`Author: ${prompt.author?.name || 'Anonymous'}`, margin, y)
      y += 6
      doc.text(`Category: ${prompt.category || 'Uncategorized'}`, margin, y)
      y += 6
      if (prompt.tags && prompt.tags.length > 0) {
        doc.text(`Tags: ${prompt.tags.map(t => `#${t}`).join(', ')}`, margin, y)
        y += 6
      }
      doc.text(`Likes: ${prompt.likes_count || 0}`, margin, y)
      y += 6
      if (prompt.created_at) {
        doc.text(`Created: ${new Date(prompt.created_at).toLocaleDateString()}`, margin, y)
        y += 6
      }

      // Separator
      y += 5
      doc.setDrawColor(200)
      doc.line(margin, y, pageWidth - margin, y)
      y += 10

      // Body
      doc.setFontSize(11)
      doc.setTextColor(0)
      const bodyLines = doc.splitTextToSize(prompt.body, maxWidth)

      // Handle page breaks
      bodyLines.forEach((line: string) => {
        if (y > doc.internal.pageSize.getHeight() - 20) {
          doc.addPage()
          y = 20
        }
        doc.text(line, margin, y)
        y += 6
      })

      // Footer
      if (y > doc.internal.pageSize.getHeight() - 30) {
        doc.addPage()
        y = 20
      }
      y = doc.internal.pageSize.getHeight() - 15
      doc.setFontSize(8)
      doc.setTextColor(150)
      doc.text('Exported from Prompt Party - https://prompt-party.netlify.app', margin, y)

      doc.save(`${prompt.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isExporting} className="gap-2">
          <span className="inline-flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={exportAsPDF} className="gap-2 cursor-pointer">
          <FileText className="w-4 h-4" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsJSON} className="gap-2 cursor-pointer">
          <FileJson className="w-4 h-4" />
          Export as JSON
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsMarkdown} className="gap-2 cursor-pointer">
          <FileCode className="w-4 h-4" />
          Export as Markdown
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
