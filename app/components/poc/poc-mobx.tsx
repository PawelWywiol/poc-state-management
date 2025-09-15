import { observer } from 'mobx-react-lite';

import type { Product } from '@/services/products.types';

import { useProducts } from '@/hooks/useProducts';
import { useCartStore } from '@/store/mobx/cart.hooks';
import { Products } from '../products';
import { Summary } from '../summary';

const PocMobXContent = observer(({ products }: { products: Product[] }) => {
  const { items, addItem, removeItem } = useCartStore();
  return (
    <>
      <Products products={products} addItem={addItem} />
      <Summary items={items} removeItem={removeItem} />
    </>
  );
});

export const PocMobX = () => {
  const { data, isFetching, error } = useProducts();

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No products found</div>;

  return (
    <>
      <h1>MobX Cart</h1>
      <PocMobXContent products={data} />
    </>
  );
};
