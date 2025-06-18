import React from 'react';

const SearchResults = ({ searchQuery, products, loading, error, onProductClick }) => {
    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-red-500 text-center">{error}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Search Results
                </h2>
                <p className="text-gray-600">
                    {products.length > 0 
                        ? `Found ${products.length} product${products.length === 1 ? '' : 's'} for "${searchQuery}"`
                        : `No products found for "${searchQuery}"`
                    }
                </p>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                    <p className="text-gray-500">Try adjusting your search terms or browse our categories</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div 
                            key={product.id} 
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                            onClick={() => onProductClick && onProductClick(product)}
                        >
                            <div className="relative h-48">
                                <img
                                    src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    onError={handleImageError}
                                />
                                {product.category && (
                                    <div className="absolute top-2 left-2 bg-accent text-white px-2 py-1 rounded text-xs font-medium">
                                        {product.category.name}
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h4 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                                    {product.name}
                                </h4>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {product.description}
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-green-600">
                                        ${parseFloat(product.price).toFixed(2)}
                                    </span>
                                    <span className={`text-sm px-2 py-1 rounded ${
                                        product.stock > 0 
                                            ? 'text-green-600 bg-green-100' 
                                            : 'text-red-600 bg-red-100'
                                    }`}>
                                        {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults; 