"use client";

import { Item } from "@/lib/types";

function priceAfterDiscount(price: number, discount: number): number {
  return price - (price * (discount || 0)) / 100;
}

interface ItemCardProps {
  item: Item;
  mode?: "shop" | "admin";
  qty?: number;
  onAdd?: () => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onDelete?: () => void;
}

export default function ItemCard({
  item,
  mode = "shop",
  qty = 0,
  onAdd,
  onIncrease,
  onDecrease,
  onDelete,
}: ItemCardProps) {
  const finalPrice = priceAfterDiscount(item.price, item.discount);

  return (
    <article className="item-card">
      {item.discount > 0 && (
        <span className="ribbon">{item.discount}% off</span>
      )}

      <div
        className="item-photo"
        style={{ background: item.swatch || "#DCEAD6" }}
      >
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt={item.name} />
        ) : (
          <span className="item-emoji">{item.emoji || "🥬"}</span>
        )}
      </div>

      <div className="item-body">
        <h3 className="item-name">{item.name}</h3>
        <p className="item-unit">{item.unit}</p>

        <div className="item-price-row">
          <span className="item-price">₹{finalPrice.toFixed(2)}</span>
          {item.discount > 0 && (
            <span className="item-price-old">₹{item.price.toFixed(2)}</span>
          )}
        </div>

        {mode === "shop" &&
          (qty > 0 ? (
            <div className="stepper">
              <button
                type="button"
                className="stepper-btn"
                onClick={onDecrease}
                aria-label={`Remove one ${item.name}`}
              >
                −
              </button>
              <span className="stepper-qty">{qty}</span>
              <button
                type="button"
                className="stepper-btn"
                onClick={onIncrease}
                aria-label={`Add one more ${item.name}`}
              >
                +
              </button>
            </div>
          ) : (
            <button type="button" className="btn btn-primary" onClick={onAdd}>
              Add to cart
            </button>
          ))}

        {mode === "admin" && (
          <button
            type="button"
            className="btn btn-danger-outline"
            onClick={onDelete}
          >
            Delete
          </button>
        )}
      </div>
    </article>
  );
}
