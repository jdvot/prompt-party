import Link from 'next/link'
import { Logo, LogoText } from '@/components/brand/logo'

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-auto backdrop-blur-sm">
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 font-bold text-lg mb-4 group">
              <Logo className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
              <LogoText />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed text-balance">
              The social network for discovering and sharing the best AI prompts
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground gradient-text">Community</h3>
            <div className="space-y-3">
              <Link href="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Feed
              </Link>
              <Link href="/trending" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Trending
              </Link>
              <Link href="/top" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Top Prompts
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground gradient-text">Resources</h3>
            <div className="space-y-3">
              <Link href="/pricing" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Pricing
              </Link>
              <Link href="/challenges" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Challenges
              </Link>
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                About
              </Link>
              <Link href="/docs" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Documentation
              </Link>
              <Link href="/faq" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                FAQ
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground gradient-text">Legal</h3>
            <div className="space-y-3">
              <Link href="/privacy" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Prompt Party. Released under the MIT License.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              Made with <span className="text-red-500">♥</span> by the community
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
