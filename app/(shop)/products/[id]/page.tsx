import Link from "next/link";
import { getProductById } from "@/services/api";
import AddToCartButton from "@/components/AddToCartButton";
import { ArrowLeft, Star, ShieldCheck, RefreshCw } from "lucide-react";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);

  if (isNaN(productId)) {
    notFound();
  }

  let product;
  try {
    product = await getProductById(productId.toString());
  } catch (error) {
    console.error("Error fetching product data:", error);
    notFound();
  }

  // Double check in case the API returned null/empty for an unmapped ID
  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-8 py-4 animate-in fade-in duration-300">
      {/* Navigation Return Link */}
      <div>
        <Link 
          href="/products" 
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-emerald-600 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to products collection</span>
        </Link>
      </div>

      {/* Main Layout Grid split wrapper */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        {/* Left Side Showcase Image frame */}
        <div className="flex items-center justify-center rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-[400px] w-auto object-contain mix-blend-multiply" 
          />
        </div>

        {/* Right Side Description & Buy Panel */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize tracking-wide text-emerald-700">
              {product.category}
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {product.title}
            </h1>
            
            {/* Mock Rating Display badge elements */}
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 text-gray-300" />
              <span className="ml-2 text-xs font-medium text-gray-500">(4.2 / 5 customer reviews)</span>
            </div>

            <p className="text-3xl font-bold tracking-tight text-gray-900">
              ${product.price.toFixed(2)}
            </p>
            
            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-sm font-semibold text-gray-900">Product Description</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {product.description}
              </p>
            </div>
          </div>

          {/* Action Blocks & Value Badges */}
          <div className="space-y-4 border-t border-gray-100 pt-6">
            <AddToCartButton product={product} />

            <div className="grid grid-cols-2 gap-4 pt-2 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>1 Year Secure Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-emerald-600" />
                <span>30-Day Free Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}