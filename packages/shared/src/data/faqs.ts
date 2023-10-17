export interface FAQItem {
  question: string;
  answer: string;
  sections?: string[] | undefined;
}

export const FAQItems: FAQItem[] = [
  {
    question: "What is Acme?",
    answer:
      "Acme is a SaaS app for managing your business. It's a one-stop-shop for all your business needs.",
  },

  {
    question: "Who is Acme for?",
    answer:
      "Acme is for small business owners who want to manage their business in one place.",
  },

  {
    question: "How do I get started?",
    answer:
      "To get started, you'll need to sign up for an account. Once you've signed up, you can start adding your data.",
  },

  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes, you can cancel your subscription at any time. You'll still have access to all the features until the end of your billing cycle.",
  },

  {
    question: "Can I change my plan?",
    answer:
      "Yes, you can change your plan at any time. You'll be charged or credited the difference in price.",
  },

  {
    question: "Can I request a feature?",
    answer: "Yes, you can request a feature by emailing us at info@acme.com",
  },
];
