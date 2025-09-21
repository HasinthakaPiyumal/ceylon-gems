import { useState, useEffect } from "react";
import axios from "axios";
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { gemsApi } from "@/lib/api";
import type { Gem, GemCategory, GemQueryParams } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import LoadingSpinner from "@/components/LoadingSpinner";

import { formatPrice } from "@/lib/utils";


const Shop = () => {
    const [gems, setGems] = useState<Gem[]>([]);
    const [categories, setCategories] = useState<GemCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // We'll handle category loading in UI conditionally without separate state

    // Filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState<{ min: number; max: number | null }>({ min: 0, max: null });
    const [showFilters, setShowFilters] = useState(false);

    // Fetch gems with applied filters
    useEffect(() => {
        const fetchGems = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const params: GemQueryParams = {};

                if (searchQuery) {
                    params.search = searchQuery;
                }

                if (selectedCategory) {
                    params.category = selectedCategory;
                }

                if (priceRange.min > 0) {
                    params.minPrice = priceRange.min;
                }

                if (priceRange.max !== null) {
                    params.maxPrice = priceRange.max;
                }

                params.take = 12;

                const response = await gemsApi.getAll(params);

                if (!response.data || !response.data.items) {
                    throw new Error("Invalid response format from server");
                }

                setGems(response.data.items);
            } catch (err) {
                console.error("Failed to fetch gems:", err);
                if (axios.isAxiosError(err)) {
                    if (err.code === "ECONNABORTED") {
                        setError("Request timed out. Please check your connection and try again.");
                    } else if (err.response) {
                        const statusCode = err.response.status;
                        if (statusCode === 404) {
                            setError("The gems resource could not be found. Please try again later.");
                        } else if (statusCode >= 500) {
                            setError("Server error. Our team has been notified and is working on it.");
                        } else {
                            setError(`Error loading gems (${statusCode}). Please try again later.`);
                        }
                    } else if (err.request) {
                        setError("Could not connect to the server. Please check your connection.");
                    } else {
                        setError("Failed to load gems. Please try again later.");
                    }
                } else {
                    setError("An unexpected error occurred. Please try again later.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchGems();
    }, [searchQuery, selectedCategory, priceRange.min, priceRange.max]);

    // Fetch gem categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setIsLoading(true);

                const response = await gemsApi.getCategories();

                if (!response.data || !response.data.items) {
                    throw new Error("Invalid category response format from server");
                }

                setCategories(response.data.items);
            } catch (err) {
                console.error("Failed to fetch categories:", err);

                // Fallback categories
                setCategories([
                    { id: 1, category: "Sapphires", imageUrl: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?q=80&w=200&auto=format&fit=crop" },
                    { id: 2, category: "Rubies", imageUrl: "https://images.unsplash.com/photo-1603561596112-0a132b757442?q=80&w=200&auto=format&fit=crop" },
                    { id: 3, category: "Emeralds", imageUrl: "https://images.unsplash.com/photo-1551706872-893907c44a3e?q=80&w=200&auto=format&fit=crop" },
                    { id: 4, category: "Diamonds", imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=200&auto=format&fit=crop" },
                    { id: 5, category: "Topaz", imageUrl: "https://images.unsplash.com/photo-1573408301828-9111e6760afa?q=80&w=200&auto=format&fit=crop" }
                ]);

                if (axios.isAxiosError(err) && err.response?.status === 404) {
                    console.warn("Categories endpoint not found, using fallback data");
                }
            } finally {
                // Keep loading state controlled by main gems fetch
            }
        };

        fetchCategories();
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleCategorySelect = (category: string | null) => {
        setSelectedCategory(category);
    };

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? parseInt(e.target.value) : 0;
        setPriceRange(prev => ({ ...prev, min: value }));
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? parseInt(e.target.value) : null;
        setPriceRange(prev => ({ ...prev, max: value }));
    };

    const clearAllFilters = () => {
        setSearchQuery("");
        setSelectedCategory(null);
        setPriceRange({ min: 0, max: null });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Background gradient elements */}
            <div className="fixed top-20 left-20 w-96 h-96 bg-gradient-to-br from-indigo-200/10 to-indigo-300/20 rounded-full blur-3xl -z-10"></div>
            <div className="fixed bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-indigo-300/10 to-slate-300/20 rounded-full blur-3xl -z-10"></div>

            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900">Shop Our Collection</h1>
                    <p className="mt-4 text-gray-600 max-w-2xl">
                        Browse through our premium collection of ethically sourced gemstones from Sri Lanka.
                        Filter by category, price, and more to find your perfect gem.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Mobile filter toggle */}
                    <div className="md:hidden mb-4">
                        <Button
                            onClick={() => setShowFilters(!showFilters)}
                            className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300"
                        >
                            {showFilters ? (
                                <>
                                    <XMarkIcon className="h-5 w-5" />
                                    Hide Filters
                                </>
                            ) : (
                                <>
                                    <FunnelIcon className="h-5 w-5" />
                                    Show Filters
                                </>
                            )}
                        </Button>
                    </div>

                    <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 lg:w-72`}>
                        <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-md p-5 sticky top-20">
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <Button
                                    variant="ghost"
                                    className="text-gray-500 hover:text-gray-700 text-sm"
                                    onClick={clearAllFilters}
                                >
                                    Clear all
                                </Button>
                            </div>
                            <div className="mb-6">
                                <Label htmlFor="search" className="text-sm font-medium text-gray-700 block mb-2">
                                    Search
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="search"
                                        type="text"
                                        placeholder="Search gems..."
                                        className="pl-9 pr-4"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                </div>
                            </div>

                            <div className="mb-6">
                                <Label className="text-sm font-medium text-gray-700 block mb-2">
                                    Categories
                                </Label>
                                <div className="flex flex-col space-y-2">
                                    <button
                                        onClick={() => handleCategorySelect(null)}
                                        className={`text-left px-2 py-1 rounded text-sm ${selectedCategory === null ? 'bg-indigo-100 text-indigo-800 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        All Categories
                                    </button>
                                    {categories.map(category => (
                                        <button
                                            key={category.id}
                                            onClick={() => handleCategorySelect(category.category)}
                                            className={`text-left px-2 py-1 rounded text-sm ${selectedCategory === category.category ? 'bg-indigo-100 text-indigo-800 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                                        >
                                            {category.category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <Label className="text-sm font-medium text-gray-700 block mb-2">
                                    Price Range
                                </Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <Label htmlFor="min-price" className="text-xs text-gray-500">Min</Label>
                                        <Input
                                            id="min-price"
                                            type="number"
                                            min="0"
                                            placeholder="Min"
                                            className="text-sm"
                                            value={priceRange.min || ""}
                                            onChange={handleMinPriceChange}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="max-price" className="text-xs text-gray-500">Max</Label>
                                        <Input
                                            id="max-price"
                                            type="number"
                                            min="0"
                                            placeholder="Max"
                                            className="text-sm"
                                            value={priceRange.max || ""}
                                            onChange={handleMaxPriceChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="md:hidden">
                                <Button
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                                    onClick={() => setShowFilters(false)}
                                >
                                    Apply Filters
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        {/* Active filters display */}
                        <div className="mb-4 flex flex-wrap gap-2 items-center">
                            {selectedCategory && (
                                <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                    <span>Category: {selectedCategory}</span>
                                    <button onClick={() => setSelectedCategory(null)}>
                                        <XMarkIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            )}

                            {priceRange.min > 0 && (
                                <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                    <span>Min: {formatPrice(priceRange.min)}</span>
                                    <button onClick={() => setPriceRange(prev => ({ ...prev, min: 0 }))}>
                                        <XMarkIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            )}

                            {priceRange.max !== null && (
                                <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                    <span>Max: {formatPrice(priceRange.max)}</span>
                                    <button onClick={() => setPriceRange(prev => ({ ...prev, max: null }))}>
                                        <XMarkIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            )}

                            {searchQuery && (
                                <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                    <span>Search: {searchQuery}</span>
                                    <button onClick={() => setSearchQuery("")}>
                                        <XMarkIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* UI States: Loading, Error, Empty, and Grid */}
                        {isLoading && (
                            <div className="h-64">
                                <LoadingSpinner size="lg" />
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mx-auto max-w-xl text-center">
                                <p>{error}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}

                        {!isLoading && !error && gems.length === 0 && (
                            <div className="text-center py-12 bg-white/70 backdrop-blur-md rounded-xl shadow-md">
                                <p className="text-gray-500 mb-4">No gemstones found matching your criteria.</p>
                                <Button
                                    variant="outline"
                                    onClick={clearAllFilters}
                                    className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                                >
                                    Clear all filters
                                </Button>
                            </div>
                        )}
                        {!isLoading && !error && gems.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {gems.map((gem) => (
                                    <ProductCard
                                        key={gem.id}
                                        gem={gem}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Shop;