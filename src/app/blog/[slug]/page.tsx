import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug, formatDate } from '@/lib/blog'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Not Found' }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

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

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-gray-500 hover:text-primary-500 font-medium mb-8 inline-block transition-colors">
          ← All articles
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs font-medium text-primary-500 bg-primary-50 px-2.5 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl font-semibold text-primary-500 leading-tight mb-3">{post.title}</h1>
        <p className="text-gray-400 text-sm font-medium mb-10 pb-10 border-b border-gray-200">{formatDate(post.date)}</p>

        {/* Body */}
        <article
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
        />

        {/* CTA */}
        <div className="mt-12 p-6 bg-primary-500 rounded-2xl text-center">
          <p className="text-white font-semibold text-lg mb-2">Ready to talk through your options?</p>
          <p className="text-gold-400 text-sm mb-4">Our advisers are here to help — no obligation, no jargon.</p>
          <a
            href="https://momentumpartners.co.nz"
            className="inline-block px-6 py-2.5 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-primary-500 font-semibold text-sm rounded-lg transition-colors"
          >
            Book a free chat →
          </a>
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
