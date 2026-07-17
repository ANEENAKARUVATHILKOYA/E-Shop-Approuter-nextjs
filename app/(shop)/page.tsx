import Link from "next/link";
import { getAllProducts, Product } from "@/services/api";
import { ShoppingBag, ArrowRight, Truck, ShieldCheck, Zap } from "lucide-react";

export default async function HomePage() {
  let featuredProducts: Product[] = [];
  
  try {
    // Fetch products on the server side
    const allProducts = await getAllProducts();
    // Just take the first 4 products to display as "Featured Items" on the homepage
    featuredProducts = allProducts.slice(0, 4);
  } catch (error) {
    console.error("Error loading homepage products:", error);
  }

  return (
    <div className="space-y-16 py-4">
      {/* Hero Announcement Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-800 px-6 py-16 text-center text-white sm:px-12 sm:py-20 shadow-xl">
        <div className="relative z-10 mx-auto max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            Grand Launching 2026
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Premium Handcrafted Delights
          </h1>
          <p className="mx-auto max-w-md text-base text-emerald-100 sm:text-lg">
            Experience the finest culinary creations made with fresh ingredients, traditional family secrets, and love.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-emerald-700 shadow-md transition hover:bg-emerald-50 hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Explore Collection</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20 hover:border-white"
            >
              <span>Our Story</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        {/* Abstract background glowing shapes */}
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl"></div>
      </section>

      {/* Trust & Features Badges (Static Component Elements) */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
            <Truck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Lightning Delivery</h3>
            <p className="mt-1 text-sm text-gray-500">Carefully packaged and sent fresh directly to your doorstep.</p>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Pure Quality Assured</h3>
            <p className="mt-1 text-sm text-gray-500">100% organic components with zero added chemicals.</p>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Traditional Taste</h3>
            <p className="mt-1 text-sm text-gray-500">Authentic recipes passed down through generations.</p>
          </div>
        </div>
      </section>

      {/* Featured Products Section (Server Dynamic Block) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Trending Right Now</h2>
            <p className="text-sm text-gray-500">Customer favorites handpicked for you.</p>
          </div>
          <Link href="/products" className="group text-sm font-semibold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1">
            <span>View All Products</span>
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        {featuredProducts.length === 0 ? (
          <p className="text-gray-500 py-6 text-center">Unable to load featured items at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {featuredProducts.map((product) => (
              <div 
                key={product.id} 
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:shadow-md"
              >
                {/* Visual Image container wrapper placeholder */}
                <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-50 p-4 flex items-center justify-center group-hover:opacity-95 transition">
                  {/* Note: We will switch this to standard optimized next/image when creating the ProductCard */}
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="max-h-full max-w-full object-contain mix-blend-multiply" 
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between pt-4">
                  <div className="space-y-1">
                    <span className="text-xs text-emerald-600 font-medium capitalize tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block">
                      {product.category}
                    </span>
                    <h3 className="font-medium text-gray-800 line-clamp-1 group-hover:text-emerald-600 transition">
                      {product.title}
                    </h3>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
                    <Link 
                      href={`/products/${product.id}`}
                      className="text-xs font-semibold text-emerald-600 underline underline-offset-4 hover:text-emerald-700"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}