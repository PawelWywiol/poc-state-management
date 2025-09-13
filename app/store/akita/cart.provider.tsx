import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

import { CartService } from './cart.service';

import type { CartContextType } from '../store.types';

const cartService = new CartService();
const CartContext = createContext<CartService>(cartService);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  return <CartContext.Provider value={cartService}>{children}</CartContext.Provider>;
};

export const useCartStore = (): CartContextType => {
  const service = useContext(CartContext);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    if (!service) return;

    const unsubscribe = service.subscribe(() => {
      forceUpdate({});
    });

    return unsubscribe;
  }, [service]);

  if (!service) {
    throw new Error('useCartStore must be used within a CartProvider');
  }

  return {
    items: service.items,
    addItem: service.addItem,
    removeItem: service.removeItem,
  };
};
