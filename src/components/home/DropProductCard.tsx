'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  formatPrice,
  isProductSoldOut,
  type Product,
} from '@/data/products';

type Props = {
  product: Product;
  priority?: boolean;
};

export function DropProductCard({ product, priority = false }: Props) {
  const images =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image];

  const isIcarus = product.slug === 'icarus-training-tank';
  // Icarus: normal = machao-icarus · hover = icarus-back
  const primary = isIcarus
    ? images.find((src) => src.includes('machao-icarus')) ?? images[0]
    : images[0];
  const secondary = isIcarus
    ? images.find((src) => src.includes('icarus-back')) ?? null
    : images[1] ?? null;
  const soldOut = isProductSoldOut(product);

  return (
    <Link
      href={`/produto/${product.slug}`}
      className={`drop-card${soldOut ? ' drop-card--soldout' : ''}`}
    >
      <div className="drop-card-media">
        <div className="drop-card-img-wrap drop-card-img-wrap--primary">
          <Image
            src={primary}
            alt={product.name}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            priority={priority}
            className="drop-card-img"
          />
        </div>
        {secondary && (
          <div className="drop-card-img-wrap drop-card-img-wrap--secondary">
            <Image
              src={secondary}
              alt=""
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className="drop-card-img"
              aria-hidden
            />
          </div>
        )}
        {soldOut && (
          <span className="drop-card-soldout-badge">SOLD OUT</span>
        )}
      </div>
      <div className="drop-card-meta">
        <h3 className="drop-card-name">{product.name}</h3>
        <p className="drop-card-code">{product.code}</p>
        <p className="drop-card-price">{formatPrice(product.price)}</p>
        <span className="drop-card-cta">VER PEÇA →</span>
      </div>
    </Link>
  );
}
