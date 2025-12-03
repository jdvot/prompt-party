'use client'

import { useState, useCallback, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import {
  Variable,
  Plus,
  Trash2,
  Type,
  Hash,
  List,
  AlignLeft,
  GripVertical,
} from 'lucide-react'

export type VariableType = 'text' | 'number' | 'select' | 'textarea'

export interface PromptVariable {
  id: string
  name: string
  type: VariableType
  defaultValue: string
  options?: string[] // For select type
  description?: string
}

interface VariableEditorProps {
  variables: PromptVariable[]
  onVariablesChange: (variables: PromptVariable[]) => void
  translations: {
    variables_title: string
    variables_description: string
    add_variable: string
    variable_name: string
    variable_type: string
    variable_default: string
    variable_options: string
    variable_options_hint: string
    type_text: string
    type_number: string
    type_select: string
    type_textarea: string
    remove_variable: string
    no_variables: string
    detected_variables: string
  }
}

const VARIABLE_TYPE_ICONS: Record<VariableType, React.ElementType> = {
  text: Type,
  number: Hash,
  select: List,
  textarea: AlignLeft,
}

// Extract variables from text (matches {{variable_name}})
export function extractVariables(text: string): string[] {
  const regex = /\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g
  const matches: string[] = []
  let match

  while ((match = regex.exec(text)) !== null) {
    if (!matches.includes(match[1])) {
      matches.push(match[1])
    }
  }

  return matches
}

// Replace variables in text with their values
export function replaceVariables(
  text: string,
  variableValues: Record<string, string>
): string {
  return text.replace(/\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g, (match, varName) => {
    return variableValues[varName] !== undefined
      ? variableValues[varName]
      : match
  })
}

export function VariableEditor({
  variables,
  onVariablesChange,
  translations: t,
}: VariableEditorProps) {
  const addVariable = useCallback(() => {
    const newVariable: PromptVariable = {
      id: `var_${Date.now()}`,
      name: '',
      type: 'text',
      defaultValue: '',
    }
    onVariablesChange([...variables, newVariable])
  }, [variables, onVariablesChange])

  const updateVariable = useCallback(
    (id: string, updates: Partial<PromptVariable>) => {
      onVariablesChange(
        variables.map((v) => (v.id === id ? { ...v, ...updates } : v))
      )
    },
    [variables, onVariablesChange]
  )

  const removeVariable = useCallback(
    (id: string) => {
      onVariablesChange(variables.filter((v) => v.id !== id))
    },
    [variables, onVariablesChange]
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Variable className="w-5 h-5 text-brand-primary" />
          <h3 className="font-semibold">{t.variables_title}</h3>
        </div>
        <Button variant="outline" size="sm" onClick={addVariable}>
          <Plus className="w-4 h-4 mr-2" />
          {t.add_variable}
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">{t.variables_description}</p>

      {variables.length === 0 ? (
        <div className="text-center py-8 border border-dashed rounded-xl">
          <Variable className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">{t.no_variables}</p>
          <Button variant="ghost" size="sm" className="mt-3" onClick={addVariable}>
            <Plus className="w-4 h-4 mr-2" />
            {t.add_variable}
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {variables.map((variable, index) => {
            const TypeIcon = VARIABLE_TYPE_ICONS[variable.type]
            return (
              <Card key={variable.id} variant="compact" padding="sm">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center gap-2 pt-2 text-muted-foreground">
                      <GripVertical className="w-4 h-4 cursor-move" />
                      <span className="text-sm font-mono">#{index + 1}</span>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* Variable Name */}
                      <div className="space-y-1.5">
                        <Label htmlFor={`var-name-${variable.id}`} className="text-xs">
                          {t.variable_name}
                        </Label>
                        <div className="relative">
                          <Input
                            id={`var-name-${variable.id}`}
                            value={variable.name}
                            onChange={(e) =>
                              updateVariable(variable.id, {
                                name: e.target.value.replace(/[^a-zA-Z0-9_]/g, '_'),
                              })
                            }
                            placeholder="variable_name"
                            className="font-mono text-sm pl-8"
                          />
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                            {'{{'}
                          </span>
                        </div>
                        {variable.name && (
                          <Badge variant="secondary" className="font-mono text-xs">
                            {`{{${variable.name}}}`}
                          </Badge>
                        )}
                      </div>

                      {/* Variable Type */}
                      <div className="space-y-1.5">
                        <Label htmlFor={`var-type-${variable.id}`} className="text-xs">
                          {t.variable_type}
                        </Label>
                        <Select
                          value={variable.type}
                          onValueChange={(value: VariableType) =>
                            updateVariable(variable.id, { type: value })
                          }
                        >
                          <SelectTrigger id={`var-type-${variable.id}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">
                              <span className="flex items-center gap-2">
                                <Type className="w-4 h-4" />
                                {t.type_text}
                              </span>
                            </SelectItem>
                            <SelectItem value="number">
                              <span className="flex items-center gap-2">
                                <Hash className="w-4 h-4" />
                                {t.type_number}
                              </span>
                            </SelectItem>
                            <SelectItem value="select">
                              <span className="flex items-center gap-2">
                                <List className="w-4 h-4" />
                                {t.type_select}
                              </span>
                            </SelectItem>
                            <SelectItem value="textarea">
                              <span className="flex items-center gap-2">
                                <AlignLeft className="w-4 h-4" />
                                {t.type_textarea}
                              </span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Default Value / Options */}
                      <div className="space-y-1.5">
                        <Label htmlFor={`var-default-${variable.id}`} className="text-xs">
                          {variable.type === 'select' ? t.variable_options : t.variable_default}
                        </Label>
                        {variable.type === 'select' ? (
                          <div className="space-y-1">
                            <Input
                              id={`var-default-${variable.id}`}
                              value={variable.options?.join(', ') || ''}
                              onChange={(e) =>
                                updateVariable(variable.id, {
                                  options: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                                })
                              }
                              placeholder="option1, option2, option3"
                              className="text-sm"
                            />
                            <p className="text-xs text-muted-foreground">
                              {t.variable_options_hint}
                            </p>
                          </div>
                        ) : (
                          <Input
                            id={`var-default-${variable.id}`}
                            type={variable.type === 'number' ? 'number' : 'text'}
                            value={variable.defaultValue}
                            onChange={(e) =>
                              updateVariable(variable.id, { defaultValue: e.target.value })
                            }
                            placeholder={variable.type === 'number' ? '0' : 'Default value'}
                            className="text-sm"
                          />
                        )}
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive shrink-0"
                      onClick={() => removeVariable(variable.id)}
                      aria-label={t.remove_variable}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

// Component to detect and display variables found in prompt text
interface DetectedVariablesProps {
  promptText: string
  existingVariables: PromptVariable[]
  onAddVariable: (name: string) => void
  translations: {
    detected_variables: string
    add_variable: string
  }
}

export function DetectedVariables({
  promptText,
  existingVariables,
  onAddVariable,
  translations: t,
}: DetectedVariablesProps) {
  const detectedNames = useMemo(() => extractVariables(promptText), [promptText])
  const existingNames = useMemo(
    () => existingVariables.map((v) => v.name),
    [existingVariables]
  )
  const newVariables = useMemo(
    () => detectedNames.filter((name) => !existingNames.includes(name)),
    [detectedNames, existingNames]
  )

  if (newVariables.length === 0) return null

  return (
    <div className="flex items-center gap-2 flex-wrap mt-2">
      <span className="text-xs text-muted-foreground">{t.detected_variables}:</span>
      {newVariables.map((name) => (
        <Button
          key={name}
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs font-mono bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20"
          onClick={() => onAddVariable(name)}
        >
          <Plus className="w-3 h-3 mr-1" />
          {`{{${name}}}`}
        </Button>
      ))}
    </div>
  )
}
