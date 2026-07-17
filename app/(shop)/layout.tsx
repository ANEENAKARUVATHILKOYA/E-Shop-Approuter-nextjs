import StoreProvider from "@/store/StoreProvider";
import Header from "../../components/Header"
import Footer from "../../components/Footer";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <div className="flex min-h-screen flex-col justify-between">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
          {children}
        </main>
        <Footer />
      </div>
    </StoreProvider>
  );
}