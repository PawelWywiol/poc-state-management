import type { UseQueryResult } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { Product } from '@/services/products.types';

import { PocContextApi } from '@/components/poc-context-api';
import { PocZustand } from '@/components/poc-zustand';

vi.mock('@/hooks/useProducts');
vi.mock('@/lib/storage', () => ({
  loadCartItemsFromLocalStorage: vi.fn(() => []),
  saveCartItemsToLocalStorage: vi.fn(),
}));

const mockUseProducts = vi.mocked(await import('@/hooks/useProducts'));

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

const Components = [PocZustand, PocContextApi];

describe.each(Components)('PocZustand', (Component) => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.localStorage.clear();
  });

  it('displays loading state', () => {
    mockUseProducts.useProducts.mockReturnValue({
      data: undefined,
      isFetching: true,
      error: null,
    } as UseQueryResult<Product[], Error>);

    render(<Component />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error state', () => {
    const mockError = new Error('Failed to fetch products');
    mockUseProducts.useProducts.mockReturnValue({
      data: undefined,
      isFetching: false,
      error: mockError,
    } as UseQueryResult<Product[], Error>);

    render(<Component />);

    expect(screen.getByText('Error: Failed to fetch products')).toBeInTheDocument();
  });

  it('displays no products found when data is null', () => {
    mockUseProducts.useProducts.mockReturnValue({
      data: null,
      isFetching: false,
      error: null,
    } as unknown as UseQueryResult<Product[], Error>);

    render(<Component />);

    expect(screen.getByText('No products found')).toBeInTheDocument();
  });

  it('renders products and summary when data is available', () => {
    mockUseProducts.useProducts.mockReturnValue({
      data: mockProducts,
      isFetching: false,
      error: null,
    } as UseQueryResult<Product[], Error>);

    render(<Component />);

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();

    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('allows adding products to cart and displays them in summary', async () => {
    mockUseProducts.useProducts.mockReturnValue({
      data: mockProducts,
      isFetching: false,
      error: null,
    } as UseQueryResult<Product[], Error>);

    const user = userEvent.setup();
    render(<Component />);

    const addButtons = screen.getAllByText('Add');
    await user.click(addButtons[0]);

    expect(screen.getAllByText('Test Product 1')).toHaveLength(2);
    expect(screen.getByText('price: 1 x $19.99 = $19.99')).toBeInTheDocument();
    expect(screen.getByText('for 1 item')).toBeInTheDocument();
    expect(screen.getAllByText('$19.99')).toHaveLength(1);
  });

  it('allows removing products from cart', async () => {
    mockUseProducts.useProducts.mockReturnValue({
      data: mockProducts,
      isFetching: false,
      error: null,
    } as UseQueryResult<Product[], Error>);

    const user = userEvent.setup();
    render(<Component />);

    const addButtons = screen.getAllByText('Add');
    await user.click(addButtons[0]);

    expect(screen.getAllByText('Test Product 1')).toHaveLength(2);

    const removeButton = screen.getByText('X');
    await user.click(removeButton);

    expect(screen.queryByText('price: 1 x $19.99 = $19.99')).not.toBeInTheDocument();
    expect(screen.getByText('$0')).toBeInTheDocument();
  });

  it('handles adding multiple quantities of the same product', async () => {
    mockUseProducts.useProducts.mockReturnValue({
      data: mockProducts,
      isFetching: false,
      error: null,
    } as UseQueryResult<Product[], Error>);

    const user = userEvent.setup();
    render(<Component />);

    const addButtons = screen.getAllByText('Add');

    await user.click(addButtons[0]);
    await user.click(addButtons[0]);
    await user.click(addButtons[0]);

    expect(screen.getByText('price: 3 x $19.99 = $59.97')).toBeInTheDocument();
    expect(screen.getByText('for 3 items')).toBeInTheDocument();
    expect(screen.getByText('$59.97')).toBeInTheDocument();
  });

  it('handles adding different products to cart', async () => {
    mockUseProducts.useProducts.mockReturnValue({
      data: mockProducts,
      isFetching: false,
      error: null,
    } as UseQueryResult<Product[], Error>);

    const user = userEvent.setup();
    render(<Component />);

    const addButtons = screen.getAllByText('Add');

    await user.click(addButtons[0]);
    await user.click(addButtons[1]);

    expect(screen.getAllByText('Test Product 1')).toHaveLength(2);
    expect(screen.getAllByText('Test Product 2')).toHaveLength(2);
  });

  it('renders with correct semantic structure', () => {
    mockUseProducts.useProducts.mockReturnValue({
      data: mockProducts,
      isFetching: false,
      error: null,
    } as UseQueryResult<Product[], Error>);

    render(<Component />);

    const productsSection = screen.getAllByRole('article');
    expect(productsSection).toHaveLength(mockProducts.length);

    const summarySection = screen.getByRole('complementary');
    expect(summarySection).toBeInTheDocument();
  });

  it('maintains cart state across component operations', async () => {
    mockUseProducts.useProducts.mockReturnValue({
      data: mockProducts,
      isFetching: false,
      error: null,
    } as UseQueryResult<Product[], Error>);

    const user = userEvent.setup();
    render(<Component />);

    const addButtons = screen.getAllByText('Add');

    await user.click(addButtons[0]);
    await user.click(addButtons[1]);

    expect(screen.getAllByText('X')).toHaveLength(2);

    const removeButtons = screen.getAllByText('X');
    await user.click(removeButtons[0]);

    expect(screen.getAllByText('X')).toHaveLength(1);

    const summarySection = screen.getByRole('complementary');
    expect(summarySection).toContainElement(screen.getAllByText('Test Product 2')[1]);
    expect(summarySection).not.toContainElement(screen.getAllByText('Test Product 1')[0]);
  });
});
