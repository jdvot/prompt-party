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
import { GitBranch, GitFork, Heart, Eye, User } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

interface RemixNode {
  id: string
  title: string
  author: {
    name?: string
    avatar_url?: string
  }
  likes_count: number
  views_count: number
  created_at: string
  children?: RemixNode[]
}

interface RemixTreeProps {
  promptId: string
  promptTitle: string
}

export function RemixTree({ promptId, promptTitle }: RemixTreeProps) {
  const [tree, setTree] = useState<RemixNode | null>(null)
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set([promptId]))

  useEffect(() => {
    if (isOpen && !tree) {
      fetchRemixTree()
    }
  }, [isOpen])

  const fetchRemixTree = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/prompts/${promptId}/remix-tree`)
      const data = await response.json()
      setTree(data.tree)
    } catch (error) {
      console.error('Error fetching remix tree:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev)
      if (next.has(nodeId)) {
        next.delete(nodeId)
      } else {
        next.add(nodeId)
      }
      return next
    })
  }

  const renderNode = (node: RemixNode, depth: number = 0) => {
    const isExpanded = expandedNodes.has(node.id)
    const hasChildren = node.children && node.children.length > 0

    return (
      <div key={node.id} className="relative">
        {/* Connection Line */}
        {depth > 0 && (
          <div className="absolute left-0 top-0 w-8 h-6 border-l-2 border-b-2 border-muted-foreground/30 rounded-bl-lg" />
        )}

        {/* Node Card */}
        <div className={`${depth > 0 ? 'ml-8' : ''} mb-4`}>
          <Card
            className={`p-4 hover:border-primary/50 transition-all ${
              node.id === promptId
                ? 'ring-2 ring-primary bg-primary/5'
                : 'bg-card'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                {/* Title and expand button */}
                <div className="flex items-center gap-2 mb-2">
                  {hasChildren && (
                    <button
                      onClick={() => toggleNode(node.id)}
                      className="shrink-0 w-6 h-6 rounded bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                    >
                      {isExpanded ? '−' : '+'}
                    </button>
                  )}
                  <Link
                    href={`/prompts/${node.id}`}
                    className="font-medium hover:text-primary transition-colors truncate"
                  >
                    {node.title}
                  </Link>
                  {node.id === promptId && (
                    <Badge variant="default" className="shrink-0">Original</Badge>
                  )}
                </div>

                {/* Author */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  {node.author.avatar_url ? (
                    <img
                      src={node.author.avatar_url}
                      alt={node.author.name || 'User'}
                      className="w-5 h-5 rounded-full"
                    />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  <span>{node.author.name || 'Anonymous'}</span>
                  <span className="text-xs">•</span>
                  <span className="text-xs">
                    {formatDistanceToNow(new Date(node.created_at), {
                      addSuffix: true,
                    })}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {node.likes_count || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {node.views_count || 0}
                  </span>
                  {hasChildren && (
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" />
                      {node.children?.length} remix{(node.children?.length || 0) !== 1 ? 'es' : ''}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Render children */}
          {hasChildren && isExpanded && node.children && (
            <div className="mt-2 pl-4 border-l-2 border-muted-foreground/20">
              {node.children.map((child) => renderNode(child, depth + 1))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <GitBranch className="w-4 h-4" />
          Remix Tree
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-primary" />
            Remix Genealogy Tree
          </DialogTitle>
          <DialogDescription>
            Explore how this prompt has been remixed and evolved
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        ) : tree ? (
          <div className="mt-6">
            <div className="mb-4 p-3 bg-info/10 border border-info/20 rounded-md">
              <p className="text-sm text-info-foreground">
                <strong>💡 Tip:</strong> Click the + or − buttons to expand or collapse remix branches.
                This view shows the complete genealogy of {promptTitle} and all its remixes.
              </p>
            </div>
            {renderNode(tree)}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <GitBranch className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No Remixes Yet</p>
            <p className="text-sm">
              This prompt hasn't been remixed yet. Be the first to create a remix!
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
