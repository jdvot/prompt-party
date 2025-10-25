'use client'

import { ReactNode } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from './code-block'

interface ComponentPreviewProps {
  children: ReactNode
  code: string
  title: string
  description?: string
}

export function ComponentPreview({
  children,
  code,
  title,
  description,
}: ComponentPreviewProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="mt-4">
          <div className="bg-card border rounded-lg p-8 flex items-center justify-center min-h-[200px]">
            {children}
          </div>
        </TabsContent>

        <TabsContent value="code" className="mt-4">
          <CodeBlock code={code} title={title} language="tsx" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
