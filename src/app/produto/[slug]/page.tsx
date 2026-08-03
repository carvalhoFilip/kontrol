'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import {
  getProductBySlug,
  formatPrice,
  SIZES,
  isProductSoldOut,
  type Size,
} from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Accordion } from '@/components/Accordion';
import { SubscribeForm } from '@/components/SubscribeForm';
import { PAYMENT, getInstallmentCents } from '@/lib/payment';

export default function ProductPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const images = useMemo(() => {
    if (!product) return [];
    const list =
      product.gallery && product.gallery.length > 0
        ? product.gallery
        : [product.image];
    // remove duplicatas de path
    return Array.from(new Set(list));
  }, [product]);

  const [size, setSize] = useState<Size | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setActiveImage(0);
    setSize(null);
  }, [slug]);

  if (!product) {
    return (
      <div className="main-content" style={{ textAlign: 'center', paddingTop: '3rem' }}>
        <p>Produto não encontrado.</p>
        <Link href="/" className="btn" style={{ marginTop: '1rem', display: 'inline-block' }}>
          Voltar
        </Link>
      </div>
    );
  }

  const soldOut = isProductSoldOut(product);
  const installment = getInstallmentCents(product.price);
  const safeIndex = Math.min(activeImage, Math.max(images.length - 1, 0));

  function handleAdd() {
    if (!size || soldOut) return;
    const stock = product!.stockBySize?.[size] ?? 0;
    if (stock <= 0) return;
    addItem(product!, size, 1);
    setFeedback('Adicionado ao carrinho.');
    setTimeout(() => setFeedback(''), 2200);
  }

  function scrollToMeasures() {
    document.getElementById('medidas')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="pdp">
      <div className="pdp-top">
        <div className="pdp-gallery">
          {images.length > 1 && (
            <div className="pdp-thumbs" role="tablist" aria-label="Imagens do produto">
              {images.map((src, i) => (
                <button
                  key={`${product.slug}-${i}-${src}`}
                  type="button"
                  role="tab"
                  aria-selected={i === safeIndex}
                  className={`pdp-thumb${i === safeIndex ? ' pdp-thumb--active' : ''}`}
                  onClick={() => setActiveImage(i)}
                  aria-label={`Ver imagem ${i + 1}`}
                >
                  <img src={src} alt="" draggable={false} />
                </button>
              ))}
            </div>
          )}
          <div className="pdp-main-image">
            <img
              key={`main-${product.slug}-${safeIndex}`}
              src={images[safeIndex]}
              alt={product.name}
            />
          </div>
        </div>

        <div className="pdp-buy">
          <p className="k-label pdp-eyebrow">DROP TC-11</p>
          <h1 className="pdp-title">{product.name}</h1>
          <p className="pdp-price">{formatPrice(product.price)}</p>
          <p className="pdp-installments">
            ou {PAYMENT.maxInstallments}x de {formatPrice(installment)}
            {PAYMENT.interestFree ? ' sem juros' : ''} · Pix à vista
          </p>

          <div className="pdp-scarcity">
            {soldOut ? 'ESGOTADO' : 'DROP LIMITADO · SEM REPOSIÇÃO'}
          </div>

          {soldOut ? (
            <div className="pdp-soldout-form">
              <p className="k-label" style={{ marginBottom: '0.75rem' }}>
                ESGOTADO
              </p>
              <p className="newsletter-tc12-copy" style={{ marginBottom: '1rem' }}>
                Seja dos primeiros a saber dos novos drops.
              </p>
              <SubscribeForm source="tc12" buttonLabel="AVISAR-ME" />
            </div>
          ) : (
            <>
              <div className="pdp-size-row">
                <span className="k-label">TAMANHO</span>
                <button type="button" className="pdp-measures-link" onClick={scrollToMeasures}>
                  ver medidas
                </button>
              </div>
              <div className="size-grid" role="group" aria-label="Tamanho">
                {SIZES.map((s) => {
                  const stock = product.stockBySize?.[s] ?? 0;
                  const unavailable = stock <= 0;
                  return (
                    <button
                      key={s}
                      type="button"
                      className={`size-btn${size === s ? ' size-btn--selected' : ''}${
                        unavailable ? ' size-btn--soldout' : ''
                      }`}
                      disabled={unavailable}
                      title={unavailable ? 'esgotado' : undefined}
                      onClick={() => setSize(s)}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                className="btn pdp-add"
                onClick={handleAdd}
                disabled={!size}
              >
                {size ? 'ADICIONAR AO CARRINHO' : 'SELECIONE UM TAMANHO'}
              </button>
              {feedback && <p className="pdp-feedback">{feedback}</p>}
            </>
          )}

          <ul className="pdp-trust">
            <li>
              <span className="pdp-trust-icon" aria-hidden="true" />
              Envio em até 2 dias úteis · frete calculado no checkout
            </li>
            <li>
              <span className="pdp-trust-icon" aria-hidden="true" />
              Troca grátis em 7 dias
            </li>
            <li>
              <span className="pdp-trust-icon" aria-hidden="true" />
              {PAYMENT.methodsLabel}
            </li>
          </ul>

          <p className="pdp-desc">{product.description}</p>
        </div>
      </div>

      <section className="pdp-specs">
        <div className="pdp-specs-inner">
          <div>
            <p className="pdp-spec-label">TECIDO</p>
            <p className="pdp-spec-value">
              {product.fabric?.composition ?? '—'}
            </p>
            {product.fabric?.tech && (
              <p className="pdp-spec-tech">{product.fabric.tech}</p>
            )}
          </div>
          <div>
            <p className="pdp-spec-label">FIT</p>
            <p className="pdp-spec-value">{product.fit}</p>
          </div>
          <div>
            <p className="pdp-spec-label">MODELAGEM</p>
            <p className="pdp-spec-value">{product.modeling ?? '—'}</p>
          </div>
        </div>
      </section>

      <section id="medidas" className="pdp-measures">
        <div className="pdp-measures-inner">
          <p className="k-label">MEDIDAS</p>
          <div className="pdp-measures-scroll">
            <table className="measures-table">
              <thead>
                <tr>
                  <th>TAMANHO</th>
                  <th>LARGURA (CM)</th>
                  <th>COMPRIMENTO (CM)</th>
                </tr>
              </thead>
              <tbody>
                {(product.measurements ?? []).map((m) => (
                  <tr key={m.size}>
                    <td>{m.size}</td>
                    <td>{m.widthCm}</td>
                    <td>{m.lengthCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="pdp-measures-note">
            Medidas da peça, não do corpo. Veste regular — se você treina com folga, suba um
            tamanho.
          </p>
        </div>
      </section>

      <section className="pdp-faq">
        <div className="pdp-faq-inner">
          <p className="k-label">FAQ</p>
          <Accordion
            items={[
              {
                id: 'prazo',
                title: 'PRAZO DE ENTREGA',
                content:
                  'Despacho em até 2 dias úteis. O prazo de transporte depende da região e é calculado no checkout.',
              },
              {
                id: 'troca',
                title: 'COMO FUNCIONA A TROCA',
                content:
                  'Você tem 7 dias corridos após o recebimento para solicitar troca ou devolução (CDC). Peça sem uso e com etiqueta.',
              },
              {
                id: 'lavar',
                title: 'COMO LAVAR',
                content:
                  'Lave ao avesso em água fria. Evite amaciante e secadora em temperatura alta.',
              },
            ]}
          />
        </div>
      </section>

      <div className="pdp-bottom">
        <div className="pdp-bottom-inner">
          <Link href="/#drop" className="pdp-back">
            ← VOLTAR AO DROP TC-11
          </Link>
        </div>
      </div>
    </div>
  );
}
