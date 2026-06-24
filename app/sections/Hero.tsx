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
      t = setTimeout(() => setDeleting(true), 3200)
    } else {
      setDeleting(false)
      setLineIdx(i => (i + 1) % typeLines.length)
    }
    return () => clearTimeout(t)
  }, [typed, deleting, lineIdx])

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', overflow: 'hidden' }}>
      {/* Aurora */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, background: 'radial-gradient(ellipse, rgba(79,140,255,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '60%', left: '20%', width: 400, height: 400, background: 'radial-gradient(ellipse, rgba(79,140,255,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 900 }}>
        {/* Eyebrow */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }} transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 500, letterSpacing: '0.5em', color: 'rgba(79,140,255,0.8)', textTransform: 'uppercase', marginBottom: 48 }}>
          @veridoubt &nbsp;·&nbsp; @lastquestion.co
        </motion.div>

        {/* Main title */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 40 }} transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(80px, 15vw, 180px)', fontWeight: 300, lineHeight: 0.9, color: '#fff', letterSpacing: '-0.03em', marginBottom: 0 }}>
            VERI
          </h1>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(80px, 15vw, 180px)', fontWeight: 300, lineHeight: 0.9, color: 'transparent', letterSpacing: '-0.03em', marginBottom: 0, background: 'linear-gradient(135deg, #4f8cff, #7aa8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontStyle: 'italic' }}>
            DOUBT
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: visible ? 1 : 0 }} transition={{ duration: 0.8, delay: 0.9 }}
          style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(16px, 2.5vw, 22px)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: 20, marginBottom: 60 }}>
          The Last Question
        </motion.p>

        {/* Typewriter */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: visible ? 1 : 0 }} transition={{ duration: 0.8, delay: 1.2 }}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(13px, 1.8vw, 16px)', fontWeight: 300, color: 'rgba(122,168,255,0.9)', letterSpacing: '0.08em', minHeight: 28, marginBottom: 64 }}>
          &ldquo;{typed}<span style={{ borderRight: '1px solid rgba(122,168,255,0.8)', marginLeft: 2, animation: 'blink 1s infinite' }}>&nbsp;</span>&rdquo;
        </motion.div>

        {/* Divider line */}
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: visible ? 1 : 0 }} transition={{ duration: 1.2, delay: 1.4 }}
          style={{ width: 1, height: 60, background: 'linear-gradient(to bottom, transparent, rgba(79,140,255,0.5), transparent)', margin: '0 auto 32px' }} />

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }} transition={{ duration: 0.8, delay: 1.6 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })} className="mag-btn">
            Begin the Journey
          </button>
          <button onClick={() => document.getElementById('philosophers')?.scrollIntoView({ behavior: 'smooth' })} className="mag-btn" style={{ color: 'rgba(255,255,255,0.4)', borderColor: 'rgba(255,255,255,0.1)' }}>
            Meet the Thinkers
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 2 }}
        style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'none' }}
        onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}>
        <span style={{ fontFamily: 'Inter', fontSize: 9, letterSpacing: '0.4em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Scroll</span>
        <ChevronDown size={14} color="rgba(79,140,255,0.6)" style={{ animation: 'scroll-bounce 2s ease-in-out infinite' }} />
      </motion.div>
    </section>
  )
}
