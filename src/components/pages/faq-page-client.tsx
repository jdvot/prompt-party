'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { HelpCircle, MessageCircle, Mail } from 'lucide-react'
import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { cn } from '@/lib/utils'
import { AnimatedContainer, StaggerContainer, ScaleOnHover } from '@/components/animations'

interface FAQ {
  question: string
  answer: string
}

interface FAQPageClientProps {
  faqs: FAQ[]
  t: {
    hero_badge: string
    hero_title: string
    hero_subtitle: string
    contact_title: string
    contact_text: string
    contact_button: string
  }
}

export function FAQPageClient({ faqs, t }: FAQPageClientProps) {
  return (
    <>
      {/* Hero Section */}
      <Section background="accent" spacing="sm">
        <Container size="md">
          <AnimatedContainer animation="slide-up">
            <div className="text-center">
              <Badge variant="soft" className="mb-4 inline-flex items-center">
                <HelpCircle className="w-3 h-3 mr-1" />
                {t.hero_badge}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t.hero_title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t.hero_subtitle}
              </p>
            </div>
          </AnimatedContainer>
        </Container>
      </Section>

      {/* FAQ Accordion Section */}
      <Section spacing="md">
        <Container size="md">
          <AnimatedContainer animation="fade" delay={0.2}>
            <Card className="border-2">
              <CardContent className="p-6 md:p-8">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </AnimatedContainer>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section spacing="md" background="muted">
        <Container size="md">
          <AnimatedContainer animation="zoom" delay={0.3}>
            <ScaleOnHover scale={1.01}>
              <Card className="border-2 border-primary/20 bg-background/95 backdrop-blur">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold mb-2">{t.contact_title}</h3>
                      <p className="text-muted-foreground">
                        {t.contact_text}
                      </p>
                    </div>
                    <Link
                      href="mailto:support@promptparty.io"
                      className={cn(buttonVariants({ size: "lg" }), "flex items-center gap-2")}
                    >
                      <Mail className="w-4 h-4" />
                      {t.contact_button}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </ScaleOnHover>
          </AnimatedContainer>
        </Container>
      </Section>
    </>
  )
}
