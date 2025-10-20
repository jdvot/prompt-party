import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-background mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-4">
              <span className="text-2xl">🪩</span>
              <span>Prompt Party</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The social network for the best AI prompts
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-4">Community</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-muted-foreground hover:text-foreground">
                Feed
              </Link>
              <Link href="/trending" className="block text-sm text-muted-foreground hover:text-foreground">
                Trending
              </Link>
              <Link href="/top" className="block text-sm text-muted-foreground hover:text-foreground">
                Top Prompts
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/docs" className="block text-sm text-muted-foreground hover:text-foreground">
                Documentation
              </Link>
              <Link href="/faq" className="block text-sm text-muted-foreground hover:text-foreground">
                FAQ
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Prompt Party. Released under the MIT License.</p>
        </div>
      </div>
    </footer>
  )
}
