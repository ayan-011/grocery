"use client";

import { useItems } from "../../context/ItemsContext";
import { useCart } from "../../context/CartContext";
import ItemCard from "@/components/ItemCard";
import Navbar from "@/components/Navbar";
 

export default function ShopPage() {
  const { items } = useItems();
  const { addToCart, getQty, setQty } = useCart();

  return (
    <div className="">
      <Navbar />
    <div className="page ">
      <div className="page-header">
        <p className="page-eyebrow">Today&apos;s stock</p>
        <h1 className="page-title">Fresh from the field</h1>
        <p className="page-subtitle">
          Everything below was on the shelf this morning. Add what you need.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <span>🧺</span>
          The shop is empty right now. Check back soon.
        </div>
      ) : (
        <div className="item-grid">
          {items.map((item) => {
            const qty = getQty(item.id);
            return (
              <ItemCard
                key={item.id}
                item={item}
                mode="shop"
                qty={qty}
                onAdd={() => addToCart(item)}
                onIncrease={() => setQty(item.id, qty + 1)}
                onDecrease={() => setQty(item.id, qty - 1)}
              />
            );
          })}
        </div>
      )}
    </div>

    </div>
  );
}
