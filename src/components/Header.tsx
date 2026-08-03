'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export function Header() {
  const { count } = useCart();

  return (
    <header className="header">
      <div className="header-left">
        <Link href="/" className="logo">
          KONTROL.
        </Link>
        <p className="tagline">training club — built for discipline</p>
      </div>
      <div className="header-right">
        <span className="header-menu-item">TC-11</span>
        <span className="header-menu-item header-menu-item--muted">Independent Brand</span>
        <Link href="/checkout" className="cart" aria-label="Carrinho">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {count > 0 && <span className="cart-count">{count}</span>}
        </Link>
      </div>
    </header>
  );
}
