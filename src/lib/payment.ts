/** Configuração real de pagamento — valores de parcela derivados do preço do produto. */
export const PAYMENT = {
  maxInstallments: 2,
  interestFree: true,
  methodsLabel: 'Pix, cartão em até 2x, boleto',
} as const;

export function getInstallmentCents(priceCents: number): number {
  return Math.round(priceCents / PAYMENT.maxInstallments);
}
