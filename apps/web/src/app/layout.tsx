import "./globals.css";

import type { Metadata } from "next";
import { headers } from "next/headers";
import { analytics, meta } from "@acme/shared";

import { AppAnalytics } from "@/components/analytics";
import { Toaster } from "@/components/ui/toaster";
import { inter } from "@/lib/fonts";
import { TRPCReactProvider } from "./providers";

export const metadata: Metadata = {
  title: {
    default: meta.title,
    template: `%s | ${meta.title}`,
  },
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0",
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    type: "website",
    locale: "en_US",
    url: meta.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className}  h-full min-h-screen`}>
        <TRPCReactProvider headers={headers()}>
          {children}
          <AppAnalytics googleId={analytics.googleId} />
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
