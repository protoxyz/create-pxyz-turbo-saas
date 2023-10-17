import Link from "next/link";
import { meta } from "@acme/shared";

import { Container } from "../container";
import { Heading, Text } from "../typography";
import { Button } from "../ui/button";

export function CTA() {
  return (
    <div className="bg-primary my-16 py-32">
      <Container>
        <div className="grid lg:grid-cols-2">
          <div className="p-4">
            <Heading size="h2" className="text-white">
              Try {meta.title} Free For 14 Days
            </Heading>
          </div>
          <div className="flex flex-col gap-4 p-4">
            <Text color="white">
              Unlock powerful tools to easily grow and manage your business. Try{" "}
              {meta.title} free for 14 days.
            </Text>

            <Link href="/sign-up">
              <Button variant="black" size="xl">
                Get Started Free &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
