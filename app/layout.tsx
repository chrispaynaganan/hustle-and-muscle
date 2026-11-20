import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import { CartProvider } from "@/components/cart/cart-provider";
import { CartToast } from "@/components/cart/cart-ui";
import { ChatWidget } from "@/components/chat/chat-widget";
import { RevealObserver, revealBootScript } from "@/components/motion/reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";
import "./globals.css";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} Fitness Gym`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} Fitness Gym`,
    description: site.description,
    images: ["/images/hero-home.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootScript }} />
      </head>
      <body>
        <div aria-hidden className="scroll-progress fixed inset-x-0 top-0 z-60 h-0.5 bg-brand" />
        <CartProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <CartToast />
          <ChatWidget />
          <RevealObserver />
        </CartProvider>
      </body>
    </html>
  );
}
