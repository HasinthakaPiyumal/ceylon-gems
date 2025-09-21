import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import {
    getCart, addToCart, removeFromCart,
    updateQuantity, clearCart, getTotalItems, getSubtotal
} from '@/lib/cartUtils';
import type { CartItem } from '@/lib/cartUtils';
import type { Gem } from '@/lib/api';

interface CartContextType {
    cart: CartItem[];
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    addItem: (item: Gem, quantity?: number) => void;
    removeItem: (itemId: number) => void;
    updateItemQuantity: (itemId: number, quantity: number) => void;
    clearAllItems: () => void;
    totalItems: number;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [subtotal, setSubtotal] = useState(0);

    // Initialize cart from local storage
    useEffect(() => {
        const savedCart = getCart();
        setCart(savedCart);
        setTotalItems(getTotalItems());
        setSubtotal(getSubtotal());
    }, []);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const addItem = (item: Gem, quantity: number = 1) => {
        const updatedCart = addToCart(item, quantity);
        setCart(updatedCart);
        setTotalItems(getTotalItems());
        setSubtotal(getSubtotal());
    };

    const removeItem = (itemId: number) => {
        const updatedCart = removeFromCart(itemId);
        setCart(updatedCart);
        setTotalItems(getTotalItems());
        setSubtotal(getSubtotal());
    };

    const updateItemQuantity = (itemId: number, quantity: number) => {
        const updatedCart = updateQuantity(itemId, quantity);
        setCart(updatedCart);
        setTotalItems(getTotalItems());
        setSubtotal(getSubtotal());
    };

    const clearAllItems = () => {
        const updatedCart = clearCart();
        setCart(updatedCart);
        setTotalItems(0);
        setSubtotal(0);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                isCartOpen,
                openCart,
                closeCart,
                addItem,
                removeItem,
                updateItemQuantity,
                clearAllItems,
                totalItems,
                subtotal
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Export the context to be used in useCart hook
export { CartContext };