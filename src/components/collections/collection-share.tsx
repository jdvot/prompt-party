'use client'

import { useState } from 'react'
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
import { Share2, Copy, Check, Globe, Lock, Link2, Mail, Twitter } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface CollectionShareProps {
  collectionId: string
  collectionName: string
  isPublic: boolean
  onToggleVisibility?: () => void
}

export function CollectionShare({
  collectionId,
  collectionName,
  isPublic,
  onToggleVisibility,
}: CollectionShareProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/collections/${collectionId}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const shareVia = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `Check out this collection: ${collectionName}`
    )}&url=${encodeURIComponent(shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(
      `Check out this collection: ${collectionName}`
    )}&body=${encodeURIComponent(shareUrl)}`,
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-primary" />
            Share Collection
          </DialogTitle>
          <DialogDescription>
            Share "{collectionName}" with others
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Visibility Toggle */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {isPublic ? (
                  <Globe className="w-4 h-4 text-green-600" />
                ) : (
                  <Lock className="w-4 h-4 text-muted-foreground" />
                )}
                <span className="font-medium">
                  {isPublic ? 'Public Collection' : 'Private Collection'}
                </span>
              </div>
              <Badge variant={isPublic ? 'default' : 'secondary'}>
                {isPublic ? 'Public' : 'Private'}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {isPublic
                ? 'Anyone with the link can view this collection'
                : 'Only you can see this collection'}
            </p>
            {onToggleVisibility && (
              <Button
                onClick={onToggleVisibility}
                variant="outline"
                size="sm"
                className="w-full"
              >
                {isPublic ? 'Make Private' : 'Make Public'}
              </Button>
            )}
          </div>

          {/* Share Link */}
          {isPublic && (
            <>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Share Link
                </label>
                <div className="flex gap-2">
                  <Input
                    value={shareUrl}
                    readOnly
                    className="flex-1 bg-muted/50"
                  />
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="gap-2 shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Share Options */}
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Share via
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={shareVia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Twitter className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium">Twitter</span>
                  </a>
                  <a
                    href={shareVia.email}
                    className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-purple-500" />
                    <span className="text-sm font-medium">Email</span>
                  </a>
                </div>
              </div>

              {/* Embed Code */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Embed in Website
                </label>
                <div className="relative">
                  <code className="block p-3 bg-muted/50 rounded-lg text-xs overflow-x-auto">
                    {`<iframe src="${shareUrl}/embed" width="100%" height="600" frameborder="0"></iframe>`}
                  </code>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `<iframe src="${shareUrl}/embed" width="100%" height="600" frameborder="0"></iframe>`
                      )
                    }}
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </>
          )}

          {!isPublic && (
            <div className="p-4 bg-info/10 border border-info/20 rounded-md">
              <p className="text-sm text-info-foreground">
                <strong>💡 Tip:</strong> Make this collection public to share it with
                others. Public collections can be discovered and viewed by anyone.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
