'use client';

import { useState, type FormEvent, type ReactNode } from 'react';

type Props = {
  source: 'icarus' | 'tc12';
  buttonLabel: string;
  placeholder?: string;
  className?: string;
  children?: ReactNode;
};

export function SubscribeForm({
  source,
  buttonLabel,
  placeholder = 'seu e-mail',
  className = '',
}: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) {
        setStatus('error');
        return;
      }
      setStatus('ok');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className={`subscribe-form ${className}`.trim()} onSubmit={handleSubmit}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        aria-label="E-mail"
        className="subscribe-input"
      />
      <button type="submit" className="btn subscribe-btn" disabled={status === 'loading'}>
        {status === 'loading' ? '...' : buttonLabel}
      </button>
      {status === 'ok' && <p className="subscribe-feedback">Você entrou na lista.</p>}
      {status === 'error' && (
        <p className="subscribe-feedback subscribe-feedback--error">E-mail inválido.</p>
      )}
    </form>
  );
}
