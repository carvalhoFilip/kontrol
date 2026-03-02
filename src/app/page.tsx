import { TC11_DROP } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

export default function HomePage() {
  return (
    <div className="main-content">
      <section className="hero">
        <div className="hero-eyebrow">kontrol training club</div>
        <h1 className="hero-title">BUILT FOR DISCIPLINE. NO NOISE.</h1>
        <p className="hero-copy">
          Peças feitas para quem treina no silêncio. Sem hype. Sem distração. Apenas consistência.
        </p>
        <div className="hero-divider" />
      </section>

      <section className="about-brand">
        <div className="about-brand-tag">ABOUT KONTROL</div>
        <div className="about-brand-grid">
          <p className="about-brand-copy">
            A KONTROL nasce dentro do treino. Cada detalhe — modelagem, tecido, construção — é
            pensado para acompanhar carga, volume e suor sem perder a estética minimalista.
          </p>
          <p className="about-brand-copy about-brand-copy--muted">
            Não somos moda passageira. Somos disciplina em forma de roupa. Poucas peças. Propósito
            claro. Identidade construída na rotina.
          </p>
        </div>
      </section>

      <section className="drop-section">
        <h2 className="drop-title">TC-11 DROP</h2>
        <p className="drop-subtitle">Drop limitado. Produção reduzida.</p>
      </section>
      <div className="products-grid">
        {TC11_DROP.map((product) => (
          <ProductCard key={product.slug} product={product} inlineAdd />
        ))}
      </div>
    </div>
  );
}
