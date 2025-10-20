import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CreateTeamForm } from '@/components/teams/create-team-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Team | Prompt Party',
  description: 'Create a new team workspace',
}

export default async function NewTeamPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Check if user has Team or Business plan
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', user.id)
    .single()

  const hasTeamPlan = profile?.plan === 'team' || profile?.plan === 'business'

  if (!hasTeamPlan) {
    redirect('/pricing?feature=teams')
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create a Team</h1>
          <p className="text-muted-foreground">
            Set up a team workspace to collaborate with up to 10 members
          </p>
        </div>

        <CreateTeamForm />
      </div>
    </div>
  )
}
