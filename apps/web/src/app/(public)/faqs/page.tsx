import { meta } from "@acme/shared";

import { Container } from "@/components/marketing/container";
import { FAQs } from "@/components/marketing/faqs";
import { Footer } from "@/components/marketing/footer";
import { Header } from "@/components/marketing/header/header";
import { PageHeader } from "@/components/marketing/page-header";

export const metadata = {
  title: "Frequently Asked Questions",
  description:
    "Have a different question and can’t find the answer you’re looking for? Reach out to our support team by sending us an email and we’ll get back to you as soon as we can.",
};

export default function Page() {
  return (
    <>
      <Header />
      <PageHeader
        title={metadata.title}
        subtitle={`Learn About ${meta.title}`}
        description={metadata.description}
      />
      <Container>
        <FAQs />
      </Container>
      <Footer />
    </>
  );
}
