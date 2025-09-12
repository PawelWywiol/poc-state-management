import type { Product } from './products.types';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch('/products.json');
  const data: Product[] = await response.json();
  return data;
};
