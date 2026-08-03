import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <p className="footer-brand">kontrol.</p>
          <a
            href="https://instagram.com/kontroltc"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-instagram"
          >
            @kontroltc
          </a>
        </div>
        <div className="footer-col">
          <Link href="/trocas" className="footer-link">
            trocas e devoluções
          </Link>
          <Link href="/privacidade" className="footer-link">
            política de privacidade
          </Link>
        </div>
        <div className="footer-col">
          <p className="footer-legal">
            {/* TODO: razão social e CNPJ */}
            KONTROL TRAINING CLUB
          </p>
        </div>
      </div>
      <p className="footer-bottom">
        © 2026 KONTROL TRAINING CLUB — INDEPENDENT PERFORMANCE LABEL
      </p>
    </footer>
  );
}
