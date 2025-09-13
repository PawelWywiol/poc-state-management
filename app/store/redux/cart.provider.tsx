import { type ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';

import { loadCartItemsFromLocalStorage, saveCartItemsToLocalStorage } from '@/lib/storage';
import type { Product } from '@/services/products.types';

import { addItem, removeItem, setItems } from './cart.slice';
import { store } from './cart.store';
import { useAppDispatch, useAppSelector } from './hooks';

import type { CartContextType } from '../store.types';

const CartProviderInner = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    const storedItems = loadCartItemsFromLocalStorage();
    if (storedItems.length > 0) {
      dispatch(setItems(storedItems));
    }
  }, [dispatch]);

  useEffect(() => {
    saveCartItemsToLocalStorage(items);
  }, [items]);

  return <>{children}</>;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <CartProviderInner>{children}</CartProviderInner>
    </Provider>
  );
};

export const useCartStore = (): CartContextType => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  return {
    items,
    addItem: (product: Product) => dispatch(addItem(product)),
    removeItem: (id: number) => dispatch(removeItem(id)),
  };
};
