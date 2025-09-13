import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Product } from '@/services/products.types';

import type { CartItem } from '../store.types';
import { removeCartItem, updateCartItems } from '../store.utils';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

// biome-ignore lint/nursery/useExplicitType: TypeScript infers the type correctly
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state: CartState, action: PayloadAction<Product>) => {
      state.items = updateCartItems(state.items, action.payload);
    },
    removeItem: (state: CartState, action: PayloadAction<number>) => {
      state.items = removeCartItem(state.items, action.payload);
    },
    setItems: (state: CartState, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

// biome-ignore lint/nursery/useExplicitType: TypeScript infers the type correctly
export const { addItem, removeItem, setItems } = cartSlice.actions;
export { cartSlice };

export default cartSlice.reducer;
