import { meta } from "@acme/shared";

import { Container } from "@/components/marketing/container";
import { Footer } from "@/components/marketing/footer";
import { Header } from "@/components/marketing/header/header";
import { PageHeader } from "@/components/marketing/page-header";

export const metadata = {
  title: "Affiliate Opportunities",
  description: `Learn about affiliate opportunities with ${meta.title}.`,
};

export default function Page() {
  return (
    <>
      <Header />
      <PageHeader
        title={metadata.title}
        subtitle="Become an Affiliate"
        description={metadata.description}
      />
      <Container></Container>
      <Footer />
    </>
  );
}
