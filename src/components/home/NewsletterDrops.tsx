import { SubscribeForm } from '@/components/SubscribeForm';

export function NewsletterDrops() {
  return (
    <section id="lista-drops" className="newsletter-tc12">
      <div className="newsletter-tc12-inner">
        <h2 className="k-label newsletter-tc12-title">NOVOS DROPS</h2>
        <p className="newsletter-tc12-copy">
          Seja dos primeiros a saber dos novos drops. Sem spam — só avisos quando houver peça nova.
        </p>
        <SubscribeForm source="tc12" buttonLabel="AVISAR-ME" />
      </div>
    </section>
  );
}
