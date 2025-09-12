import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { Product } from '@/services/products.types';

import { Products } from '@/components/products';

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Test Product 1',
    description: 'This is a test product description',
    price: 19.99,
  },
  {
    id: 2,
    name: 'Test Product 2',
    description: 'Another test product description',
    price: 29.99,
  },
];

describe('Products', () => {
  it('renders all products', () => {
    const mockAddItem = vi.fn();

    render(<Products products={mockProducts} addItem={mockAddItem} />);

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('This is a test product description')).toBeInTheDocument();
    expect(screen.getByText('Another test product description')).toBeInTheDocument();
  });

  it('renders add buttons for each product', () => {
    const mockAddItem = vi.fn();

    render(<Products products={mockProducts} addItem={mockAddItem} />);

    const addButtons = screen.getAllByText('Add');
    expect(addButtons).toHaveLength(2);
  });

  it('calls addItem when add button is clicked', async () => {
    const mockAddItem = vi.fn();
    const user = userEvent.setup();

    render(<Products products={mockProducts} addItem={mockAddItem} />);

    const addButtons = screen.getAllByText('Add');
    await user.click(addButtons[0]);

    expect(mockAddItem).toHaveBeenCalledWith(mockProducts[0]);
    expect(mockAddItem).toHaveBeenCalledTimes(1);
  });

  it('renders products with correct semantic structure', () => {
    const mockAddItem = vi.fn();

    render(<Products products={mockProducts} addItem={mockAddItem} />);

    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(2);

    const headers = screen.getAllByRole('banner');
    expect(headers).toHaveLength(2);

    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(2);
  });
});
