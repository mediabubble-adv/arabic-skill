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
      // For now, log to console and show success
      // In production, integrate with Substack API or email service
      console.log('Newsletter signup:', { email, segment });

      setStatus('success');
      setMessage('✓ Check your email to confirm subscription!');
      setEmail('');

      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setMessage('Failed to subscribe. Try again.');
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
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--fg)] mb-1">
            Email Address
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
            className="w-full px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-md text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)] disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>

        {/* Segment Selection */}
        <div>
          <label htmlFor="segment" className="block text-sm font-medium text-[var(--fg)] mb-1">
            I&apos;m a...
          </label>
          <select
            id="segment"
            value={segment}
            onChange={(e) => setSegment(e.target.value as 'developer' | 'creator' | 'enterprise')}
            disabled={status === 'loading'}
            className="w-full px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-md text-[var(--fg)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <option value="creator">Content Creator / Marketer</option>
            <option value="developer">Developer</option>
            <option value="enterprise">Enterprise Team</option>
          </select>
        </div>

        {/* Status Message */}
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>

        {/* Privacy Notice */}
        <p className="text-xs text-[var(--fg-muted)] text-center">
          We respect your privacy.{' '}
          <a href="/privacy" className="text-[var(--brand)] hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </form>
  );
}
