import { http, HttpResponse, delay } from 'msw';
import { products } from './data';

export const handlers = [
  // Get all products
  http.get('/api/products', async () => {
    await delay(300);
    return HttpResponse.json(products);
  }),

  // Get single product
  http.get('/api/products/:id', async ({ params }) => {
    await delay(200);
    const product = products.find(p => p.id === Number(params.id));
    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(product);
  }),

  // Checkout (mock order submission)
  http.post('/api/checkout', async ({ request }) => {
    await delay(500);
    const body = await request.json() as Record<string, unknown>;
    return HttpResponse.json({
      orderId: Math.random().toString(36).substring(7).toUpperCase(),
      ...body
    });
  }),
];
