'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { History, GitBranch, Clock, RotateCcw } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface Version {
  id: string
  version_number: number
  title: string
  body: string
  change_note?: string
  created_at: string
  author: {
    name?: string
    avatar_url?: string
  }
}

interface VersionHistoryProps {
  promptId: string
  onRestore?: (version: Version) => void
}

export function VersionHistory({ promptId, onRestore }: VersionHistoryProps) {
  const [versions, setVersions] = useState<Version[]>([])
  const [loading, setLoading] = useState(false)
  const [restoring, setRestoring] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null)

  useEffect(() => {
    if (isOpen && versions.length === 0) {
      fetchVersions()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const fetchVersions = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/prompts/${promptId}/versions`)
      const data = await response.json()
      setVersions(data.versions || [])
    } catch (error) {
      console.error('Error fetching versions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRestore = async (version: Version) => {
    if (!confirm(`Restore to version ${version.version_number}?`)) return

    setRestoring(true)
    try {
      const response = await fetch(
        `/api/prompts/${promptId}/versions/${version.id}/restore`,
        { method: 'POST' }
      )

      if (!response.ok) throw new Error('Failed to restore version')

      // Callback to parent component
      if (onRestore) {
        onRestore(version)
      }

      // Refresh the page or refetch data
      window.location.reload()
    } catch (error) {
      console.error('Error restoring version:', error)
      alert('Failed to restore version')
    } finally {
      setRestoring(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <History className="w-4 h-4" />
          Version History
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-primary" />
            Version History
          </DialogTitle>
          <DialogDescription>
            View all previous versions of this prompt
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        ) : versions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No version history available</p>
            <p className="text-sm mt-1">This is the original version</p>
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            {versions.map((version, index) => (
              <Card
                key={version.id}
                className={`p-4 transition-all cursor-pointer ${
                  selectedVersion?.id === version.id
                    ? 'ring-2 ring-primary'
                    : 'hover:border-primary/50'
                }`}
                onClick={() =>
                  setSelectedVersion(
                    selectedVersion?.id === version.id ? null : version
                  )
                }
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={index === 0 ? 'default' : 'secondary'}
                      className={
                        index === 0
                          ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600'
                          : ''
                      }
                    >
                      v{version.version_number}
                      {index === 0 && ' (Latest)'}
                    </Badge>
                    <span className="font-semibold">{version.title}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {formatDistanceToNow(new Date(version.created_at), {
                      addSuffix: true,
                    })}
                  </div>
                </div>

                {version.change_note && (
                  <p className="text-sm text-muted-foreground mb-2 italic">
                    {version.change_note}
                  </p>
                )}

                <div className="text-xs text-muted-foreground">
                  by {version.author?.name || 'Anonymous'}
                </div>

                {selectedVersion?.id === version.id && (
                  <div className="mt-4 pt-4 border-t space-y-4">
                    <div className="bg-muted/30 p-4 rounded-md max-h-64 overflow-y-auto">
                      <pre className="text-sm whitespace-pre-wrap">
                        {version.body}
                      </pre>
                    </div>
                    {index !== 0 && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRestore(version)
                        }}
                        disabled={restoring}
                        size="sm"
                        className="gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        {restoring ? 'Restoring...' : 'Restore This Version'}
                      </Button>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
