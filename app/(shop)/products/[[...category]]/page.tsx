import Link from "next/link";
import { getAllProducts, getProductByCategory, getCategories, Product } from "@/services/api";
import { Layers, ArrowLeft, SearchX } from "lucide-react";

interface PageProps {
  params: Promise<{
    category?: string[];
  }>;
  // 1. Declare the searchParams promise signature for Next.js 16
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function ProductsPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const rawCategory = resolvedParams.category 
    ? decodeURIComponent(resolvedParams.category.join("/")) 
    : null;
    
  // 2. Extract the active textual search term query
  const searchWord = resolvedSearchParams.search || "";

  let products: Product[] = [];
  let categories: string[] = [];

  try {
    categories = await getCategories();

    if (rawCategory) {
      products = await getProductByCategory(rawCategory);
    } else {
      products = await getAllProducts();
    }

    // 3. Client Filter Logic matching titles or descriptions against the input query term
    if (searchWord.trim() !== "") {
      const criteria = searchWord.toLowerCase().trim();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(criteria) ||
          p.description.toLowerCase().includes(criteria)
      );
    }
  } catch (error) {
    console.error("Error loading product catalog:", error);
  }

  return (
    <div className="space-y-8 py-4 animate-in fade-in duration-300">
      {/* Header Block */}
      <div className="flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 capitalize">
            {searchWord ? `Search Results for "${searchWord}"` : rawCategory ? rawCategory : "All Collections"}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Showing {products.length} products.
          </p>
        </div>
        
        {(rawCategory || searchWord) && (
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4" />
            <span>Clear Filters & Search</span>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar Filters */}
        <aside className="space-y-4">
          <div className="flex items-center gap-2 font-semibold text-gray-800 text-sm uppercase tracking-wider">
            <Layers className="h-4 w-4 text-blue-600" />
            <span>Filter Categories</span>
          </div>
          <div className="flex flex-wrap gap-2 lg:flex-col">
            <Link
              href="/products"
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                !rawCategory
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              All Items
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/products/${encodeURIComponent(cat)}${searchWord ? `?search=${encodeURIComponent(searchWord)}` : ""}`}
                className={`rounded-xl px-4 py-2 text-sm font-medium capitalize transition ${
                  rawCategory === cat
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </aside>

        {/* Dynamic Catalog Grid Section */}
        <div className="lg:col-span-3">
          {products.length === 0 ? (
            /* Empty Search Results Layout */
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 py-16 text-center">
              <div className="rounded-full bg-gray-50 p-4 text-gray-400">
                <SearchX className="h-10 w-10" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">No products match your search</h3>
              <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto">
                Double-check your spelling or look up another item category parameter context.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
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
    </div>
  );
}