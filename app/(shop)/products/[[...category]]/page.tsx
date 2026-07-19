import Link from "next/link";
import { getAllProducts, Product } from "@/services/api";
import { ArrowLeft, SearchX } from "lucide-react";

// FORCE VERCEL TO RENDER THIS PAGE LIVE ON REQUEST
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const searchWord = resolvedSearchParams.search || "";

  let products: Product[] = [];

  try {
    // Directly fetch all products bypassing category requirements
    products = await getAllProducts();

    // Local filter for text search input queries
    if (searchWord.trim() !== "") {
      const criteria = searchWord.toLowerCase().trim();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(criteria) ||
          p.description.toLowerCase().includes(criteria)
      );
    }
  } catch (error) {
    console.error("Error loading product catalog on server:", error);
  }

  return (
    <div className="space-y-8 py-4 animate-in fade-in duration-300">
      {/* Header Block */}
      <div className="flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 capitalize">
            {searchWord ? `Search Results for "${searchWord}"` : "All Collections"}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Showing {products.length} products.
          </p>
        </div>
        
        {searchWord && (
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4" />
            <span>Clear Search</span>
          </Link>
        )}
      </div>

      {/* Full Width Catalog Grid Section */}
      <div className="w-full">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 py-16 text-center">
            <div className="rounded-full bg-gray-50 p-4 text-gray-400">
              <SearchX className="h-10 w-10" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No products match your search</h3>
            <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto">
              Double-check your spelling or look up another item phrase.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:shadow-md"
              >
                <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-50 p-4 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition duration-300"
                  />
                </div>
                
                <div className="flex flex-1 flex-col justify-between pt-4 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-medium text-gray-800 line-clamp-1 group-hover:text-blue-600 transition">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2">{product.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
                    <Link
                      href={`/products/${product.id}`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                    >
                      <span>Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}