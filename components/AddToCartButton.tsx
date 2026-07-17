"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "@/store/CartSlice";
import { Product } from "@/services/api";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    dispatch(addToCart(product));
    setAdded(true);
    // Reset button animation state after 1.5 seconds
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleAdd}
      className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-semibold text-white shadow-md transition-all active:scale-98 ${
        added 
          ? "bg-emerald-500 hover:bg-emerald-500 animate-in zoom-in-95 duration-100" 
          : "bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg"
      }`}
    >
      <ShoppingCart className="h-5 w-5" />
      <span>{added ? "Added to Cart!" : "Add to Shopping Cart"}</span>
    </button>
  );
}