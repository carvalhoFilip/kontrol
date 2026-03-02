export const SIZES = ['P', 'M', 'G', 'GG'] as const;
export type Size = (typeof SIZES)[number];

export interface Product {
  slug: string;
  name: string;
  code: string;
  type: string;
  price: number; // em centavos
  image: string;
  /** Imagens adicionais para galeria na página de produto */
  gallery?: string[];
  description: string;
  fit: string;
}

export const TC11_DROP: Product[] = [
  {
    slug: 'icarus-training-tank',
    name: 'ICARUS Training Tank',
    code: 'TC-11 / ICARUS',
    type: 'Regata machão',
    price: 14000,
    image: '/images/machao-icarus.png',
    gallery: ['/images/machao-icarus.png'],
    description: 'Built for training.\nNo noise.\nJust discipline.',
    fit: 'training / machão / oversized',
  },
  {
    slug: 'tc-11-dryfit-tee',
    name: 'TC-11 Dryfit Tee',
    code: 'TC-11',
    type: 'Camiseta dryfit',
    price: 12500,
    image: '/images/dryfit.png',
    gallery: ['/images/dryfit.png', '/images/dryfit-back.png', '/images/dryfit-detail.png'],
    description:
      'Camiseta dryfit leve e respirável para treinos intensos.\nSecagem rápida, toque suave e construção pensada para movimentação constante sem atrito.\nPara quem treina todo dia, no silêncio.',
    fit: 'training / regular / performance',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return TC11_DROP.find((p) => p.slug === slug);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100);
}
