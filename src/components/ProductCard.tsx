'use client';

import Link from 'next/link';
import { Product } from '@/data/products';
import { formatPrice } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { SIZES, Size } from '@/data/products';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  /** Se true, mostra seleção de tamanho e add to cart inline (página inicial) */
  inlineAdd?: boolean;
}

export function ProductCard({ product, inlineAdd = false }: ProductCardProps) {
  const { addItem } = useCart();
  const [size, setSize] = useState<Size>('M');
  const [added, setAdded] = useState(false);
  const isIcarus = product.slug === 'icarus-training-tank';

  const handleAdd = () => {
    addItem(product, size, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const cardContent = (
    <>
      <div className="product-card-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className={`product-card-image${isIcarus ? ' product-card-image--soon' : ''}`}
        />
        {isIcarus && (
          <div className="product-card-soon-badge">
            <span>em breve</span>
          </div>
        )}
      </div>
      <h2 className="product-card-name">{product.name}</h2>
      <p className="product-card-code">{product.code}</p>
      <p className="product-card-price">{formatPrice(product.price)}</p>
    </>
  );

  return (
    <article className="product-card">
      {isIcarus ? (
        <div className="product-card-link product-card-link--disabled" aria-disabled="true">
          {cardContent}
        </div>
      ) : (
        <Link href={`/produto/${product.slug}`} className="product-card-link">
          {cardContent}
        </Link>
      )}
      {inlineAdd && !isIcarus && (
        <div className="product-card-actions">
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as Size)}
            className="size-select"
            aria-label="Tamanho"
          >
            {SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="btn"
            onClick={handleAdd}
            disabled={added}
          >
            {added ? 'no cart' : 'add to cart'}
          </button>
        </div>
      )}
    </article>
  );
}
