import type { Product } from '@/services/products.types';

import type { CartItem, CartSummary } from './store.types';

const PRICE_ROUNDING_FACTOR = 100;

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
  const totalPrice =
    Math.floor(
      PRICE_ROUNDING_FACTOR *
        items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    ) / PRICE_ROUNDING_FACTOR;

  return { totalItems, totalPrice };
};

export const updateCartItems = (
  items: CartItem[],
  product: Product,
  quantity: number = 1,
): CartItem[] => {
  const itemExists = items.find((item) => item.product.id === product.id);

  if (!itemExists) {
    return [
      ...items,
      {
        product,
        quantity,
      },
    ];
  }

  return items.map((item) =>
    item.product.id === product.id
      ? {
          product: item.product,
          quantity: item.quantity + quantity,
        }
      : item,
  );
};

export const removeCartItem = (items: CartItem[], productId: number): CartItem[] =>
  items.filter((item) => item.product.id !== productId);
