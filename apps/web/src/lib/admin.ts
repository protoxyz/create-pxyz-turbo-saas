import type { AdminRouter } from "@acme/admin-api";
import { createTRPCReact } from "@trpc/react-query";

export const admin = createTRPCReact<AdminRouter>();

export {
  type AdminRouterInputs,
  type AdminRouterOutputs,
} from "@acme/admin-api";
