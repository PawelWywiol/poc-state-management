import type { ID } from '@datorama/akita';

import type { Product } from '@/services/products.types';

export interface CartItem {
  id: ID;
  product: Product;
  quantity: number;
}

export interface CartState {
  cartItems: CartItem[];
}
