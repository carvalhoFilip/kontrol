import Link from 'next/link';

export default function PrivacidadePage() {
  return (
    <div className="legal-page">
      <div className="legal-page-inner">
        <p className="k-label">KONTROL</p>
        <h1 className="legal-page-title">Política de privacidade</h1>
        <div className="legal-page-body">
          <p>
            A KONTROL coleta e-mail e dados de pedido apenas para operar o drop, enviar avisos de
            lançamento e cumprir obrigações legais de venda.
          </p>
          <p>
            Não vendemos sua lista. Dados de subscribe (Icarus / TC-12) ficam sob uso interno da
            marca e podem ser usados para comunicar o próximo drop.
          </p>
          <p>
            Para solicitar exclusão ou correção dos seus dados, envie e-mail para{' '}
            <a href="mailto:gdxecompany@gmail.com">gdxecompany@gmail.com</a> com{' '}
            <strong>KONTROL</strong> no assunto.
          </p>
        </div>
        <Link href="/" className="pdp-back">
          ← VOLTAR AO DROP TC-11
        </Link>
      </div>
    </div>
  );
}
