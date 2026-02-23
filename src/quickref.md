* Add automated plugins
```sh
pnpm install eslint-plugin-jsx-a11y --save-dev
```
```javascript
// eslint.config.js
import jsxA11y from "eslint-plugin-jsx-a11y";

export default defineConfig([
  globalIgnores(["dist"]),
  jsxA11y.flatConfigs.recommended,
```

* Fix eslint errors
```tsx
// Header.tsx

<div> --> <button>

// SizeColorModal.tsx
role="presentation"
```
```css
// App.css
.brand {
  color: #8c8c8c;
```
* Fix header for users who use tab to navigate
```jsx
// App.tsx
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>

            <main id="main-content" className="main-content">
```
```css
// App.css
.skip-nav {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.skip-nav:focus {
  left: 0;
  width: max-content;
  height: auto;
  text-align: center;
  padding: .5rem;
  background: #222;
}
```
* Fix everything immediately obvious with voiceover
```jsx
// Header.tsx
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

// SingleProductPage.tsx
        <span aria-hidden>←</span> Back to Products

          <p className="price" aria-label={`Product price: $${product.price}`}>

// Toast.tsx
      <span role="alert">{message}</span>

// CartPage.tsx

                  aria-label={`Decrease quantity of ${item.product.name} in cart`}

                  aria-label={`Increase quantity of ${item.product.name} in cart`}

                aria-label={`Remove ${item.product.name} from cart`}
```
* Fix the modal
```jsx
// SizeColorModal.tsx
{
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
            <fieldset className="sizes" aria-required>
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
            <fieldset className="colors" radioGroup="colors">
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
```
