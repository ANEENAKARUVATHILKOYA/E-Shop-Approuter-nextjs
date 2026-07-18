"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/Store";
import { removeFromCart, updateQuantity, clearCart } from "@/store/CartSlice";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, CreditCard } from "lucide-react";

export default function CartPage() {
  const dispatch = useDispatch();
  
  // Connect directly to the global Redux store state
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Financial calculations computed on the fly
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = subtotal > 50 || subtotal === 0 ? 0 : 5.99; // Free shipping over $50
  const totalAmount = subtotal + shippingCost;

  return (
    <div className="space-y-8 py-4 animate-in fade-in duration-300">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Your Shopping Bag</h1>
        <p className="mt-2 text-sm text-gray-500">
          Review your items and adjust quantities before checking out.
        </p>
      </div>

      {cartItems.length === 0 ? (
        /* Empty State Layout View */
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 py-16 text-center">
          <div className="rounded-full bg-emerald-50 p-4 text-emerald-600">
            <ShoppingBag className="h-10 w-10" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Your cart is empty</h3>
          <p className="mt-2 text-sm text-gray-500 max-w-xs">
            Looks like you haven't added anything to your cart yet. Let's find some delicious treats!
          </p>
          <div className="mt-6">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700 active:scale-98"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Active Cart Layout Content Grid split */
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Item Management List List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:gap-6"
              >
                {/* Thumb Image Frame */}
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-50 p-2 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                  />
                </div>

                {/* Details Block */}
                <div className="flex flex-1 flex-col justify-between sm:flex-row sm:items-center">
                  <div className="space-y-1 pr-4">
                    <h3 className="font-medium text-gray-800 line-clamp-1 hover:text-emerald-600 transition">
                      <Link href={`/products/${item.id}`}>{item.title}</Link>
                    </h3>
                    <p className="text-xs text-gray-400 capitalize">{item.category}</p>
                    <p className="text-sm font-bold text-gray-900 sm:hidden">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Operational Interactive Quantity Counter Grid */}
                  <div className="mt-4 flex items-center justify-between sm:mt-0 sm:gap-8">
                    <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 p-1">
                      <button
                        onClick={() =>
                          item.quantity > 1
                            ? dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                            : dispatch(removeFromCart(item.id))
                        }
                        className="rounded-lg p-1.5 text-gray-500 transition hover:bg-white hover:text-emerald-600"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                        }
                        className="rounded-lg p-1.5 text-gray-500 transition hover:bg-white hover:text-emerald-600"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Pricing Desktop & Trash action interface */}
                    <div className="flex items-center gap-6">
                      <p className="hidden text-base font-bold text-gray-900 sm:block w-20 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="rounded-xl p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear all products utility action link */}
            <div className="flex justify-end">
              <button
                onClick={() => dispatch(clearCart())}
                className="text-xs font-semibold text-red-500 hover:text-red-600 transition hover:underline"
              >
                Clear Entire Cart
              </button>
            </div>
          </div>

          {/* Checkout Checkout Billing Calculations Sidebar Widget Panel */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm h-fit space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Order Summary</h3>
            
            <div className="space-y-4 text-sm border-b border-gray-100 pb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal Items</span>
                <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-gray-900">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-600 font-medium">Free Shipping</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>
              {shippingCost > 0 && (
                <p className="text-[11px] text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  💡 Add <b>${(50 - subtotal).toFixed(2)}</b> more to unlock Free Shipping!
                </p>
              )}
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-base font-bold text-gray-900">Total Bill</span>
              <span className="text-2xl font-black text-emerald-600">${totalAmount.toFixed(2)}</span>
            </div>

            <Link
              href="/checkout"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-4 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700 hover:shadow-lg active:scale-98"
            >
              <CreditCard className="h-4 w-4" />
              <span>Proceed to Payment Checkout</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}