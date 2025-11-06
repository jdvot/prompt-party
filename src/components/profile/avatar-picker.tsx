'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// DiceBear Avatars - Free tier API
const AVATAR_STYLES = [
  'adventurer',
  'adventurer-neutral',
  'avataaars',
  'big-ears',
  'big-ears-neutral',
  'big-smile',
  'bottts',
  'croodles',
  'croodles-neutral',
  'fun-emoji',
  'icons',
  'identicon',
  'lorelei',
  'micah',
  'miniavs',
  'notionists',
  'notionists-neutral',
  'open-peeps',
  'personas',
  'pixel-art',
  'pixel-art-neutral',
  'shapes',
  'thumbs',
]

const AVATAR_SEEDS = [
  'felix', 'aneka', 'muffin', 'buddy', 'sam', 'tiger',
  'sophie', 'charlie', 'lucy', 'max', 'molly', 'rocky',
  'daisy', 'jack', 'lily', 'bailey', 'milo', 'zoe',
  'oliver', 'chloe', 'duke', 'sadie', 'cooper', 'bella'
]

interface AvatarOption {
  id: string
  url: string
  style: string
  seed: string
}

function generateAvatarOptions(): AvatarOption[] {
  const options: AvatarOption[] = []

  // Generate 24 diverse avatars using different combinations
  for (let i = 0; i < 24; i++) {
    const style = AVATAR_STYLES[i % AVATAR_STYLES.length]
    const seed = AVATAR_SEEDS[i]
    const url = `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&size=128`

    options.push({
      id: `${style}-${seed}`,
      url,
      style,
      seed,
    })
  }

  return options
}

const PREDEFINED_AVATARS = generateAvatarOptions()

interface AvatarPickerProps {
  currentAvatar?: string
  onSelect: (avatar: string) => void
}

export function AvatarPicker({ currentAvatar, onSelect }: AvatarPickerProps) {
  const [selected, setSelected] = useState<string>(currentAvatar || '')
  const [isLoading, setIsLoading] = useState(false)

  const handleSelect = (avatar: AvatarOption) => {
    setSelected(avatar.url)
    onSelect(avatar.url)
  }

  const randomize = () => {
    setIsLoading(true)
    setTimeout(() => {
      const randomAvatar = PREDEFINED_AVATARS[Math.floor(Math.random() * PREDEFINED_AVATARS.length)]
      handleSelect(randomAvatar)
      setIsLoading(false)
    }, 300)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium">Choose Your Avatar</h3>
        <Button
          onClick={randomize}
          variant="outline"
          size="sm"
          disabled={isLoading}
          className="text-xs"
        >
          🎲 Randomize
        </Button>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-6 gap-3 max-h-96 overflow-y-auto p-1">
        {PREDEFINED_AVATARS.map((avatar) => {
          const isSelected = selected === avatar.url

          return (
            <button
              key={avatar.id}
              onClick={() => handleSelect(avatar)}
              className={`relative aspect-square rounded-2xl border-2 transition-all hover:scale-110 overflow-hidden ${
                isSelected
                  ? 'ring-4 ring-primary scale-105 border-primary shadow-lg shadow-primary/50'
                  : 'border-border hover:border-primary/50 shadow-sm'
              }`}
              title={`${avatar.style} - ${avatar.seed}`}
            >
              <Image
                src={avatar.url}
                alt={avatar.id}
                width={128}
                height={128}
                className="w-full h-full object-cover"
                loading="lazy"
                unoptimized
              />
              {isSelected && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-3.5 h-3.5 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          )
        })}
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Powered by DiceBear Avatars - Choose from {PREDEFINED_AVATARS.length} fun avatars!
      </p>
    </div>
  )
}

// Generate DiceBear avatar URL
export function generateAvatarUrl(seed?: string, style: string = 'avataaars'): string {
  const avatarSeed = seed || Math.random().toString(36).substring(7)
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${avatarSeed}&size=128`
}

export function renderAvatar(avatarUrl: string | null, name: string, size: 'sm' | 'md' | 'lg' = 'md') {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-24 h-24'
  }

  if (!avatarUrl) {
    // Default fallback with gradient
    return (
      <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-bold text-white shadow-lg`}>
        {(name || 'A').charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <Image
      src={avatarUrl}
      alt={name}
      width={size === 'lg' ? 96 : size === 'md' ? 48 : 32}
      height={size === 'lg' ? 96 : size === 'md' ? 48 : 32}
      className={`${sizeClasses[size]} rounded-full object-cover shadow-md ring-2 ring-white dark:ring-gray-800`}
      unoptimized
    />
  )
}
