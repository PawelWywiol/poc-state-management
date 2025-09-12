import type { CartItem, CartSummary } from './store.types';

export const isCartItem = (item: unknown): item is CartItem =>
  item !== null &&
  typeof item === 'object' &&
  'product' in item &&
  'quantity' in item &&
  item.product !== null &&
  typeof item.product === 'object' &&
  typeof item.quantity === 'number';

export const calculateCartSummary = (items: CartItem[]): CartSummary => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return { totalItems, totalPrice };
};
