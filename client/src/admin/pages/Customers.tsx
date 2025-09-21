import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// Update the import path below if your Table components are located elsewhere
// Update the import path below to the correct location of your Table components
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
// If '@/components/ui/table' does not exist, update the path to the correct location, e.g.:
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import AdminLayout from "../layouts/AdminLayout";
import { MagnifyingGlassIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

// Mock data for customers
const mockCustomers = [
    {
        id: 1,
        name: "John Smith",
        email: "john.smith@example.com",
        phone: "+94 77 123 4567",
        status: "active",
        totalOrders: 12,
        totalSpent: 1250.75,
        lastOrder: "2023-10-12",
    },
    {
        id: 2,
        name: "Mary Johnson",
        email: "mary.j@example.com",
        phone: "+94 76 345 6789",
        status: "active",
        totalOrders: 8,
        totalSpent: 985.50,
        lastOrder: "2023-10-05",
    },
    {
        id: 3,
        name: "David Williams",
        email: "dwilliams@example.com",
        phone: "+94 71 567 8901",
        status: "inactive",
        totalOrders: 3,
        totalSpent: 240.25,
        lastOrder: "2023-06-22",
    },
    {
        id: 4,
        name: "Sarah Brown",
        email: "sarah.b@example.com",
        phone: "+94 70 234 5678",
        status: "active",
        totalOrders: 15,
        totalSpent: 1876.30,
        lastOrder: "2023-10-15",
    },
    {
        id: 5,
        name: "Michael Davis",
        email: "mdavis@example.com",
        phone: "+94 75 890 1234",
        status: "active",
        totalOrders: 5,
        totalSpent: 675.45,
        lastOrder: "2023-09-28",
    },
];

export default function Customers() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string | null>(null);

    // Filter customers based on search query and status
    const filteredCustomers = mockCustomers.filter((customer) => {
        const matchesSearch =
            customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.phone.includes(searchQuery);

        const matchesStatus = statusFilter === null || customer.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <AdminLayout title="Customers">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Customer Management</h1>
                    <Button>Add New Customer</Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Customers</CardTitle>
                        <CardDescription>
                            Manage your customers and their information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                            <div className="relative flex-1">
                                <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                <Input
                                    className="pl-8"
                                    placeholder="Search customers..."
                                    type="search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" onClick={() => setStatusFilter(null)}>
                                    All
                                </Button>
                                <Button
                                    variant={statusFilter === 'active' ? "default" : "outline"}
                                    onClick={() => setStatusFilter('active')}
                                >
                                    Active
                                </Button>
                                <Button
                                    variant={statusFilter === 'inactive' ? "default" : "outline"}
                                    onClick={() => setStatusFilter('inactive')}
                                >
                                    Inactive
                                </Button>
                            </div>
                        </div>

                        <div className="rounded-md border overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Orders</TableHead>
                                        <TableHead>Total Spent</TableHead>
                                        <TableHead>Last Order</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredCustomers.map((customer) => (
                                        <TableRow key={customer.id}>
                                            <TableCell className="font-medium">{customer.name}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span>{customer.email}</span>
                                                    <span className="text-sm text-gray-500">{customer.phone}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={`px-2 py-0.5 ${customer.status === 'active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {customer.status === 'active' ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{customer.totalOrders}</TableCell>
                                            <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                                            <TableCell>{customer.lastOrder}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <Button variant="ghost" size="sm">
                                                        <PencilIcon className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm">
                                                        <TrashIcon className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}