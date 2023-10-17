import { Footer } from "@/components/marketing/footer";
import { Header } from "@/components/marketing/header/header";
import { PageHeader } from "@/components/marketing/page-header";

export const metadata = {
  title: "Terms Of Service",
  description: "Read about our terms of service policy.",
};

export default function Page() {
  return (
    <>
      <Header />
      <PageHeader
        title={metadata.title}
        subtitle="Terms of Service"
        description={metadata.description}
      />
      <Footer />
    </>
  );
}
