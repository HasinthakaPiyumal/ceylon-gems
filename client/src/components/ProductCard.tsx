import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { Gem } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
    gem: Gem;
}

const ProductCard = ({ gem }: ProductCardProps) => {
    return (
        <div className="group relative">
            <div className="relative bg-white/40 backdrop-blur-md rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                    <img
                        src={gem.imageUrl || `https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?q=80&w=500&auto=format&fit=crop`}
                        alt={gem.name}
                        className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="p-4">
                    <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">{gem.category}</span>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">{gem.name}</h3>
                    <div className="mt-1 flex items-center">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
                            Origin: {gem.origin}
                        </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{gem.description}</p>
                    <p className="mt-3 font-medium text-gray-900">{formatPrice(gem.priceUsd)}</p>
                    <div className="mt-4">
                        <Link to={`/gems/${gem.id}`}>
                            <Button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-md">
                                View Details
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;