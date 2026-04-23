import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { products, categories, allColors } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SlidersHorizontal, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const searchSchema = z.object({
  category: z.string().optional(),
  color: z.string().optional(),
  sort: z.enum(["featured", "price-asc", "price-desc"]).optional(),
});

export const Route = createFileRoute("/products")({
  component: ProductsPage,
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop the Collection — LUXE Atelier" },
      {
        name: "description",
        content:
          "Browse premium clippers, hairdryers, trimmers, straighteners, curling tools and accessories from LUXE Atelier.",
      },
      { property: "og:title", content: "Shop the Collection — LUXE Atelier" },
      { property: "og:description", content: "Premium tools for master barbers and stylists." },
    ],
  }),
});

function ProductsPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [mobileFilters, setMobileFilters] = useState(false);
  const { t, category } = useLanguage();

  const activeCategory = search.category ?? "all";
  const activeColor = search.color;
  const sort = search.sort ?? "featured";

  const filtered = useMemo(() => {
    let list = products.slice();
    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (activeColor) {
      list = list.filter((p) => p.colors.some((c) => c.name === activeColor));
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [activeCategory, activeColor, sort]);

  type Search = z.infer<typeof searchSchema>;
  const setCategory = (slug: string) => {
    navigate({
      search: (prev: Search) => ({ ...prev, category: slug === "all" ? undefined : slug }),
    });
  };
  const setColor = (name?: string) => {
    navigate({
      search: (prev: Search) => ({ ...prev, color: prev.color === name ? undefined : name }),
    });
  };
  const setSort = (s: "featured" | "price-asc" | "price-desc") => {
    navigate({
      search: (prev: Search) => ({ ...prev, sort: s === "featured" ? undefined : s }),
    });
  };

  const Sidebar = (
    <aside className="space-y-8">
      <div>
        <h3 className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">
          {t("products.category")}
        </h3>
        <ul className="space-y-1">
          {categories.map((cat) => {
            const active = activeCategory === cat.slug;
            return (
              <li key={cat.slug}>
                <button
                  onClick={() => setCategory(cat.slug)}
                  className={`w-full text-left px-3 py-2 text-sm tracking-wide transition-all border-l-2 ${
                    active
                      ? "border-gold text-gold bg-surface-elevated"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  {category(cat.slug)}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="gold-divider" />

      <div>
        <h3 className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">
          {t("products.color")}
        </h3>
        <div className="flex flex-wrap gap-3">
          {allColors.map((c) => {
            const active = activeColor === c.name;
            return (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                title={c.name}
                aria-label={c.name}
                className={`w-9 h-9 rounded-full border-2 transition-all hover-scale ${
                  active ? "border-gold gold-glow" : "border-border"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
        {activeColor && (
          <button
            onClick={() => setColor(undefined)}
            className="mt-4 text-xs text-muted-foreground hover:text-gold inline-flex items-center gap-1"
          >
            <X className="w-3 h-3" /> {t("products.clearColor")}
          </button>
        )}
      </div>

      <div className="gold-divider" />

      <div>
        <h3 className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">
          {t("products.priceRange")}
        </h3>
        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={500}
            defaultValue={500}
            className="w-full accent-[var(--gold)]"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$0</span>
            <span>$500+</span>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-10 py-12 lg:py-16">
      <div className="mb-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-gold">{t("products.shop")}</p>
        <h1 className="font-display text-4xl lg:text-5xl mt-3">
          {t("products.title")}
        </h1>
        <p className="text-muted-foreground mt-3 max-w-xl">
          {t("products.copy")}
        </p>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-10">
        <div className="hidden lg:block sticky top-28 self-start">{Sidebar}</div>

        <div>
          <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-border">
            <button
              onClick={() => setMobileFilters(true)}
              className="lg:hidden inline-flex items-center gap-2 text-sm border border-border px-4 py-2 hover:border-gold transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" /> {t("products.filters")}
            </button>
            <p className="text-xs tracking-widest uppercase text-muted-foreground hidden lg:block">
              {filtered.length} {filtered.length === 1 ? t("products.piece") : t("products.pieces")}
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="bg-surface-elevated border border-border px-4 py-2 text-sm focus:border-gold focus:outline-none transition-colors"
            >
              <option value="featured">{t("products.sortFeatured")}</option>
              <option value="price-asc">{t("products.sortAsc")}</option>
              <option value="price-desc">{t("products.sortDesc")}</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">
                {t("products.empty")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 stagger">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {mobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-surface border-l border-border p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm tracking-[0.3em] uppercase">{t("products.filters")}</h2>
              <button onClick={() => setMobileFilters(false)} aria-label={t("products.close")}>
                <X className="w-5 h-5" />
              </button>
            </div>
            {Sidebar}
          </div>
        </div>
      )}
    </div>
  );
}
