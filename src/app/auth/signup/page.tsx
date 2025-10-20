import { AuthForm } from '@/components/auth/auth-form'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <AuthForm mode="signup" />
      </div>
    </div>
  )
}
