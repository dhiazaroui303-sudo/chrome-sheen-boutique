import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border mt-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div>
          <div className="font-display text-3xl tracking-[0.2em] text-gradient-gold">
            LUXE
          </div>
          <p className="text-xs tracking-[0.3em] text-muted-foreground mt-1">
            ATELIER
          </p>
          <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
            {t("footer.copy")}
          </p>
        </div>

        <div>
          <h4 className="text-xs tracking-[0.25em] uppercase text-gold mb-5">
            {t("footer.shop")}
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-gold transition-colors">{t("footer.all")}</Link></li>
            <li><Link to="/products" className="hover:text-gold transition-colors">{t("cat.Clippers")}</Link></li>
            <li><Link to="/products" className="hover:text-gold transition-colors">{t("cat.Hairdryers")}</Link></li>
            <li><Link to="/products" className="hover:text-gold transition-colors">{t("cat.Accessories")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs tracking-[0.25em] uppercase text-gold mb-5">
            {t("footer.house")}
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-gold transition-colors">{t("footer.story")}</Link></li>
            <li><Link to="/blog" className="hover:text-gold transition-colors">{t("nav.blog")}</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs tracking-[0.25em] uppercase text-gold mb-5">
            {t("footer.connect")}
          </h4>
          <div className="flex gap-3">
            <a href="#" className="w-10 h-10 rounded-full border border-border hover:border-gold hover:text-gold transition-colors flex items-center justify-center">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-border hover:border-gold hover:text-gold transition-colors flex items-center justify-center">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-border hover:border-gold hover:text-gold transition-colors flex items-center justify-center">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-6 text-xs tracking-widest uppercase text-muted-foreground flex flex-col md:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} LUXE Atelier. {t("footer.rights")}</span>
          <span>{t("footer.crafted")}</span>
        </div>
      </div>
    </footer>
  );
}
