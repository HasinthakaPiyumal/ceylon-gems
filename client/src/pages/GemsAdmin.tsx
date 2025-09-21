import { useState, useEffect } from "react";
import { gemsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import GemFormModal from "@/components/GemFormModal";
import type { Gem } from "@/types/gem";

const GemsAdmin = () => {
    const [gems, setGems] = useState<Gem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGem, setSelectedGem] = useState<Gem | undefined>(undefined);

    const fetchGems = async () => {
        try {
            setLoading(true);
            const response = await gemsApi.getAll();
            const apiGems = response.data.items;

            // Map the API gem format to our app's Gem format
            const mappedGems: Gem[] = apiGems.map(gem => ({
                id: gem.id.toString(),
                name: gem.name,
                description: gem.description,
                price: Number(gem.priceUsd),
                category: gem.category,
                imageUrl: gem.imageUrl,
                carat: Number(gem.weight_carat),
                color: gem.color,
                clarity: gem.clarity,
                cut: gem.cut,
                origin: gem.origin,
                inStock: gem.status === "available",
                quantity: gem.stockQuantity,
                createdAt: gem.createdAt,
                updatedAt: gem.updatedAt
            }));

            setGems(mappedGems);
        } catch (err) {
            setError("Failed to fetch gems");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGems();
    }, []);

    const handleAddGem = () => {
        setSelectedGem(undefined);
        setIsModalOpen(true);
    };

    const handleEditGem = (gem: Gem) => {
        setSelectedGem(gem);
        setIsModalOpen(true);
    };

    const handleDeleteGem = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this gem?")) {
            try {
                await gemsApi.delete(Number(id));
                fetchGems(); // Refresh the list
            } catch (err) {
                console.error("Failed to delete gem:", err);
            }
        }
    };

    if (loading) return <div className="p-8 text-center">Loading gems...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gems Management</h1>
                <Button onClick={handleAddGem}>Add New Gem</Button>
            </div>

            {gems.length === 0 ? (
                <div className="text-center p-8">
                    <p className="mb-4">No gems found in the inventory.</p>
                    <Button onClick={handleAddGem}>Add Your First Gem</Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gems.map((gem) => (
                        <Card key={gem.id} className="overflow-hidden">
                            <img
                                src={gem.imageUrl}
                                alt={gem.name}
                                className="w-full h-48 object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "https://via.placeholder.com/300x200?text=No+Image";
                                }}
                            />
                            <div className="p-4">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-xl font-semibold">{gem.name}</h2>
                                    <span className="font-bold">${gem.price.toFixed(2)}</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-2">{gem.category} • {gem.carat} carats</p>
                                <p className="line-clamp-2 text-sm mb-4">{gem.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className={`px-2 py-1 rounded-full text-xs ${gem.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                        }`}>
                                        {gem.inStock ? "In Stock" : "Out of Stock"}
                                    </span>
                                    <div className="space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEditGem(gem)}>
                                            Edit
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDeleteGem(gem.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            <GemFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                gem={selectedGem}
                onSuccess={fetchGems}
            />
        </div>
    );
};

export default GemsAdmin;