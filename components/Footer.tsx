export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-gray-200 bg-white py-6">
      <div className="container mx-auto max-w-7xl px-4 text-center text-sm text-gray-500">
        <p>&copy; {currentYear} ShopNext. All rights reserved.</p>
      </div>
    </footer>
  );
}