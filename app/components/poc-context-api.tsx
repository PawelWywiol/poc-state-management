import { Products } from './products';
import { Summary } from './summary';

import { useProducts } from '@/hooks/useProducts';
import { CartConsumer, CartProvider } from '@/store/context-api/cart.provider';

export const PocContextApi = () => {
  const { data, isFetching, error } = useProducts();

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No products found</div>;

  return (
    <CartProvider>
      <CartConsumer>
        {({ items, addItem, removeItem }) => (
          <>
            <h1>Context API Cart</h1>
            <Products products={data} addItem={addItem} />
            <Summary items={items} removeItem={removeItem} />
          </>
        )}
      </CartConsumer>
    </CartProvider>
  );
};
