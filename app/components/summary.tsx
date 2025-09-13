import type { CartItem } from '@/store/store.types';
import { Button } from '@/components/ui/button';
import { calculateCartSummary } from '@/store/store.utils';

export const Summary = ({
  items,
  removeItem,
}: {
  items: CartItem[];
  removeItem: (id: number) => void;
}) => {
  const { totalItems, totalPrice } = calculateCartSummary(items);

  return (
    <aside>
      <ul>
        {items.map((item) => (
          <li key={item.product.id}>
            <h4>{item.product.name}</h4>
            <p>
              price: {item.quantity} x ${item.product.price} = ${item.product.price * item.quantity}
            </p>
            <Button variant="ghost" onClick={() => removeItem(item.product.id)}>
              X
            </Button>
          </li>
        ))}
        <hr />
        <li>
          <h3>
            Total{' '}
            {!!totalItems && (
              <span>
                for {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            )}
          </h3>
          <p>${totalPrice}</p>
        </li>
      </ul>
    </aside>
  );
};
