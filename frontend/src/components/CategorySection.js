import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategorySection = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(false);
    const [productsError, setProductsError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/categories');
                setCategories(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load categories: ' + (err.response?.data?.message || err.message));
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
    };

    const handleCategoryClick = async (category) => {
        setSelectedCategory(category);
        setProducts([]);
        setProductsError(null);
        setProductsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/api/products?category_id=${category.id}`);
            setProducts(response.data);
        } catch (err) {
            setProductsError('Failed to load products: ' + (err.response?.data?.message || err.message));
        } finally {
            setProductsLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-gray-200 rounded-lg h-48"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <section className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer relative group"
                        onClick={() => handleCategoryClick(category)}
                    >
                        <div className="relative h-48">
                            <img
                                src={category.image || 'https://via.placeholder.com/300x200?text=Category+Image'}
                                alt={category.name}
                                className="w-full h-full object-cover"
                                onError={handleImageError}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-100 group-hover:bg-opacity-60 transition">
                                <h3 className="text-lg font-bold text-white text-center px-2 drop-shadow-lg">{category.name}</h3>
                            </div>
                        </div>
                        {category.description && (
                            <div className="p-4">
                                <p className="text-gray-600 mt-2">{category.description}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Products Section */}
            {selectedCategory && (
                <div className="mt-12">
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">
                        Products in "{selectedCategory.name}"
                    </h3>
                    {productsLoading ? (
                        <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
                            ))}
                        </div>
                    ) : productsError ? (
                        <div className="text-red-500">{productsError}</div>
                    ) : products.length === 0 ? (
                        <div className="text-gray-500 text-center py-8">No products found in this category.</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    <div className="relative h-48">
                                        <img
                                            src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                            onError={handleImageError}
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h4>
                                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xl font-bold text-green-600">${product.price}</span>
                                            <span className="text-sm text-gray-500">In Stock: {product.stock}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default CategorySection; 