import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, formatDate } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Momentum Partners Blog',
  description: 'Mortgage insights, rate guidance, and property finance tips for NZ homeowners and first home buyers.',
  openGraph: {
    title: 'Momentum Partners Blog — NZ Mortgage Insights',
    description: 'Practical mortgage and property finance guidance from licensed NZ advisers.',
    url: 'https://blog.momentumpartners.co.nz/blog',
    type: 'website',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      {/* Nav */}
      <nav className="bg-primary-500 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/blog" className="text-white font-semibold text-xl tracking-tight">
            Momentum <span className="text-gold-500">Partners</span>
          </Link>
          <a
            href="https://momentumpartners.co.nz"
            className="px-4 py-2 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-primary-500 font-semibold text-sm rounded-lg transition-colors"
          >
            Book a free chat
          </a>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-primary-500 px-6 pb-12 pt-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-gold-500 font-medium text-sm uppercase tracking-widest mb-2">Momentum Partners</p>
          <h1 className="text-4xl font-semibold text-white leading-tight mb-3">
            Mortgage Insights
          </h1>
          <p className="text-primary-100 text-base max-w-xl opacity-80">
            Practical guidance on rates, structure, and property finance — from licensed NZ mortgage advisers.
          </p>
        </div>
      </header>

      {/* Posts */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="space-y-6">
          {posts.map(post => (
            <article
              key={post.slug}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-primary-100 hover:shadow-md transition-all"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs font-medium text-primary-500 bg-primary-50 px-2.5 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-semibold text-primary-500 mb-2 leading-snug">
                <Link href={`/blog/${post.slug}`} className="hover:text-gold-600 transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">{formatDate(post.date)}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-semibold text-primary-500 border border-primary-100 px-3 py-1.5 rounded-lg hover:bg-primary-100 transition-colors"
                >
                  Read article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary-500 text-white mt-8 py-8 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-semibold">Momentum <span className="text-gold-500">Partners</span></span>
          <span className="text-gold-400 text-sm">FSP#753591 — Licensed Financial Advice Provider</span>
          <a
            href="https://momentumpartners.co.nz"
            className="text-gold-500 hover:text-gold-300 text-sm font-semibold transition-colors"
          >
            momentumpartners.co.nz
          </a>
        </div>
      </footer>
    </div>
  )
}
