const BASE_URL = "https://fakestoreapi.com";

//Define the typescript interface for a product
export interface Product{
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating:{
        rate: number;
        count: number;
    };
}

/**
 * Fetch all products
 * We use Next.js fetch caching: { next: { revalidate: 3600 } }
 * This cache refreshes at most once every hour (3600 seconds) for fast static delivery.
 */
export async function getAllProducts(): Promise<Product[]> {
    const res = await fetch(`${BASE_URL}/products`, {
      next:{
        revalidate : 3600
      }
    });

   if(!res.ok) {
    throw new Error('Failed to fetch products');
   } 

   return res.json();
}


/**
 * Fetch a single product by ID
 * Since product inventory can change, we can fetch this dynamically or cache it.
 */
export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    next: { revalidate: 600 }, // Cache single products for 10 minutes
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch product with ID: ${id}`);
  }

  return res.json();
}

/**
 * Fetch all available categories
 */
export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/products/categories`, {
    next: { revalidate: 86400 }, // Categories rarely change, cache for 24 hours
  });

  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  return res.json();
}

/**
 * Fetch product by  category
 */
export async function getProductByCategory(category: string):Promise<Product[]>{
 const encodedCategory =  encodeURIComponent(category);
 const res = await fetch(`${BASE_URL}/products/category/${encodedCategory}`,{
 next: {revalidate: 3600}, 
 });

 if(!res.ok){
    throw new Error(`Failed to fetch products for category : ${category}`);
 }
 
  return res.json();
}