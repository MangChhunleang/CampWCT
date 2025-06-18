import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import CategorySection from './components/CategorySection';
import SearchResults from './components/SearchResults';
import { categoryService, productService } from './services/api';
import { UserProvider } from './context/UserContext';

function App() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAll();
        setCategories(data);
      } catch (err) {
        setError('Error fetching categories');
        console.error('Error:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setSearchLoading(true);
    setSearchError(null);
    
    try {
      const results = await productService.search({ search: query });
      setSearchResults(results);
    } catch (err) {
      setSearchError('Failed to search products: ' + (err.response?.data?.message || err.message));
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSearchError(null);
  };

  const handleProductClick = (product) => {
    // Handle product click - you can add navigation or modal here
    console.log('Product clicked:', product);
  };

  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar onSearch={handleSearch} />
        <main>
          {searchQuery ? (
            <div>
              <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handleClearSearch}
                        className="text-gray-500 hover:text-gray-700 flex items-center space-x-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Back to Categories</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <SearchResults
                searchQuery={searchQuery}
                products={searchResults}
                loading={searchLoading}
                error={searchError}
                onProductClick={handleProductClick}
              />
            </div>
          ) : (
            <CategorySection categories={categories} />
          )}
        </main>
      </div>
    </UserProvider>
  );
}

export default App;
