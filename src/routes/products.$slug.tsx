import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Minus, Plus, Shield, Truck, Headphones, Wrench } from "lucide-react";
import { getProductBySlug, products } from "@/data/products";
import { useCart } from "@/hooks/use-cart";
import { ProductCard } from "@/components/ProductCard";
import { toast } from "sonner";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: (ctx: { loaderData?: { product: ReturnType<typeof getProductBySlug> } }) => ({
    meta: ctx.loaderData?.product
      ? [
          { title: `${ctx.loaderData.product.name} — LUXE Atelier` },
          { name: "description", content: loaderData.product.description[0] },
          { property: "og:title", content: `${loaderData.product.name} — LUXE Atelier` },
          { property: "og:description", content: loaderData.product.description[0] },
          { property: "og:image", content: loaderData.product.images[0] },
          { name: "twitter:image", content: loaderData.product.images[0] },
        ]
      : [],
  }),
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto px-5 py-32 text-center">
      <h1 className="font-display text-4xl">Piece not found</h1>
      <Link to="/products" className="mt-6 inline-block text-gold underline">
        Back to collection
      </Link>
    </div>
  ),
});

const serviceIcons = [Shield, Truck, Headphones, Wrench];

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [imgKey, setImgKey] = useState(0);

  const switchImage = (i: number) => {
    if (i === activeImage) return;
    setActiveImage(i);
    setImgKey((k) => k + 1);
  };

  const handleAdd = () => {
    add(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0],
        color: color.name,
      },
      qty,
    );
    toast.success(`${product.name} added to bag`, {
      description: `${color.name} · Qty ${qty}`,
    });
  };

  const related = products.filter(
    (p) => p.id !== product.id && p.category === product.category,
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-10 py-10 lg:py-14">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-gold transition-colors mb-8"
      >
        <ArrowLeft className="w-3 h-3" /> Back to Collection
      </Link>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* GALLERY */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden bg-surface rounded-sm border border-border relative">
            <img
              key={imgKey}
              src={product.images[activeImage]}
              alt={product.name}
              width={1024}
              height={1024}
              className="w-full h-full object-cover fade-up"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => switchImage(i)}
                className={`aspect-square overflow-hidden rounded-sm border-2 transition-all ${
                  activeImage === i ? "border-gold gold-glow" : "border-border hover:border-muted-foreground"
                }`}
              >
                <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div className="lg:pt-4">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold">
            {product.category}
          </p>
          <h1 className="font-display text-4xl lg:text-5xl mt-3 leading-tight">
            {product.name}
          </h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl text-gold font-semibold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <div className="gold-divider my-8" />

          {/* COLOR */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                Color
              </h3>
              <span className="text-xs text-gold">{color.name}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((c) => {
                const active = c.name === color.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => setColor(c)}
                    className={`relative w-12 h-12 rounded-full border-2 transition-all hover-scale ${
                      active ? "border-gold gold-glow" : "border-border"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    aria-label={c.name}
                  >
                    {active && (
                      <Check className="absolute inset-0 m-auto w-4 h-4 text-gold drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* QUANTITY + CTA */}
          <div className="mt-8 flex items-center gap-4">
            <div className="inline-flex items-center border border-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-11 h-11 hover:text-gold transition-colors"
                aria-label="Decrease"
              >
                <Minus className="w-4 h-4 mx-auto" />
              </button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-11 h-11 hover:text-gold transition-colors"
                aria-label="Increase"
              >
                <Plus className="w-4 h-4 mx-auto" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 bg-gradient-gold text-primary-foreground px-8 py-3.5 text-xs tracking-[0.25em] uppercase font-semibold hover:opacity-90 transition-opacity shadow-gold"
            >
              Add to Bag
            </button>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-10">
            <h3 className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">
              The Detail
            </h3>
            <ul className="space-y-3 stagger">
              {product.description.map((line, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                  <span className="text-gold mt-1">—</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SPECS */}
          <div className="mt-10">
            <h3 className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">
              Specifications
            </h3>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-border pt-4">
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border pb-3">
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">{k}</dt>
                  <dd className="text-sm">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section className="mt-24 lg:mt-32">
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold">
            Included
          </p>
          <h2 className="font-display text-3xl lg:text-4xl mt-3">
            The Atelier Promise
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">
          {product.services.map((service, i) => {
            const Icon = serviceIcons[i % serviceIcons.length];
            return (
              <div key={i} className="luxe-card p-6 rounded-sm text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="mt-4 text-sm leading-relaxed">{service}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="mt-24 lg:mt-32">
          <h2 className="font-display text-3xl lg:text-4xl mb-10">
            You may also like
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
