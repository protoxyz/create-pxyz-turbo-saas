import { FlameIcon } from "lucide-react";

import { Footer } from "@/components/marketing/footer";
import { SaaSHero } from "@/components/marketing/heros/saas";
import LogoCloud from "@/components/marketing/logo-cloud";

export default function Home() {
  return (
    <main className="relative flex h-full min-h-screen flex-col ">
      <SaaSHero
        news="Awarded by industry experts"
        newsIcon={<FlameIcon className="h-4 w-4 text-orange-300" />}
      />
      <LogoCloud />
      <Footer />
    </main>
  );
}
