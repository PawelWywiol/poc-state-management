import { useContext } from 'react';

import { CartContext } from './cart.context';

import type { CartContextType } from '../store.types';

export const useCartStore = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartStore must be used within a CartProvider');
  }

  return context;
};
