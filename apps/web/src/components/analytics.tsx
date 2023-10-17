import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

export function AppAnalytics({ googleId }: { googleId: string }) {
  return (
    <>
      {googleId && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleId}`}
          strategy="afterInteractive"
        />
      )}

      {googleId && (
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${googleId}');
        `}
        </Script>
      )}

      <Analytics />
    </>
  );
}
