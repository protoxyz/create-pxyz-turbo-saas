import Link from "next/link";
import { meta } from "@acme/shared";

import { Heading, Text } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Header } from "../header/header";

export function MinimalHero() {
  return (
    <div>
      <Header />
      <main className="h-full min-h-screen">
        <div className="relative isolate h-full">
          <div className="mx-auto h-full max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:flex lg:items-center lg:justify-center lg:px-8 lg:pt-32">
            <div className="mx-auto max-w-2xl gap-x-14  lg:mx-0 lg:flex lg:max-w-none lg:items-center lg:justify-center">
              <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                <Heading className="text-foreground text-center font-black">
                  {meta.title}
                </Heading>

                <Text
                  size="xl"
                  align="center"
                  className="text-foreground mt-4  w-full opacity-75"
                >
                  {meta.description}
                </Text>

                <div className="mt-10 flex flex-col items-center gap-4">
                  <Link href={`/onboard`}>
                    <Button variant="default" size="xl">
                      Get started
                    </Button>
                  </Link>

                  <Link href="/features" className="col-span-2">
                    <Button variant="ghost">
                      Learn more <span aria-hidden="true">→</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
