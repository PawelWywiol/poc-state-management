import type { CartItem } from '@/store/store.types';
import { isCartItem } from '@/store/store.utils';

const CART_STORAGE_KEY = 'cart';

export const saveCartItemsToLocalStorage = (items: CartItem[]): void => {
  if (typeof globalThis === 'undefined') {
    return;
  }

  const storageState = {
    state: { items },
    version: 0,
  };

  globalThis.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(storageState));
};

export const loadCartItemsFromLocalStorage = (): CartItem[] => {
  if (typeof globalThis === 'undefined') return [];

  try {
    const stored = globalThis.localStorage.getItem(CART_STORAGE_KEY);
    const state = stored ? JSON.parse(stored) : null;
    if (!state || !('state' in state) || !('items' in state.state)) {
      return [];
    }

    if (Array.isArray(state.state.items)) {
      return state.state.items.filter((item: unknown) => isCartItem(item));
    }
  } catch {}

  return [];
};
