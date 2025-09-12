import type { Product } from '@/services/products.types';

import { Button } from '@/components/ui/button';

export const Products = ({
  products,
  addItem,
}: {
  products: Product[];
  addItem: (item: Product) => void;
}) => (
  <section>
    {products.map((product) => (
      <article key={product.id}>
        <header>
          <h3>{product.name}</h3>
          <span>${product.price}</span>
        </header>
        <p>{product.description}</p>
        <Button onClick={() => addItem(product)}>Add</Button>
      </article>
    ))}
  </section>
);
