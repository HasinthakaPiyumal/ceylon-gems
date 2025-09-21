import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { logout } from "@/store/authSlice"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { useCart } from "@/hooks/useCart"
import {
    MagnifyingGlassIcon,
    ShoppingBagIcon,
    UserIcon,
    Bars3Icon,
    XMarkIcon
} from "@heroicons/react/24/outline"

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { user } = useAppSelector((state) => state.auth)
    const { openCart, totalItems } = useCart()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/50 shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-indigo-600">Ceylon Gems</span>
                        </Link>
                    </div>

                    {/* Main Navigation - Desktop */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        <Link to="/" className="text-gray-800 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Home</Link>
                        <Link to="/shop" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Shop</Link>
                        <Link to="/custom" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Custom Orders</Link>
                        <Link to="/about" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">About</Link>
                        <Link to="/contact" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Contact</Link>
                        {user && (
                            <span className="text-indigo-600 px-3 py-2 text-sm font-medium">
                                Welcome, {user.name}
                            </span>
                        )}
                    </div>

                    {/* Right Navigation - Search, Account, Cart */}
                    <div className="flex items-center space-x-4">
                        <button className="p-1 rounded-full text-gray-600 hover:text-indigo-600 focus:outline-none">
                            <MagnifyingGlassIcon className="h-6 w-6" />
                        </button>

                        {user ? (
                            <div className="relative group">
                                <Link to="/profile" className="p-1 rounded-full text-gray-600 hover:text-indigo-600 focus:outline-none relative">
                                    <UserIcon className="h-6 w-6" />
                                    <span className="absolute -top-1 -right-1 bg-green-500 h-2 w-2 rounded-full"></span>
                                </Link>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile{user.role}</Link>
                                    {user.role === "ADMIN" && (
                                        <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Dashboard</Link>
                                    )}
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="p-1 rounded-full text-gray-600 hover:text-indigo-600 focus:outline-none">
                                <UserIcon className="h-6 w-6" />
                            </Link>
                        )}

                        <button
                            onClick={openCart}
                            className="p-1 rounded-full text-gray-600 hover:text-indigo-600 focus:outline-none relative"
                        >
                            <ShoppingBagIcon className={`h-6 w-6 ${totalItems > 0 ? 'text-indigo-600' : ''}`} />
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden p-2 rounded-md text-gray-600 hover:text-indigo-600 focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-md px-2 pt-2 pb-3 space-y-1 border-b border-slate-200/50">
                    <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-indigo-600">Home</Link>
                    <Link to="/shop" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600">Shop</Link>
                    <Link to="/education" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600">Gem Education</Link>
                    <Link to="/custom" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600">Custom Orders</Link>
                    <Link to="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600">About</Link>
                    <Link to="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600">Contact</Link>
                    {user && (
                        <>
                            <Link to="/profile" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600">Your Profile</Link>
                            {user.role === "ADMIN" && (
                                <Link to="/admin" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600">Admin Dashboard</Link>
                            )}
                            <Button
                                variant="outline"
                                onClick={handleLogout}
                                className="w-full justify-start text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
                            >
                                Logout
                            </Button>
                        </>
                    )}
                </div>
            )}
        </header>
    )
}



export default Navbar