import { isProduction } from "./env";

export const baseUrl = isProduction
  ? "https://www.acme.com"
  : "http://localhost:3000";
