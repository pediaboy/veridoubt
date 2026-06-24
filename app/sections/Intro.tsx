'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const lines = [
  { text: 'Most people seek answers.', delay: 0 },
  { text: 'Few seek truth.', delay: 0.5 },
  { text: 'Fewer survive finding it.', delay: 1.2, accent: true },
]

export default function Intro() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <section id="intro" ref={ref} style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 20px', position: 'relative' }}>
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, width: '100%' }}>
        {lines.map((line, i) => (
          <motion.p key={i} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: line.delay, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(24px, 4.5vw, 50px)',
              fontWeight: 300, fontStyle: 'italic',
              color: line.accent ? '#7aa8ff' : 'rgba(255,255,255,0.7)',
              lineHeight: 1.35, letterSpacing: '0.01em', marginBottom: 6,
            }}>
            {line.text}
          </motion.p>
        ))}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 2.2, duration: 1 }}
          style={{ marginTop: 56, fontFamily: 'Inter', fontSize: 12, fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', lineHeight: 1.9 }}>
          Buku ini tidak akan memberikan jawaban.
          <br />
          <span style={{ color: 'rgba(79,140,255,0.6)' }}>Ia hanya akan memperburuk pertanyaanmu.</span>
        </motion.div>
      </div>
    </section>
  )
}
