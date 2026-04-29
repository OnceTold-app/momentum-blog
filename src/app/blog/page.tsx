import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts, formatDate } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Momentum Partners Blog',
  description: 'Mortgage insights, rate guidance, and property finance tips for NZ homeowners and first home buyers.',
  openGraph: {
    title: 'Momentum Partners Blog — NZ Mortgage Insights',
    description: 'Practical mortgage and property finance guidance from licensed NZ advisers.',
    url: 'https://momentumpartners.co.nz/blog',
    type: 'website',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <div className="min-h-screen bg-white">

      {/* ── Header — matches real site ── */}
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

      {/* ── Page header ── */}
      <div style={{ background: '#223C37', padding: '60px 5%' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ color: '#B6B2A3', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>Momentum Partners</p>
          <h1 style={{ color: '#fff', fontSize: 36, fontWeight: 400, margin: '0 0 12px', lineHeight: 1.3 }}>
            Mortgage <span style={{ fontStyle: 'italic', fontWeight: 700 }}>Insights</span>
          </h1>
          <p style={{ color: '#B6B2A3', fontSize: 15, margin: 0, maxWidth: 500 }}>
            Practical guidance on rates, structure, and property finance — from licensed NZ mortgage advisers.
          </p>
        </div>
      </div>

      {/* ── Article list ── */}
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 5%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {posts.map(post => (
            <article key={post.slug} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '2.5rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                {post.tags.slice(0, 3).map(tag => (
                  <span key={tag} style={{ fontSize: 11, fontWeight: 500, color: '#B6B2A3', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{tag}</span>
                ))}
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 600, color: '#223C37', margin: '0 0 10px', lineHeight: 1.35 }}>
                <Link href={`/blog/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {post.title}
                </Link>
              </h2>
              <p style={{ color: '#6C6C6C', fontSize: 15, margin: '0 0 16px', lineHeight: 1.7 }}>{post.excerpt}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: '#B6B2A3' }}>{formatDate(post.date)}</span>
                <Link href={`/blog/${post.slug}`} className="btn-outline" style={{ fontSize: 13, padding: '8px 16px' }}>
                  Read article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer style={{ background: '#223C37', padding: '40px 5%' }}>
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
