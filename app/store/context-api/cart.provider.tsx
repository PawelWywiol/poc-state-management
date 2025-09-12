import { type ReactNode, useEffect, useState } from 'react';

import { loadCartItemsFromLocalStorage, saveCartItemsToLocalStorage } from '@/lib/storage';
import type { Product } from '@/services/products.types';

import { CartContext } from './cart.context';

import type { CartContextType, CartItem } from '../store.types';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product) => {
    const itemExists = items.find((item) => item.product.id === product.id);

    if (!itemExists) {
      setItems((currentItems) => [
        ...currentItems,
        {
          product,
          quantity: 1,
        },
      ]);

      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === product.id
          ? {
              product: item.product,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.product.id !== id));
  };

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
  };

  useEffect(() => {
    const storedItems = loadCartItemsFromLocalStorage();
    if (storedItems.length > 0) {
      setItems(storedItems);
    }
  }, []);

  useEffect(() => {
    saveCartItemsToLocalStorage(items);
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const CartConsumer = CartContext.Consumer;
