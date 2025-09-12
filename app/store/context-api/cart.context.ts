import { type Context, createContext } from 'react';

import { DEFAULT_CART_CONTEXT_VALUE } from './cart.config';

import type { CartContextType } from '../store.types';

export const CartContext: Context<CartContextType> = createContext<CartContextType>(
  DEFAULT_CART_CONTEXT_VALUE,
);
