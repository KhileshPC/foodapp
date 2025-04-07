import React, { useEffect, useState } from 'react';
import { ShoppingCart, Search, Menu, X, ChevronRight, Star, Plus, Minus } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer';
import { Product } from './types';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

 const fetchProducts = async () => {
  try {
    const response = await fetch('https://api.sampleapis.com/recipes/recipes');
    const data = await response.json();
    const productsWithPrices = data.map((item: any) => ({
      id: item.id,
      title: item.title,
      image: item.photoUrl,
      price: Math.floor(Math.random() * 400) + 100,
      description: Array.isArray(item.ingredients) ? item.ingredients.join(', ') : 'No ingredients listed',
      tags: Array.isArray(item.tags) ? item.tags : [],
      rating: (Math.random() * 2 + 3).toFixed(1),
    }));
    setProducts(productsWithPrices);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching products:', error);
    setLoading(false);
  }
};


  const addToCart = (product: Product) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (productId: number, delta: number) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        const newQuantity = (item.quantity || 1) + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => (item.quantity || 1) > 0);
    
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleSearch = (term: string) => {
    if (!term.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    const filtered = products.filter(product => 
      product.title.toLowerCase().includes(term.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
    );
    
    setSearchResults(filtered);
    setIsSearching(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        cartItemCount={cart.reduce((acc, item) => acc + (item.quantity || 1), 0)}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={handleSearch}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isSearching ? (
          <>
            <Hero />
            <FeaturedProducts 
              products={products.slice(0, 4)} 
              onAddToCart={addToCart}
              loading={loading}
            />
            <ProductGrid 
              products={products} 
              onAddToCart={addToCart}
              loading={loading}
            />
          </>
        ) : (
          <SearchResults 
            results={searchResults}
            onAddToCart={addToCart}
          />
        )}
      </main>

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <Footer />
    </div>
  );
}

export default App;