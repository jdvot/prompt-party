'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Creator {
  id: string
  name: string
  username: string
  promptCount: number
  followerCount: number
  bio: string
}

interface FollowCreatorsProps {
  suggestedCreators: Creator[]
  onNext: (followedIds: string[]) => void
  onBack: () => void
  onSkip: () => void
}

export function FollowCreators({
  suggestedCreators,
  onNext,
  onBack,
  onSkip,
}: FollowCreatorsProps) {
  const [followedCreators, setFollowedCreators] = useState<string[]>([])

  const toggleFollow = (creatorId: string) => {
    setFollowedCreators((prev) =>
      prev.includes(creatorId)
        ? prev.filter((id) => id !== creatorId)
        : [...prev, creatorId]
    )
  }

  const handleNext = () => {
    onNext(followedCreators)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Card className="max-w-3xl w-full">
        <CardContent className="p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Follow Top Creators
            </h2>
            <p className="text-muted-foreground">
              Stay updated with the best prompt creators in your interests
            </p>
            {followedCreators.length > 0 && (
              <p className="text-sm text-primary mt-2">
                Following {followedCreators.length} creators
              </p>
            )}
          </div>

          {/* Creators List */}
          <div className="space-y-4 mb-8 max-h-96 overflow-y-auto">
            {suggestedCreators.map((creator) => {
              const isFollowing = followedCreators.includes(creator.id)

              return (
                <div
                  key={creator.id}
                  className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  {/* Avatar */}
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {creator.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{creator.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      @{creator.username}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {creator.bio}
                    </p>
                    <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{creator.promptCount} prompts</span>
                      <span>{creator.followerCount} followers</span>
                    </div>
                  </div>

                  {/* Follow Button */}
                  <Button
                    size="sm"
                    variant={isFollowing ? 'secondary' : 'primary'}
                    onClick={() => toggleFollow(creator.id)}
                    className={cn(
                      'min-w-24',
                      isFollowing && 'bg-primary/10 text-primary hover:bg-primary/20'
                    )}
                  >
                    {isFollowing ? (
                      <>
                        <CheckIcon className="w-4 h-4 mr-1" />
                        Following
                      </>
                    ) : (
                      'Follow'
                    )}
                  </Button>
                </div>
              )
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              variant="outline"
              onClick={onBack}
              className="flex-1"
            >
              Back
            </Button>

            <Button
              size="lg"
              variant="ghost"
              onClick={onSkip}
              className="flex-1"
            >
              Skip
            </Button>

            <Button
              size="lg"
              onClick={handleNext}
              className="flex-1"
            >
              {followedCreators.length > 0 ? 'Continue' : 'Skip'}
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground mb-2">Step 3 of 4</p>
            <div className="flex gap-2 justify-center">
              <div className="w-8 h-1 rounded-full bg-primary"></div>
              <div className="w-8 h-1 rounded-full bg-primary"></div>
              <div className="w-8 h-1 rounded-full bg-primary"></div>
              <div className="w-8 h-1 rounded-full bg-muted"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
