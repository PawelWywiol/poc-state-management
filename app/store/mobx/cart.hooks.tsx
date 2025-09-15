import { cartStore } from './cart.store';

import type { CartContextType } from '../store.types';

export const useCartStore = (): CartContextType => {
  return cartStore;
};
