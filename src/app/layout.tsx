import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
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

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  preload: true,
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://promptacademy.com'),
  title: {
    default: "Prompt Academy - Master AI Prompt Engineering",
    template: "%s | Prompt Academy"
  },
  description: "Master AI prompt engineering with 12 interactive tutorials and 3 learning paths. 100% free and open-source education platform for ChatGPT, Claude, and Gemini.",
  keywords: ['AI prompts', 'prompt engineering', 'ChatGPT tutorials', 'Claude AI', 'Gemini AI', 'AI learning', 'prompt engineering course', 'AI education', 'learn AI', 'free AI course', 'prompt academy'],
  authors: [{ name: 'Prompt Academy' }],
  creator: 'Prompt Academy',
  publisher: 'Prompt Academy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/branding/logo/favicon.svg', type: 'image/svg+xml' },
      { url: '/branding/logo/logo-icon-simple.svg', type: 'image/svg+xml', sizes: '32x32' },
    ],
    apple: [
      { url: '/branding/logo/apple-touch-icon.svg', type: 'image/svg+xml', sizes: '180x180' },
    ],
    other: [
      { rel: 'mask-icon', url: '/branding/logo/logo-icon-simple.svg', color: '#6366F1' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://promptacademy.com',
    siteName: 'Prompt Academy',
    title: 'Prompt Academy - Master AI Prompt Engineering',
    description: 'Master AI prompt engineering with 12 interactive tutorials and 3 learning paths. 100% free and open-source education platform.',
    images: [
      {
        url: '/branding/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Prompt Academy - Master AI Prompt Engineering',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prompt Academy - Master AI Prompt Engineering',
    description: '12 interactive tutorials, 3 learning paths. 100% free & open-source.',
    images: ['/branding/og-image.svg'],
    creator: '@promptacademy',
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
    canonical: 'https://promptacademy.com',
  },
  applicationName: 'Prompt Academy',
  appleWebApp: {
    capable: true,
    title: 'Prompt Academy',
    statusBarStyle: 'default',
  },
  category: 'education',
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
      <body className={`${inter.variable} ${openSans.variable} font-sans`}>
        <IntlProvider messages={messages} locale={locale}>
          <ThemeProvider defaultTheme="system" storageKey="prompt-party-theme">
            <ShortcutsProvider>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
              >
                Skip to content
              </a>
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
