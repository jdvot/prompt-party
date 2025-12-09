'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useToast } from '@/hooks/use-toast'
import { Download, Upload, FileJson, FileText, AlertCircle, Check } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface ImportExportProps {
  userId: string
}

export function ImportExport({ userId }: ImportExportProps) {
  const { toast } = useToast()
  const supabase = createClient()
  const [isExporting, setIsExporting] = useState(false)
  const [importText, setImportText] = useState('')
  const [isImporting, setIsImporting] = useState(false)
  const [importStatus, setImportStatus] = useState<{
    total: number
    imported: number
    failed: number
  } | null>(null)

  const exportToJSON = async () => {
    setIsExporting(true)

    try {
      const { data: prompts } = await (supabase
        .from('prompts') as any)
        .select('*')
        .eq('author', userId)
        .order('created_at', { ascending: false })

      if (prompts && prompts.length > 0) {
        const exportData = {
          version: '1.0',
          exported_at: new Date().toISOString(),
          total_prompts: prompts.length,
          prompts: prompts.map((p: any) => ({
            title: p.title,
            body: p.body,
            category: p.category,
            tags: p.tags,
            is_public: p.is_public,
            created_at: p.created_at,
          })),
        }

        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
          type: 'application/json',
        })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `prompt-party-export-${Date.now()}.json`
        a.click()
        URL.revokeObjectURL(url)

        toast({
          title: 'Export successful',
          description: `Exported ${prompts.length} prompts`,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'No prompts to export',
        })
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Export failed',
        description: 'An error occurred during export',
      })
    } finally {
      setIsExporting(false)
    }
  }

  const exportToMarkdown = async () => {
    setIsExporting(true)

    try {
      const { data: prompts } = await (supabase
        .from('prompts') as any)
        .select('*')
        .eq('author', userId)
        .order('created_at', { ascending: false })

      if (prompts && prompts.length > 0) {
        let markdown = `# My Prompts\n\nExported from Prompt Party on ${new Date().toLocaleDateString()}\n\n---\n\n`

        prompts.forEach((prompt: any, index: number) => {
          markdown += `## ${index + 1}. ${prompt.title}\n\n`
          if (prompt.category) {
            markdown += `**Category:** ${prompt.category}\n\n`
          }
          if (prompt.tags && prompt.tags.length > 0) {
            markdown += `**Tags:** ${prompt.tags.join(', ')}\n\n`
          }
          markdown += `${prompt.body}\n\n`
          markdown += `*Created: ${new Date(prompt.created_at).toLocaleDateString()}*\n\n`
          markdown += `---\n\n`
        })

        const blob = new Blob([markdown], { type: 'text/markdown' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `prompt-party-export-${Date.now()}.md`
        a.click()
        URL.revokeObjectURL(url)

        toast({
          title: 'Export successful',
          description: `Exported ${prompts.length} prompts to Markdown`,
        })
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Export failed',
      })
    } finally {
      setIsExporting(false)
    }
  }

  const importFromJSON = async () => {
    if (!importText.trim()) {
      toast({
        variant: 'destructive',
        title: 'Import failed',
        description: 'Please paste JSON data to import',
      })
      return
    }

    setIsImporting(true)
    setImportStatus(null)

    try {
      const data = JSON.parse(importText)

      if (!data.prompts || !Array.isArray(data.prompts)) {
        throw new Error('Invalid format')
      }

      let imported = 0
      let failed = 0

      for (const prompt of data.prompts) {
        try {
          const { error } = await (supabase.from('prompts') as any).insert({
            title: prompt.title,
            body: prompt.body,
            category: prompt.category || null,
            tags: prompt.tags || [],
            is_public: prompt.is_public !== undefined ? prompt.is_public : true,
            author: userId,
          })

          if (error) throw error
          imported++
        } catch {
          failed++
        }
      }

      setImportStatus({
        total: data.prompts.length,
        imported,
        failed,
      })

      if (imported > 0) {
        toast({
          title: 'Import successful',
          description: `Imported ${imported} prompts`,
        })
        setImportText('')
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Import failed',
        description: 'Invalid JSON format or data structure',
      })
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="export">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="export">Export</TabsTrigger>
          <TabsTrigger value="import">Import</TabsTrigger>
        </TabsList>

        <TabsContent value="export" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export Your Prompts
              </CardTitle>
              <CardDescription>
                Download all your prompts in JSON or Markdown format
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Your prompts will be exported with all metadata (title, body, tags, category).
                  Private prompts will remain private after re-import.
                </AlertDescription>
              </Alert>

              <div className="grid gap-3 sm:grid-cols-2">
                <Button
                  onClick={exportToJSON}
                  disabled={isExporting}
                  className="w-full"
                >
                  <FileJson className="w-4 h-4 mr-2" />
                  Export as JSON
                </Button>
                <Button
                  onClick={exportToMarkdown}
                  disabled={isExporting}
                  variant="outline"
                  className="w-full"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Export as Markdown
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="import" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Import Prompts
              </CardTitle>
              <CardDescription>
                Import prompts from a JSON file exported from Prompt Party
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Only JSON files exported from Prompt Party are supported. Paste the contents of your export file below.
                </AlertDescription>
              </Alert>

              <Textarea
                placeholder="Paste your JSON export here..."
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                rows={10}
                className="font-mono text-xs"
              />

              <Button
                onClick={importFromJSON}
                disabled={isImporting || !importText.trim()}
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                {isImporting ? 'Importing...' : 'Import Prompts'}
              </Button>

              {importStatus && (
                <Alert className="border-green-600 bg-green-50 dark:bg-green-950">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700 dark:text-green-300">
                    Import complete: {importStatus.imported} of {importStatus.total} prompts imported successfully
                    {importStatus.failed > 0 && ` (${importStatus.failed} failed)`}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
