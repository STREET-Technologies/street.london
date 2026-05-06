import { ArrowUpRight, Plus } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
};

const FAQS: FAQItem[] = [
  {
    question: 'How fast is STREET delivery?',
    answer:
      'STREET delivers in under 60 minutes. We use Stuart, a same-day courier network — once a retailer accepts your order, a courier is dispatched immediately. There are no scheduled or next-day delivery options; everything is instant.',
  },
  {
    question: 'Where in London does STREET deliver?',
    answer:
      "STREET is launching across London. Coverage expands as we onboard more retailers and couriers in each area. Join the waitlist with your postcode and we'll notify you the moment STREET is live in your neighbourhood.",
  },
  {
    question: 'What kinds of shops are on STREET?',
    answer:
      'Independent boutiques and local shops covering fashion, activewear, eyewear, accessories, shoes, kidswear, beauty, and homewear. STREET does not deliver food, groceries, or perishables.',
  },
  {
    question: 'How do returns work?',
    answer:
      "Returns are managed by each retailer through Shopify, following their own returns policy. STREET handles cancellations before your order is accepted — if you cancel before the retailer prepares it, the payment hold is released instantly. Once an order is on its way, you'll arrange the return directly with the retailer.",
  },
  {
    question: 'How does payment work?',
    answer:
      "Payment is handled through Shopify's secure checkout. Your card is authorised when you place an order; the charge is only completed once the retailer accepts. If you cancel before acceptance — or the retailer declines — the hold is released instantly and no money moves.",
  },
  {
    question: 'When does STREET launch?',
    answer:
      'STREET is in pre-launch. Sign up to the waitlist for the earliest access — waitlist members get notified first when STREET goes live in their area.',
  },
];

const HELP_CENTRE_URL = 'https://intercom.help/street-london/en';

export default function FAQ() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="faq" id="faq" aria-labelledby="faq-heading">
      <div className="container">
        <div className="faq-intro">
          <h2 id="faq-heading" className="section-title">Frequently asked questions</h2>
          <p className="section-intro">Everything you need to know before you shop</p>
        </div>

        <div className="faq-list">
          {FAQS.map((faq) => (
            <details key={faq.question} className="faq-item">
              <summary className="faq-question">
                <span className="faq-question-text">{faq.question}</span>
                <Plus className="faq-icon" size={20} aria-hidden="true" />
              </summary>
              <div className="faq-answer">{faq.answer}</div>
            </details>
          ))}
        </div>

        <p className="faq-cta">
          Still have questions?{' '}
          <a
            href={HELP_CENTRE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="faq-cta-link"
          >
            Visit our help centre <ArrowUpRight size={16} />
          </a>
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </section>
  );
}
