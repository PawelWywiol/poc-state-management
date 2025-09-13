import { makeAutoObservable } from 'mobx';

import { loadCartItemsFromLocalStorage, saveCartItemsToLocalStorage } from '@/lib/storage';
import type { Product } from '@/services/products.types';

import type { CartContextType, CartItem } from '../store.types';
import { removeCartItem, updateCartItems } from '../store.utils';

class CartStore implements CartContextType {
  items: CartItem[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFromStorage();
  }

  addItem = (product: Product): void => {
    this.items = updateCartItems(this.items, product);
    this.saveToStorage();
  };

  removeItem = (id: number): void => {
    this.items = removeCartItem(this.items, id);
    this.saveToStorage();
  };

  setItems = (items: CartItem[]): void => {
    this.items = items;
    this.saveToStorage();
  };

  private loadFromStorage = (): void => {
    const storedItems = loadCartItemsFromLocalStorage();
    if (storedItems.length > 0) {
      this.items = storedItems;
    }
  };

  private saveToStorage = (): void => {
    saveCartItemsToLocalStorage(this.items);
  };
}

// biome-ignore lint/nursery/useExplicitType: TypeScript infers the type correctly
export const cartStore = new CartStore();
