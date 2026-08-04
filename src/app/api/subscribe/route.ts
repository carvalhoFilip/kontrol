import { NextResponse } from 'next/server';
import { upsertSubscriber, type SubscriberSource } from '@/lib/subscribers';
import { NOTIFY_EMAIL } from '@/lib/drop';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SOURCES: SubscriberSource[] = ['icarus', 'tc12'];
const NOTIFY_TO = NOTIFY_EMAIL;

async function forwardToInbox(email: string, source: SubscriberSource) {
  const subject = `[KONTROL] Novo cadastro — ${source.toUpperCase()}`;
  const payload = {
    _subject: subject,
    _template: 'table',
    name: 'KONTROL Store',
    email,
    source,
    message: `Novo e-mail capturado na KONTROL.\nSource: ${source}\nE-mail: ${email}`,
  };

  // FormSubmit encaminha para o Gmail (primeira vez exige confirmação do destinatário)
  await fetch(`https://formsubmit.co/ajax/${NOTIFY_TO}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export async function POST(request: Request) {
  let body: { email?: string; source?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const source = body.source as SubscriberSource;

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'E-mail inválido' }, { status: 400 });
  }
  if (!SOURCES.includes(source)) {
    return NextResponse.json({ error: 'Source inválido' }, { status: 400 });
  }

  const { created } = await upsertSubscriber(email, source);

  if (created) {
    try {
      await forwardToInbox(email, source);
    } catch {
      // não falha o fluxo do usuário se o encaminhamento cair
    }
  }

  // Idempotente: sempre 200
  return NextResponse.json({ ok: true });
}
