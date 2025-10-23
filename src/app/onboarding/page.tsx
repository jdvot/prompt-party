'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { WelcomeScreen } from '@/components/onboarding/welcome-screen'
import { InterestSelection } from '@/components/onboarding/interest-selection'
import { FollowCreators } from '@/components/onboarding/follow-creators'
import { FeatureTour } from '@/components/onboarding/feature-tour'
import { createClient } from '@/lib/supabase/client'

// Mock data for suggested creators (in production, fetch from API)
const SUGGESTED_CREATORS = [
  {
    id: '1',
    name: 'Sarah Chen',
    username: 'sarahchen',
    promptCount: 142,
    followerCount: 15200,
    bio: 'Content strategist & AI prompt engineer. Helping creators scale with ChatGPT',
  },
  {
    id: '2',
    name: 'Alex Rivera',
    username: 'alexrivera',
    promptCount: 89,
    followerCount: 8950,
    bio: 'Developer & educator. Sharing coding prompts for productivity',
  },
  {
    id: '3',
    name: 'Emma Thompson',
    username: 'emmathompson',
    promptCount: 203,
    followerCount: 23100,
    bio: 'Marketing consultant. Creating prompts for better campaigns',
  },
  {
    id: '4',
    name: 'Marcus Johnson',
    username: 'marcusj',
    promptCount: 156,
    followerCount: 12400,
    bio: 'Data scientist. Prompts for analysis and insights',
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [followedCreators, setFollowedCreators] = useState<string[]>([])
  const supabase = createClient()

  const handleWelcomeNext = () => {
    setStep(2)
    updateOnboardingStep(2)
  }

  const handleInterestNext = (interests: string[]) => {
    setSelectedInterests(interests)
    setStep(3)
    updateOnboardingStep(3)
    saveInterests(interests)
  }

  const handleFollowNext = async (creatorIds: string[]) => {
    setFollowedCreators(creatorIds)
    setStep(4)
    updateOnboardingStep(4)

    // Follow creators in database
    if (creatorIds.length > 0) {
      await followCreators(creatorIds)
    }
  }

  const handleComplete = async () => {
    // Mark onboarding as complete
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      await supabase
        .from('profiles')
        .update({
          onboarding_completed: true,
          onboarding_step: 5,
          onboarding_completed_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
    }

    // Redirect to home
    router.push('/')
  }

  const handleSkip = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      await supabase
        .from('profiles')
        .update({
          onboarding_completed: true,
          onboarding_step: 5,
          onboarding_completed_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
    }

    router.push('/')
  }

  const updateOnboardingStep = async (stepNumber: number) => {
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      await supabase
        .from('profiles')
        .update({ onboarding_step: stepNumber })
        .eq('user_id', user.id)
    }
  }

  const saveInterests = async (interests: string[]) => {
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      await supabase
        .from('profiles')
        .update({ selected_interests: interests })
        .eq('user_id', user.id)
    }
  }

  const followCreators = async (creatorIds: string[]) => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    // In production, use the follows table
    // For now, we'll just log it
    console.log('Following creators:', creatorIds)
  }

  return (
    <>
      {step === 1 && (
        <WelcomeScreen
          onNext={handleWelcomeNext}
          onSkip={handleSkip}
        />
      )}

      {step === 2 && (
        <InterestSelection
          onNext={handleInterestNext}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <FollowCreators
          suggestedCreators={SUGGESTED_CREATORS}
          onNext={handleFollowNext}
          onBack={() => setStep(2)}
          onSkip={() => setStep(4)}
        />
      )}

      {step === 4 && (
        <FeatureTour
          onComplete={handleComplete}
          onBack={() => setStep(3)}
        />
      )}
    </>
  )
}
