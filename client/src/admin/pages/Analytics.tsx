import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "../layouts/AdminLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Mock data for analytics
const monthlySales = [
    { month: "Jan", value: 12500 },
    { month: "Feb", value: 15000 },
    { month: "Mar", value: 18700 },
    { month: "Apr", value: 16800 },
    { month: "May", value: 19200 },
    { month: "Jun", value: 22000 },
    { month: "Jul", value: 24500 },
    { month: "Aug", value: 26700 },
    { month: "Sep", value: 23400 },
    { month: "Oct", value: 25100 },
    { month: "Nov", value: 28900 },
    { month: "Dec", value: 32100 },
];

const productCategories = [
    { category: "Rings", sales: 35 },
    { category: "Necklaces", sales: 25 },
    { category: "Earrings", sales: 20 },
    { category: "Bracelets", sales: 15 },
    { category: "Pendants", sales: 5 },
];

const topSellingItems = [
    { name: "Diamond Engagement Ring", sales: 152, revenue: 38000 },
    { name: "Gold Chain Necklace", sales: 89, revenue: 13350 },
    { name: "Sapphire Earrings", sales: 76, revenue: 9120 },
    { name: "Pearl Bracelet", sales: 64, revenue: 6400 },
    { name: "Ruby Pendant", sales: 52, revenue: 7800 },
];

export default function Analytics() {
    const [timeRange, setTimeRange] = useState("year");

    // Calculate total revenue, total orders, and average order value
    const totalRevenue = monthlySales.reduce((sum, month) => sum + month.value, 0);
    const totalOrders = 1254; // Mock value
    const averageOrderValue = totalRevenue / totalOrders;

    return (
        <AdminLayout title="Analytics">
            <div className="p-6">
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-center mb-6">
                    <h1 className="text-2xl font-semibold">Analytics Dashboard</h1>
                    <div className="flex space-x-2">
                        <Button
                            variant={timeRange === "week" ? "default" : "outline"}
                            onClick={() => setTimeRange("week")}
                        >
                            Week
                        </Button>
                        <Button
                            variant={timeRange === "month" ? "default" : "outline"}
                            onClick={() => setTimeRange("month")}
                        >
                            Month
                        </Button>
                        <Button
                            variant={timeRange === "year" ? "default" : "outline"}
                            onClick={() => setTimeRange("year")}
                        >
                            Year
                        </Button>
                    </div>
                </div>

                {/* KPI Summary */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Revenue
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                +15% from last {timeRange}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Orders
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalOrders.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                +8% from last {timeRange}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Average Order Value
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${averageOrderValue.toFixed(2)}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                +5% from last {timeRange}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Sales Chart */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Sales Overview</CardTitle>
                        <CardDescription>
                            Monthly sales performance for the current year
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                        <div className="h-full flex items-end space-x-2">
                            {monthlySales.map((month) => (
                                <div key={month.month} className="relative flex flex-col items-center flex-1">
                                    <div
                                        className="w-full bg-primary rounded-sm hover:opacity-80 transition-opacity"
                                        style={{
                                            height: `${(month.value / Math.max(...monthlySales.map(m => m.value))) * 100}%`
                                        }}
                                    ></div>
                                    <span className="text-xs mt-2">{month.month}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Product Categories and Top Selling */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Categories</CardTitle>
                            <CardDescription>
                                Sales distribution by product category
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {productCategories.map((category) => (
                                    <div key={category.category} className="flex items-center">
                                        <div className="w-1/3">
                                            <span>{category.category}</span>
                                        </div>
                                        <div className="w-2/3 flex items-center">
                                            <div
                                                className="h-2 bg-primary rounded"
                                                style={{
                                                    width: `${category.sales}%`
                                                }}
                                            ></div>
                                            <span className="ml-2 text-sm">{category.sales}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Top Selling Products</CardTitle>
                            <CardDescription>
                                Products with the highest sales volume
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {topSellingItems.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <div className="w-6 text-center text-sm text-muted-foreground">
                                                {index + 1}
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium">{item.name}</p>
                                                <p className="text-xs text-muted-foreground">{item.sales} sold</p>
                                            </div>
                                        </div>
                                        <div className="font-medium">${item.revenue.toLocaleString()}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}