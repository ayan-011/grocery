"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartCount, openCart } = useCart();
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `nav-link${pathname === href ? " nav-link-active" : ""}`;

  return (
    <header className=" text-black  bg-black/20 backdrop-blur-2xl z-90 absolute w-full sticky top-0 ">
      <div className="navbar-inner">
        <Link href="/" className="flex items-center gap-[8px] mr-auto"> 
          <span className="text-[20px] text-[#f6f5ef] ">Furrow &amp; Field</span>
        </Link>

        <nav className="flex gap-[22px]   ">
          <Link href="/shop" className={linkClass("/shop")}>
            Shop
          </Link>
          <Link href="/admin" className={linkClass("/admin")}>
            Admin
          </Link>
        </nav>

        <button
          type="button"
          className="cart-link"
          aria-label="Open cart"
          onClick={openCart}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.4a2 2 0 0 0 2-1.6L20.5 8H6"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="10" cy="21" r="1.4" fill="currentColor" />
            <circle cx="17" cy="21" r="1.4" fill="currentColor" />
          </svg>
          {cartCount > 0 && <div className=" absolute -top-2 -right-2.5 bg-[var(--color-accent)] text-[#2b1c00] text-[11px] font-semibold min-w-[18px] h-[18px] rounded-full flex items-center justify-center leading-none ">
            <span className="mt-[2px]">{cartCount}</span></div>}
        </button>
      </div>
    </header>
  );
}
