import { ShoppingBag, Truck, ShieldCheck, RefreshCw } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-12 py-4 animate-in fade-in duration-300">
      {/* Header Banner Section */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          About Our Store
        </h1>
        <p className="text-lg text-gray-500">
          Your ultimate destination for modern fashion, fine jewelry, and cutting-edge electronics.
        </p>
      </div>

      {/* Main Core Narrative Block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Curated Collections, Unbeatable Value</h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Welcome to our Next.js e-commerce platform. We partner with global suppliers to bring you a comprehensive catalog of everyday essentials, ranging from casual men's and women's apparel to premium tech gadgets and accessories.
          </p>
          <p className="text-sm leading-relaxed text-gray-600">
            This application leverages real-time product data feeds to ensure accurate pricing, availability, and seamless catalog browsing across multiple categories. 
          </p>
        </div>
        <div className="bg-blue-50 rounded-xl p-6 flex flex-col justify-center space-y-4 border border-blue-100/50">
          <blockquote className="text-blue-800 font-medium italic text-base">
            "Streamlining digital retail through modern architectures, fast loading speeds, and clean interfaces designed for the global shopper."
          </blockquote>
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            — Modern Retail Team
          </p>
        </div>
      </div>

      {/* Pillars of Value Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center space-y-3 shadow-sm">
          <div className="mx-auto w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-gray-900">Diverse Catalog</h3>
          <p className="text-xs text-gray-500">Curated electronics, jewelry, and high-quality clothing lines.</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center space-y-3 shadow-sm">
          <div className="mx-auto w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-gray-900">Global Shipping</h3>
          <p className="text-xs text-gray-500">Reliable logistics tracking routes direct to your doorstep.</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center space-y-3 shadow-sm">
          <div className="mx-auto w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-gray-900">Secure Checkout</h3>
          <p className="text-xs text-gray-500">Encrypted payment integrations safeguarding consumer transactions.</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center space-y-3 shadow-sm">
          <div className="mx-auto w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <RefreshCw className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-gray-900">Easy Returns</h3>
          <p className="text-xs text-gray-500">Hassle-free 30-day return window policies across all product types.</p>
        </div>
      </div>
    </div>
  );
}