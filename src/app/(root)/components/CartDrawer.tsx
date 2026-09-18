"use client";

import Link from "next/link";
import { useCart } from "../(root)/context/CartContext";
import { CartItem } from "@/lib/types";

function finalPrice(item: CartItem): number {
  return item.price - (item.price * (item.discount || 0)) / 100;
}

export default function CartDrawer() {
  const {
    cartItems,
    setQty,
    removeFromCart,
    cartTotal,
    cartCount,
    isCartOpen,
    closeCart,
  } = useCart();

  return (
    <>
      <div
        className={`drawer-overlay${isCartOpen ? " drawer-overlay-open" : ""}`}
        onClick={closeCart}
        aria-hidden={!isCartOpen}
      />

      <aside
        className={`cart-drawer${isCartOpen ? " cart-drawer-open" : ""}`}
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!isCartOpen}
      >
        <div className="cart-drawer-header">
          <h2>Your basket{cartCount > 0 ? ` (${cartCount})` : ""}</h2>
          <button
            type="button"
            className="modal-close"
            onClick={closeCart}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-state">
            <span>🧺</span>
            Your basket is empty.
            <div style={{ marginTop: 14 }}>
              <Link
                href="/shop"
                className="btn btn-primary"
                style={{ width: "auto", display: "inline-block" }}
                onClick={closeCart}
              >
                Go pick something fresh
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="cart-drawer-list">
              {cartItems.map((item) => (
                <div className="cart-row" key={item.id}>
                  <div
                    className="cart-row-photo"
                    style={{ background: item.swatch || "#DCEAD6" }}
                  >
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <span>{item.emoji || "🥬"}</span>
                    )}
                  </div>

                  <div className="cart-row-info">
                    <div className="cart-row-name">{item.name}</div>
                    <div className="cart-row-unit">{item.unit}</div>

                    <div className="stepper cart-row-stepper">
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => setQty(item.id, item.qty - 1)}
                        aria-label={`Remove one ${item.name}`}
                      >
                        −
                      </button>
                      <span className="stepper-qty">{item.qty}</span>
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => setQty(item.id, item.qty + 1)}
                        aria-label={`Add one more ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-row-right">
                    <div className="cart-row-price">
                      ₹{(finalPrice(item) * item.qty).toFixed(2)}
                    </div>
                    <button
                      type="button"
                      className="cart-row-remove"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-drawer-footer">
              <div className="cart-summary">
                <span>Total</span>
                <span className="cart-summary-total">
                  ₹{cartTotal.toFixed(2)}
                </span>
              </div>
              <button type="button" className="btn btn-primary">
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
