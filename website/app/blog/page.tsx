import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Awesome Arabic Skill',
  description: 'Articles on Arabic content creation, dialect routing, technical guides, and case studies. Learn how to scale Arabic content with Awesome Arabic Skill.',
  keywords: ['blog', 'Arabic content', 'dialect', 'guides', 'tutorials'],
};

const blogPosts = [
  {
    slug: '10-tips-arabic-content-scale',
    title: '10 Tips for Arabic Content at Scale',
    description: 'Master Arabic content creation: pick your dialect, avoid translationese, audit before shipping, and use AI wisely. 10 proven tips for writers & teams.',
    author: 'MediaBubble',
    date: '2026-07-20',
    readTime: '6 min',
    category: 'Guide',
    tags: ['Arabic content', 'dialect routing', 'copywriting', 'Masri'],
  },
  {
    slug: 'masri-vs-msa-dialect-guide',
    title: 'Masri vs. MSA: When to Use Each Dialect',
    description: 'Understand Masri vs. MSA: when to use Egyptian dialect (casual, social media) vs. Modern Standard Arabic (formal, official). Avoid the mixing trap.',
    author: 'MediaBubble',
    date: '2026-07-21',
    readTime: '5 min',
    category: 'Guide',
    tags: ['Egyptian Arabic', 'MSA', 'dialect', 'formal vs casual'],
  },
  {
    slug: 'case-study-100-arabic-captions',
    title: 'How E-Commerce Brands Scale Arabic Content in Days, Not Weeks',
    description: 'Case study: How a startup went from 0 to 100 Arabic Ramadan captions in 1 week using Awesome Arabic Skill. Results: 3.2x ROI, 60+ hours saved, 95% approval rate.',
    author: 'MediaBubble',
    date: '2026-07-22',
    readTime: '4 min',
    category: 'Case Study',
    tags: ['case study', 'Arabic content scaling', 'ROI', 'Ramadan marketing'],
  },
  {
    slug: 'rtl-bidirectional-text-guide',
    title: 'RTL & Bidirectional Text: A Developer\'s Guide',
    description: 'Master RTL text handling: learn RLE/PDF markers, LRM placement, validation. Avoid common bugs. Code examples and tools included.',
    author: 'MediaBubble',
    date: '2026-07-23',
    readTime: '5 min',
    category: 'Technical',
    tags: ['RTL', 'bidirectional text', 'Arabic UI', 'developer', 'Unicode'],
  },
  {
    slug: 'load-presets-task-bundling',
    title: 'Why Load Presets Matter: Task-Class Bundling for Efficiency',
    description: 'Load presets bundle reference files for specific tasks. Save 75% context, tokens, and cost. 14 presets for writing, auditing, planning, and more.',
    author: 'MediaBubble',
    date: '2026-07-24',
    readTime: '3 min',
    category: 'Tutorial',
    tags: ['load presets', 'efficiency', 'task bundling', 'productivity'],
  },
];

const categories = ['Guide', 'Case Study', 'Technical', 'Tutorial'];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-lg text-gray-600">
            Articles on Arabic content creation, dialect routing, technical guides, and case studies.
            Learn how to scale Arabic content with Awesome Arabic Skill.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Category Navigation */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts List */}
          <div className="space-y-8">
            {blogPosts.map((post, index) => (
              <article
                key={post.slug}
                className="border-b border-gray-200 pb-8 last:border-b-0"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <Link
                      href={`/blog/posts/${post.slug}`}
                      className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition"
                    >
                      {post.title}
                    </Link>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">{post.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{post.author}</span>
                    <span>•</span>
                    <time dateTime={post.date}>{post.date}</time>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200"
                    >
                      #{tag.replace(/\s+/g, '-').toLowerCase()}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/blog/posts/${post.slug}`}
                  className="inline-block text-blue-600 font-semibold hover:text-blue-700 transition"
                >
                  Read article →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="bg-blue-50 py-12 px-6 border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to scale Arabic content?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Install Awesome Arabic Skill and put these tips into practice.
          </p>
          <Link
            href="/install"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Install Awesome Arabic Skill
          </Link>
        </div>
      </section>

      {/* Resources Footer */}
      <section className="py-8 px-6 border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center text-sm text-gray-600">
          <p>
            Questions?{' '}
            <a href="https://twitter.com/mediabubble_adv" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Tweet @mediabubble_adv
            </a>
            {' '}or{' '}
            <a href="https://github.com/mediabubble-adv/arabic-skill/issues" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              open an issue
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
