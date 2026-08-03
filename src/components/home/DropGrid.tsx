import { DROP_GRID_PRODUCTS } from '@/data/products';
import { DropProductCard } from '@/components/home/DropProductCard';

export function DropGrid() {
  return (
    <section id="drop" className="drop-grid-section">
      <div className="drop-grid-header">
        <p className="k-label">DROP TC-11</p>
        <p className="drop-grid-sub">Duas peças. Produção limitada.</p>
      </div>
      <div className="drop-grid">
        {DROP_GRID_PRODUCTS.map((product, index) => (
          <DropProductCard
            key={product.slug}
            product={product}
            priority={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
