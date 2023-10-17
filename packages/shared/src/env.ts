export const isBrowser = typeof window !== "undefined";

export const isServer = !isBrowser;

export const isProduction = process.env.NODE_ENV === "production";
