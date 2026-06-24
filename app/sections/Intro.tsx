'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const lines = [
  { text: 'Most people seek answers.', delay: 0 },
  { text: 'Few seek truth.', delay: 0.6 },
  { text: 'Fewer survive finding it.', delay: 1.4, accent: true },
]

export default function Intro() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <section id="intro" ref={ref} style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, background: 'radial-gradient(ellipse, rgba(79,140,255,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {lines.map((line, i) => (
          <motion.p key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: line.delay, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: line.accent ? '#7aa8ff' : 'rgba(255,255,255,0.7)',
              lineHeight: 1.3,
              letterSpacing: '0.02em',
              marginBottom: 8,
            }}>
            {line.text}
          </motion.p>
        ))}

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 2.4, duration: 1 }}
          style={{ marginTop: 64, fontFamily: 'Inter', fontSize: 12, fontWeight: 300, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>
          Buku ini tidak akan memberikan jawaban.
          <br />
          <span style={{ color: 'rgba(79,140,255,0.6)' }}>Ia hanya akan memperburuk pertanyaanmu.</span>
        </motion.div>
      </div>
    </section>
  )
}
