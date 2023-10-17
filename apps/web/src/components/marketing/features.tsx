import Link from "next/link";
import { features } from "@acme/shared";
import { CheckIcon } from "lucide-react";

import { Heading, Text } from "../typography";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function Features() {
  return (
    <div className="p-4">
      <div className="from-primary to-primary/90 rounded-xl bg-gradient-to-b p-5">
        <div className="mx-auto flex flex-col gap-16 py-8 lg:max-w-7xl lg:gap-32 lg:py-16">
          <Heading
            size="h1"
            className="mx-auto text-center text-white  lg:max-w-3xl"
          >
            {features[0]?.name}
          </Heading>

          <div className="grid items-center gap-4 lg:grid-cols-3">
            <Card className="animate-fadeUpSlow from-primary/90 to-primary/80 w-full bg-gradient-to-bl p-6">
              <CardHeader>
                <CardTitle>
                  <Heading size="h3" className="text-white">
                    {features[1]?.name}
                  </Heading>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Text size="md" className="text-white/70">
                  {features[1]?.description}
                </Text>

                <Link href={features[1]?.ctaHref ?? "/"} className="-ml-4">
                  <Button variant="link" className="text-white">
                    {features[1]?.cta} &rarr;
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="animate-fadeUpSlow500 from-primary/90 to-primary/80 w-full bg-gradient-to-bl p-6">
              <CardHeader>
                <CardTitle className="text-white">
                  <Heading size="h3" className="text-white">
                    {features[2]?.name}
                  </Heading>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Text size="md" className="text-white/70">
                  {features[2]?.description}
                </Text>

                <Link href={features[2]?.ctaHref ?? "/"} className="-ml-4">
                  <Button variant="link" className="text-white">
                    {features[2]?.cta} &rarr;
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="animate-fadeUpSlow750 from-primary/90 to-primary/80 w-full bg-gradient-to-bl p-6">
              <CardHeader>
                <CardTitle className="text-white">
                  <Heading size="h3" className="text-white">
                    {features[3]?.name}
                  </Heading>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Text size="md" className="text-white/70">
                  {features[3]?.description}
                </Text>

                <Link href={features[3]?.ctaHref ?? "/"} className="-ml-4">
                  <Button variant="link" className="text-white">
                    {features[3]?.cta} &rarr;
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mx-auto flex flex-col lg:max-w-7xl lg:gap-24 lg:py-16">
            <div className="grid lg:grid-cols-3">
              <div className="col-span-1 flex flex-col gap-8">
                <Heading size="h2" className="text-white">
                  {features[4]?.name}
                </Heading>

                <Text size="xl" className="text-white/70">
                  {features[4]?.description}
                </Text>

                <ul>
                  {features[4]?.features?.map((feature) => (
                    <li className="my-2 flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-yellow-400" />
                      <Text size="md" className="text-white">
                        {feature}
                      </Text>
                    </li>
                  ))}
                </ul>

                <Link href={features[4]?.ctaHref ?? "/"} className="-ml-4">
                  <Button variant="link" className="text-white">
                    {features[4]?.cta} &rarr;
                  </Button>
                </Link>
              </div>

              <div className="animate-slideLeft col-span-2 lg:px-8">
                <Skeleton className=" aspect-video w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
