"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Item, CartItem } from "@/lib/types";

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (item: Item) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  getQty: (id: string) => number;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "grocery.cart.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setCartItems(JSON.parse(stored) as CartItem[]);
    } catch (err) {
      console.error("Could not read stored cart:", err);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (err) {
      console.error("Could not save cart:", err);
    }
  }, [cartItems, hasLoaded]);

  function addToCart(item: Item) {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.id === item.id ? { ...ci, qty: ci.qty + 1 } : ci
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setIsCartOpen(true);
  }

  function removeFromCart(id: string) {
    setCartItems((prev) => prev.filter((ci) => ci.id !== id));
  }

  function setQty(id: string, qty: number) {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) => (ci.id === id ? { ...ci, qty } : ci))
    );
  }

  function getQty(id: string): number {
    return cartItems.find((ci) => ci.id === id)?.qty || 0;
  }

  const cartCount = cartItems.reduce((sum, ci) => sum + ci.qty, 0);
  const cartTotal = cartItems.reduce((sum, ci) => {
    const unitPrice = ci.price - (ci.price * (ci.discount || 0)) / 100;
    return sum + unitPrice * ci.qty;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        setQty,
        getQty,
        cartCount,
        cartTotal,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
