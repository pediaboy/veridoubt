'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const typeLines = [
  'what if everything you believe is wrong?',
  'what if certainty is the real illusion?',
  'what if doubt is the beginning of truth?',
  'what if the question matters more than the answer?',
]

export default function Hero() {
  const [lineIdx, setLineIdx] = useState(0)
  const [typed, setTyped] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    const current = typeLines[lineIdx]
    let t: ReturnType<typeof setTimeout>
    if (!deleting && typed.length < current.length) {
      t = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 55)
    } else if (deleting && typed.length > 0) {
      t = setTimeout(() => setTyped(current.slice(0, typed.length - 1)), 28)
    } else if (!deleting && typed.length === current.length) {
      t = setTimeout(() => setDeleting(true), 3000)
    } else {
      setDeleting(false)
      setLineIdx(i => (i + 1) % typeLines.length)
    }
    return () => clearTimeout(t)
  }, [typed, deleting, lineIdx])

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 20px 80px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translateX(-50%)', width: '80vw', maxWidth: 700, height: 400, background: 'radial-gradient(ellipse, rgba(79,140,255,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', maxWidth: 860 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }} transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 500, letterSpacing: '0.45em', color: 'rgba(79,140,255,0.8)', textTransform: 'uppercase', marginBottom: 44 }}>
          @veridoubt &nbsp;·&nbsp; @lastquestion.co
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 40 }} transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(72px, 18vw, 180px)', fontWeight: 300, lineHeight: 0.88, color: '#fff', letterSpacing: '-0.03em', margin: 0 }}>
            VERI
          </h1>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(72px, 18vw, 180px)', fontWeight: 300, lineHeight: 0.88, letterSpacing: '-0.03em', margin: '0 0 16px', background: 'linear-gradient(135deg, #4f8cff, #7aa8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontStyle: 'italic' }}>
            DOUBT
          </h1>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: visible ? 1 : 0 }} transition={{ duration: 0.8, delay: 0.9 }}
          style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(13px, 2.5vw, 19px)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 40 }}>
          The Last Question
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: visible ? 1 : 0 }} transition={{ duration: 0.8, delay: 1.1 }}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(12px, 1.8vw, 15px)', fontWeight: 300, color: 'rgba(122,168,255,0.85)', letterSpacing: '0.06em', minHeight: 24, marginBottom: 56, padding: '0 8px' }}>
          &ldquo;{typed}<span style={{ borderRight: '1px solid rgba(122,168,255,0.7)', marginLeft: 1, animation: 'blink 1s infinite' }}>&nbsp;</span>&rdquo;
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }} transition={{ duration: 0.8, delay: 1.4 }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ cursor: 'pointer', background: 'transparent', border: '1px solid rgba(79,140,255,0.35)', color: '#7aa8ff', fontFamily: 'Inter', fontSize: 11, fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '14px 28px', borderRadius: 6, transition: 'all 0.25s' }}>
            Begin the Journey
          </button>
          <button onClick={() => document.getElementById('philosophers')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ cursor: 'pointer', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter', fontSize: 11, fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '14px 28px', borderRadius: 6, transition: 'all 0.25s' }}>
            Meet the Thinkers
          </button>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 2.2 }}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}
        onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}>
        <span style={{ fontFamily: 'Inter', fontSize: 9, letterSpacing: '0.4em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>Scroll</span>
        <ChevronDown size={13} color="rgba(79,140,255,0.6)" style={{ animation: 'scroll-bounce 2s ease-in-out infinite' }} />
      </motion.div>
    </section>
  )
}
