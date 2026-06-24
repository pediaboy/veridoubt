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
        <footer style={{ borderTop: '1px solid rgba(79,140,255,0.05)', padding: '60px 24px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 42, fontWeight: 300, color: 'rgba(255,255,255,0.08)', fontStyle: 'italic', marginBottom: 24 }}>Veridoubt</div>
          <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', marginBottom: 12 }}>@veridoubt · @lastquestion.co</div>
          <div style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.12)' }}>© 2026 Veridoubt. All rights reserved.</div>
        </footer>
      </main>
    </>
  )
}
