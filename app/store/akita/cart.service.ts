import { loadCartItemsFromLocalStorage, saveCartItemsToLocalStorage } from '@/lib/storage';
import type { Product } from '@/services/products.types';

import type { CartContextType } from '../store.types';
import { removeCartItem, updateCartItems } from '../store.utils';

export class CartService implements CartContextType {
  private _items: import('../store.types').CartItem[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
  }

  get items(): import('../store.types').CartItem[] {
    return this._items;
  }

  addItem = (product: Product): void => {
    this._items = updateCartItems(this._items, product);
    this.saveToStorage();
    this.notifyListeners();
  };

  removeItem = (productId: number): void => {
    this._items = removeCartItem(this._items, productId);
    this.saveToStorage();
    this.notifyListeners();
  };

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  private loadFromStorage(): void {
    const storedItems = loadCartItemsFromLocalStorage();
    if (storedItems.length > 0) {
      this._items = storedItems;
    }
  }

  private saveToStorage(): void {
    saveCartItemsToLocalStorage(this._items);
  }

  private notifyListeners(): void {
    for (const listener of this.listeners) {
      listener();
    }
  }
}
