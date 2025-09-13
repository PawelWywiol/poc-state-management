import type { Product } from '@/services/products.types';

import { useProducts } from '@/hooks/useProducts';
import { CartProvider, useCartStore } from '@/store/redux/cart.provider';
import { Products } from '../products';
import { Summary } from '../summary';

const PocReduxContent = ({ products }: { products: Product[] }) => {
  const { items, addItem, removeItem } = useCartStore();
  return (
    <>
      <Products products={products} addItem={addItem} />
      <Summary items={items} removeItem={removeItem} />
    </>
  );
};

export const PocRedux = () => {
  const { data, isFetching, error } = useProducts();

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No products found</div>;

  return (
    <CartProvider>
      <h1>Redux Cart</h1>
      <PocReduxContent products={data} />
    </CartProvider>
  );
};
