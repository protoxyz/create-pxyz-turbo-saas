import { Footer } from "@/components/marketing/footer";
import { Header } from "@/components/marketing/header/header";
import { PageHeader } from "@/components/marketing/page-header";

export const metadata = {
  title: "Features",
  description: "Learn about our core features",
};

export default function Page() {
  return (
    <>
      <Header />
      <PageHeader
        title={metadata.title}
        subtitle="Features"
        description={metadata.description}
      />
      <Footer />
    </>
  );
}
