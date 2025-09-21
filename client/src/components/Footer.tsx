import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-white/70 backdrop-blur-md border-t border-slate-200/50">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-2xl font-semibold text-indigo-600">Ceylon Gems</h3>
                        <p className="mt-4 text-gray-600">
                            Authentic Sri Lankan gemstones curated for collectors, jewelers, and enthusiasts worldwide.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Shop</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="/shop" className="text-gray-600 hover:text-indigo-600">All Gemstones</Link></li>
                            <li><Link to="/categories/sapphires" className="text-gray-600 hover:text-indigo-600">Sapphires</Link></li>
                            <li><Link to="/categories/rubies" className="text-gray-600 hover:text-indigo-600">Rubies</Link></li>
                            <li><Link to="/categories/emeralds" className="text-gray-600 hover:text-indigo-600">Emeralds</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="/about" className="text-gray-600 hover:text-indigo-600">About Us</Link></li>
                            <li><Link to="/contact" className="text-gray-600 hover:text-indigo-600">Contact</Link></li>
                            <li><Link to="/blog" className="text-gray-600 hover:text-indigo-600">Blog</Link></li>
                            <li><Link to="/careers" className="text-gray-600 hover:text-indigo-600">Careers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Support</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="/shipping" className="text-gray-600 hover:text-indigo-600">Shipping</Link></li>
                            <li><Link to="/returns" className="text-gray-600 hover:text-indigo-600">Returns</Link></li>
                            <li><Link to="/faq" className="text-gray-600 hover:text-indigo-600">FAQs</Link></li>
                            <li><Link to="/authenticity" className="text-gray-600 hover:text-indigo-600">Authenticity</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-slate-200/50">
                    <p className="text-center text-gray-500">
                        &copy; {new Date().getFullYear()} Ceylon Gems. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;