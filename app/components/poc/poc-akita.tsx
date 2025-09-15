import type { Product } from '@/services/products.types';

import { useProducts } from '@/hooks/useProducts';
import { useCartStore } from '@/store/akita/cart.provider';
import { Products } from '../products';
import { Summary } from '../summary';

const PocAkitaContent = ({ products }: { products: Product[] }) => {
  const { items, addItem, removeItem } = useCartStore();
  return (
    <>
      <Products products={products} addItem={addItem} />
      <Summary items={items} removeItem={removeItem} />
    </>
  );
};

export const PocAkita = () => {
  const { data, isFetching, error } = useProducts();

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No products found</div>;

  return (
    <>
      <h1>Akita Cart</h1>
      <PocAkitaContent products={data} />
    </>
  );
};
