import { Footer } from "@/components/marketing/footer";
import { Header } from "@/components/marketing/header/header";
import { PageHeader } from "@/components/marketing/page-header";

export const metadata = {
  title: "Privacy Policy",
  description: "Read about our privacy policy.",
};

export default function Page() {
  return (
    <>
      <Header />
      <PageHeader
        title={metadata.title}
        subtitle="Privacy Policy"
        description={metadata.description}
      />
      <Footer />
    </>
  );
}
