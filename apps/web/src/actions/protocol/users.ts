import { PaginatedResult } from "@protoxyz/core";
import { UserProfile } from "@protoxyz/types";

export const getUsers = async ({
  cursor,
  perPage,
}: {
  cursor: string | undefined;
  perPage: number;
}): Promise<PaginatedResult<UserProfile> | { error: string }> => {
  try {
    const url = new URL("https://api.pxyz.dev/api/v0/auth/users");
    url.searchParams.set("tenantId", process.env.PXYZ_TENANT_ID ?? "");
    url.searchParams.set("perPage", perPage.toString());

    if (cursor && cursor !== "undefined") {
      url.searchParams.set("cursor", cursor);
    }

    const users = await fetch(url.toString(), {
      headers: {
        "x-protocol-public-key": process.env.PXYZ_PUBLIC_KEY ?? "",
        "x-protocol-secret-key": process.env.PXYZ_SECRET_KEY ?? "",
      },
    });

    return await users.json();
  } catch (err: any) {
    return { error: err.message };
  }
};
