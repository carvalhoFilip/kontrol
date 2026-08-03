'use client';

import { Accordion } from '@/components/Accordion';

export function FAQ() {
  return (
    <section id="faq" className="faq-section">
      <div className="faq-inner">
        <p className="k-label">FAQ</p>
        <Accordion
          items={[
            {
              id: 'prazo',
              title: 'PRAZO DE ENTREGA',
              content:
                'Pedidos são despachados em até 2 dias úteis. O prazo de transporte varia conforme a região e é calculado no checkout.',
            },
            {
              id: 'tamanho',
              title: 'COMO ESCOLHER O TAMANHO',
              content:
                'Use a tabela de medidas da peça. A modelagem é regular — se treina com folga, suba um tamanho.',
            },
            {
              id: 'troca',
              title: 'POLÍTICA DE TROCA',
              content:
                'Você tem 7 dias corridos após o recebimento para solicitar troca ou devolução, conforme o CDC. A peça deve estar sem uso e com etiqueta.',
            },
            {
              id: 'numerada',
              title: 'O QUE É DROP LIMITADO',
              content:
                'O TC-11 é um drop limitado. Quando acabar, não é reproduzido. Sem reposição.',
            },
          ]}
        />
      </div>
    </section>
  );
}
