'use client';

import React, { createContext, useContext, useCallback, useState, useEffect } from 'react';
import { Product, Size, getProductBySlug } from '@/data/products';

export interface CartItem {
  product: Product;
  size: Size;
  quantity: number;
}

interface StoredItem {
  slug: string;
  size: Size;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: Size, quantity?: number) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = 'kontrol-cart';

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: StoredItem[] = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((s) => {
        const product = getProductBySlug(s.slug);
        if (!product) return null;
        return { product, size: s.size, quantity: s.quantity };
      })
      .filter((x): x is CartItem => x !== null);
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  try {
    const stored: StoredItem[] = items.map((i) => ({
      slug: i.product.slug,
      size: i.size,
      quantity: i.quantity,
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {}
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveCart(items);
  }, [items, hydrated]);

  const addItem = useCallback((product: Product, size: Size, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.findIndex(
        (i) => i.product.slug === product.slug && i.size === size
      );
      if (existing >= 0) {
        const next = [...prev];
        next[existing].quantity += quantity;
        return next;
      }
      return [...prev, { product, size, quantity }];
    });
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce(
    (acc, i) => acc + i.product.price * i.quantity,
    0
  );
  const count = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
