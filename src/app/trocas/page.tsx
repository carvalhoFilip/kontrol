import Link from 'next/link';

export default function TrocasPage() {
  return (
    <div className="legal-page">
      <div className="legal-page-inner">
        <p className="k-label">KONTROL</p>
        <h1 className="legal-page-title">Trocas e devoluções</h1>
        <div className="legal-page-body">
          <p>
            Você tem 7 dias corridos, a contar do recebimento, para solicitar troca ou devolução,
            conforme o Código de Defesa do Consumidor.
          </p>
          <p>
            A peça deve estar sem uso, sem odores, com etiqueta e na embalagem original. Produtos
            personalizados ou com sinais de uso no treino não são elegíveis.
          </p>
          <p>
            Para iniciar, escreva para{' '}
            <a href="mailto:gdxecompany@gmail.com">gdxecompany@gmail.com</a> com o assunto
            contendo <strong>KONTROL</strong>, número do pedido e o motivo.
          </p>
          <p>Frete de troca: combinado após análise da solicitação. Reembolso via mesmo meio de pagamento, quando aplicável.</p>
        </div>
        <Link href="/" className="pdp-back">
          ← VOLTAR AO DROP TC-11
        </Link>
      </div>
    </div>
  );
}
