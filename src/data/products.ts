export const SIZES = ['P', 'M', 'G', 'GG'] as const;
export type Size = (typeof SIZES)[number];

export type StockBySize = Record<Size, number>;

export type Measurement = {
  size: Size;
  widthCm: number;
  lengthCm: number;
};

export interface Product {
  slug: string;
  name: string;
  code: string;
  type: string;
  price: number; // em centavos
  image: string;
  gallery?: string[];
  description: string;
  fit: string;
  /** Estoque restante por tamanho — fonte de verdade da escassez */
  stockBySize?: StockBySize;
  measurements?: Measurement[];
  fabric?: {
    composition?: string;
    drying?: string;
    tech?: string;
  };
  modeling?: string;
}

export const TC11_DROP: Product[] = [
  {
    slug: 'icarus-training-tank',
    name: 'ICARUS TRAINING TANK',
    code: 'TC-11',
    type: 'Regata training',
    price: 14000,
    image: '/images/machao-icarus.png',
    gallery: [
      '/images/machao-icarus.png',
      '/images/icarus-back.png',
      '/images/icarus-front.png',
    ],
    description:
      'Regata training de caimento machão. Construída para volume e movimento livre sob carga.',
    fit: 'training / machão',
    modeling: 'regata machão · cavado',
    fabric: {
      composition: 'Algodão',
    },
    stockBySize: {
      P: 15,
      M: 25,
      G: 25,
      GG: 15,
    },
    measurements: [
      // TODO: confirmar medidas físicas do lote ICARUS
      { size: 'P', widthCm: 50, lengthCm: 70 },
      { size: 'M', widthCm: 53, lengthCm: 72 },
      { size: 'G', widthCm: 56, lengthCm: 74 },
      { size: 'GG', widthCm: 59, lengthCm: 76 },
    ],
  },
  {
    slug: 'tc-11-dryfit-tee',
    name: 'TC-11 Dryfit Tee',
    code: 'TC-11',
    type: 'Camiseta dryfit',
    price: 12500,
    image: '/images/dryfit.png',
    gallery: [
      '/images/dryfit.png',
      '/images/dryfit-back.png',
      '/images/dryfit-detail.png',
    ],
    description:
      'Dryfit leve para treino diário. Secagem rápida e modelagem regular sem atrito.',
    fit: 'regular',
    modeling: 'manga raglan · gola careca',
    stockBySize: {
      P: 20,
      M: 30,
      G: 30,
      GG: 20,
    },
    measurements: [
      // TODO: confirmar medidas físicas do lote TC-11 antes do drop
      { size: 'P', widthCm: 48, lengthCm: 68 },
      { size: 'M', widthCm: 51, lengthCm: 70 },
      { size: 'G', widthCm: 54, lengthCm: 72 },
      { size: 'GG', widthCm: 57, lengthCm: 74 },
    ],
    fabric: {
      composition: 'Dryfit performance',
      drying: 'secagem rápida · high-wicking',
      tech:
        'Tecnologia Dryfit de alta respirabilidade: o fio afasta o suor da pele e acelera a evaporação, mantendo o corpo seco sob carga. Toque leve, pouca retenção de umidade e liberdade de movimento em séries longas — feito para quem treina todo dia, sem distração.',
    },
  },
];

/** Ordem da fileira do drop na home: Icarus → Dryfit */
export const DROP_GRID_PRODUCTS: Product[] = [
  TC11_DROP.find((p) => p.slug === 'icarus-training-tank')!,
  TC11_DROP.find((p) => p.slug === 'tc-11-dryfit-tee')!,
];

export function getProductBySlug(slug: string): Product | undefined {
  return TC11_DROP.find((p) => p.slug === slug);
}

export function getStockRemaining(product: Product): number {
  if (!product.stockBySize) return 0;
  return SIZES.reduce((acc, size) => acc + (product.stockBySize?.[size] ?? 0), 0);
}

export function isProductSoldOut(product: Product): boolean {
  if (!product.stockBySize) return true;
  return getStockRemaining(product) <= 0;
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100);
}
