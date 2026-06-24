'use client'
import dynamic from 'next/dynamic'

const StarCanvas = dynamic(() => import('./components/StarCanvas'), { ssr: false })
const Cursor = dynamic(() => import('./components/Cursor'), { ssr: false })
const Navbar = dynamic(() => import('./components/Navbar'), { ssr: false })
const Hero = dynamic(() => import('./sections/Hero'), { ssr: false })
const Intro = dynamic(() => import('./sections/Intro'), { ssr: false })
const Philosophers = dynamic(() => import('./sections/Philosophers'), { ssr: false })
const TruthMeter = dynamic(() => import('./sections/TruthMeter'), { ssr: false })
const QuoteGenerator = dynamic(() => import('./sections/QuoteGenerator'), { ssr: false })
const Paradoxes = dynamic(() => import('./sections/Paradoxes'), { ssr: false })
const Chapters = dynamic(() => import('./sections/Chapters'), { ssr: false })
const LastQuestion = dynamic(() => import('./sections/LastQuestion'), { ssr: false })

export default function ClientWrapper() {
  return (
    <>
      <StarCanvas />
      <Cursor />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <Intro />
        <Philosophers />
        <TruthMeter />
        <QuoteGenerator />
        <Paradoxes />
        <Chapters />
        <LastQuestion />

        {/* Footer */}
        <footer style={{ borderTop: '1px solid rgba(79,140,255,0.06)', padding: '56px 20px 40px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 38, fontWeight: 300, color: 'rgba(255,255,255,0.06)', fontStyle: 'italic', marginBottom: 20 }}>
            Veridoubt
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 20, flexWrap: 'wrap' }}>
            <a href="https://instagram.com/veridoubt" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: '0.2em', color: '#4f8cff', textDecoration: 'none', textTransform: 'uppercase', transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              @veridoubt
            </a>
            <span style={{ color: 'rgba(255,255,255,0.15)', fontFamily: 'Inter', fontSize: 11 }}>·</span>
            <a href="https://instagram.com/lastquestion.co" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: '0.2em', color: '#4f8cff', textDecoration: 'none', textTransform: 'uppercase', transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              @lastquestion.co
            </a>
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.12)', letterSpacing: '0.05em' }}>
            © 2026 Veridoubt. All rights reserved.
          </div>
        </footer>
      </main>
    </>
  )
}
