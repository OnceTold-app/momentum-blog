import type { Metadata } from 'next'
import Image from 'next/image'
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
    <div className="min-h-screen bg-white">

      {/* ── Header ── */}
      <header style={{ position: 'relative', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '20px 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="https://momentumpartners.co.nz">
            <Image src="/blog/momentum-logo.png" alt="Momentum Partners" width={80} height={50} style={{ width: 80, height: 'auto' }} />
          </a>
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="https://momentumpartners.co.nz/about.html" style={{ color: '#333', fontSize: 14, textDecoration: 'none' }}>About</a>
            <a href="https://momentumpartners.co.nz/contact.html" style={{ color: '#333', fontSize: 14, textDecoration: 'none' }}>Contact</a>
            <a href="https://momentumpartners.co.nz/contact.html" className="btn-outline" style={{ fontSize: 13 }}>
              Book a conversation
            </a>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 5%' }}>
        <Link href="/blog" style={{ color: '#6C6C6C', fontSize: 13, textDecoration: 'none', display: 'inline-block', marginBottom: '2.5rem' }}>
          ← All articles
        </Link>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {post.tags.map(tag => (
            <span key={tag} style={{ fontSize: 11, fontWeight: 500, color: '#B6B2A3', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{tag}</span>
          ))}
        </div>

        <h1 style={{ fontSize: 30, fontWeight: 600, color: '#223C37', lineHeight: 1.3, margin: '0 0 12px' }}>{post.title}</h1>
        <p style={{ color: '#B6B2A3', fontSize: 13, marginBottom: '3rem' }}>{formatDate(post.date)}</p>

        <article
          className="prose"
          style={{ maxWidth: '100%' }}
          dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
        />

        {/* CTA */}
        <div style={{ marginTop: '3rem', padding: '2rem', background: '#F6F6F6', borderLeft: '3px solid #B6B2A3' }}>
          <p style={{ margin: '0 0 16px', color: '#223C37', fontWeight: 600, fontSize: 16 }}>Ready to talk through your mortgage options?</p>
          <a href="https://momentumpartners.co.nz/contact.html" className="btn-outline">
            Book a free conversation
          </a>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer style={{ background: '#223C37', padding: '40px 5%', marginTop: '4rem' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <nav style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {['/', '/about.html', '/disclosure.html', '/privacy.html', '/contact.html'].map((href, i) => (
              <a key={href} href={`https://momentumpartners.co.nz${href}`} style={{ color: '#B6B2A3', fontSize: 14, textDecoration: 'none' }}>
                {['Home', 'About', 'Disclosure', 'Privacy', 'Contact'][i]}
              </a>
            ))}
          </nav>
          <p style={{ color: '#B6B2A3', fontSize: 13, margin: 0 }}>
            Momentum Partners · FSP#753591 · © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}
