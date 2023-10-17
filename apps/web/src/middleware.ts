import { NextResponse } from "next/server";
import { navigation } from "@acme/shared";
import { authMiddleware } from "@protoxyz/auth";

const publicRoutes = [
  "/",
  "/sign-in",
  "/sign-up",
  "/api/trpc/:route",
  ...navigation.main.map((item) => item.href),
  ...navigation.footer.map((item) => item.href),
];

export default authMiddleware({
  publicRoutes,
  async afterAuth(auth, req) {
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (auth?.claims?.role !== "admin") {
        return NextResponse.redirect(new URL("/?unauthorized", req.nextUrl));
      }
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  runtime: "nodejs",
};
