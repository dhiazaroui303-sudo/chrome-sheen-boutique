import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/lib/i18n";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-gradient-gold">404</h1>
        <h2 className="mt-4 text-xl tracking-widest uppercase">Lost in the atelier</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for has slipped through our hands.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-gradient-gold text-primary-foreground px-8 py-3 text-xs tracking-[0.25em] uppercase font-semibold hover:opacity-90 transition-opacity"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "LUXE Atelier — Premium Hair Tools for Master Craftsmen" },
      { name: "description", content: "Engineered hair tools and shears for the world's finest barbers and stylists. Limited series. Lifetime warranty." },
      { name: "author", content: "LUXE Atelier" },
      { property: "og:title", content: "LUXE Atelier — Premium Hair Tools" },
      { property: "og:description", content: "Engineered for the world's finest barbers and stylists." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <LanguageProvider>
      <Navbar />
      <main className="min-h-screen pt-16 lg:pt-20">
        <Outlet />
      </main>
      <Footer />
      <Toaster theme="dark" position="bottom-right" />
    </LanguageProvider>
  );
}
