import { createPortal } from "react-dom";

interface SizeColorModalProps {
  isOpen: boolean;
  onClose: () => void;
  sizes: number[];
  selectedSize: number | null;
  selectedColor: string | null;
  onSizeSelect: (size: number) => void;
  onColorSelect: (color: string) => void;
  onConfirm: () => void;
}

const AVAILABLE_COLORS = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Red", hex: "#DC3545" },
  { name: "Blue", hex: "#646CFF" },
  { name: "Gray", hex: "#888888" },
];

export function SizeColorModal({
  isOpen,
  onClose,
  sizes,
  selectedSize,
  selectedColor,
  onSizeSelect,
  onColorSelect,
  onConfirm,
}: SizeColorModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-wrap">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Select Size & Color</h2>
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          <div className="modal-body">
            <div className="modal-section">
              <div className="sizes">
                <div className="modal-control-label">Size (US):</div>
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-button ${selectedSize === size ? "selected" : ""}`}
                    onClick={() => onSizeSelect(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="modal-section">
              <div className="colors">
                <div className="modal-control-label">Color:</div>
                {AVAILABLE_COLORS.map((color) => (
                  <button
                    key={color.name}
                    className={`color-button ${selectedColor === color.name ? "selected" : ""}`}
                    onClick={() => onColorSelect(color.name)}
                  >
                    <span
                      className="color-swatch"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="color-name">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              className="add-to-cart-button"
              onClick={onConfirm}
              disabled={!selectedColor || !selectedSize}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
