export default function GlobalLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        {/* Modern Spinning Ring */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
        <p className="text-sm font-medium text-gray-500 animate-pulse">
          Loading ShopNext...
        </p>
      </div>
    </div>
  );
}