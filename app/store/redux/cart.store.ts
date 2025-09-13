import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cart.slice';

// biome-ignore lint/nursery/useExplicitType: TypeScript infers the type correctly
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
