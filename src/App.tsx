import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import { ToastProvider } from './contexts/ToastProvider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductsPage } from './pages/ProductsPage';
import { SingleProductPage } from './pages/SingleProductPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ContactUsPage } from './pages/ContactUsPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <CartProvider>
          <div className="app">
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <Header />
            <main id="main-content" className="main-content" tabIndex={-1}>
              <Routes>
                <Route path="/" element={<ProductsPage />} />
                <Route path="/product/:id" element={<SingleProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/contact-us" element={<ContactUsPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
