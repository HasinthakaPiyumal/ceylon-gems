import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { gemsApi } from "@/lib/api";
import type { Gem } from "@/lib/api";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface GemFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (gemData: any) => void; // Using any for simplicity, could be typed better
    isLoading: boolean;
    initialData?: Partial<Gem>; // For edit mode
    isEditMode?: boolean;
}

const defaultGemData = {
    name: "",
    category: "Sapphire", // Default category
    description: "",
    weight_carat: "",
    dimensions: "",
    color: "",
    clarity: "",
    cut: "",
    origin: "Sri Lanka", // Default origin
    certificateUrl: "",
    priceUsd: "",
    stockQuantity: 1,
    status: "available",
    imageUrl: "",
    gallery: [],
};

const categories = [
    "Sapphire",
    "Ruby",
    "Emerald",
    "Diamond",
    "Amethyst",
    "Topaz",
    "Garnet",
    "Aquamarine",
    "Opal",
    "Other",
];

const statusOptions = ["available", "reserved", "sold"];

const GemFormModal = ({
    isOpen,
    onClose,
    onSubmit,
    isLoading,
    initialData = {},
    isEditMode = false,
}: GemFormModalProps) => {
    const [gemData, setGemData] = useState<any>({ ...defaultGemData, ...initialData });
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        // Reset form when opened/closed or when initialData changes
        if (isOpen) {
            setGemData({ ...defaultGemData, ...initialData });
            setValidationErrors({});
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        let processedValue = value;

        // Convert numeric strings to numbers for specific fields
        if (["weight_carat", "priceUsd", "stockQuantity"].includes(name)) {
            if (value !== "") {
                processedValue = name === "stockQuantity" ? parseInt(value) : parseFloat(value);
            }
        }

        setGemData({
            ...gemData,
            [name]: processedValue,
        });

        // Clear validation error when field is edited
        if (validationErrors[name]) {
            setValidationErrors({
                ...validationErrors,
                [name]: "",
            });
        }
    };

    const validate = () => {
        const errors: Record<string, string> = {};

        // Required fields validation
        if (!gemData.name) errors.name = "Name is required";
        if (!gemData.description) errors.description = "Description is required";
        if (!gemData.weight_carat) errors.weight_carat = "Weight is required";
        if (!gemData.priceUsd) errors.priceUsd = "Price is required";
        if (!gemData.imageUrl) errors.imageUrl = "Image URL is required";

        // Number validation
        if (gemData.weight_carat && isNaN(parseFloat(gemData.weight_carat))) {
            errors.weight_carat = "Weight must be a number";
        }

        if (gemData.priceUsd && isNaN(parseFloat(gemData.priceUsd))) {
            errors.priceUsd = "Price must be a number";
        }

        if (gemData.stockQuantity && isNaN(parseInt(gemData.stockQuantity))) {
            errors.stockQuantity = "Stock quantity must be a number";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validate()) {
            // Format data for API submission
            const submitData = {
                ...gemData,
                // Ensure gallery is properly formatted as an array
                gallery: Array.isArray(gemData.gallery) ? gemData.gallery :
                    gemData.gallery ? [gemData.gallery] : [],
            };

            onSubmit(submitData);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold">
                        {isEditMode ? "Edit Gemstone" : "Add New Gemstone"}
                    </h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={gemData.name}
                                    onChange={handleChange}
                                    className={validationErrors.name ? "border-red-500" : ""}
                                />
                                {validationErrors.name && (
                                    <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                                <select
                                    id="category"
                                    name="category"
                                    value={gemData.category}
                                    onChange={handleChange}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={gemData.description}
                                    onChange={handleChange}
                                    className={validationErrors.description ? "border-red-500" : ""}
                                    rows={4}
                                />
                                {validationErrors.description && (
                                    <p className="text-red-500 text-sm mt-1">{validationErrors.description}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="status">Status</Label>
                                <select
                                    id="status"
                                    name="status"
                                    value={gemData.status}
                                    onChange={handleChange}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {statusOptions.map((status) => (
                                        <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <Label htmlFor="origin">Origin</Label>
                                <Input
                                    id="origin"
                                    name="origin"
                                    value={gemData.origin}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Physical and Price Information */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="weight_carat">Weight (carat) <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="weight_carat"
                                        name="weight_carat"
                                        type="number"
                                        step="0.01"
                                        value={gemData.weight_carat}
                                        onChange={handleChange}
                                        className={validationErrors.weight_carat ? "border-red-500" : ""}
                                    />
                                    {validationErrors.weight_carat && (
                                        <p className="text-red-500 text-sm mt-1">{validationErrors.weight_carat}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="dimensions">Dimensions (mm)</Label>
                                    <Input
                                        id="dimensions"
                                        name="dimensions"
                                        value={gemData.dimensions}
                                        onChange={handleChange}
                                        placeholder="8x6 mm"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="color">Color</Label>
                                    <Input
                                        id="color"
                                        name="color"
                                        value={gemData.color}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="clarity">Clarity</Label>
                                    <Input
                                        id="clarity"
                                        name="clarity"
                                        value={gemData.clarity}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="cut">Cut</Label>
                                <Input
                                    id="cut"
                                    name="cut"
                                    value={gemData.cut}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="priceUsd">Price (USD) <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="priceUsd"
                                        name="priceUsd"
                                        type="number"
                                        step="0.01"
                                        value={gemData.priceUsd}
                                        onChange={handleChange}
                                        className={validationErrors.priceUsd ? "border-red-500" : ""}
                                    />
                                    {validationErrors.priceUsd && (
                                        <p className="text-red-500 text-sm mt-1">{validationErrors.priceUsd}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="stockQuantity">Stock Quantity</Label>
                                    <Input
                                        id="stockQuantity"
                                        name="stockQuantity"
                                        type="number"
                                        value={gemData.stockQuantity}
                                        onChange={handleChange}
                                        className={validationErrors.stockQuantity ? "border-red-500" : ""}
                                    />
                                    {validationErrors.stockQuantity && (
                                        <p className="text-red-500 text-sm mt-1">{validationErrors.stockQuantity}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="imageUrl">Image URL <span className="text-red-500">*</span></Label>
                                <Input
                                    id="imageUrl"
                                    name="imageUrl"
                                    value={gemData.imageUrl}
                                    onChange={handleChange}
                                    className={validationErrors.imageUrl ? "border-red-500" : ""}
                                    placeholder="https://example.com/image.jpg"
                                />
                                {validationErrors.imageUrl && (
                                    <p className="text-red-500 text-sm mt-1">{validationErrors.imageUrl}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="certificateUrl">Certificate URL</Label>
                                <Input
                                    id="certificateUrl"
                                    name="certificateUrl"
                                    value={gemData.certificateUrl}
                                    onChange={handleChange}
                                    placeholder="https://example.com/certificate.pdf"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                    {isEditMode ? "Updating..." : "Creating..."}
                                </>
                            ) : (
                                isEditMode ? "Update Gemstone" : "Add Gemstone"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GemFormModal;