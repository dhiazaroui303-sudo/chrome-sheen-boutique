import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import { useLanguage } from "@/lib/i18n";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { t, category } = useLanguage();

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: product.colors[0].name,
    });
    toast.success(`${product.name} ${t("products.added")}`, {
      description: `${t("products.colorLabel")}: ${product.colors[0].name}`,
    });
  };

  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="luxe-card group rounded-sm overflow-hidden flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden bg-background">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 text-[10px] tracking-[0.2em] uppercase bg-gradient-gold text-primary-foreground px-3 py-1 rounded-sm font-semibold">
            {product.badge}
          </span>
        )}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <button
          onClick={quickAdd}
          className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-gradient-gold text-primary-foreground flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-gold"
          aria-label={t("products.quickAdd")}
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
              {category(product.category)}
            </p>
            <h3 className="font-display text-lg mt-1 group-hover:text-gold transition-colors">
              {product.name}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-gold font-semibold">${product.price}</p>
            {product.originalPrice && (
              <p className="text-xs line-through text-muted-foreground">
                ${product.originalPrice}
              </p>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2">
          {product.description[0]}
        </p>

        <div className="flex items-center gap-1.5 mt-auto pt-2">
          {product.colors.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="w-3.5 h-3.5 rounded-full border border-border"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}
