import type { Metadata } from 'next';
import { Plus, ArrowUpRight } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Support & Help | STREET',
  description:
    'Get answers to common questions about ordering, delivery, payments, returns, and your STREET account. Contact our support team for help.',
  alternates: { canonical: 'https://street.london/support' },
};

type FAQItem = { question: string; answer: string };

type FAQSection = {
  title: string;
  items: FAQItem[];
};

const SECTIONS: FAQSection[] = [
  {
    title: 'General',
    items: [
      {
        question: 'Who are we?',
        answer:
          "We're STREET — born in London, raised on hustle. We connect local shops, riders, and customers to bring anything you need, instantly — not tomorrow, not later today.",
      },
      {
        question: 'What do we do?',
        answer:
          'We make getting what you need fast and effortless. STREET connects local shops, riders, and users to deliver what you want — without waiting days, without stress.',
      },
      {
        question: 'Where do we work?',
        answer:
          "We currently operate in London's Zone 1 and parts of Zone 2. STREET is only getting bigger, and we'll update the app as we expand into new areas.",
      },
      {
        question: 'Do you deliver food?',
        answer:
          'Not at the moment. STREET currently focuses on retail, fashion, beauty, and lifestyle products.',
      },
      {
        question: 'What do I do if the app crashes or I experience a bug?',
        answer:
          'Try closing and reopening the app first. If the problem persists, send a screenshot and a short description to support@STREET.london or use the in-app chat. Our team will respond as quickly as possible.',
      },
    ],
  },
  {
    title: 'Account & Log-in',
    items: [
      {
        question: 'How do I create an account?',
        answer:
          'You can sign up using your phone number, Google account, or Apple ID. If you choose to sign up with your phone, we\'ll send you a one-time verification code (OTP). Once entered, your account will be activated instantly — no password needed.',
      },
      {
        question: "What should I do if I can't receive the OTP?",
        answer:
          'If you signed up with your phone, make sure your number is entered correctly and your internet connection is stable. Check your SMS messages for the OTP. If you still haven\'t received it after a few minutes, contact our support team at support@STREET.london.',
      },
      {
        question:
          'I signed up with a phone number — can I add my email later (or vice versa)?',
        answer:
          'Yes. You can add or update your email (or phone number) via Profile → Account Information. Verification may be required to confirm the new contact method.',
      },
      {
        question: 'Can I log in on more than one device?',
        answer:
          'Yes. You can access your account from multiple devices. For security, OTP/verification may be required each time.',
      },
      {
        question: 'How can I update my profile?',
        answer:
          'Go to Profile → Account Information to update your name, phone number, or delivery address. Some details, like verified email or phone number, may require OTP verification for security.',
      },
    ],
  },
  {
    title: 'Ordering & Payment',
    items: [
      {
        question: 'How do I place an order?',
        answer:
          'Select a store or product, add items to your cart, and proceed to checkout. Enter your delivery address, complete the payment, and confirm your order. Everything is processed through the app.',
      },
      {
        question: 'Can I schedule my order for later?',
        answer:
          'Not at the moment. STREET currently focuses on instant delivery and does not support scheduled orders yet.',
      },
      {
        question: 'Can I track my order?',
        answer:
          'Yes. You can track your order in real time in the app, including when the shop accepts it, when the rider picks it up, and when it\'s on the way to you.',
      },
      {
        question: 'How can I pay?',
        answer:
          'You can pay using major debit/credit cards, Apple Pay, Google Pay, Shop Pay, Klarna, or Clearpay.',
      },
      {
        question: 'Is it safe to pay online?',
        answer:
          "Yes. All online payments are encrypted and processed securely through Shopify Checkout. Your card details are protected and never shared without your consent.",
      },
      {
        question: 'Are there delivery fees? How much do they cost?',
        answer:
          'Delivery fees are shown upfront in the app before checkout. Fees vary depending on location, shop, and demand.',
      },
    ],
  },
  {
    title: 'Delivery',
    items: [
      {
        question: 'Where can I track my order?',
        answer:
          'You can track your order in Orders → Order Status. The app updates in real time: Confirmed, Being Prepared, On the Way, Delivered.',
      },
      {
        question: 'How fast is delivery?',
        answer:
          'Delivery usually takes just minutes, depending on shop preparation, your location, and traffic. The app shows an estimated delivery time before you place your order.',
      },
      {
        question: 'How can I change the delivery time or address?',
        answer:
          'You can only change the delivery address before the shop accepts your order. After confirmation, changes may not be possible. Contact support if urgent assistance is needed.',
      },
      {
        question: "What happens if I'm not home?",
        answer:
          'The rider will call you to arrange handover. If no one is available, the item is returned to the shop and you can try ordering again later.',
      },
      {
        question:
          "What happens if the item is delayed or the rider can't find the address?",
        answer:
          "If the rider cannot deliver your order, the item will be returned to the shop. If the retailer cancels your order before fulfilment, you'll receive a full refund including the delivery fee. After delivery, refunds are handled by the retailer and do not include the delivery fee.",
      },
      {
        question:
          'Can I specify delivery instructions (e.g., leave with neighbour, safe place)?',
        answer:
          'Yes — you can add instructions at checkout. Riders will follow them, and you accept the associated risk if leaving the item unattended.',
      },
    ],
  },
  {
    title: 'Cancellations & Modifications',
    items: [
      {
        question: 'How can I cancel an order?',
        answer:
          'You can cancel your order in the app before the shop accepts it. You will receive a full refund. Once the shop accepts the order, cancellations are no longer allowed to protect shops and riders.',
      },
      {
        question: 'Can I change delivery time?',
        answer:
          'No. Delivery time cannot be changed once the order is accepted by the shop.',
      },
      {
        question: 'Why was my order cancelled by the shop?',
        answer:
          'The shop may cancel due to out-of-stock items, high order volume, or temporary closure. You will be notified and refunded if you have been charged.',
      },
    ],
  },
  {
    title: 'Refunds & Returns',
    items: [
      {
        question: 'How do refunds and returns work?',
        answer:
          'Refunds and returns are handled directly by the retailer through their own returns policy. STREET facilitates the delivery but does not manage returns or process refunds.',
      },
      {
        question: "Where can I find a shop's returns policy?",
        answer:
          "Each shop's returns and shipping policy is linked directly on their store page in the app. Tap the link to view the full policy before or after your purchase.",
      },
      {
        question: 'What if my item is wrong or broken?',
        answer:
          "Contact the retailer directly through their returns policy link in the app. If you need help reaching them, you can also chat with us and we'll point you in the right direction.",
      },
    ],
  },
  {
    title: 'For Shops & Partners',
    items: [
      {
        question: "I've got a shop, can I join?",
        answer:
          "Absolutely! Apply at street.london/demo and our team will guide you through setup. We'll help you get started, connect you to customers, and make sure deliveries run smoothly.",
      },
      {
        question: 'Why should I join STREET?',
        answer:
          "STREET makes it simple to reach new customers instantly without worrying about delivery logistics. You focus on your products while we handle the rest — from order collection to drop-off. It's an easy way to increase sales and grow your business with minimal effort.",
      },
      {
        question: 'How do pay-outs work?',
        answer:
          "Customer payments settle directly to your connected payment account via Shopify Payments on your normal payout schedule. You'll get invoices and detailed summaries so you always know exactly what you've earned.",
      },
      {
        question: 'What delivery areas and times will the shop serve?',
        answer:
          'We work with each shop to define its service radius and operating hours. Shops can adjust hours in the STREET Partner app once live.',
      },
    ],
  },
  {
    title: 'Privacy & Account',
    items: [
      {
        question: 'Is my data safe?',
        answer:
          'Yes. All your data is encrypted and stored securely. We never sell or misuse your information, and only authorised team members have access.',
      },
      {
        question: 'Can I delete my account?',
        answer:
          'Yes — log in to the app, go to your profile, scroll to the bottom, and delete your account. All your data will be permanently removed.',
      },
      {
        question: 'Are you 24/7?',
        answer:
          'Availability depends on shop and rider hours. Our support team is available Monday to Friday during working hours and also responds on weekends, though response times may be slower.',
      },
    ],
  },
];

