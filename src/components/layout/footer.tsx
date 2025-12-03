'use client'

import Link from 'next/link'
import { Logo, LogoText } from '@/components/brand/logo'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { ArrowRight, Github, Twitter, Linkedin, Mail, Sparkles } from 'lucide-react'

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')

  const currentYear = new Date().getFullYear()

  const productLinks = [
    { href: '/trending', label: t('prompts_library') },
    { href: '/prompts/wizard', label: t('playground') },
    { href: '/challenges', label: t('challenges') },
    { href: '/leaderboard', label: t('leaderboard') },
    { href: '/pricing', label: t('support_project') },
  ]

  const resourceLinks = [
    { href: '/tutorials/paths/beginner', label: t('beginner_path') },
    { href: '/tutorials', label: t('all_tutorials') },
    { href: '/mcp-vs-rag', label: t('mcp_vs_rag') },
    { href: '/tech-stack', label: tNav('tech_stack') },
  ]

  const companyLinks = [
    { href: '/about', label: t('about') },
    { href: '/faq', label: t('faq') },
    { href: '/privacy', label: t('privacy') },
    { href: '/terms', label: t('terms') },
  ]

  const socialLinks = [
    {
      href: 'https://github.com/prompt-party',
      label: 'GitHub',
      icon: Github,
    },
    {
      href: 'https://twitter.com/promptparty',
      label: 'Twitter',
      icon: Twitter,
    },
    {
      href: 'https://linkedin.com/company/promptparty',
      label: 'LinkedIn',
      icon: Linkedin,
    },
    {
      href: 'mailto:contact@promptparty.io',
      label: 'Email',
      icon: Mail,
    },
  ]

  return (
    <footer className="mt-auto bg-gray-950">
      {/* CTA Section with Premium Gradient */}
      <div className="relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-orange-500/10 to-orange-500/5" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-800/50 p-8 md:p-12 lg:p-16 text-center shadow-2xl">
            {/* Sparkle decoration */}
            <div className="inline-flex items-center justify-center mb-6">
              <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-medium text-orange-300">
                  {t('cta_title', { defaultValue: 'Ready to master AI prompting?' })}
                </span>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
              {t('cta_title', { defaultValue: 'Ready to master AI prompting?' })}
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('cta_subtitle', { defaultValue: 'Join our community and start creating amazing prompts today.' })}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 group px-8"
              >
                <Link href="/auth/signup">
                  <span className="inline-flex items-center">
                    {t('cta_button', { defaultValue: 'Get Started Free' })}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 px-8"
              >
                <Link href="/tutorials">
                  {t('all_tutorials')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer - Dark Background */}
      <div className="border-t border-gray-800/50 bg-gray-950">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-2 gap-10 sm:gap-12 md:grid-cols-3 lg:grid-cols-5 lg:gap-8">
            {/* Brand Column - Takes 2 cols on large screens */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <Link
                href="/"
                className="inline-flex items-center gap-3 font-bold text-lg mb-6 group"
              >
                <Logo className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" />
                <LogoText className="text-white" />
              </Link>
              <p className="text-gray-400 leading-relaxed text-balance mb-6 max-w-sm">
                {t('about_section_subtitle')}
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="group/icon w-10 h-10 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 flex items-center justify-center transition-all duration-200 hover:scale-105"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-gray-500 group-hover/icon:text-white transition-colors duration-200" />
                  </a>
                ))}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold mb-5 text-white text-sm uppercase tracking-wider">
                {t('product_section_title', { defaultValue: 'Product' })}
              </h3>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm inline-flex items-center group"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-orange-500 transition-all duration-200 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="font-semibold mb-5 text-white text-sm uppercase tracking-wider">
                {t('guides_section_title')}
              </h3>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm inline-flex items-center group"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-orange-500 transition-all duration-200 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold mb-5 text-white text-sm uppercase tracking-wider">
                {t('company_section_title', { defaultValue: 'Company' })}
              </h3>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm inline-flex items-center group"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-orange-500 transition-all duration-200 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800/50 bg-gray-950">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 order-2 sm:order-1">
              {t('copyright', { year: currentYear })}
            </p>

            {/* Secondary social links for bottom bar on mobile */}
            <div className="flex items-center gap-6 order-1 sm:order-2">
              <span
                className="text-sm text-gray-500 flex items-center gap-1"
                dangerouslySetInnerHTML={{ __html: t('made_with_love') }}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
