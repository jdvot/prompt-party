'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { SparklesIcon, CopyIcon, CheckIcon } from 'lucide-react'

interface TemplateDetailProps {
  template: {
    id: string
    title: string
    description: string
    category: string
    template_body: string
    variables: any[]
    use_count: number
  }
  isOpen: boolean
  onClose: () => void
}

export function TemplateDetail({ template, isOpen, onClose }: TemplateDetailProps) {
  const router = useRouter()
  const t = useTranslations('templates')
  const [variableValues, setVariableValues] = useState<Record<string, string>>({})
  const [processedBody, setProcessedBody] = useState(template.template_body)
  const [copied, setCopied] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const supabase = createClient()

  // Initialize variable values
  useEffect(() => {
    if (template.variables && template.variables.length > 0) {
      const initialValues: Record<string, string> = {}
      template.variables.forEach((variable: any) => {
        initialValues[variable.name] = variable.placeholder || ''
      })
      setVariableValues(initialValues)
    }
  }, [template.variables])

  // Update processed body when variables change
  useEffect(() => {
    let body = template.template_body
    Object.entries(variableValues).forEach(([key, value]) => {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g')
      body = body.replace(regex, value || `{{${key}}}`)
    })
    setProcessedBody(body)
  }, [variableValues, template.template_body])

  const handleVariableChange = (name: string, value: string) => {
    setVariableValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(processedBody)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCreatePrompt = async () => {
    setIsCreating(true)

    // Increment template usage
    await (supabase.rpc as any)('increment_template_usage', { template_uuid: template.id })

    // Redirect to prompt creation with pre-filled body
    const params = new URLSearchParams({
      body: processedBody,
      template: template.title,
    })
    router.push(`/prompts/new?${params}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{template.title}</DialogTitle>
          <DialogDescription>{template.description}</DialogDescription>
          <div className="flex gap-2 mt-2">
            <Badge>{t(`category_${template.category}`)}</Badge>
            <Badge variant="outline">
              <SparklesIcon className="w-3 h-3 mr-1" />
              {template.use_count || 0} {t('uses')}
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Variables Form */}
          {template.variables && template.variables.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">{t('customize_template')}</h3>
              {template.variables.map((variable: any) => (
                <div key={variable.name} className="space-y-2">
                  <Label htmlFor={variable.name}>
                    {variable.name.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                  </Label>

                  {variable.type === 'textarea' ? (
                    <Textarea
                      id={variable.name}
                      placeholder={variable.placeholder || ''}
                      value={variableValues[variable.name] || ''}
                      onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                      rows={4}
                    />
                  ) : variable.type === 'select' && variable.options ? (
                    <Select
                      value={variableValues[variable.name] || ''}
                      onValueChange={(value) => handleVariableChange(variable.name, value)}
                    >
                      <SelectTrigger id={variable.name}>
                        <SelectValue placeholder={variable.placeholder || t('select_option')} />
                      </SelectTrigger>
                      <SelectContent>
                        {variable.options.map((option: string) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : variable.type === 'number' ? (
                    <Input
                      id={variable.name}
                      type="number"
                      placeholder={variable.placeholder || ''}
                      value={variableValues[variable.name] || ''}
                      onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                    />
                  ) : (
                    <Input
                      id={variable.name}
                      type="text"
                      placeholder={variable.placeholder || ''}
                      value={variableValues[variable.name] || ''}
                      onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{t('preview')}</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-2"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-4 h-4" />
                    {t('copied')}
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-4 h-4" />
                    {t('copy')}
                  </>
                )}
              </Button>
            </div>
            <div className="bg-muted p-4 rounded-lg border min-h-[300px] whitespace-pre-wrap font-mono text-sm">
              {processedBody}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6 justify-end">
          <Button variant="outline" onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button onClick={handleCreatePrompt} disabled={isCreating}>
            {isCreating ? t('creating') : t('create_prompt')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
