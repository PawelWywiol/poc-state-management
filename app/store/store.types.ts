import type { Product } from '@/services/products.types';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: Product) => void;
  removeItem: (id: number) => void;
}

export interface CartSummary {
  totalItems: number;
  totalPrice: number;
}
