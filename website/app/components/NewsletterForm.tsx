'use client';

import { useEffect, useState } from 'react';

function NewsletterFormPlaceholder() {
  return (
    <div className="w-full max-w-md space-y-4" aria-hidden="true">
      <div className="h-[4.5rem] rounded-md border border-[var(--border)] bg-[var(--bg)]" />
      <div className="h-[4.5rem] rounded-md border border-[var(--border)] bg-[var(--bg)]" />
      <div className="h-10 rounded-md bg-[var(--brand)]/20" />
    </div>
  );
}

export function NewsletterForm() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [segment, setSegment] = useState<'developer' | 'creator' | 'enterprise'>('creator');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      console.log('Newsletter signup:', { email, segment });
      setStatus('success');
      setMessage('تمام. راجع بريدك لتأكيد الاشتراك.');
      setEmail('');
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch {
      setStatus('error');
      setMessage('مشكلة في الاشتراك. جرّب تاني.');
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  if (!mounted) {
    return <NewsletterFormPlaceholder />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md"
      data-lpignore="true"
      data-1p-ignore
    >
      <div className="space-y-4">
        <div suppressHydrationWarning>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--fg)] mb-1">
            البريد الإلكتروني
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={status === 'loading'}
            autoComplete="email"
            data-lpignore="true"
            data-1p-ignore
            suppressHydrationWarning
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="segment" className="block text-sm font-medium text-[var(--fg)] mb-1">
            أنا...
          </label>
          <select
            id="segment"
            value={segment}
            onChange={(e) => setSegment(e.target.value as 'developer' | 'creator' | 'enterprise')}
            disabled={status === 'loading'}
            className="input-field"
          >
            <option value="creator">صانع محتوى / مسوّق</option>
            <option value="developer">مطور</option>
            <option value="enterprise">فريق مؤسسي</option>
          </select>
        </div>

        {message && (
          <div
            className="text-sm p-3 rounded-md border"
            style={{
              borderColor: status === 'success' ? 'var(--ok)' : 'var(--danger)',
              color: status === 'success' ? 'var(--ok)' : 'var(--danger)',
            }}
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'بنبعت...' : 'اشترك'}
        </button>

        <p className="text-xs text-[var(--fg-muted)] text-center">
          بنحترم خصوصيتك.{' '}
          <a href="/privacy" className="text-[var(--brand)] hover:underline">
            سياسة الخصوصية
          </a>
        </p>
      </div>
    </form>
  );
}
