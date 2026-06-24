'use client'
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { quotes } from '../data/content'

export default function QuoteGenerator() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const [current, setCurrent] = useState(quotes[0])
  const [key, setKey] = useState(0)

  const generate = () => {
    const next = quotes[Math.floor(Math.random() * quotes.length)]
    setCurrent(next); setKey(k => k + 1)
  }

  return (
    <section ref={ref} style={{ padding: '120px 24px', position: 'relative', borderTop: '1px solid rgba(79,140,255,0.05)', borderBottom: '1px solid rgba(79,140,255,0.05)' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 300, background: 'radial-gradient(ellipse, rgba(79,140,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <div className="eyebrow" style={{ marginBottom: 20 }}>Uncomfortable Thoughts</div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}
            style={{ marginBottom: 48, minHeight: 140, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 1.5, marginBottom: 20 }}>
              &ldquo;{current.text}&rdquo;
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: '0.2em', color: '#4f8cff', textTransform: 'uppercase' }}>— {current.author}</p>
          </motion.div>
        </AnimatePresence>

        <button onClick={generate} className="mag-btn" style={{ cursor: 'none' }}>
          Generate Uncomfortable Thought
        </button>
      </div>
    </section>
  )
}
