import { Container } from "@/components/marketing/container";
import { Footer } from "@/components/marketing/footer";
import { Header } from "@/components/marketing/header/header";
import LogoCloud from "@/components/marketing/logo-cloud";
import { PageHeader } from "@/components/marketing/page-header";

export const metadata = {
  title: "Press",
  description: "Read about us in the news.",
};

export default function Page() {
  return (
    <>
      <Header />
      <PageHeader
        title={metadata.title}
        subtitle="Press"
        description={metadata.description}
      />
      <Container>
        <LogoCloud />
      </Container>
      <Footer />
    </>
  );
}
