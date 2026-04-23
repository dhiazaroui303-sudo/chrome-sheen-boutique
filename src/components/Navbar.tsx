import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, Menu, X, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { languages, useLanguage } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

const links = [
  { to: "/" as const, label: "nav.home" },
  { to: "/products" as const, label: "nav.shop" },
  { to: "/about" as const, label: "nav.about" },
  { to: "/blog" as const, label: "nav.blog" },
  { to: "/contact" as const, label: "nav.contact" },
];

export function Navbar() {
  const { count } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10 h-16 lg:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl lg:text-3xl tracking-[0.2em] text-gradient-gold">
            LUXE
          </span>
          <span className="text-[10px] tracking-[0.3em] text-muted-foreground hidden sm:inline">
            ATELIER
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm tracking-widest uppercase text-foreground/80 hover:text-gold transition-colors relative group"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {t(l.label)}
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as typeof language)}
            className="bg-surface-elevated border border-border px-2 py-1 text-[10px] tracking-widest uppercase focus:border-gold focus:outline-none"
            aria-label="Language"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>{l.short}</option>
            ))}
          </select>
          <button
            className="relative inline-flex h-9 w-9 items-center justify-center border border-border bg-surface-elevated hover:text-gold transition-colors"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link
            to="/cart"
            className="relative p-2 hover:text-gold transition-colors"
            aria-label={t("nav.cart")}
          >
            <ShoppingBag className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-gradient-gold text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button
            className="lg:hidden p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label={t("nav.menu")}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <nav className="flex flex-col px-5 py-6 gap-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm tracking-widest uppercase py-2"
                activeProps={{ className: "text-gold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {t(l.label)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
