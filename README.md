# SneakShop - Demo Sneaker Store

A simple React + TypeScript e-commerce demo built with Vite, designed for live coding demonstrations.

## Getting Started

```bash
pnpm install
pnpm dev
```

Then open http://localhost:5173

## Features

- **Product Listing**: Browse all available sneakers
- **Product Details**: View individual product information and select sizes
- **Shopping Cart**: Add/remove items, adjust quantities
- **Checkout**: Complete order with form submission
- **Mock API**: MSW (Mock Service Worker) simulates backend API calls

## Project Structure

### Pages (Simple - for live editing)
- `src/pages/ProductsPage.tsx` - Product grid listing
- `src/pages/ProductPage.tsx` - Individual product details
- `src/pages/CartPage.tsx` - Shopping cart view
- `src/pages/CheckoutPage.tsx` - Checkout form

### Complex Logic (Hidden away)
- `src/CartContext.tsx` - Cart state management
- `src/mocks/` - MSW configuration and mock data
- `src/components/Header.tsx` - Navigation header

## Tech Stack

- **Vite** - Build tool
- **React 19** - UI framework
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **MSW** - API mocking
- **pnpm** - Package manager

## Notes

The code is intentionally kept simple for demonstration purposes. Complex functionality like state management and API mocking is separated into dedicated files.
