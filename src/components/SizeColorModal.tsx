import { useDialog } from "../hooks/useDialog";
import { useProductForm } from "../hooks/useProductForm";

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
  const ref = useDialog(isOpen);
  const { formProps, errors } = useProductForm(onConfirm);

  if (!isOpen) return null;

  return (
    <dialog ref={ref} onCancel={onClose}>
      <form {...formProps}>
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
            <fieldset className="sizes">
              <legend>Size (US):</legend>
              {sizes.map((size) => (
                <label
                  key={size}
                  className={`size-button ${selectedSize === size ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    value={size}
                    name="sizes"
                    onChange={() => onSizeSelect(size)}
                    checked={selectedSize === size}
                    required
                    className="visually-hidden-input"
                  />
                  {size}
                </label>
              ))}
              <span
                className="error-message"
                role="alert"
                aria-live="assertive"
              >
                {errors.size}
              </span>
            </fieldset>
          </div>

          <div className="modal-section">
            <fieldset className="colors">
              <legend>Color:</legend>
              {AVAILABLE_COLORS.map((color) => (
                <label
                  key={color.name}
                  className={`color-button ${selectedColor === color.name ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    value={color.name}
                    required
                    name="colors"
                    onChange={() => onColorSelect(color.name)}
                    checked={selectedColor === color.name}
                    className="visually-hidden-input"
                    aria-label={color.name}
                  />
                  <span
                    className="color-swatch"
                    style={{ backgroundColor: color.hex }}
                    role="presentation"
                  />
                  <span className="color-name" aria-hidden>
                    {color.name}
                  </span>
                </label>
              ))}
              <span
                className="error-message"
                role="alert"
                aria-live="assertive"
              >
                {errors.color}
              </span>
            </fieldset>
          </div>
        </div>

        <div className="modal-footer">
          <button className="add-to-cart-button">Add to Cart</button>
        </div>
      </form>
    </dialog>
  );
}
