import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartItemCount: number;
  onCartClick: () => void;
  onSearch: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartItemCount, onCartClick, onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              className="sm:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">FoodMart</span>
            </a>
          </div>

          <div className="hidden sm:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-indigo-600">Home</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">Categories</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">Deals</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">About</a>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center">
              <input
                type="text"
                placeholder="Search products..."
                className="px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700"
              >
                <Search size={20} />
              </button>
            </form>

            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-indigo-600"
            >
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">Home</a>
            <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">Categories</a>
            <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">Deals</a>
            <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">About</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;