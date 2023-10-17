import { NextRequest } from "next/server";

import { getUsers } from "@/actions/protocol/users";

export const GET = async (req: NextRequest) => {
  const users = await getUsers({
    cursor: req.nextUrl.searchParams.get("cursor") as string | undefined,
    perPage: parseInt(
      (req.nextUrl.searchParams.get("perPage") as string | undefined) ?? "10",
    ),
  });

  return new Response(JSON.stringify(users));
};
