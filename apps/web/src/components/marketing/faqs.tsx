import { FAQItems } from "@acme/shared";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Heading, Text } from "../typography";

const limit = 5;

const filteredFAQs = (sections?: string[] | undefined) => {
  if (!sections) return FAQItems.slice(0, limit);

  const faqs = FAQItems.filter((item) =>
    sections.some((section) => item.sections?.includes(section)),
  );

  return faqs.slice(0, limit);
};

export function FAQs({ sections }: { sections?: string[] | undefined }) {
  const faqs = filteredFAQs(sections);
  const shouldBeMultiple = false;

  return (
    <Accordion
      defaultValue={
        (shouldBeMultiple
          ? faqs.map((faq) => faq.question)
          : faqs[0]?.question) as any
      }
      type={(shouldBeMultiple ? "multiple" : "single") as any}
    >
      {faqs.map((item) => (
        <AccordionItem value={item.question}>
          <AccordionTrigger className="text-left">
            <Heading size="h4">{item.question}</Heading>
          </AccordionTrigger>
          <AccordionContent>
            <Text size="xl">{item.answer}</Text>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
