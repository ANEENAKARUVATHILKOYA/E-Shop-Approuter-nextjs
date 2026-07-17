"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ShoppingCart, Search } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  
  // Keep the input text matched with the URL context
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/products");
    }
  };

  // Quick helper to style active links differently
  const linkStyle = (path: string) =>
    `text-sm font-medium transition-colors hover:text-blue-600 ${
      pathname === path ? "text-blue-600 font-semibold" : "text-gray-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        
        {/* Left Side: Logo & Main Page Navigation Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold text-gray-900 tracking-tight shrink-0">
            E-Shop
          </Link>
          
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/products" className={linkStyle("/products")}>
              Products
            </Link>
            <Link href="/about" className={linkStyle("/about")}>
              About
            </Link>
            <Link href="/contact" className={linkStyle("/contact")}>
              Contact
            </Link>
          </nav>
        </div>

        {/* Center: Global Search Input Form */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md mx-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search electronics, clothing..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-1.5 pl-10 pr-4 text-sm transition focus:border-blue-500 focus:bg-white focus:outline-none"
          />
        </form>

        {/* Right Side: Cart Action Controls */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Mobile Navigation Links (visible only on small screens) */}
          <nav className="flex md:hidden items-center gap-2 pr-2 border-r border-gray-100">
            <Link href="/about" className={linkStyle("/about")}>
              About
            </Link>
            <Link href="/contact" className={linkStyle("/contact")}>
              Contact
            </Link>
          </nav>

          <Link 
            href="/cart" 
            className="relative p-2 text-gray-600 transition hover:text-blue-600" 
            aria-label="View Cart"
          >
            <ShoppingCart className="h-6 w-6" />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

      </div>
    </header>
  );
}
