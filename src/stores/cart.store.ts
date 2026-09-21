import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../lib/api';

export type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
  add: (product: Product, quantity?: number) => void;
  remove: (id: number) => void;
  setQuantity: (id: number, quantity: number) => void;
  clear: () => void;
  itemCount: () => number;
  total: () => number;
};

export const useCartStore = create<CartState>()(persist((set, get) => ({
  items: [],
  add: (product, quantity = 1) => set((state) => {
    const existing = state.items.find((item) => item.id === product.id);
    if (existing) return { items: state.items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item) };
    return { items: [...state.items, { ...product, quantity }] };
  }),
  remove: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  setQuantity: (id, quantity) => set((state) => ({ items: state.items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item) })),
  clear: () => set({ items: [] }),
  itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
  total: () => get().items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
}), { name: 'cart_items' }));
