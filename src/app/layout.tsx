import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";
import { FloatingCreateButton } from "@/components/layout/floating-create-button";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ShortcutsProvider } from "@/components/keyboard-shortcuts/shortcuts-provider";
import { IntlProvider } from "@/components/providers/intl-provider";
import { Toaster } from "@/components/ui/toaster";
import { CommandPalette } from "@/components/command-palette/command-palette";
import { cookies } from 'next/headers';

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://prompt-party.netlify.app'),
  title: {
    default: "Prompt Party - The Social Network for AI Prompts",
    template: "%s | Prompt Party"
  },
  description: "Create, share, and discover the most inspiring AI prompts. Join the community of prompt engineers, creators, and AI enthusiasts.",
  keywords: ['AI prompts', 'ChatGPT', 'Claude', 'Gemini', 'prompt engineering', 'prompt library', 'AI tools', 'GPT-4', 'prompt sharing'],
  authors: [{ name: 'Prompt Party' }],
  creator: 'Prompt Party',
  publisher: 'Prompt Party',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://prompt-party.netlify.app',
    siteName: 'Prompt Party',
    title: 'Prompt Party - The Social Network for AI Prompts',
    description: 'Create, share, and discover the most inspiring AI prompts. Join the community of prompt engineers, creators, and AI enthusiasts.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Prompt Party - Social Network for AI Prompts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prompt Party - The Social Network for AI Prompts',
    description: 'Create, share, and discover the most inspiring AI prompts.',
    images: ['/og-image.png'],
    creator: '@promptparty',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://prompt-party.netlify.app',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en';

  // Dynamically import messages
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('prompt-party-theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.add('light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
        >
          Skip to content
        </a>
        <IntlProvider messages={messages} locale={locale}>
          <ThemeProvider defaultTheme="system" storageKey="prompt-party-theme">
            <ShortcutsProvider>
              <div className="flex flex-col min-h-screen pb-16 lg:pb-0">
                <Header />
                <main id="main-content" className="flex-1">{children}</main>
                <Footer />
                <BottomNav />
                <FloatingCreateButton />
              </div>
              <Toaster />
              <CommandPalette />
            </ShortcutsProvider>
          </ThemeProvider>
        </IntlProvider>
      </body>
    </html>
  );
}
