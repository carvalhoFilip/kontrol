import { getProductBySlug, getStockRemaining, type Size } from '@/data/products';

export const DROP = {
  code: 'TC-11',
  unitsTotal: 100,
  closesAt: '2026-08-31T23:59:59-03:00',
  productSlug: 'tc-11-dryfit-tee',
  notifyEmail: 'gdxecompany@gmail.com',
} as const;

export type DropStatus = {
  total: number;
  sold: number;
  remaining: number;
};

/** Fonte de estoque real: stockBySize do produto TC-11. Nunca fabricar número. */
export function getDropStatus(): DropStatus {
  const product = getProductBySlug(DROP.productSlug);
  if (!product?.stockBySize) {
    return { total: DROP.unitsTotal, sold: 0, remaining: 0 };
  }

  const remaining = getStockRemaining(product);
  const sold = Math.max(0, DROP.unitsTotal - remaining);

  return {
    total: DROP.unitsTotal,
    sold,
    remaining: Math.min(remaining, DROP.unitsTotal),
  };
}

export function getSizeStock(size: Size): number {
  const product = getProductBySlug(DROP.productSlug);
  if (!product?.stockBySize) return 0;
  return product.stockBySize[size] ?? 0;
}
