import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts, formatDate } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Mortgage Insights — Momentum Partners',
  description: 'Practical guidance on rates, structure, and property finance — from licensed NZ mortgage advisers.',
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
    <div style={{ fontFamily: "'Poppins', 'Open Sans', sans-serif", color: '#333' }}>

      {/* ── Header — exact match to real site ── */}
      <header style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: '5%', top: 20, zIndex: 1 }}>
          <a href="https://momentumpartners.co.nz">
            <Image src="/blog/momentum-logo.png" alt="Momentum Partners" width={90} height={56} style={{ width: 90, height: 'auto' }} />
          </a>
        </div>
        {/* Nav links — right side, desktop only */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '28px 5%', gap: '2rem' }}>
          <a href="https://momentumpartners.co.nz" style={{ color: '#333', fontSize: 14, textDecoration: 'none' }}>Home</a>
          <a href="https://momentumpartners.co.nz/about.html" style={{ color: '#333', fontSize: 14, textDecoration: 'none' }}>About</a>
          <a href="https://momentumpartners.co.nz/disclosure.html" style={{ color: '#333', fontSize: 14, textDecoration: 'none' }}>Disclosure</a>
          <a href="https://momentumpartners.co.nz/contact.html" style={{ color: '#333', fontSize: 14, textDecoration: 'none' }}>Contact</a>
        </div>
      </header>

      {/* ── Hero — exact match to About page (.hero class) ── */}
      <div style={{ height: '70vh', width: '100%', position: 'relative' }}>
        {/* Background image */}
        <div style={{ height: '100%', position: 'relative' }}>
          <img
            src="https://momentumpartners.co.nz/images/hero-about-md.jpg"
            alt="Momentum Partners"
            style={{ objectFit: 'cover', width: '100%', height: '100%', display: 'block' }}
          />
          {/* Dark green overlay — rgba(34,60,55,0.8) */}
          <div style={{ position: 'absolute', height: '100%', width: '100%', top: 0, background: 'rgba(34,60,55,0.8)' }} />
        </div>
        {/* Centred text */}
        <div style={{ position: 'absolute', top: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '100%', textAlign: 'center', padding: '0 10%' }}>
            <p style={{ color: '#B6B2A3', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 16px', fontWeight: 500 }}>
              Momentum Partners
            </p>
            <h1 style={{ color: '#B6B2A3', fontSize: 'clamp(28px,5vw,40px)', fontWeight: 400, margin: '0 0 20px', lineHeight: 1.25 }}>
              Mortgage <span style={{ fontWeight: 700, fontStyle: 'italic' }}>Insights</span>
            </h1>
            <p style={{ color: '#B6B2A3', fontSize: 16, margin: 0, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7, opacity: 0.85 }}>
              Practical guidance on rates, structure, and property finance — from licensed NZ mortgage advisers.
            </p>
          </div>
        </div>
      </div>

      {/* ── Article listing — #F6F6F6 background ── */}
      <div style={{ background: '#F6F6F6', padding: '60px 0' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 5%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {posts.map(post => (
              <article key={post.slug} className="article-card">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 10 }}>
                  {post.tags.slice(0, 3).map(tag => (
                    <span key={tag} style={{ fontSize: 11, fontWeight: 500, color: '#B6B2A3', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{tag}</span>
                  ))}
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 600, color: '#223C37', margin: '0 0 10px', lineHeight: 1.35 }}>
                  <Link href={`/blog/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {post.title}
                  </Link>
                </h2>
                <p style={{ color: '#6C6C6C', fontSize: 15, margin: '0 0 1.5rem', lineHeight: 1.75 }}>{post.excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                  <span style={{ fontSize: 13, color: '#B6B2A3' }}>{formatDate(post.date)}</span>
                  <Link href={`/blog/${post.slug}`}
                    style={{ border: '1px solid #B6B2A3', padding: '8px 18px', color: '#B6B2A3', fontSize: 13, textDecoration: 'none', display: 'inline-block', transition: 'all 300ms ease-in-out' }}>
                    Read article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer — exact match to real site ── */}
      <footer style={{ background: '#223C37', padding: '30px 0', color: '#B6B2A3' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 5%' }}>
          <nav style={{ marginBottom: 20 }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '0 2.5rem' }}>
              {[['/', 'Home'], ['/about.html', 'About'], ['/disclosure.html', 'Disclosure'], ['/privacy.html', 'Privacy Policy'], ['/contact.html', 'Contact']].map(([href, label]) => (
                <li key={href}><a href={`https://momentumpartners.co.nz${href}`} style={{ color: '#B6B2A3', fontSize: 14, textDecoration: 'none' }}>{label}</a></li>
              ))}
            </ul>
          </nav>
          <p style={{ margin: 0, fontSize: 13, lineHeight: '20px', textAlign: 'center' }}>
            Momentum Partners<br />© Copyright 2021. All Rights Reserved.
          </p>
        </div>
      </footer>

    </div>
  )
}
