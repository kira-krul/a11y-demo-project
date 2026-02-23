import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Product } from './types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: number, color: string) => void;
  removeFromCart: (productId: number, size: number, color: string) => void;
  updateQuantity: (productId: number, size: number, color: string, quantity: number) => void;
  clearCart: () => void;
  itemsInCart: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size: number, color: string) => {
    setItems(current => {
      const existing = current.find(
        item => item.product.id === product.id && item.size === size && item.color === color
      );

      if (existing) {
        return current.map(item =>
          item.product.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { product, size, color, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number, size: number, color: string) => {
    setItems(current =>
      current.filter(item => !(item.product.id === productId && item.size === size && item.color === color))
    );
  };

  const updateQuantity = (productId: number, size: number, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setItems(current =>
      current.map(item =>
        item.product.id === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemsInCart: totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
