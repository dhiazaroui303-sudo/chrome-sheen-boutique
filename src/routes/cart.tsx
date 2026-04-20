import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({
    meta: [
      { title: "Your Bag — LUXE Atelier" },
      { name: "description", content: "Review the pieces in your LUXE Atelier bag." },
    ],
  }),
});

function CartPage() {
  const { items, updateQty, remove, total, clear, hydrated } = useCart();

  if (!hydrated) {
    return <div className="min-h-[60vh]" />;
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-24 text-center">
        <div className="w-20 h-20 mx-auto rounded-full border border-border flex items-center justify-center text-gold">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="font-display text-4xl mt-8">Your bag is empty</h1>
        <p className="text-muted-foreground mt-3">
          Begin curating your atelier.
        </p>
        <Link
          to="/products"
          className="inline-flex mt-8 bg-gradient-gold text-primary-foreground px-8 py-3.5 text-xs tracking-[0.25em] uppercase font-semibold hover:opacity-90 transition-opacity shadow-gold"
        >
          Explore the Collection
        </Link>
      </div>
    );
  }

  const shipping = 0;
  const grand = total + shipping;

  return (
    <div className="max-w-6xl mx-auto px-5 lg:px-10 py-12 lg:py-16">
      <div className="flex items-end justify-between flex-wrap gap-3 mb-10">
        <div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold">Your Bag</p>
          <h1 className="font-display text-4xl lg:text-5xl mt-3">Checkout</h1>
        </div>
        <button
          onClick={clear}
          className="text-xs uppercase tracking-widest text-muted-foreground hover:text-destructive transition-colors"
        >
          Clear bag
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-10">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.color}`}
              className="luxe-card p-4 sm:p-5 rounded-sm flex gap-4"
            >
              <Link
                to="/products/$slug"
                params={{ slug: item.slug }}
                className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 overflow-hidden bg-surface"
              >
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div className="flex justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      to="/products/$slug"
                      params={{ slug: item.slug }}
                      className="font-display text-lg hover:text-gold transition-colors truncate block"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                      {item.color}
                    </p>
                  </div>
                  <p className="text-gold font-semibold whitespace-nowrap">
                    ${item.price * item.quantity}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="inline-flex items-center border border-border">
                    <button
                      onClick={() => updateQty(item.productId, item.color, item.quantity - 1)}
                      className="w-8 h-8 hover:text-gold transition-colors"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3 h-3 mx-auto" />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.productId, item.color, item.quantity + 1)}
                      className="w-8 h-8 hover:text-gold transition-colors"
                      aria-label="Increase"
                    >
                      <Plus className="w-3 h-3 mx-auto" />
                    </button>
                  </div>
                  <button
                    onClick={() => remove(item.productId, item.color)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="lg:sticky lg:top-28 self-start luxe-card p-6 rounded-sm">
          <h2 className="text-[10px] tracking-[0.3em] uppercase text-gold mb-5">
            Order Summary
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-gold">Complimentary</span>
            </div>
          </div>
          <div className="gold-divider my-5" />
          <div className="flex justify-between items-baseline">
            <span className="text-xs uppercase tracking-widest">Total</span>
            <span className="text-2xl font-display text-gold">${grand}</span>
          </div>
          <button className="w-full mt-6 bg-gradient-gold text-primary-foreground py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:opacity-90 transition-opacity shadow-gold">
            Proceed to Checkout
          </button>
          <p className="text-[10px] text-muted-foreground text-center mt-4 tracking-wider">
            Secure payment · Lifetime warranty
          </p>
        </aside>
      </div>
    </div>
  );
}
