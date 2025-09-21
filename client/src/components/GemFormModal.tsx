import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Gem } from "@/types/gem";
import { GEM_CATEGORIES, GEM_COLORS, GEM_CLARITIES, GEM_CUTS, GEM_ORIGINS } from "@/types/gem";
import { gemsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Define the validation schema using Zod
const gemFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(10, "Description should be at least 10 characters"),
    price: z.coerce.number().positive("Price must be positive"),
    category: z.string().min(1, "Category is required"),
    imageUrl: z.string().url("Please enter a valid URL"),
    carat: z.coerce.number().positive("Carat must be positive"),
    color: z.string().min(1, "Color is required"),
    clarity: z.string().min(1, "Clarity is required"),
    cut: z.string().min(1, "Cut is required"),
    origin: z.string().min(1, "Origin is required"),
    inStock: z.boolean(),
    quantity: z.coerce.number().int().nonnegative("Quantity cannot be negative")
});

// Define the type for our form
type FormValues = z.infer<typeof gemFormSchema>;

interface GemFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    gem?: Gem; // If provided, we're editing an existing gem
    onSuccess: () => void;
}

const GemFormModal = ({ isOpen, onClose, gem, onSuccess }: GemFormModalProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isEditing = !!gem;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useForm<FormValues>({
        resolver: zodResolver(gemFormSchema),
        defaultValues: isEditing && gem
            ? {
                name: gem.name,
                description: gem.description,
                price: gem.price,
                category: gem.category,
                imageUrl: gem.imageUrl,
                carat: gem.carat,
                color: gem.color,
                clarity: gem.clarity,
                cut: gem.cut,
                origin: gem.origin,
                inStock: gem.inStock,
                quantity: gem.quantity
            }
            : {
                name: "",
                description: "",
                price: 0,
                category: "",
                imageUrl: "",
                carat: 0,
                color: "",
                clarity: "",
                cut: "",
                origin: "",
                inStock: true,
                quantity: 0
            }
    });

    // Form submission handler
    const onSubmit = async (data: FormValues) => {
        try {
            setIsSubmitting(true);

            // Map our form data to the API expected format
            const apiGemData = {
                name: data.name,
                category: data.category,
                description: data.description,
                weight_carat: data.carat,
                dimensions: "", // Not in our form, provide default
                color: data.color,
                clarity: data.clarity,
                cut: data.cut,
                origin: data.origin,
                certificateUrl: "", // Not in our form, provide default
                priceUsd: data.price,
                stockQuantity: data.quantity,
                status: data.inStock ? "available" as const : "sold" as const,
                imageUrl: data.imageUrl,
                gallery: [] as string[] // Not in our form, provide default
            };

            if (isEditing && gem) {
                await gemsApi.update(Number(gem.id), apiGemData);
                toast.success("Gem updated successfully");
            } else {
                await gemsApi.create(apiGemData);
                toast.success("Gem created successfully");
            }
            reset();
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error submitting gem form:", error);
            toast.error(isEditing ? "Failed to update gem" : "Failed to create gem");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Gem" : "Add New Gem"}</DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? "Update the details for this gem in your inventory."
                            : "Fill in the details to add a new gem to your inventory."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                {...register("name")}
                                placeholder="Blue Sapphire"
                            />
                            {errors.name && (
                                <p className="text-xs text-red-500">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Price */}
                        <div className="space-y-1">
                            <Label htmlFor="price">Price (USD)</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                {...register("price")}
                            />
                            {errors.price && (
                                <p className="text-xs text-red-500">{errors.price.message}</p>
                            )}
                        </div>

                        {/* Category */}
                        <div className="space-y-1">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={watch("category")}
                                onValueChange={(value) => setValue("category", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {GEM_CATEGORIES.map((category) => (
                                        <SelectItem key={category} value={category}>{category}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category && (
                                <p className="text-xs text-red-500">{errors.category.message}</p>
                            )}
                        </div>

                        {/* Carat */}
                        <div className="space-y-1">
                            <Label htmlFor="carat">Carat</Label>
                            <Input
                                id="carat"
                                type="number"
                                step="0.01"
                                {...register("carat")}
                            />
                            {errors.carat && (
                                <p className="text-xs text-red-500">{errors.carat.message}</p>
                            )}
                        </div>

                        {/* Color */}
                        <div className="space-y-1">
                            <Label htmlFor="color">Color</Label>
                            <Select
                                value={watch("color")}
                                onValueChange={(value) => setValue("color", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select color" />
                                </SelectTrigger>
                                <SelectContent>
                                    {GEM_COLORS.map((color) => (
                                        <SelectItem key={color} value={color}>{color}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.color && (
                                <p className="text-xs text-red-500">{errors.color.message}</p>
                            )}
                        </div>

                        {/* Clarity */}
                        <div className="space-y-1">
                            <Label htmlFor="clarity">Clarity</Label>
                            <Select
                                value={watch("clarity")}
                                onValueChange={(value) => setValue("clarity", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select clarity" />
                                </SelectTrigger>
                                <SelectContent>
                                    {GEM_CLARITIES.map((clarity) => (
                                        <SelectItem key={clarity} value={clarity}>{clarity}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.clarity && (
                                <p className="text-xs text-red-500">{errors.clarity.message}</p>
                            )}
                        </div>

                        {/* Cut */}
                        <div className="space-y-1">
                            <Label htmlFor="cut">Cut</Label>
                            <Select
                                value={watch("cut")}
                                onValueChange={(value) => setValue("cut", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select cut" />
                                </SelectTrigger>
                                <SelectContent>
                                    {GEM_CUTS.map((cut) => (
                                        <SelectItem key={cut} value={cut}>{cut}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.cut && (
                                <p className="text-xs text-red-500">{errors.cut.message}</p>
                            )}
                        </div>

                        {/* Origin */}
                        <div className="space-y-1">
                            <Label htmlFor="origin">Origin</Label>
                            <Select
                                value={watch("origin")}
                                onValueChange={(value) => setValue("origin", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select origin" />
                                </SelectTrigger>
                                <SelectContent>
                                    {GEM_ORIGINS.map((origin) => (
                                        <SelectItem key={origin} value={origin}>{origin}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.origin && (
                                <p className="text-xs text-red-500">{errors.origin.message}</p>
                            )}
                        </div>

                        {/* Image URL */}
                        <div className="space-y-1">
                            <Label htmlFor="imageUrl">Image URL</Label>
                            <Input
                                id="imageUrl"
                                {...register("imageUrl")}
                                placeholder="https://example.com/gem.jpg"
                            />
                            {errors.imageUrl && (
                                <p className="text-xs text-red-500">{errors.imageUrl.message}</p>
                            )}
                        </div>

                        {/* Quantity */}
                        <div className="space-y-1">
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input
                                id="quantity"
                                type="number"
                                {...register("quantity")}
                            />
                            {errors.quantity && (
                                <p className="text-xs text-red-500">{errors.quantity.message}</p>
                            )}
                        </div>

                        {/* In Stock */}
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="inStock"
                                {...register("inStock")}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <Label htmlFor="inStock" className="text-sm font-normal">
                                In Stock
                            </Label>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            {...register("description")}
                            placeholder="Enter detailed description of the gem..."
                            rows={4}
                        />
                        {errors.description && (
                            <p className="text-xs text-red-500">{errors.description.message}</p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : isEditing ? "Update Gem" : "Add Gem"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default GemFormModal;