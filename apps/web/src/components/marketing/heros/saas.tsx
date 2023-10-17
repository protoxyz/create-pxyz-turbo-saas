import Link from "next/link";
import { meta } from "@acme/shared";

import { Heading, Text } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { urls } from "@/lib/urls";
import { Header } from "../header/header";

export function SaaSHero({
  news,
  newsHref,
  newsIcon,
}: {
  news?: string;
  newsHref?: string;
  newsIcon?: React.ReactNode;
}) {
  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <main className="relative h-full min-h-[80vh]">
        <div className="relative isolate flex h-full flex-col justify-center">
          <div className="relative mx-auto grid w-full gap-5 px-4 py-16 sm:px-6 lg:-mt-44 lg:max-w-7xl lg:grid-cols-2 lg:py-24 ">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                {news && (
                  <Link href={newsHref ?? "/"}>
                    <div className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5">
                      {newsIcon}
                      <Text
                        size="sm"
                        className="text-muted-foreground text-xs font-normal leading-6"
                      >
                        {news}
                      </Text>
                    </div>
                  </Link>
                )}

                <Heading className="text-foreground font-bold">
                  {meta.tagline}
                </Heading>

                <Text size="xl" className="text-foreground  w-full opacity-75">
                  {meta.description}
                </Text>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Link href={urls.signUp()}>
                  <Button variant="default" size="xl">
                    Start Free Trial
                  </Button>
                </Link>

                <Button variant="link" size="xl" className="text-foreground">
                  Learn More <span aria-hidden="true">&rarr;</span>
                </Button>
              </div>
            </div>

            <div className="relative h-full w-full py-8">
              <Skeleton className="animate-slideUp left-5 top-5 h-96 w-96 bg-white opacity-0 shadow transition lg:absolute">
                <Skeleton className="bg-foreground border-br-none h-6 w-full rounded-bl-none rounded-br-none" />
                <div className="flex flex-col items-center gap-5 p-5">
                  <Skeleton className="h-32 w-32 rounded-full" />
                  <Skeleton className="h-4 w-64" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-44" />
                </div>
              </Skeleton>

              <Skeleton className="animate-slideDown absolute right-5 top-24 h-96 w-64 bg-white opacity-0 shadow transition">
                <Skeleton className="border-br-none h-5 w-full rounded-bl-none rounded-br-none bg-yellow-300" />
                <div className="flex flex-col items-center gap-5 p-5">
                  <Skeleton className="h-4 w-44" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-44" />
                </div>
              </Skeleton>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
