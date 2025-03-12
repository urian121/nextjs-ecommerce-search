import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, Menu } from "lucide-react";
import Image from "next/image";

export default async function Home() {
  const url_api = "https://api.escuelajs.co/api/v1/products";
  const data = await fetch(url_api);
  const products = await data.json();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">TiendaOnline</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm font-medium hover:text-primary">
              Inicio
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary">
              Productos
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary">
              Categorías
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary">
              Ofertas
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary">
              Contacto
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Search Container */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input className="pl-10" placeholder="Buscar productos..." />
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-72 bg-muted">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 space-y-2 mt-2">
                <h3 className="font-medium text-lg mb-8 opacity-80">
                  {product.title}
                </h3>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-bold text-2xl">${product.price}</span>
                  <Button size="sm" variant="outline">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Añadir
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
