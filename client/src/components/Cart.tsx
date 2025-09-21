
import { XMarkIcon, TrashIcon, MinusIcon, PlusIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Cart = () => {
    const {
        cart, isCartOpen, closeCart,
        removeItem, updateItemQuantity,
        clearAllItems, subtotal, totalItems
    } = useCart();
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isCartOpen) {
            setIsAnimating(true);
        }
    }, [isCartOpen]);

    if (!isCartOpen && !isAnimating) return null;

    const handleTransitionEnd = () => {
        if (!isCartOpen) {
            setIsAnimating(false);
        }
    };

    return (
        <div className="fixed inset-0 z-100 overflow-hidden">
            {/* Background overlay */}
            <div
                className={`fixed inset-0 transition-opacity duration-300 ease-in-out ${isCartOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={closeCart}
                aria-hidden="true"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            />

            {/* Side panel */}
            <div className="fixed inset-y-0 right-0 flex max-w-full">
                <div
                    className={`w-screen max-w-md transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    onTransitionEnd={handleTransitionEnd}
                >
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="flex items-center justify-between px-4 py-6 sm:px-6 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900 flex items-center">
                                <ShoppingBagIcon className="h-5 w-5 mr-2" />
                                Shopping Cart ({totalItems})
                            </h2>
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-500"
                                onClick={closeCart}
                            >
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {cart.length === 0 ? (
                                <div className="text-center py-16">
                                    <ShoppingBagIcon className="h-16 w-16 mx-auto text-gray-300" />
                                    <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Start shopping to add items to your cart.
                                    </p>
                                    <div className="mt-6">
                                        <Button
                                            onClick={closeCart}
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2"
                                        >
                                            Continue Shopping
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {cart.map((item, index) => (
                                        <div
                                            key={item.id}
                                            className="flex border-b border-gray-100 pb-6 opacity-0 animate-fadeIn"
                                            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                                        >
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <img
                                                    src={item.imageUrl || "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?q=80&w=200&auto=format&fit=crop"}
                                                    alt={item.name}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>
                                                            <Link to={`/gems/${item.id}`} onClick={closeCart}>
                                                                {item.name}
                                                            </Link>
                                                        </h3>
                                                        <p className="ml-4">{formatPrice(item.price)}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <div className="flex items-center space-x-1">
                                                        <button
                                                            className="p-1 rounded-full hover:bg-gray-100"
                                                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                                            disabled={item.quantity === 1}
                                                        >
                                                            <MinusIcon className="h-4 w-4" />
                                                        </button>
                                                        <span className="px-2 py-1 bg-gray-50 rounded font-medium text-gray-900">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            className="p-1 rounded-full hover:bg-gray-100"
                                                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            <PlusIcon className="h-4 w-4" />
                                                        </button>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="text-indigo-600 hover:text-indigo-800 flex items-center"
                                                        onClick={() => removeItem(item.id)}
                                                    >
                                                        <TrashIcon className="h-4 w-4 mr-1" />
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex justify-end">
                                            <button
                                                onClick={clearAllItems}
                                                className="font-medium text-indigo-600 hover:text-indigo-800 text-sm flex items-center"
                                            >
                                                <TrashIcon className="h-4 w-4 mr-1" />
                                                Clear Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                                    <p>Subtotal</p>
                                    <p>{formatPrice(subtotal)}</p>
                                </div>
                                <p className="text-sm text-gray-500 mb-6">
                                    Shipping and taxes calculated at checkout.
                                </p>
                                <Link
                                    to="/checkout"
                                    onClick={closeCart}
                                    className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700"
                                >
                                    Checkout
                                </Link>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        or{' '}
                                        <button
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-800"
                                            onClick={closeCart}
                                        >
                                            Continue Shopping
                                            <span aria-hidden="true"> &rarr;</span>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;