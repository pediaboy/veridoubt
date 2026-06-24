'use client'
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { quotes } from '../data/content'

export default function QuoteGenerator() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const [current, setCurrent] = useState(quotes[0])
  const [key, setKey] = useState(0)
  const generate = () => { const n = quotes[Math.floor(Math.random()*quotes.length)]; setCurrent(n); setKey(k=>k+1) }

  return (
    <section ref={ref} style={{ padding: '100px 0', borderTop: '1px solid rgba(79,140,255,0.05)', borderBottom: '1px solid rgba(79,140,255,0.05)', position: 'relative' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 20px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: '0.45em', color: '#4f8cff', textTransform: 'uppercase', marginBottom: 36 }}>
            Uncomfortable Thoughts
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }}
            style={{ marginBottom: 44, minHeight: 130, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(20px, 3.5vw, 30px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 1.55, marginBottom: 18, textAlign: 'center' }}>
              &ldquo;{current.text}&rdquo;
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: '0.2em', color: '#4f8cff', textTransform: 'uppercase' }}>
              — {current.author}
            </p>
          </motion.div>
        </AnimatePresence>

        <button onClick={generate}
          style={{ cursor: 'pointer', background: 'transparent', border: '1px solid rgba(79,140,255,0.3)', color: '#7aa8ff', fontFamily: 'Inter', fontSize: 11, fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '14px 30px', borderRadius: 6, transition: 'all 0.25s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#4f8cff'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(79,140,255,0.15)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(79,140,255,0.3)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}>
          Generate Uncomfortable Thought
        </button>
      </div>
    </section>
  )
}
