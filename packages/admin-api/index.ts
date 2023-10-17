import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import type { AdminRouter } from "./src/root";

export { adminRouter, type AdminRouter } from "./src/root";
export { createTRPCContext } from "./src/trpc";

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type AdminRouterInputs = inferRouterInputs<AdminRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type AdminRouterOutputs = inferRouterOutputs<AdminRouter>;
