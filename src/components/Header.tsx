import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import HomeIcon from "../assets/icons/home.svg?react";
import CartIcon from "../assets/icons/cart.svg?react";
import { useToast } from "../contexts";

export function Header() {
  const { itemsInCart } = useCart();
  const { showToast } = useToast();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          SneakShop
        </Link>
        <nav>
          <Link to="/" className="nav-link">
            <HomeIcon width={20} height={20} />
            <span>Products</span>
          </Link>
          {itemsInCart ? (
            <Link to="/cart" className="nav-link cart-link">
              <CartIcon width={20} height={20} />
              <span>Cart</span>
              <span className="cart-badge">{itemsInCart}</span>
              <span className="visually-hidden">
                item{itemsInCart > 1 ? "s" : ""}
              </span>
            </Link>
          ) : (
            <button
              onClick={() => showToast("The cart is empty!")}
              className="nav-link cart-link"
            >
              <CartIcon width={20} height={20} />
              <span>Cart</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