export default function SupportPage() {
  const allFaqs = SECTIONS.flatMap((s) => s.items);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Navigation />
      <main className="support-page">
        <div className="container">
          <div className="faq-intro">
            <h1 className="section-title">Support & Help</h1>
            <p className="section-intro">
              Everything you need to know about using STREET
            </p>
          </div>

          {SECTIONS.map((section) => (
            <div key={section.title} className="support-section">
              <h2 className="support-section-title">{section.title}</h2>
              <div className="faq-list">
                {section.items.map((faq) => (
                  <details
                    key={faq.question}
                    className="faq-item"
                    name={`faq-${section.title}`}
                  >
                    <summary className="faq-question">
                      <span className="faq-question-text">{faq.question}</span>
                      <Plus className="faq-icon" size={20} aria-hidden="true" />
                    </summary>
                    <div className="faq-answer">{faq.answer}</div>
                  </details>
                ))}
              </div>
            </div>
          ))}

          <div className="support-contact">
            <h2 className="support-section-title">Still need help?</h2>
            <p className="support-contact-text">
              Chat with us directly through the app or email us at{' '}
              <a href="mailto:support@STREET.london" className="support-link">
                support@STREET.london
              </a>
              . We&apos;re here to make sure your experience is smooth and
              hassle-free.
            </p>
            <a href="/contact-us" className="faq-cta-link">
              Get in touch <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        // Safe: content is a static JSON object built from hardcoded string constants
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
