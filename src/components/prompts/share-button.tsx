'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Share2Icon, TwitterIcon, LinkedinIcon, LinkIcon, CheckIcon } from 'lucide-react'

interface ShareButtonProps {
  promptId: string
  title: string
  description?: string
}

export function ShareButton({ promptId, title, description }: ShareButtonProps) {
  const [showMenu, setShowMenu] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/prompts/${promptId}`
    : ''

  const shareText = `Check out this AI prompt: ${title}`

  // Close menu when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}&hashtags=PromptParty,AI`
    window.open(twitterUrl, '_blank', 'noopener,noreferrer,width=550,height=420')
    setShowMenu(false)
  }

  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer,width=550,height=420')
    setShowMenu(false)
  }

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description || shareText,
          url: url,
        })
        setShowMenu(false)
      } catch (err) {
        console.error('Error sharing:', err)
      }
    }
  }

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowMenu(!showMenu)}
        aria-label="Share prompt"
      >
        <Share2Icon className="w-4 h-4 mr-2" />
        Share
      </Button>

      {showMenu && (
        <div className="absolute top-full mt-2 right-0 bg-popover border rounded-lg shadow-lg p-2 min-w-[200px] z-dropdown animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex flex-col gap-1">
            <button
              onClick={shareToTwitter}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-left"
            >
              <TwitterIcon className="w-4 h-4 text-[#1DA1F2]" />
              <span className="text-sm">Share on Twitter</span>
            </button>

            <button
              onClick={shareToLinkedIn}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-left"
            >
              <LinkedinIcon className="w-4 h-4 text-[#0A66C2]" />
              <span className="text-sm">Share on LinkedIn</span>
            </button>

            {navigator.share && (
              <button
                onClick={shareNative}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-left"
              >
                <Share2Icon className="w-4 h-4" />
                <span className="text-sm">Share...</span>
              </button>
            )}

            <div className="border-t my-1" />

            <button
              onClick={copyToClipboard}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-left"
            >
              {copied ? (
                <>
                  <CheckIcon className="w-4 h-4 text-success" />
                  <span className="text-sm text-success">Copied!</span>
                </>
              ) : (
                <>
                  <LinkIcon className="w-4 h-4" />
                  <span className="text-sm">Copy link</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
