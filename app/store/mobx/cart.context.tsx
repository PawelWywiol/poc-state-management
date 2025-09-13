import { createContext } from 'react';

import { cartStore } from './cart.store';

import type { CartContextType } from '../store.types';

export const CartContext = createContext<CartContextType>(cartStore);
