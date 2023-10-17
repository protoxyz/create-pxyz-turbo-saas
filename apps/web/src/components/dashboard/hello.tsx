"use client";

import { useProtocolAuth } from "@protoxyz/auth/client";

import { Heading, Text } from "../typography";

export function Hello() {
  const { user } = useProtocolAuth();

  return (
    <div className="flex items-center gap-5 py-8">
      <Heading size="h2">Hello {user?.name?.split(" ")?.[0]}</Heading>

      <Text>Here&apos;s what&apos;s happening today.</Text>
    </div>
  );
}
