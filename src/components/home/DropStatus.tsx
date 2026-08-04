import {
  DROP_GRID_PRODUCTS,
  SIZES,
  isProductSoldOut,
  type Product,
  type Size,
} from '@/data/products';

function modelLabel(product: Product): string {
  if (product.slug.includes('dryfit')) return 'DRYFIT';
  if (product.slug.includes('icarus')) return 'ICARUS';
  return product.code;
}

function sortedDropProducts(): Product[] {
  return [...DROP_GRID_PRODUCTS].sort((a, b) => {
    const rank = (slug: string) =>
      slug.includes('dryfit') ? 0 : slug.includes('icarus') ? 1 : 2;
    return rank(a.slug) - rank(b.slug);
  });
}

export function DropStatus() {
  const products = sortedDropProducts();
  const closed = products.every(isProductSoldOut);

  return (
    <section className="drop-status">
      <div className="drop-status-inner">
        <div className="drop-status-col">
          <p className="k-label">STATUS DO DROP</p>
          <p className="drop-status-headline">
            {closed ? 'ENCERRADO' : 'ABERTO'}
          </p>
          <p className="drop-status-copy">
            {closed
              ? 'Este drop não retorna.'
              : 'Produção limitada. Sem reposição.'}
          </p>
        </div>

        <div className="drop-status-col">
          <p className="k-label">DISPONIBILIDADE</p>
          <div className="drop-status-availability" role="list">
            {products.map((product) => {
              const label = modelLabel(product);
              if (isProductSoldOut(product)) {
                return (
                  <div
                    key={product.slug}
                    className="drop-status-model drop-status-model--soldout"
                    role="listitem"
                  >
                    <span className="drop-status-model-name">{label}</span>
                    <span className="drop-status-soldout">SOLD OUT</span>
                  </div>
                );
              }

              return (
                <div
                  key={product.slug}
                  className="drop-status-model"
                  role="listitem"
                >
                  <span className="drop-status-model-name">{label}</span>
                  {SIZES.map((size: Size) => {
                    const available = (product.stockBySize?.[size] ?? 0) > 0;
                    return (
                      <span
                        key={size}
                        className={`drop-status-size${available ? '' : ' drop-status-size--gone'}`}
                      >
                        {size}
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
