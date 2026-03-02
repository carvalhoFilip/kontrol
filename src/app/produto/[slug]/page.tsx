'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, formatPrice, SIZES, Size } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function ProductPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const [size, setSize] = useState<Size>('M');
  const [added, setAdded] = useState(false);
  const isIcarus = product?.slug === 'icarus-training-tank';
  const images =
    product && product.gallery && product.gallery.length > 0
      ? product.gallery
      : product
      ? [product.image]
      : [];
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="main-content" style={{ textAlign: 'center', paddingTop: '3rem' }}>
        <p>Produto não encontrado.</p>
        <Link href="/" className="btn" style={{ marginTop: '1rem', display: 'inline-block' }}>
          voltar
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    if (isIcarus) return;
    addItem(product, size, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const descriptionLines = product.description.split('\n');

  return (
    <div className="main-content product-page">
      <div className="product-page-grid">
        <div>
          <div className="product-page-image-wrap">
            <img
              src={images[activeImage]}
              alt={product.name}
              className={`product-page-image${isIcarus ? ' product-page-image--soon' : ''}`}
            />
            {isIcarus && (
              <div className="product-page-soon-badge">
                <span>em breve</span>
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="product-page-gallery">
              {images.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  className={`product-page-thumb${
                    index === activeImage ? ' product-page-thumb--active' : ''
                  }`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`Ver imagem ${index + 1} do produto`}
                >
                  <img src={src} alt={`${product.name} imagem ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="product-page-info">
          <h1 className="product-page-name">{product.name}</h1>
          <p className="product-page-code">{product.code}</p>
          <p className="product-page-price">{formatPrice(product.price)}</p>

          {!isIcarus && (
            <>
              <div className="product-page-size">
                <label htmlFor="size">Tamanho</label>
                <select
                  id="size"
                  value={size}
                  onChange={(e) => setSize(e.target.value as Size)}
                  className="size-select"
                >
                  {SIZES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="btn product-page-add"
                onClick={handleAdd}
                disabled={added}
              >
                {added ? 'no cart' : 'add to cart'}
              </button>
            </>
          )}

          <p className="product-page-desc">
            {descriptionLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < descriptionLines.length - 1 && <br />}
              </span>
            ))}
          </p>

          <ul className="product-page-tech">
            <li>Fit: {product.fit}</li>
            <li>Drop limitado</li>
            <li>Produção independente</li>
          </ul>

          <Link href="/" className="product-page-back">
            ← voltar ao drop
          </Link>
        </div>
      </div>
    </div>
  );
}
