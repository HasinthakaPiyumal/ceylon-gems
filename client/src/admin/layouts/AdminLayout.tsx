import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ChartBarIcon,
    ShoppingBagIcon,
    UserGroupIcon,
    CogIcon,
    BellIcon,
    ArrowRightIcon,
    RectangleStackIcon,
    Squares2X2Icon,
    Bars3Icon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";

interface AdminLayoutProps {
    children: ReactNode;
    title: string;
    description?: string;
}

interface NavItem {
    title: string;
    href: string;
    icon: React.ReactNode;
    active?: boolean;
}

const AdminLayout = ({ children, title, description }: AdminLayoutProps) => {
    const { user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    // Navigation items for the admin sidebar
    const navItems: NavItem[] = [
        {
            title: "Dashboard",
            href: "/admin",
            icon: <Squares2X2Icon className="w-5 h-5" />,
            active: title === "Dashboard",
        },
        {
            title: "Products",
            href: "/admin/products",
            icon: <RectangleStackIcon className="w-5 h-5" />,
            active: title === "Products",
        },
        {
            title: "Orders",
            href: "/admin/orders",
            icon: <ShoppingBagIcon className="w-5 h-5" />,
            active: title === "Orders",
        },
        {
            title: "Customers",
            href: "/admin/customers",
            icon: <UserGroupIcon className="w-5 h-5" />,
            active: title === "Customers",
        },
        {
            title: "Analytics",
            href: "/admin/analytics",
            icon: <ChartBarIcon className="w-5 h-5" />,
            active: title === "Analytics",
        },
        {
            title: "Settings",
            href: "/admin/settings",
            icon: <CogIcon className="w-5 h-5" />,
            active: title === "Settings",
        },
    ];

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-slate-900">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex md:w-64 md:flex-col">
                <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white dark:bg-slate-900 border-r dark:border-slate-800">
                    <div className="flex items-center justify-center h-16">
                        <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Ceylon Gems</h1>
                    </div>
                    <div className="px-4 mt-6">
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Admin Portal</span>
                    </div>
                    <div className="mt-5 flex flex-col flex-1">
                        <nav className="flex-1 px-2 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.title}
                                    to={item.href}
                                    className={cn(
                                        "group flex items-center px-4 py-3 text-sm font-medium rounded-md w-full",
                                        item.active
                                            ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
                                            : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-400"
                                    )}
                                >
                                    <span className={cn(
                                        "mr-3",
                                        item.active ? "text-indigo-600 dark:text-indigo-400" : "text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                                    )}>
                                        {item.icon}
                                    </span>
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="p-4 border-t dark:border-slate-800">
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
            </aside>

            {/* Mobile Menu Button */}
            <div className="md:hidden absolute top-4 left-4 z-40">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => alert("Menu would open here")}
                >
                    <Bars3Icon className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </div>

            {/* Main Content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b dark:border-slate-800 shadow-sm">
                    <div className="md:ml-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
                        {description && <p className="text-gray-500 dark:text-gray-400">{description}</p>}
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button variant="outline" size="icon">
                            <BellIcon className="w-5 h-5" />
                            <span className="sr-only">Notifications</span>
                        </Button>
                        <div className="relative group">
                            <Button variant="ghost" className="p-0">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-800 dark:text-indigo-200 font-medium">
                                        {user?.name?.charAt(0) || 'A'}
                                    </div>
                                    <span className="font-medium">{user?.name || 'Admin'}</span>
                                </div>
                            </Button>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                                <Link to="/admin/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                                <Link to="/admin/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                                <Button onClick={() => navigate("/home")} variant="ghost" className="w-full justify-start text-sm px-4 py-2">
                                    Back to Store
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50 dark:bg-slate-950">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;