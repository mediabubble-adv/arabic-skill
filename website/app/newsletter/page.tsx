import { Metadata } from 'next';
import Link from 'next/link';
import { NewsletterForm } from '@/app/components/NewsletterForm';

export const metadata: Metadata = {
  title: 'Newsletter | Awesome Arabic Skill',
  description: 'Subscribe to monthly updates on Arabic content creation, releases, and community spotlights.',
};

export default function NewsletterPage() {
  const issues = [
    {
      month: 'July 2026',
      title: 'First Issue — Welcome to the Community',
      highlight: 'Marketplace listings live on Codex & ChatGPT',
      link: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Awesome Arabic Skill Updates
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Monthly release notes, user spotlights, and Arabic content tips delivered to your inbox.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            One email per month. No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Signup Form */}
      <section className="py-12 px-6 border-b border-gray-200">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Subscribe</h2>
          <NewsletterForm />
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">What You'll Receive</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">🚀 New Features</h3>
              <p className="text-gray-600 text-sm">
                Latest releases, bug fixes, and product improvements.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">✨ User Spotlights</h3>
              <p className="text-gray-600 text-sm">
                Discover how creators and enterprises are scaling Arabic content.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">💡 Tips & Tricks</h3>
              <p className="text-gray-600 text-sm">
                Practical advice on dialect selection, load presets, and RTL validation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Segmentation */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Tailored to Your Role</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                📝 Content Creators & Marketers
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Dialect selection best practices</li>
                <li>✓ Campaign strategy guides</li>
                <li>✓ Regional market insights</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                👨‍💻 Developers
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ API updates & integration guides</li>
                <li>✓ Technical deep dives</li>
                <li>✓ Release notes</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                🏢 Enterprises
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Case studies & ROI metrics</li>
                <li>✓ Enterprise features</li>
                <li>✓ Custom integration news</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Issues */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Issues</h2>
          {issues.length > 0 ? (
            <div className="space-y-6">
              {issues.map((issue, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{issue.month}</p>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {issue.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    <strong>Highlight:</strong> {issue.highlight}
                  </p>
                  <a
                    href={issue.link}
                    className="text-blue-600 font-semibold hover:text-blue-700 transition"
                  >
                    Read →
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              First issue coming soon! Subscribe above to be first to read.
            </p>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">FAQ</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How often do you send emails?</h3>
              <p className="text-gray-600">
                Once per month. We respect your inbox and only share what matters.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I change my segment?</h3>
              <p className="text-gray-600">
                Yes! You can update your preferences in the email footer or by replying to any newsletter.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is my email private?</h3>
              <p className="text-gray-600">
                Absolutely. We never share your email with third parties. See our{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What if I want to unsubscribe?</h3>
              <p className="text-gray-600">
                No problem. Every email has an unsubscribe link. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Stay Updated?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join 500+ developers, creators, and enterprises getting the latest on Arabic content innovation.
          </p>
          <Link
            href="#"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Subscribe Now
          </Link>
        </div>
      </section>

      {/* Footer Links */}
      <section className="py-8 px-6 border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center text-sm text-gray-600">
          <p>
            Questions?{' '}
            <a href="https://discord.gg/[invite-code]" className="text-blue-600 hover:underline">
              Join our Discord
            </a>
            {' '}or{' '}
            <a href="https://github.com/mediabubble-adv/arabic-skill/discussions" className="text-blue-600 hover:underline">
              start a discussion on GitHub
            </a>.
          </p>
        </div>
      </section>
    </div>
  );
}
