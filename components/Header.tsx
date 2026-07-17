"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ShoppingCart, ShoppingBag, Phone, Info } from "lucide-react";

export default function Header() {
  // Pull live cart item count straight from Redux state
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-emerald-600 transition hover:opacity-90">
          <ShoppingBag className="h-6 w-6" />
          <span>ShopNext</span>
        </Link>

        {/* Navigation Routes */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/products" className="transition hover:text-emerald-600">Products</Link>
          <Link href="/about" className="flex items-center gap-1 transition hover:text-emerald-600"><Info className="h-4 w-4" />About</Link>
          <Link href="/contact" className="flex items-center gap-1 transition hover:text-emerald-600"><Phone className="h-4 w-4" />Contact</Link>
        </nav>

        {/* Action Elements */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2 text-gray-700 transition hover:text-emerald-600" aria-label="View Cart">
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white ring-2 ring-white animate-in zoom-in-50 duration-200">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}