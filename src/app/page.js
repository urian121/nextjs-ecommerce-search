"use client"; // Necesario porque usamos useState y useEffect

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, Menu } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import Nav from "@/components/Nav";

export default function Home() {
  const url_api = "https://api.escuelajs.co/api/v1/products";
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Cargar los productos al montar el componente
    const fetchProducts = async () => {
      const response = await fetch(url_api);
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data); // Mostrar todos al inicio
    };
    fetchProducts();
  }, []);

  // Filtrar productos en tiempo real
  useEffect(() => {
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">TiendaOnline</h1>
          </div>

          <Nav />
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
          <Input
            className="pl-10"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-72 bg-muted">
                <ProductImage src={product.images[0]} alt={product.title} />
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

        {/* Mostrar mensaje si no hay productos */}
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500">
            No se encontraron productos.
          </p>
        )}
      </div>
    </div>
  );
}
