import { type ReactNode, useEffect, useState } from 'react';

import { loadCartItemsFromLocalStorage, saveCartItemsToLocalStorage } from '@/lib/storage';
import type { Product } from '@/services/products.types';

import { CartContext } from './cart.context';

import type { CartContextType, CartItem } from '../store.types';
import { removeCartItem, updateCartItems } from '../store.utils';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product) => {
    setItems((currentItems) => updateCartItems(currentItems, product));
  };

  const removeItem = (id: number) => {
    setItems((currentItems) => removeCartItem(currentItems, id));
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
