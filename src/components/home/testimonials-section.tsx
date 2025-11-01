'use client'

import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { QuoteIcon, StarIcon } from 'lucide-react'

/**
 * Testimonials Section
 * UX: Social proof from real users builds trust and credibility
 * Pattern: Card-based layout with user avatars, ratings, and quotes
 */

export function TestimonialsSection() {
  const t = useTranslations('home.testimonials')

  const testimonials = [
    {
      name: t('testimonial1_name'),
      role: t('testimonial1_role'),
      company: t('testimonial1_company'),
      avatar: 'SC',
      rating: 5,
      quote: t('testimonial1_quote'),
      highlight: t('testimonial1_highlight')
    },
    {
      name: t('testimonial2_name'),
      role: t('testimonial2_role'),
      company: t('testimonial2_company'),
      avatar: 'MR',
      rating: 5,
      quote: t('testimonial2_quote'),
      highlight: t('testimonial2_highlight')
    },
    {
      name: t('testimonial3_name'),
      role: t('testimonial3_role'),
      company: t('testimonial3_company'),
      avatar: 'EW',
      rating: 5,
      quote: t('testimonial3_quote'),
      highlight: t('testimonial3_highlight')
    }
  ]
  return (
    <div className="space-y-8">
      {/* Section header - UX: Clear context for social proof */}
      <div className="text-center space-y-4">
        <Badge variant="soft" className="text-sm font-semibold">
          <StarIcon className="w-3.5 h-3.5 mr-1.5 fill-current" />
          {t('badge')}
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold">
          {t('title')}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* Testimonials Grid - UX: 3-column responsive layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            variant="feature"
            className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Decorative quote icon */}
            <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <QuoteIcon className="w-20 h-20 text-brand-primary" />
            </div>

            <div className="p-8 relative">
              {/* Rating stars - UX: Visual credibility indicator */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="w-4 h-4 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>

              {/* Quote - UX: User's actual experience in their words */}
              <blockquote className="text-base mb-6 leading-relaxed text-foreground">
                "{testimonial.quote}"
              </blockquote>

              {/* Highlight badge - UX: Key takeaway from testimonial */}
              <div className="mb-6">
                <Badge variant="outline" className="text-xs font-medium">
                  {testimonial.highlight}
                </Badge>
              </div>

              {/* User info - UX: Real person with role adds authenticity */}
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent text-white font-bold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Trust indicators - UX: Additional credibility signals */}
      <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>{t('trust_active_users')}</span>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span>{t('trust_rating')}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>{t('trust_verified')}</span>
        </div>
      </div>
    </div>
  )
}
