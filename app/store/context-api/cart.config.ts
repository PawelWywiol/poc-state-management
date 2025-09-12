import type { CartContextType } from '../store.types';

export const DEFAULT_CART_CONTEXT_VALUE: CartContextType = {
  items: [],
  addItem: () => {},
  removeItem: () => {},
};
