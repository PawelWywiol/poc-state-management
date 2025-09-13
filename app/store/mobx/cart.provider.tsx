import type { ReactNode } from 'react';

import { CartContext } from './cart.context';
import { cartStore } from './cart.store';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  return <CartContext.Provider value={cartStore}>{children}</CartContext.Provider>;
};
