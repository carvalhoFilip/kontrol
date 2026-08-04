'use client';

import { DROP_GRID_PRODUCTS, isProductSoldOut } from '@/data/products';

type Props = {
  mockupSrc: string;
};

export function Hero({ mockupSrc }: Props) {
  const soldOut = DROP_GRID_PRODUCTS.every(isProductSoldOut);

  function scrollToProduct() {
    const el = document.getElementById('drop');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section className="k-hero">
      <div className="k-hero-inner">
        <div className="k-hero-copy">
          <p className="k-label">TC-11 · DROP 01</p>
          <h1 className="k-hero-title">BUILT FOR DISCIPLINE. NO NOISE.</h1>
          <p className="k-hero-sub">Drop limitado. Quando acabar, não volta.</p>
          <button
            type="button"
            className="btn k-hero-cta"
            onClick={scrollToProduct}
            disabled={soldOut}
          >
            {soldOut ? 'ESGOTADO' : 'COMPRAR TC-11'}
          </button>
        </div>
        <div className="k-hero-mockup k-hero-mockup--logo">
          <img
            src={mockupSrc}
            alt="KONTROL"
            onError={(e) => {
              e.currentTarget.src = '/images/logo.svg';
            }}
          />
        </div>
      </div>
    </section>
  );
}
