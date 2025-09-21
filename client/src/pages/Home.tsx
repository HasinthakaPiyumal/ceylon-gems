import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    ChevronRightIcon,
    StarIcon
} from "@heroicons/react/24/outline";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";
import { gemsApi } from "@/lib/api";
import type { Gem, GemCategory, GemQueryParams } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import LoadingSpinner from "@/components/LoadingSpinner";



// Fallback categories in case API fails
const fallbackCategories = [
    { id: 1, category: "Sapphires", imageUrl: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?q=80&w=200&auto=format&fit=crop" },
    { id: 2, category: "Rubies", imageUrl: "https://images.unsplash.com/photo-1603561596112-0a132b757442?q=80&w=200&auto=format&fit=crop" },
    { id: 3, category: "Emeralds", imageUrl: "https://images.unsplash.com/photo-1551706872-893907c44a3e?q=80&w=200&auto=format&fit=crop" },
    { id: 4, category: "Diamonds", imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=200&auto=format&fit=crop" },
    { id: 5, category: "Topaz", imageUrl: "https://images.unsplash.com/photo-1573408301828-9111e6760afa?q=80&w=200&auto=format&fit=crop" }
];

// Sample testimonials
const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Jewelry Designer",
        comment: "Ceylon Gems has the most exceptional quality gems I've worked with. Their sapphires are unmatched in clarity and color.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Collector",
        comment: "I've been collecting gems for over 20 years, and Ceylon Gems consistently provides the most authentic and valuable stones.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Priya Patel",
        role: "Customer",
        comment: "The emerald I purchased exceeded my expectations. The team was incredibly knowledgeable and helped me find the perfect stone.",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=100&auto=format&fit=crop"
    }
];

