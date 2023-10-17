import { Footer } from "@/components/marketing/footer";
import { Header } from "@/components/marketing/header/header";
import { PageHeader } from "@/components/marketing/page-header";

export const metadata = {
  title: "Pricing",
  description: "View our pricing plans",
};

export default function Page() {
  return (
    <>
      <Header />
      <PageHeader
        title={metadata.title}
        subtitle="Pricing"
        description={metadata.description}
      />
      <Footer />
    </>
  );
}
