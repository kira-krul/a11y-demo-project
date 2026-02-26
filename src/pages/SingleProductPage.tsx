import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { useToast } from "../contexts/useToast";
import { useProduct } from "../hooks/useProduct";
import { SizeColorModal } from "../components/SizeColorModal";

export function SingleProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { product, loading, error } = useProduct(id);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    if (product && selectedSize && selectedColor) {
      addToCart(product, selectedSize, selectedColor);
      setShowModal(false);
      showToast(
        `Added ${selectedColor} sneakers (Size ${selectedSize}) to cart!`,
      );
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error loading product: {error.message}</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-page">
      <button onClick={() => navigate("/")} className="back-button">
        <span aria-hidden>←</span> Back to Products
      </button>

      <div className="product-detail">
        <img src={product.image} alt={product.name} className="product-image" />

        <div className="product-content">
          <p className="brand">{product.brand}</p>
          <h1>{product.name}</h1>
          <p className="price">
            ${product.price}
          </p>
          <h2>Description</h2>
          <p className="description">{product.description}</p>

          {selectedSize && (
            <div className="selected-options">
              <p>Size: {selectedSize} US</p>
              <p>Color: {selectedColor}</p>
            </div>
          )}

          <button
            className="add-to-cart-button"
            onClick={() => setShowModal(true)}
          >
            {selectedSize ? "Change Size/Color" : "Select Size & Color"}
          </button>
        </div>
      </div>

      <SizeColorModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        sizes={product.sizes}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        onSizeSelect={setSelectedSize}
        onColorSelect={setSelectedColor}
        onConfirm={handleAddToCart}
      />
    </div>
  );
}
