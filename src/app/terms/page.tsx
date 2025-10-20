import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Prompt Party',
  description: 'Prompt Party Terms of Service',
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

        <div className="space-y-6 text-muted-foreground">
          <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Acceptance of Terms</h2>
            <p>
              By accessing and using Prompt Party, you accept and agree to be bound by the
              terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account and
              password. You agree to accept responsibility for all activities that occur
              under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Content</h2>
            <p>
              You retain ownership of content you create on Prompt Party. By posting content,
              you grant us a non-exclusive license to use, display, and distribute your
              content on the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Post illegal, harmful, or offensive content</li>
              <li>Harass or abuse other users</li>
              <li>Spam or engage in fraudulent activity</li>
              <li>Violate intellectual property rights</li>
              <li>Attempt to compromise platform security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Content Moderation</h2>
            <p>
              We reserve the right to remove content and suspend accounts that violate
              these terms or our community guidelines.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Intellectual Property</h2>
            <p>
              When you remix a prompt, you must credit the original creator. We respect
              intellectual property rights and expect users to do the same.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Disclaimer</h2>
            <p>
              Prompt Party is provided &quot;as is&quot; without warranty of any kind. We do not
              guarantee the accuracy, reliability, or availability of the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Limitation of Liability</h2>
            <p>
              We shall not be liable for any indirect, incidental, special, consequential,
              or punitive damages resulting from your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Termination</h2>
            <p>
              We may terminate or suspend your account at any time for violation of these
              terms. You may delete your account at any time through your profile settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users
              of significant changes via email or platform notification.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Contact</h2>
            <p>
              For questions about these terms, please contact us through our GitHub repository.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