const Home = () => {
    const [featuredGems, setFeaturedGems] = useState<Gem[]>([]);
    const [categories, setCategories] = useState<GemCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categoriesError, setCategoriesError] = useState<string | null>(null);
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        const fetchGems = async () => {
            try {
                setIsLoading(true);
                setError(null); // Clear any previous errors

                const params: GemQueryParams = {
                    take: 4,
                    status: 'available',
                    sort: 'newest'
                };
                const response = await gemsApi.getAll(params);

                // Validate response structure
                if (!response.data || !response.data.items) {
                    throw new Error("Invalid response format from server");
                }

                // Extract items from the response
                setFeaturedGems(response.data.items);
            } catch (err) {
                console.error("Failed to fetch gems:", err);

                // More specific error messages based on error type
                if (axios.isAxiosError(err)) {
                    if (err.code === "ECONNABORTED") {
                        setError("Request timed out. Please check your connection and try again.");
                    } else if (err.response) {
                        // Server responded with a status code outside the 2xx range
                        const statusCode = err.response.status;
                        if (statusCode === 404) {
                            setError("The gems resource could not be found. Please try again later.");
                        } else if (statusCode >= 500) {
                            setError("Server error. Our team has been notified and is working on it.");
                        } else {
                            setError(`Error loading gems (${statusCode}). Please try again later.`);
                        }
                    } else if (err.request) {
                        // Request was made but no response received
                        setError("Could not connect to the server. Please check your connection.");
                    } else {
                        setError("Failed to load gems. Please try again later.");
                    }
                } else {
                    // Generic error handling
                    setError("An unexpected error occurred. Please try again later.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchGems();
    }, []);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setIsCategoriesLoading(true);
                setCategoriesError(null);

                const response = await gemsApi.getCategories();

                if (!response.data || !response.data.items) {
                    throw new Error("Invalid category response format from server");
                }

                setCategories(response.data.items);
            } catch (err) {
                console.error("Failed to fetch categories:", err);

                // Use fallback categories when API fails
                setCategories(fallbackCategories);

                if (axios.isAxiosError(err)) {
                    if (err.response?.status === 404) {
                        console.warn("Categories endpoint not found, using fallback data");
                    } else {
                        setCategoriesError("Could not load categories. Using default categories instead.");
                    }
                } else {
                    setCategoriesError("An unexpected error occurred loading categories.");
                }
            } finally {
                setIsCategoriesLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Background decorative elements */}
            <div className="fixed top-20 left-20 w-96 h-96 bg-gradient-to-br from-indigo-200/10 to-indigo-300/20 rounded-full blur-3xl -z-10"></div>
            <div className="fixed bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-indigo-300/10 to-slate-300/20 rounded-full blur-3xl -z-10"></div>
            <div className="fixed top-1/2 right-1/4 w-64 h-64 bg-gradient-to-tr from-blue-200/5 to-purple-300/10 rounded-full blur-3xl -z-10"></div>

            {/* Navigation */}
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {/* Hero Section */}
                <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                                    Discover Exquisite <span className="text-indigo-600">Sri Lankan Gems</span>
                                </h1>
                                <p className="mt-6 text-lg text-gray-600 max-w-2xl">
                                    Explore our curated collection of authentic, ethically sourced gemstones from the heart of Sri Lanka, known worldwide for their exceptional quality and beauty.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Link to={user ? "/shop" : "/login"}>
                                    <Button className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-6 py-3 rounded-md">
                                        {user ? "Shop Collection" : "Sign In to Shop"}
                                    </Button>
                                </Link>
                                <Link to="/about">
                                    <Button className="bg-white border border-gray-300 text-gray-700 hover:text-indigo-600 hover:border-indigo-600 px-6 py-3 rounded-md">
                                        Learn More
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 rounded-3xl transform rotate-3 scale-105"></div>
                            <div className="relative bg-white/40 backdrop-blur-sm p-6 rounded-3xl shadow-xl overflow-hidden transform -rotate-2">
                                <img
                                    src="https://images.unsplash.com/photo-1551947391-249dcb8ed976?q=80&w=600&auto=format&fit=crop"
                                    alt="Ceylon Gem Collection"
                                    className="w-full h-auto rounded-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Products */}
                <section className="py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Featured Gemstones</h2>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                            Our carefully selected collection of premium quality gemstones, each with exceptional clarity, color, and cut.
                        </p>
                    </div>

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

                    {!isLoading && !error && featuredGems.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No gemstones available at the moment. Check back soon!</p>
                        </div>
                    )}

                    {!isLoading && !error && featuredGems.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredGems.map((gem) => (
                                <ProductCard
                                    key={gem.id}
                                    gem={gem}
                                />
                            ))}
                        </div>
                    )}

                    <div className="mt-12 text-center">
                        <Link
                            to="/shop"
                            className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800"
                        >
                            <span>View all gemstones</span>
                            <ChevronRightIcon className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="py-16 bg-white/30 backdrop-blur-sm rounded-3xl shadow-sm">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Browse by Categories</h2>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                            Explore our wide range of gemstones categorized by type, color, and quality.
                        </p>
                    </div>

                    {isCategoriesLoading && (
                        <div className="h-40">
                            <LoadingSpinner size="md" />
                        </div>
                    )}

                    {categoriesError && (
                        <p className="text-center text-amber-600">{categoriesError}</p>
                    )}

                    {!isCategoriesLoading && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                            {categories.map((category) => (
                                <Link
                                    to={`/categories/${category.category.toLowerCase()}`}
                                    key={category.id}
                                    className="group"
                                >
                                    <div className="relative overflow-hidden rounded-lg bg-white/50 backdrop-blur-sm shadow-md transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                                        <div className="aspect-w-1 aspect-h-1 h-40">
                                            <img
                                                src={category.imageUrl}
                                                alt={category.category}
                                                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent group-hover:from-indigo-900/70 transition-colors duration-300"></div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                                            <h3 className="text-lg font-medium text-white">{category.category}</h3>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

                {/* Story/About Section */}
                <section className="py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-3xl font-bold text-gray-900">Our Heritage & Expertise</h2>
                            <p className="mt-6 text-gray-600">
                                Ceylon Gems has been a trusted name in the gemstone industry for over three generations. Our journey began in the heart of Ratnapura, Sri Lanka's gem capital, where our founder established direct relationships with local miners to source the finest stones.
                            </p>
                            <p className="mt-4 text-gray-600">
                                Today, we continue this legacy of excellence, combining traditional knowledge with modern gemological practices to bring you authenticated, ethically sourced gemstones of exceptional quality.
                            </p>
                            <div className="mt-8">
                                <Link
                                    to="/about"
                                    className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800"
                                >
                                    <span>Learn more about our story</span>
                                    <ChevronRightIcon className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 relative">
                            <div className="relative bg-white/40 backdrop-blur-md p-6 rounded-3xl shadow-xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1705575531401-7aafdfc0a3bc?q=80&w=600&auto=format&fit=crop"
                                    alt="Gemstone craftsmanship"
                                    className="w-full h-auto rounded-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Client Testimonials</h2>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                            Hear what our valued clients have to say about their experience with Ceylon Gems.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <Card
                                key={testimonial.id}
                                className="bg-white/60 backdrop-blur-md shadow-md hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="p-6">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="h-12 w-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="text-lg font-medium text-gray-900">{testimonial.name}</h4>
                                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex mb-4">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                                key={rating}
                                                className={`${testimonial.rating > rating ? "text-yellow-400" : "text-gray-300"
                                                    } h-5 w-5 flex-shrink-0`}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                    <blockquote>
                                        <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                                    </blockquote>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Newsletter Section */}
                <section className="py-16 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-3xl shadow-xl">
                    <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-white">Stay Updated</h2>
                        <p className="mt-4 text-indigo-100 max-w-2xl mx-auto">
                            Subscribe to our newsletter to receive updates on new gemstone arrivals, exclusive offers, and expert gemology insights.
                        </p>
                        <div className="mt-8 sm:flex sm:justify-center">
                            <div className="w-full sm:max-w-md">
                                <form className="sm:flex">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full px-5 py-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-300 border-none"
                                    />
                                    <button
                                        type="submit"
                                        className="mt-3 sm:mt-0 w-full sm:w-auto flex-shrink-0 px-5 py-3 bg-white text-indigo-600 font-medium rounded-r-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                                <p className="mt-3 text-sm text-indigo-100">
                                    We respect your privacy. Unsubscribe at any time.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;
