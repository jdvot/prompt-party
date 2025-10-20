import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Prompt Party',
  description: 'Prompt Party Privacy Policy',
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

        <div className="space-y-6 text-muted-foreground">
          <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Information We Collect</h2>
            <p>
              When you use Prompt Party, we collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Account information (email, username, profile details)</li>
              <li>Content you create (prompts, comments, collections)</li>
              <li>Usage data (pages visited, features used)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Provide and improve our services</li>
              <li>Personalize your experience</li>
              <li>Communicate with you about updates and features</li>
              <li>Protect against fraud and abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Data Storage</h2>
            <p>
              Your data is stored securely using Supabase (PostgreSQL) with encryption at rest.
              We implement industry-standard security measures to protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Sharing Your Information</h2>
            <p>
              We do not sell your personal information. Public content you create (public prompts,
              comments) is visible to other users. Private prompts and collections remain private.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your account and data</li>
              <li>Export your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Cookies</h2>
            <p>
              We use cookies and similar technologies to maintain your session and improve
              your experience. You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of
              any changes by posting the new policy on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Contact Us</h2>
            <p>
              If you have questions about this privacy policy, please contact us through
              our GitHub repository.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
