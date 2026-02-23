export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  sizes: number[];
}

export interface CartItem {
  product: Product;
  size: number;
  color: string;
  quantity: number;
}

export interface Order {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
}
