import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import HomeIcon from "../assets/icons/home.svg?react";
import CartIcon from "../assets/icons/cart.svg?react";
import { useToast } from "../contexts";

export function Header() {
  const { itemsInCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

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
          <div
            onClick={() => {
              if (!itemsInCart) {
                showToast("The cart is empty!");
              } else {
                navigate("/cart");
              }
            }}
            className="nav-link cart-link"
          >
            <CartIcon width={20} height={20} />
            <span>Cart</span>
            {itemsInCart > 0 && (
              <span className="cart-badge">{itemsInCart}</span>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
