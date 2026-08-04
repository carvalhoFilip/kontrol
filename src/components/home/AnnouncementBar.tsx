import Link from 'next/link';
import { DROP_GRID_PRODUCTS, isProductSoldOut } from '@/data/products';

export function AnnouncementBar() {
  const soldOut = DROP_GRID_PRODUCTS.every(isProductSoldOut);

  return (
    <div className="announcement-bar" role="status">
      {soldOut ? (
        <Link href="/#lista-drops" className="announcement-bar-text">
          TC-11 · ESGOTADO · ENTRE NA LISTA DE DROPS
        </Link>
      ) : (
        <span className="announcement-bar-text">TC-11 · DROP LIMITADO</span>
      )}
    </div>
  );
}
