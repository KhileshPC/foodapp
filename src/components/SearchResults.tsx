import React from 'react';
import { Star } from 'lucide-react';
import { Product } from '../types';

interface SearchResultsProps {
  results: Product[];
  onAddToCart: (product: Product) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onAddToCart }) => {
  if (results.length === 0) {
    return (
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No results found</h2>
        <p className="text-gray-600">Try searching with different keywords</p>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Search Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm font-medium">{product.rating}</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                <button
                  onClick={() => onAddToCart(product)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;