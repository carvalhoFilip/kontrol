'use client';

import { useDropStatus } from '@/hooks/useDropStatus';
import type { DropStatus } from '@/lib/drop';

type Props = {
  initialStatus: DropStatus;
  mockupSrc: string;
};

export function Hero({ initialStatus, mockupSrc }: Props) {
  const { status } = useDropStatus(initialStatus);
  const remaining = status?.remaining ?? initialStatus.remaining;
  const soldOut = remaining === 0;

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
