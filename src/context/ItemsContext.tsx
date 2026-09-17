"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { seedItems } from "@/lib/seedItems";
import { Item, NewItemInput } from "@/lib/types";

interface ItemsContextValue {
  items: Item[];
  addItem: (item: NewItemInput) => void;
  deleteItem: (id: string) => void;
}

const ItemsContext = createContext<ItemsContextValue | null>(null);
const STORAGE_KEY = "grocery.items.v1";

export function ItemsProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>(seedItems);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load from localStorage once, on the client, after mount.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored) as Item[]);
      }
    } catch (err) {
      console.error("Could not read stored items:", err);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  // Persist whenever items change (after the initial load).
  useEffect(() => {
    if (!hasLoaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error("Could not save items:", err);
    }
  }, [items, hasLoaded]);

  function addItem(item: NewItemInput) {
    const newItem: Item = {
      id: `item-${Date.now()}`,
      name: item.name,
      unit: item.unit || "1 kg",
      price: Number(item.price) || 0,
      discount: Number(item.discount) || 0,
      image: item.image || null, // base64 data URL from the file upload
      emoji: "🥬",
      swatch: "#DCEAD6",
    };
    setItems((prev) => [newItem, ...prev]);
  }

  function deleteItem(id: string) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  return (
    <ItemsContext.Provider value={{ items, addItem, deleteItem }}>
      {children}
    </ItemsContext.Provider>
  );
}

export function useItems(): ItemsContextValue {
  const ctx = useContext(ItemsContext);
  if (!ctx) throw new Error("useItems must be used within an ItemsProvider");
  return ctx;
}
