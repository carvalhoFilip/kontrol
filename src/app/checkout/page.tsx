'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/products';

export default function CheckoutPage() {
  const { items, removeItem, total, count, clearCart } = useCart();

  if (count === 0) {
    return (
      <div className="main-content checkout-empty">
        <p className="checkout-empty-text">Seu carrinho está vazio.</p>
        <Link href="/" className="btn">
          ver drop
        </Link>
      </div>
    );
  }

  return (
    <div className="main-content checkout">
      <h1 className="checkout-title">checkout</h1>

      <ul className="checkout-list">
        {items.map((item, index) => (
          <li key={`${item.product.slug}-${item.size}-${index}`} className="checkout-item">
            <div className="checkout-item-image">
              <img
                src={item.product.image}
                alt={item.product.name}
              />
            </div>
            <div className="checkout-item-info">
              <p className="checkout-item-name">{item.product.name}</p>
              <p className="checkout-item-meta">
                {item.size} · {item.quantity}x {formatPrice(item.product.price)}
              </p>
              <button
                type="button"
                className="checkout-item-remove"
                onClick={() => removeItem(index)}
                aria-label="Remover"
              >
                remover
              </button>
            </div>
            <p className="checkout-item-total">
              {formatPrice(item.product.price * item.quantity)}
            </p>
          </li>
        ))}
      </ul>

      <div className="checkout-footer">
        <p className="checkout-total">
          Total <span>{formatPrice(total)}</span>
        </p>
        <p className="checkout-note">
          Pagamento e envio serão configurados em breve. Este é o layout do checkout.
        </p>
        <div className="checkout-actions">
          <button type="button" className="checkout-clear" onClick={clearCart}>
            limpar carrinho
          </button>
          <Link href="/" className="btn">
            continuar comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
