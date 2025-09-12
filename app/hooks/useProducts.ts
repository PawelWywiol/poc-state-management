import { type UseQueryResult, useQuery } from '@tanstack/react-query';

import { getProducts } from '@/services/products';
import type { Product } from '@/services/products.types';

export const useProducts = (): UseQueryResult<Product[], Error> =>
  useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Array<Product>> => await getProducts(),
  });
