import { Footer } from "@/components/marketing/footer";
import { Header } from "@/components/marketing/header/header";
import { PageHeader } from "@/components/marketing/page-header";

export const metadata = {
  title: "Blog",
  description: "Blog",
};

export default function Page() {
  return (
    <>
      <Header />
      <PageHeader
        title={metadata.title}
        subtitle="Blog"
        description={metadata.description}
      />
      <Footer />
    </>
  );
}
