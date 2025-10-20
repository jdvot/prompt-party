import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ShortcutsProvider } from "@/components/keyboard-shortcuts/shortcuts-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://prompt-party.netlify.app'),
  title: {
    default: "Prompt Party - The Social Network for AI Prompts",
    template: "%s | Prompt Party"
  },
  description: "Create, share, and discover the most inspiring AI prompts. Join the community of prompt engineers, creators, and AI enthusiasts.",
  keywords: ['AI prompts', 'ChatGPT', 'Claude', 'Gemini', 'prompt engineering', 'prompt library', 'AI tools', 'GPT-4', 'prompt sharing'],
  authors: [{ name: 'Prompt Party' }],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
        <ThemeProvider defaultTheme="system" storageKey="prompt-party-theme">
          <ShortcutsProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ShortcutsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
