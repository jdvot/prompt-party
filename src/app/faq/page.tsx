import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ | Prompt Party',
  description: 'Frequently asked questions about Prompt Party',
}

export default function FAQPage() {
  const faqs = [
    {
      question: 'What is Prompt Party?',
      answer: 'Prompt Party is a social network for sharing, discovering, and remixing AI prompts.'
    },
    {
      question: 'Is Prompt Party free?',
      answer: 'Yes! Prompt Party is completely free to use. You can create an account, share prompts, and build collections at no cost.'
    },
    {
      question: 'Can I make my prompts private?',
      answer: 'Yes, when creating a prompt you can choose to make it private. Private prompts are only visible to you.'
    },
    {
      question: 'What does "remixing" mean?',
      answer: 'Remixing allows you to create a new prompt based on an existing one. Your remix will credit the original creator.'
    },
    {
      question: 'How do collections work?',
      answer: 'Collections let you organize prompts into groups. You can create public collections to share with others, or private collections for personal use.'
    },
    {
      question: 'What Markdown features are supported?',
      answer: 'Prompts support full Markdown including headers, bold/italic text, code blocks, lists, links, and images.'
    },
    {
      question: 'Can I delete my prompts?',
      answer: 'Yes, you can edit or delete your prompts at any time from your profile page.'
    },
    {
      question: 'How does trending work?',
      answer: 'Trending prompts are calculated based on recent likes and comments, showing you what\'s popular right now.'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Still have questions?</h2>
          <p className="text-muted-foreground">
            Contact us or open an issue on our GitHub repository.
          </p>
        </div>
      </div>
    </div>
  )
}
