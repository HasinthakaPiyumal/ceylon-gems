import {
    PlusIcon,
    MagnifyingGlassIcon,
    PencilIcon,
    TrashIcon,
    ChevronUpDownIcon,
    ArrowPathIcon
} from "@heroicons/react/24/outline";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdminLayout from "@/admin/layouts/AdminLayout";
import { useState } from "react";
import { gemsApi } from "@/lib/api";
import type { Gem, GemQueryParams } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ConfirmationModal from "@/admin/components/ConfirmationModal";

// Interface for managing delete confirmation
interface DeleteConfirmation {
    show: boolean;
    gemId: number | null;
}

const Products = () => {
    const queryClient = useQueryClient();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [deleteConfirmation, setDeleteConfirmation] = useState<DeleteConfirmation>({
        show: false,
        gemId: null
    });

    // Prepare query parameters
    const queryParams: GemQueryParams = {
        take: itemsPerPage,
        skip: (currentPage - 1) * itemsPerPage,
        search: searchQuery || undefined,
    };

    // Fetch gems data using React Query
    const {
        data,
        isLoading,
        isError,
        error,
        refetch
    } = useQuery({
        queryKey: ['gems', queryParams],
        queryFn: () => gemsApi.getAll(queryParams),
        staleTime: 60000, // 1 minute
    });

    // Delete gem mutation
    const deleteMutation = useMutation({
        mutationFn: (id: number) => gemsApi.delete(id),
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['gems'] });
            setDeleteConfirmation({ show: false, gemId: null });
        }
    });

    // Helper function to format currency
    const formatCurrency = (amount: number | string) => {
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(numAmount);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleRefresh = () => {
        refetch();
    };

    // Extract the gems and total count
    const gems = data?.data?.items || [];
    const totalItems = data?.data?.total || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case 'available':
                return 'bg-green-100 text-green-800';
            case 'reserved':
                return 'bg-yellow-100 text-yellow-800';
            case 'sold':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleDelete = () => {
        if (deleteConfirmation.gemId) {
            deleteMutation.mutate(deleteConfirmation.gemId);
        }
    };

    return (
        <AdminLayout
            title="Products"
            description="Manage your gemstone inventory"
        >
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="relative w-full sm:w-96">
                        <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search gemstones..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={handleRefresh}
                            disabled={isLoading}
                        >
                            <ArrowPathIcon className={`h-5 w-5 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                        <Button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                            onClick={() => {
                                // TODO: Implement add gemstone functionality
                                console.log('Add gemstone');
                            }}
                        >
                            <PlusIcon className="h-5 w-5 mr-1" />
                            Add Gemstone
                        </Button>
                    </div>
                </div>

                {/* Delete Confirmation Dialog */}
                <ConfirmationModal
                    title="Confirm Deletion"
                    message="Are you sure you want to delete this gemstone? This action cannot be undone."
                    isOpen={deleteConfirmation.show}
                    isLoading={deleteMutation.isPending}
                    onClose={() => setDeleteConfirmation({ show: false, gemId: null })}
                    onConfirm={handleDelete}
                />

                <Card className="bg-white border-none shadow-md">
                    <CardHeader className="pb-0">
                        <CardTitle className="text-xl font-bold">Gemstone Inventory</CardTitle>
                        <CardDescription>Manage and update your product listings</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            <div className="flex items-center">
                                                Product
                                                <ChevronUpDownIcon className="h-4 w-4 ml-1" />
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            <div className="flex items-center">
                                                Category
                                                <ChevronUpDownIcon className="h-4 w-4 ml-1" />
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            <div className="flex items-center">
                                                Price
                                                <ChevronUpDownIcon className="h-4 w-4 ml-1" />
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            <div className="flex items-center">
                                                Weight
                                                <ChevronUpDownIcon className="h-4 w-4 ml-1" />
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Origin</th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Status</th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-8 text-center">
                                                <div className="flex flex-col items-center">
                                                    <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full mb-3"></div>
                                                    <p>Loading gemstones...</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : isError ? (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-8 text-center">
                                                <div className="flex flex-col items-center text-red-500">
                                                    <p>Error loading gemstones. Please try again.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : data?.data?.items?.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-8 text-center">
                                                <div className="flex flex-col items-center">
                                                    <p>No gemstones found.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        data?.data?.items.map((gem) => (
                                            <tr key={gem.id} className="bg-white border-b hover:bg-gray-50">
                                                <td className="px-6 py-4 font-medium text-gray-900">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                                                            <img
                                                                src={gem.imageUrl}
                                                                alt={gem.name}
                                                                className="h-full w-full object-cover"
                                                                onError={(e) => {
                                                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=No+Image';
                                                                }}
                                                            />
                                                        </div>
                                                        <span>{gem.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">{gem.category}</td>
                                                <td className="px-6 py-4">{formatCurrency(gem.priceUsd)}</td>
                                                <td className="px-6 py-4">{gem.weight_carat} ct</td>
                                                <td className="px-6 py-4">{gem.origin}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(gem.status)}`}>
                                                        {gem.status.charAt(0).toUpperCase() + gem.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-blue-600 hover:text-blue-800"
                                                            onClick={() => {
                                                                // TODO: Implement edit functionality
                                                                console.log('Edit gem', gem.id);
                                                            }}
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                            <span className="sr-only">Edit</span>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-red-600 hover:text-red-800"
                                                            onClick={() => setDeleteConfirmation({
                                                                show: true,
                                                                gemId: gem.id
                                                            })}
                                                        >
                                                            <TrashIcon className="h-4 w-4" />
                                                            <span className="sr-only">Delete</span>
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                {!isLoading && data?.data && (
                                    <>
                                        Showing <span className="font-medium">
                                            {data.data.items.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
                                        </span> to{" "}
                                        <span className="font-medium">
                                            {Math.min(currentPage * itemsPerPage, data.data.total)}
                                        </span> of{" "}
                                        <span className="font-medium">{data.data.total}</span> results
                                    </>
                                )}
                            </p>
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={isLoading || currentPage === 1}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={isLoading || !data?.data || currentPage * itemsPerPage >= data.data.total}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
};

export default Products;