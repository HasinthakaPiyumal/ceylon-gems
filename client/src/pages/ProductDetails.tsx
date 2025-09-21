import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeftIcon, ShoppingCartIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { gemsApi } from "@/lib/api";
import type { Gem } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [gem, setGem] = useState<Gem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        const fetchGemDetails = async () => {
            if (!id) return;

            try {
                setIsLoading(true);
                setError(null);

                const gemId = parseInt(id, 10);
                if (isNaN(gemId)) {
                    throw new Error("Invalid gem ID");
                }

                const response = await gemsApi.getById(gemId);
                setGem(response.data);
            } catch (err) {
                console.error("Failed to fetch gem details:", err);
                setError("Failed to load gem details. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchGemDetails();
    }, [id]);

    const { addItem } = useCart();

    const handleAddToCart = () => {
        if (!gem) return;

        // Add to cart using the cart context
        addItem(gem);

        // Update UI state to show success feedback
        setAddedToCart(true);

        // Reset the success message after 3 seconds
        setTimeout(() => {
            setAddedToCart(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Back to Shop button */}
                <div className="mb-6">
                    <Link
                        to="/shop"
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                    >
                        <ChevronLeftIcon className="h-4 w-4 mr-1" />
                        Back to Shop
                    </Link>
                </div>

                {isLoading && (
                    <div className="h-[600px] flex items-center justify-center">
                        <LoadingSpinner size="lg" />
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-700 p-8 rounded-lg mx-auto max-w-xl text-center shadow-sm">
                        <p className="text-lg">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!isLoading && !error && gem && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Product Image */}
                            <div className="relative bg-gray-50 p-6 flex items-center justify-center">
                                <div className="absolute top-4 left-4 bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium">
                                    {gem.category}
                                </div>
                                <img
                                    src={gem.imageUrl || `https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?q=80&w=800&auto=format&fit=crop`}
                                    alt={gem.name}
                                    className="max-w-full max-h-[400px] object-contain"
                                />
                            </div>

                            {/* Product Details */}
                            <div className="p-8 lg:p-10">
                                <h1 className="text-3xl font-bold text-gray-900">{gem.name}</h1>

                                <div className="mt-6">
                                    <p className="text-2xl font-semibold text-gray-900">{formatPrice(gem.priceUsd)}</p>
                                </div>

                                <div className="mt-8 space-y-8">
                                    <div>
                                        <h3 className="text-base font-medium text-gray-900 mb-3">Description</h3>
                                        <p className="text-gray-600 leading-relaxed">{gem.description}</p>
                                    </div>

                                    <div className="border-t border-gray-100 pt-8 mt-8">
                                        <h3 className="text-base font-medium text-gray-900 mb-5">Details</h3>
                                        <dl className="grid grid-cols-1 gap-6">
                                            <div className="flex justify-between items-center">
                                                <dt className="text-gray-600">Origin</dt>
                                                <dd className="text-gray-900 font-medium">{gem.origin}</dd>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <dt className="text-gray-600">Weight</dt>
                                                <dd className="text-gray-900 font-medium">{gem.weight_carat} carats</dd>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <dt className="text-gray-600">Color</dt>
                                                <dd className="text-gray-900 font-medium">{gem.color}</dd>
                                            </div>
                                        </dl>
                                    </div>

                                    <div className="border-t border-gray-100 pt-8 mt-8">
                                        <Button
                                            onClick={handleAddToCart}
                                            className={`w-full py-4 rounded-md flex items-center justify-center gap-2 text-base font-medium ${addedToCart
                                                ? "bg-green-600 hover:bg-green-700"
                                                : "bg-indigo-600 hover:bg-indigo-700"
                                                } text-white`}
                                            disabled={addedToCart}
                                        >
                                            {addedToCart ? (
                                                <div className="animate-fadeIn flex items-center">
                                                    <CheckCircleIcon className="h-5 w-5 animate-bounce" />
                                                    <span className="ml-2">Added to Cart!</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <ShoppingCartIcon className="h-5 w-5" />
                                                    Add to Cart
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* You might also like section - removed for cleaner design */}
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetails;