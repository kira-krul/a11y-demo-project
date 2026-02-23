import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { useToast } from '../contexts/useToast';
import type { Order } from '../types';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<Order>({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
  });

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, items, total: totalPrice }),
    });

    const data = await response.json();

    showToast(`Order confirmed! Order ID: ${data.orderId}`);
    clearCart();
    navigate('/');
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-content">
        <div className="checkout-form">
          <h2>Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Address"
              required
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
            />
            <input
              type="text"
              placeholder="City"
              required
              value={formData.city}
              onChange={e => setFormData({ ...formData, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="ZIP Code"
              required
              value={formData.zip}
              onChange={e => setFormData({ ...formData, zip: e.target.value })}
            />

            <h2>Payment Information</h2>
            <input
              type="text"
              placeholder="Card Number"
              required
              value={formData.cardNumber}
              onChange={e => setFormData({ ...formData, cardNumber: e.target.value })}
            />

            <button type="submit" disabled={submitting} className="submit-button">
              {submitting ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          {items.map((item, index) => (
            <div key={index} className="summary-item">
              <span>
                {item.product.name} (Size {item.size}) x{item.quantity}
              </span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-total">
            <strong>Total:</strong>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
