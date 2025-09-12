import type { CartItem } from '@/store/store.types';
import { isCartItem } from '@/store/store.utils';

const CART_STORAGE_KEY = 'cart';

export const saveCartItemsToLocalStorage = (items: CartItem[]): void => {
  if (typeof globalThis === 'undefined') {
    return;
  }

  globalThis.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

export const loadCartItemsFromLocalStorage = (): CartItem[] => {
  if (typeof globalThis === 'undefined') return [];

  try {
    const stored = globalThis.localStorage.getItem(CART_STORAGE_KEY);
    const items = stored ? JSON.parse(stored) : [];

    if (Array.isArray(items)) {
      return items.filter((item) => isCartItem(item));
    }
  } catch {}

  return [];
};
