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
    title: `${post.title} — Momentum Partners`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <div style={{ fontFamily: "'Poppins', 'Open Sans', sans-serif", color: '#333' }}>

      {/* ── Header ── */}
      <header style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: '5%', top: 20, zIndex: 1 }}>
          <a href="https://momentumpartners.co.nz">
            <Image src="/blog/momentum-logo.png" alt="Momentum Partners" width={90} height={56} style={{ width: 90, height: 'auto' }} />
          </a>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '28px 5%', gap: '2rem' }}>
          <a href="https://momentumpartners.co.nz" style={{ color: '#333', fontSize: 14, textDecoration: 'none' }}>Home</a>
          <a href="https://momentumpartners.co.nz/about.html" style={{ color: '#333', fontSize: 14, textDecoration: 'none' }}>About</a>
          <a href="https://momentumpartners.co.nz/disclosure.html" style={{ color: '#333', fontSize: 14, textDecoration: 'none' }}>Disclosure</a>
          <a href="https://momentumpartners.co.nz/contact.html" style={{ color: '#333', fontSize: 14, textDecoration: 'none' }}>Contact</a>
        </div>
      </header>

      {/* ── Article Hero — same .hero treatment as About page ── */}
      <div style={{ height: '70vh', width: '100%', position: 'relative' }}>
        <div style={{ height: '100%', position: 'relative' }}>
          <img
            src="https://momentumpartners.co.nz/images/hero-about-md.jpg"
            alt="Momentum Partners"
            style={{ objectFit: 'cover', width: '100%', height: '100%', display: 'block' }}
          />
          <div style={{ position: 'absolute', height: '100%', width: '100%', top: 0, background: 'rgba(34,60,55,0.8)' }} />
        </div>
        <div style={{ position: 'absolute', top: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '100%', textAlign: 'center', padding: '0 10%' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
              {post.tags.map(tag => (
                <span key={tag} style={{ fontSize: 11, fontWeight: 500, color: '#B6B2A3', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.8 }}>{tag}</span>
              ))}
            </div>
            <h1 style={{ color: '#B6B2A3', fontSize: 'clamp(22px,4vw,36px)', fontWeight: 600, margin: '0 0 16px', lineHeight: 1.3, maxWidth: 720, marginLeft: 'auto', marginRight: 'auto' }}>
              {post.title}
            </h1>
            <p style={{ color: '#B6B2A3', fontSize: 13, margin: 0, opacity: 0.7 }}>{formatDate(post.date)}</p>
          </div>
        </div>
      </div>

      {/* ── Article content ── */}
      <div style={{ background: '#F6F6F6', padding: '60px 0' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 5%' }}>
          <Link href="/blog" style={{ color: '#6C6C6C', fontSize: 13, textDecoration: 'none', display: 'inline-block', marginBottom: '2.5rem' }}>
            ← All articles
          </Link>
          <div style={{ background: '#fff', padding: '3rem', lineHeight: 1.85 }}>
            <article
              className="prose"
              dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
            />
          </div>

          {/* CTA */}
          <div style={{ marginTop: '2rem', padding: '2rem', background: '#fff', borderLeft: '3px solid #B6B2A3' }}>
            <p style={{ margin: '0 0 16px', color: '#223C37', fontWeight: 600, fontSize: 16 }}>Ready to talk through your mortgage options?</p>
            <a href="https://momentumpartners.co.nz/contact.html"
              style={{ border: '1px solid #B6B2A3', padding: '10px 20px', color: '#B6B2A3', fontSize: 14, textDecoration: 'none', display: 'inline-block', transition: 'all 300ms ease-in-out' }}>
              Book a free conversation
            </a>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
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
