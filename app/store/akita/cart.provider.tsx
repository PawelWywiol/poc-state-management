import { useEffect, useState } from 'react';

import { CartService } from './cart.service';

import type { CartContextType } from '../store.types';

const cartService = new CartService();

export const useCartStore = (): CartContextType => {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = cartService.subscribe(() => {
      forceUpdate({});
    });

    return unsubscribe;
  }, []);

  return {
    items: cartService.items,
    addItem: cartService.addItem,
    removeItem: cartService.removeItem,
  };
};
