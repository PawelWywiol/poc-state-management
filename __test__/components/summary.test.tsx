import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { CartItem } from '@/store/store.types';
import { Summary } from '@/components/summary';

const mockCartItems: CartItem[] = [
  {
    product: {
      id: 1,
      name: 'Test Product 1',
      description: 'Test description 1',
      price: 19.99,
    },
    quantity: 2,
  },
  {
    product: {
      id: 2,
      name: 'Test Product 2',
      description: 'Test description 2',
      price: 29.99,
    },
    quantity: 1,
  },
];

describe('Summary', () => {
  it('renders all cart items', () => {
    const mockRemoveItem = vi.fn();

    render(<Summary items={mockCartItems} removeItem={mockRemoveItem} />);

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
  });

  it('displays correct price calculation for each item', () => {
    const mockRemoveItem = vi.fn();

    render(<Summary items={mockCartItems} removeItem={mockRemoveItem} />);

    expect(screen.getByText('price: 2 x $19.99 = $39.98')).toBeInTheDocument();
    expect(screen.getByText('price: 1 x $29.99 = $29.99')).toBeInTheDocument();
  });

  it('displays correct total items and price', () => {
    const mockRemoveItem = vi.fn();

    render(<Summary items={mockCartItems} removeItem={mockRemoveItem} />);

    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('for 3 items')).toBeInTheDocument();
    expect(screen.getByText('$69.97')).toBeInTheDocument();
  });

  it("displays singular 'item' when total is 1", () => {
    const mockRemoveItem = vi.fn();
    const singleItem = [mockCartItems[0]];

    render(<Summary items={singleItem} removeItem={mockRemoveItem} />);

    expect(screen.getByText('for 2 items')).toBeInTheDocument();
  });

  it("displays singular 'item' when quantity is 1", () => {
    const mockRemoveItem = vi.fn();
    const singleQuantityItem: CartItem[] = [
      {
        product: {
          id: 1,
          name: 'Single Item',
          description: 'Single description',
          price: 10.0,
        },
        quantity: 1,
      },
    ];

    render(<Summary items={singleQuantityItem} removeItem={mockRemoveItem} />);

    expect(screen.getByText('for 1 item')).toBeInTheDocument();
  });

  it('renders remove buttons for each item', () => {
    const mockRemoveItem = vi.fn();

    render(<Summary items={mockCartItems} removeItem={mockRemoveItem} />);

    const removeButtons = screen.getAllByText('X');
    expect(removeButtons).toHaveLength(2);
  });

  it('calls removeItem when remove button is clicked', async () => {
    const mockRemoveItem = vi.fn();
    const user = userEvent.setup();

    render(<Summary items={mockCartItems} removeItem={mockRemoveItem} />);

    const removeButtons = screen.getAllByText('X');
    await user.click(removeButtons[0]);

    expect(mockRemoveItem).toHaveBeenCalledWith(1);
    expect(mockRemoveItem).toHaveBeenCalledTimes(1);
  });

  it('renders empty cart with zero totals', () => {
    const mockRemoveItem = vi.fn();

    render(<Summary items={[]} removeItem={mockRemoveItem} />);

    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('$0')).toBeInTheDocument();
    expect(screen.queryByText('for')).not.toBeInTheDocument();
  });

  it('renders with correct semantic structure', () => {
    const mockRemoveItem = vi.fn();

    render(<Summary items={mockCartItems} removeItem={mockRemoveItem} />);

    const aside = screen.getByRole('complementary');
    expect(aside).toBeInTheDocument();

    const ARTICLES_COUNT = 3;
    const articles = screen.getAllByRole('listitem');
    expect(articles).toHaveLength(ARTICLES_COUNT);

    const HEADINGS_COUNT = 2;
    const headings = screen.getAllByRole('heading', { level: 4 });
    expect(headings).toHaveLength(HEADINGS_COUNT);

    const totalHeading = screen.getByRole('heading', { level: 3 });
    expect(totalHeading).toBeInTheDocument();
  });

  it('displays correct decimal formatting', () => {
    const mockRemoveItem = vi.fn();
    const itemWithDecimals: CartItem[] = [
      {
        product: {
          id: 1,
          name: 'Decimal Product',
          description: 'Product with decimals',
          price: 15.5,
        },
        quantity: 3,
      },
    ];

    render(<Summary items={itemWithDecimals} removeItem={mockRemoveItem} />);

    expect(screen.getByText('price: 3 x $15.5 = $46.5')).toBeInTheDocument();
    expect(screen.getByText('$46.5')).toBeInTheDocument();
  });
});
