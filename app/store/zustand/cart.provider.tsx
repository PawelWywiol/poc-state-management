import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Product } from '@/services/products.types';

import type { CartContextType, CartItem } from '../store.types';
import { removeCartItem, updateCartItems } from '../store.utils';

const CART_STORAGE_KEY = 'cart';

export const useCartStore: () => CartContextType = create<CartContextType>()(
  persist<CartContextType>(
    (set) => ({
      items: [],

      addItem: (item: Product) => {
        set((state) => {
          const items: CartItem[] = updateCartItems(state.items, item);

          return {
            items,
          };
        });
      },

      removeItem: (id: number) => {
        set((state) => {
          const items = removeCartItem(state.items, id);

          return {
            items,
          };
        });
      },
    }),
    {
      name: CART_STORAGE_KEY,
    },
  ),
);
