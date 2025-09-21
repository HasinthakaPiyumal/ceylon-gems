import { type Gem } from "@/lib/api";

export interface CartItem {
  id: number;
  name: string;
  price: number | string;
  imageUrl: string;
  quantity: number;
  category: string;
}

// Get cart from local storage
export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Error retrieving cart from localStorage:", error);
    return [];
  }
};

// Save cart to local storage
export const saveCart = (cart: CartItem[]) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

// Add item to cart
export const addToCart = (item: Gem, quantity: number = 1): CartItem[] => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(
    (cartItem) => cartItem.id === item.id
  );

  if (existingItemIndex >= 0) {
    // Item already in cart, update quantity
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.push({
      id: item.id,
      name: item.name,
      price: item.priceUsd,
      imageUrl: item.imageUrl || "",
      quantity: quantity,
      category: item.category,
    });
  }

  saveCart(cart);
  return cart;
};

// Remove item from cart
export const removeFromCart = (itemId: number): CartItem[] => {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.id !== itemId);
  saveCart(updatedCart);
  return updatedCart;
};

// Update item quantity
export const updateQuantity = (
  itemId: number,
  quantity: number
): CartItem[] => {
  const cart = getCart();
  const itemIndex = cart.findIndex((item) => item.id === itemId);

  if (itemIndex >= 0) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      return removeFromCart(itemId);
    } else {
      // Update quantity
      cart[itemIndex].quantity = quantity;
      saveCart(cart);
    }
  }

  return cart;
};

// Clear cart
export const clearCart = (): CartItem[] => {
  saveCart([]);
  return [];
};

// Get total items in cart
export const getTotalItems = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

// Get cart subtotal
export const getSubtotal = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => {
    const price =
      typeof item.price === "string" ? parseFloat(item.price) : item.price;
    return total + price * item.quantity;
  }, 0);
};
