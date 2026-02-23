import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import HomeIcon from "../assets/icons/home.svg?react";
import CartIcon from "../assets/icons/cart.svg?react";
import { useToast } from "../contexts";

export function Header() {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const { showToast } = useToast();

  return (
    <header className="header">
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>
      <div className="header-content">
        <Link to="/" className="logo">
          SneakShop
        </Link>
        <nav>
          <Link to="/" className="nav-link">
            <HomeIcon width={20} height={20} />
            <span>Products</span>
          </Link>
          <Link
            onClick={(event) => {
              if (totalItems) {
                navigate("/cart");
              } else {
                event.preventDefault();
                showToast("The cart is empty!");
              }
            }}
            to="/cart"
            className="nav-link cart-link"
          >
            <CartIcon width={20} height={20} />
            <span>Cart</span>
            {totalItems > 0 && (
              <span
                className="cart-badge"
                aria-label={`${totalItems} item${totalItems > 1 ? "s" : ""} in cart`}
              >
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
