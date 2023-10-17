import { NextRequest } from "next/server";
import { adminRouter, createTRPCContext } from "@acme/admin-api";
import { getAuth } from "@protoxyz/auth";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

export const runtime = "nodejs";

/**
 * Configure basic CORS headers
 * You should extend this to match your needs
 */
function setCorsHeaders(res: Response) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Request-Method", "*");
  res.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.headers.set("Access-Control-Allow-Headers", "*");
}

export function OPTIONS() {
  const response = new Response(null, {
    status: 204,
  });
  setCorsHeaders(response);
  return response;
}

const handler = async (req: NextRequest) => {
  const user = await getAuth({});

  const response = await fetchRequestHandler({
    endpoint: "/api/admin",
    router: adminRouter,
    req,
    createContext: () => createTRPCContext({ user, req }),
  });

  setCorsHeaders(response);
  return response;
};

export { handler as GET, handler as POST };
