import { NextResponse } from 'next/server';
import { DROP } from '@/lib/drop';
import {
  DROP_GRID_PRODUCTS,
  SIZES,
  isProductSoldOut,
} from '@/data/products';

export async function GET() {
  const models = DROP_GRID_PRODUCTS.map((product) => ({
    slug: product.slug,
    label: product.slug.includes('dryfit')
      ? 'DRYFIT'
      : product.slug.includes('icarus')
        ? 'ICARUS'
        : product.code,
    soldOut: isProductSoldOut(product),
    sizes: Object.fromEntries(
      SIZES.map((size) => [size, (product.stockBySize?.[size] ?? 0) > 0])
    ),
  }));

  const closed = DROP_GRID_PRODUCTS.every(isProductSoldOut);

  return NextResponse.json({
    code: DROP.code,
    closed,
    models,
  });
}
