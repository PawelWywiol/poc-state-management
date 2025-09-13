import { type EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import type { CartItem } from './cart.model';

export interface CartItemState extends EntityState<CartItem> {}

@StoreConfig({ name: 'cart' })
export class CartStore extends EntityStore<CartItemState> {}
