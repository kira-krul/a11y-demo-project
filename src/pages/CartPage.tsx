import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

export function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <h1>Your Cart</h1>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="button">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-items">
        {items.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.product.image} alt={item.product.name} />
            <div className="item-details">
              <h3>{item.product.name}</h3>
              <p className="brand">{item.product.brand}</p>
              <p>Size: {item.size} US</p>
              <p>Color: {item.color}</p>
              <p className="price">${item.product.price}</p>
            </div>
            <div className="item-controls">
              <div className="quantity-controls">
                <button
                  onClick={() =>
                    updateQuantity(
                      item.product.id,
                      item.size,
                      item.color,
                      item.quantity - 1,
                    )
                  }
                  aria-label={`Decrease quantity of ${item.product.name} in cart`}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(
                      item.product.id,
                      item.size,
                      item.color,
                      item.quantity + 1,
                    )
                  }
                  aria-label={`Increase quantity of ${item.product.name} in cart`}
                >
                  +
                </button>
              </div>
              <button
                className="remove-button"
                onClick={() =>
                  removeFromCart(item.product.id, item.size, item.color)
                }
                aria-label={`Remove ${item.product.name} from cart`}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>{`Total: $${totalPrice.toFixed(2)}`}</h2>
        <Link to="/checkout" className="checkout-button">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
