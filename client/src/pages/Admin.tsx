import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
    ChartBarIcon,
    ShoppingBagIcon,
    UserGroupIcon,
    CogIcon,
    BellIcon,
    ArrowRightIcon,
    PlusIcon,
    RectangleStackIcon,
    TagIcon,
    CurrencyDollarIcon,
    Squares2X2Icon
} from "@heroicons/react/24/outline";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";

// Sample data for the dashboard
const sampleOrders = [
    { id: 1, customer: "John Doe", date: "2023-09-20", status: "Delivered", total: 2500.00 },
    { id: 2, customer: "Jane Smith", date: "2023-09-19", status: "Processing", total: 1200.00 },
    { id: 3, customer: "Robert Brown", date: "2023-09-18", status: "Shipped", total: 3400.00 },
    { id: 4, customer: "Emily Davis", date: "2023-09-17", status: "Processing", total: 800.00 },
];

const salesData = {
    today: 4600,
    yesterday: 3800,
    percentChange: 21.05
};

const Admin = () => {
    const { user } = useAppSelector((state) => state.auth);
    const [activeSection, setActiveSection] = useState("dashboard");
    const navigate = useNavigate();

    // In a real application, we'd check if the user has admin role
    // For now, we'll assume all authenticated users can access the admin panel
    // or you would add a role property to the User interface in authSlice.ts
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Helper function to format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "LKR",
            minimumFractionDigits: 2,
        }).format(amount);
    };

    // Render different sections based on active section
    const renderContent = () => {
        switch (activeSection) {
            case "dashboard":
                return (
                    <div className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Today's Sales</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(salesData.today)}</h3>
                                            <div className="flex items-center mt-1">
                                                <span className={`text-xs font-medium ${salesData.percentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {salesData.percentChange >= 0 ? '+' : ''}{salesData.percentChange.toFixed(2)}%
                                                </span>
                                                <span className="text-xs text-gray-500 ml-1">from yesterday</span>
                                            </div>
                                        </div>
                                        <div className="rounded-full p-3 bg-blue-50">
                                            <CurrencyDollarIcon className="w-6 h-6 text-blue-500" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Total Orders</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-1">86</h3>
                                            <div className="flex items-center mt-1">
                                                <span className="text-xs font-medium text-green-600">+12.5%</span>
                                                <span className="text-xs text-gray-500 ml-1">this month</span>
                                            </div>
                                        </div>
                                        <div className="rounded-full p-3 bg-purple-50">
                                            <ShoppingBagIcon className="w-6 h-6 text-purple-500" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Total Customers</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-1">412</h3>
                                            <div className="flex items-center mt-1">
                                                <span className="text-xs font-medium text-green-600">+8.2%</span>
                                                <span className="text-xs text-gray-500 ml-1">this month</span>
                                            </div>
                                        </div>
                                        <div className="rounded-full p-3 bg-yellow-50">
                                            <UserGroupIcon className="w-6 h-6 text-yellow-500" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Gems in Stock</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-1">124</h3>
                                            <div className="flex items-center mt-1">
                                                <span className="text-xs font-medium text-red-600">-2.3%</span>
                                                <span className="text-xs text-gray-500 ml-1">this month</span>
                                            </div>
                                        </div>
                                        <div className="rounded-full p-3 bg-indigo-50">
                                            <RectangleStackIcon className="w-6 h-6 text-indigo-500" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Orders */}
                        <Card className="bg-white border-none shadow-md">
                            <CardHeader className="pb-0">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xl font-bold">Recent Orders</CardTitle>
                                    <Button variant="outline" size="sm" className="text-sm flex items-center gap-1">
                                        View All <ArrowRightIcon className="w-4 h-4" />
                                    </Button>
                                </div>
                                <CardDescription>Latest customer orders</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">Order ID</th>
                                                <th scope="col" className="px-6 py-3">Customer</th>
                                                <th scope="col" className="px-6 py-3">Date</th>
                                                <th scope="col" className="px-6 py-3">Status</th>
                                                <th scope="col" className="px-6 py-3">Total</th>
                                                <th scope="col" className="px-6 py-3">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sampleOrders.map((order) => (
                                                <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                                                    <td className="px-6 py-4 font-medium text-gray-900">#{order.id}</td>
                                                    <td className="px-6 py-4">{order.customer}</td>
                                                    <td className="px-6 py-4">{order.date}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                                order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                                                    'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">{formatCurrency(order.total)}</td>
                                                    <td className="px-6 py-4">
                                                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                                                            View
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="bg-white border-none shadow-md">
                            <CardHeader className="pb-0">
                                <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
                                <CardDescription>Common administrative tasks</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <Button variant="outline" className="h-auto flex flex-col items-center justify-center gap-2 py-6 border-dashed">
                                        <PlusIcon className="w-6 h-6" />
                                        <span>Add New Gem</span>
                                    </Button>
                                    <Button variant="outline" className="h-auto flex flex-col items-center justify-center gap-2 py-6 border-dashed">
                                        <TagIcon className="w-6 h-6" />
                                        <span>Add Category</span>
                                    </Button>
                                    <Button variant="outline" className="h-auto flex flex-col items-center justify-center gap-2 py-6 border-dashed">
                                        <UserGroupIcon className="w-6 h-6" />
                                        <span>Manage Users</span>
                                    </Button>
                                    <Button variant="outline" className="h-auto flex flex-col items-center justify-center gap-2 py-6 border-dashed">
                                        <CurrencyDollarIcon className="w-6 h-6" />
                                        <span>Update Pricing</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Top Selling Gems */}
                        <Card className="bg-white border-none shadow-md">
                            <CardHeader className="pb-0">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xl font-bold">Top Selling Gems</CardTitle>
                                    <Button variant="outline" size="sm" className="text-sm flex items-center gap-1">
                                        View All <ArrowRightIcon className="w-4 h-4" />
                                    </Button>
                                </div>
                                <CardDescription>Best performing products</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {[1, 2, 3, 4].map((item) => (
                                        <Card key={item} className="overflow-hidden border border-gray-100">
                                            <div className="h-40 bg-gray-200">
                                                <img
                                                    src={`https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=500&h=300&auto=format&fit=crop&q=80`}
                                                    alt="Gemstone"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <CardContent className="p-3">
                                                <h4 className="font-medium text-sm">Blue Sapphire</h4>
                                                <div className="flex justify-between items-center mt-1">
                                                    <p className="text-gray-500 text-xs">3.2 ct</p>
                                                    <p className="font-semibold text-indigo-600">₨75,000</p>
                                                </div>
                                                <div className="mt-2 text-xs text-gray-600 flex items-center">
                                                    <span>42 sold this month</span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                );

            case "products":
                return (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader className="pb-0">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xl font-bold">Gemstone Inventory</CardTitle>
                                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1">
                                        <PlusIcon className="w-4 h-4" /> Add New Gem
                                    </Button>
                                </div>
                                <CardDescription>Manage your gemstone inventory</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <p className="text-gray-500">Inventory management interface will be displayed here.</p>
                            </CardContent>
                        </Card>
                    </div>
                );

            case "orders":
                return (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader className="pb-0">
                                <CardTitle className="text-xl font-bold">Order Management</CardTitle>
                                <CardDescription>View and manage customer orders</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <p className="text-gray-500">Order management interface will be displayed here.</p>
                            </CardContent>
                        </Card>
                    </div>
                );

            case "customers":
                return (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader className="pb-0">
                                <CardTitle className="text-xl font-bold">Customer Database</CardTitle>
                                <CardDescription>View and manage customer information</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <p className="text-gray-500">Customer management interface will be displayed here.</p>
                            </CardContent>
                        </Card>
                    </div>
                );

            case "analytics":
                return (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader className="pb-0">
                                <CardTitle className="text-xl font-bold">Sales Analytics</CardTitle>
                                <CardDescription>View detailed analytics and reports</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <p className="text-gray-500">Analytics dashboard will be displayed here.</p>
                            </CardContent>
                        </Card>
                    </div>
                );

            case "settings":
                return (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader className="pb-0">
                                <CardTitle className="text-xl font-bold">System Settings</CardTitle>
                                <CardDescription>Configure application settings</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <p className="text-gray-500">Settings interface will be displayed here.</p>
                            </CardContent>
                        </Card>
                    </div>
                );

            default:
                return (
                    <div>
                        <p>Select a section from the sidebar</p>
                    </div>
                );
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="hidden md:flex md:w-64 md:flex-col">
                <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
                    <div className="flex items-center justify-center h-16">
                        <h1 className="text-xl font-bold text-indigo-600">Ceylon Gems</h1>
                    </div>
                    <div className="px-4 mt-6">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Admin Portal</span>
                    </div>
                    <div className="mt-5 flex flex-col flex-1">
                        <nav className="flex-1 px-2 space-y-1">
                            <button
                                onClick={() => setActiveSection("dashboard")}
                                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${activeSection === "dashboard"
                                        ? "bg-indigo-50 text-indigo-600"
                                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                    }`}
                            >
                                <Squares2X2Icon className={`mr-3 h-5 w-5 ${activeSection === "dashboard" ? "text-indigo-600" : "text-gray-500 group-hover:text-indigo-600"
                                    }`} />
                                Dashboard
                            </button>

                            <button
                                onClick={() => setActiveSection("products")}
                                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${activeSection === "products"
                                        ? "bg-indigo-50 text-indigo-600"
                                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                    }`}
                            >
                                <RectangleStackIcon className={`mr-3 h-5 w-5 ${activeSection === "products" ? "text-indigo-600" : "text-gray-500 group-hover:text-indigo-600"
                                    }`} />
                                Gems
                            </button>

                            <button
                                onClick={() => setActiveSection("orders")}
                                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${activeSection === "orders"
                                        ? "bg-indigo-50 text-indigo-600"
                                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                    }`}
                            >
                                <ShoppingBagIcon className={`mr-3 h-5 w-5 ${activeSection === "orders" ? "text-indigo-600" : "text-gray-500 group-hover:text-indigo-600"
                                    }`} />
                                Orders
                            </button>

                            <button
                                onClick={() => setActiveSection("customers")}
                                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${activeSection === "customers"
                                        ? "bg-indigo-50 text-indigo-600"
                                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                    }`}
                            >
                                <UserGroupIcon className={`mr-3 h-5 w-5 ${activeSection === "customers" ? "text-indigo-600" : "text-gray-500 group-hover:text-indigo-600"
                                    }`} />
                                Customers
                            </button>

                            <button
                                onClick={() => setActiveSection("analytics")}
                                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${activeSection === "analytics"
                                        ? "bg-indigo-50 text-indigo-600"
                                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                    }`}
                            >
                                <ChartBarIcon className={`mr-3 h-5 w-5 ${activeSection === "analytics" ? "text-indigo-600" : "text-gray-500 group-hover:text-indigo-600"
                                    }`} />
                                Analytics
                            </button>

                            <button
                                onClick={() => setActiveSection("settings")}
                                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${activeSection === "settings"
                                        ? "bg-indigo-50 text-indigo-600"
                                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                    }`}
                            >
                                <CogIcon className={`mr-3 h-5 w-5 ${activeSection === "settings" ? "text-indigo-600" : "text-gray-500 group-hover:text-indigo-600"
                                    }`} />
                                Settings
                            </button>
                        </nav>
                    </div>
                    <div className="p-4 border-t">
                        <Button
                            variant="outline"
                            className="w-full justify-start text-left"
                            onClick={() => navigate("/home")}
                        >
                            <ArrowRightIcon className="mr-2 h-4 w-4 rotate-180" />
                            Back to Store
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between p-4 bg-white border-b">
                    <div className="flex items-center md:hidden">
                        <h1 className="text-xl font-bold text-indigo-600">Ceylon Gems</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="p-1 text-gray-500 rounded-full hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <BellIcon className="w-6 h-6" />
                        </button>
                        <div className="relative">
                            <button className="flex items-center space-x-2 focus:outline-none">
                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-800 font-medium">
                                    {user?.name?.charAt(0) || 'A'}
                                </div>
                                <span className="hidden md:inline-block font-medium">{user?.name || 'Admin'}</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {/* Page header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>
                        <p className="text-gray-500">Welcome to the admin dashboard.</p>
                    </div>

                    {/* Page content */}
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default Admin;