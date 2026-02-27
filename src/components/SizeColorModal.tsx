import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

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
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element when modal opens
    closeButtonRef.current?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen, selectedSize, selectedColor]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-wrap">
        <div
          className="modal-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          ref={modalRef}
        >
          <div className="modal-header">
            <h2 id="modal-title">Select Size & Color</h2>
            <button
              ref={closeButtonRef}
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
                <div className="modal-control-label" id="size-label">Size (US):</div>
                <div role="group" aria-labelledby="size-label">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-button ${selectedSize === size ? "selected" : ""}`}
                      onClick={() => onSizeSelect(size)}
                      aria-pressed={selectedSize === size}
                      aria-label={`Size ${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-section">
              <div className="colors">
                <div className="modal-control-label" id="color-label">Color:</div>
                <div role="group" aria-labelledby="color-label">
                  {AVAILABLE_COLORS.map((color) => (
                    <button
                      key={color.name}
                      className={`color-button ${selectedColor === color.name ? "selected" : ""}`}
                      onClick={() => onColorSelect(color.name)}
                      aria-pressed={selectedColor === color.name}
                      aria-label={`${color.name}${selectedColor === color.name ? ', selected' : ''}`}
                    >
                      <span
                        className="color-swatch"
                        style={{ backgroundColor: color.hex }}
                        aria-hidden="true"
                      />
                      <span className="color-name">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              className="add-to-cart-button"
              onClick={onConfirm}
              disabled={!selectedColor || !selectedSize}
              aria-disabled={!selectedColor || !selectedSize}
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
