"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Product {
  model: any;
  id: number;
  name: string;
  price: number;
  qty: number;
}

interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const existing = get().cart.find((p) => p.id === product.id);
        if (existing) {
          set({
            cart: get().cart.map((p) =>
              p.id === product.id ? { ...p, qty: p.qty + product.qty } : p
            ),
          });
        } else {
          set({ cart: [...get().cart, product] });
        }
      },

      removeFromCart: (id) => {
        set({ cart: get().cart.filter((p) => p.id !== id) });
      },

      updateQty: (id, qty) => {
        if (qty <= 0) return;
        set({
          cart: get().cart.map((p) =>
            p.id === id ? { ...p, qty } : p
          ),
        });
      },

      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: "cart-storage", // localStorage key
    }
  )
);
