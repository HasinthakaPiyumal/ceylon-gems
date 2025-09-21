import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
    ArrowPathIcon,
    EyeIcon,
    XMarkIcon,
    CheckIcon
} from "@heroicons/react/24/outline";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdminLayout from "@/admin/layouts/AdminLayout";
import { useState } from "react";

// Sample data for the orders page
const sampleOrders = [
    {
        id: 10053,
        customer: "John Doe",
        email: "john.doe@example.com",
        date: "2023-09-20",
        status: "Delivered",
        payment: "Paid",
        total: 2500.00
    },
    {
        id: 10052,
        customer: "Jane Smith",
        email: "jane.smith@example.com",
        date: "2023-09-19",
        status: "Processing",
        payment: "Paid",
        total: 1200.00
    },
    {
        id: 10051,
        customer: "Robert Brown",
        email: "robert.brown@example.com",
        date: "2023-09-18",
        status: "Shipped",
        payment: "Paid",
        total: 3400.00
    },
    {
        id: 10050,
        customer: "Emily Davis",
        email: "emily.davis@example.com",
        date: "2023-09-17",
        status: "Processing",
        payment: "Pending",
        total: 800.00
    },
    {
        id: 10049,
        customer: "Michael Wilson",
        email: "michael.wilson@example.com",
        date: "2023-09-16",
        status: "Cancelled",
        payment: "Refunded",
        total: 1500.00
    },
    {
        id: 10048,
        customer: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        date: "2023-09-15",
        status: "Delivered",
        payment: "Paid",
        total: 2800.00
    }
];

const Orders = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const itemsPerPage = 10;
    const filteredOrders = sampleOrders.filter(
        (order) =>
            order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.id.toString().includes(searchQuery)
    );

    // Helper function to format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "LKR",
            minimumFractionDigits: 2,
        }).format(amount);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleRefresh = () => {
        setIsLoading(true);
        // Simulate loading delay
        setTimeout(() => {
            setIsLoading(false);
        }, 800);
    };

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case 'Delivered':
                return 'bg-green-100 text-green-800';
            case 'Processing':
                return 'bg-blue-100 text-blue-800';
            case 'Shipped':
                return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPaymentBadgeClass = (payment: string) => {
        switch (payment) {
            case 'Paid':
                return 'bg-green-100 text-green-800';
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Refunded':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AdminLayout
            title="Orders"
            description="Manage customer orders"
        >
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="relative w-full sm:w-96">
                        <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search orders..."
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
                    </div>
                </div>

                <Card className="bg-white border-none shadow-md">
                    <CardHeader className="pb-0">
                        <CardTitle className="text-xl font-bold">Order Management</CardTitle>
                        <CardDescription>Track and manage customer orders</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            <div className="flex items-center">
                                                Order ID
                                                <ChevronUpDownIcon className="h-4 w-4 ml-1" />
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            <div className="flex items-center">
                                                Customer
                                                <ChevronUpDownIcon className="h-4 w-4 ml-1" />
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            <div className="flex items-center">
                                                Date
                                                <ChevronUpDownIcon className="h-4 w-4 ml-1" />
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Status</th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Payment</th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            <div className="flex items-center">
                                                Total
                                                <ChevronUpDownIcon className="h-4 w-4 ml-1" />
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map((order) => (
                                        <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">#{order.id}</td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="font-medium">{order.customer}</div>
                                                    <div className="text-xs text-gray-500">{order.email}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{order.date}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentBadgeClass(order.payment)}`}>
                                                    {order.payment}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-medium">{formatCurrency(order.total)}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                                                        <EyeIcon className="h-4 w-4" />
                                                        <span className="sr-only">View</span>
                                                    </Button>

                                                    {order.status === "Processing" && (
                                                        <>
                                                            <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800">
                                                                <CheckIcon className="h-4 w-4" />
                                                                <span className="sr-only">Approve</span>
                                                            </Button>
                                                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                                                                <XMarkIcon className="h-4 w-4" />
                                                                <span className="sr-only">Cancel</span>
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination - can be implemented if needed */}
                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                Showing <span className="font-medium">{Math.min(1, filteredOrders.length)}</span> to{" "}
                                <span className="font-medium">{Math.min(itemsPerPage, filteredOrders.length)}</span> of{" "}
                                <span className="font-medium">{filteredOrders.length}</span> results
                            </p>
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={currentPage * itemsPerPage >= filteredOrders.length}
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

export default Orders;