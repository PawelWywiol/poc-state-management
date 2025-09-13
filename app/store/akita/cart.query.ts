import { QueryEntity } from '@datorama/akita';

import type { CartItemState, CartStore } from './cart.store';

export class CartQuery extends QueryEntity<CartItemState> {
  constructor(protected store: CartStore) {
    super(store);
  }

  getCartItems$ = this.selectAll();
  // biome-ignore lint/nursery/useExplicitType: TypeScript infers the type correctly
  getCartItems = () => this.getAll();
}
