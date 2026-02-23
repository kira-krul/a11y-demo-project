* Add automated plugins
```bash
pnpm install eslint-plugin-jsx-a11y --save-dev
pnpm install @axe-core/react --save-dev
```
```jsx

// main.tsx
if (import.meta.env.DEV) {
  setTimeout(() => axe(React, ReactDOM, 1000), 1000);
}


```
```javascript
// .eslint.config.js
{
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: {
      'jsx-a11y/alt-text': 'error',
    },
}
```

* Fix eslint errors
```tsx
// Header.tsx

// <div> -> <Link>
event.preventDefault();

to="cart"

// SizeColorModal.tsx
  const handleEsc = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

      onKeyUp={handleEsc}
      role="presentation"

              <label htmlFor="sizes-select">Size (US):</label>
              <div className="sizes" id="sizes-select">

              <label htmlFor="color-select">Color:</label>
              <div className="colors" id="color-select">

// ProductsPage.tsx
            <img src={product.image} alt={product.name} />
```
```css
// App.css
.brand {
  color: #8e8c8c;
```
* Add a link to skip navigation
```jsx
// Header.tsx
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>
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
              <span
                className="cart-badge"
                aria-label={`${totalItems} item${totalItems > 1 ? "s" : ""} in cart`}
              >
// SingleProductPage.tsx
        <span aria-hidden>←</span> Back to Products

          <p className="price" aria-description="Product price">
// CartPage.tsx

                  aria-label={`Decrease quantity of ${item.product.name} in cart`}

                  aria-label={`Increase quantity of ${item.product.name} in cart`}

                aria-label={`Remove ${item.product.name} from cart`}

        <h2>{`Total: $${totalPrice.toFixed(2)}`}</h2>
// Toast.tsx
      <span role="alert">{message}</span>
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
