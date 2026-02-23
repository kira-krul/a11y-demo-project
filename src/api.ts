import type { Product } from './types';

export async function getProducts(): Promise<Product[]> {
  const response = await fetch('/api/products');
  return response.json();
}

export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`/api/products/${id}`);
  return response.json();
}
