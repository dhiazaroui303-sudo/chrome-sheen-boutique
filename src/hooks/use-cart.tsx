import { useEffect, useState, useCallback } from "react";

export type CartItem = {
  productId: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  color: string;
  quantity: number;
};

const STORAGE_KEY = "luxe-cart";

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readCart());
    setHydrated(true);

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setItems(readCart());
    };
    const onCustom = () => setItems(readCart());
    window.addEventListener("storage", onStorage);
    window.addEventListener("luxe-cart-update", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("luxe-cart-update", onCustom);
    };
  }, []);

  const persist = useCallback((next: CartItem[]) => {
    setItems(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("luxe-cart-update"));
  }, []);

  const add = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) => {
      const current = readCart();
      const existing = current.find(
        (i) => i.productId === item.productId && i.color === item.color,
      );
      let next: CartItem[];
      if (existing) {
        next = current.map((i) =>
          i.productId === item.productId && i.color === item.color
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
      } else {
        next = [...current, { ...item, quantity }];
      }
      persist(next);
    },
    [persist],
  );

  const remove = useCallback(
    (productId: number, color: string) => {
      const next = readCart().filter(
        (i) => !(i.productId === productId && i.color === color),
      );
      persist(next);
    },
    [persist],
  );

  const updateQty = useCallback(
    (productId: number, color: string, quantity: number) => {
      if (quantity <= 0) return remove(productId, color);
      const next = readCart().map((i) =>
        i.productId === productId && i.color === color ? { ...i, quantity } : i,
      );
      persist(next);
    },
    [persist, remove],
  );

  const clear = useCallback(() => persist([]), [persist]);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return { items, add, remove, updateQty, clear, total, count, hydrated };
}
