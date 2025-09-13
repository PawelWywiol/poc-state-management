import { Products } from './products';
import { Summary } from './summary';

import { useProducts } from '@/hooks/useProducts';
import { useCartStore } from '@/store/zustand/cart.provider';

export const PocZustand = () => {
  const { data, isFetching, error } = useProducts();
  const { items, addItem, removeItem } = useCartStore();

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No products found</div>;

  return (
    <>
      <h1>Zustand Cart</h1>
      <Products products={data} addItem={addItem} />
      <Summary items={items} removeItem={removeItem} />
    </>
  );
};
