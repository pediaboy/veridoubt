'use client'
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { paradoxes } from '../data/content'

export default function Paradoxes() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="paradoxes" ref={ref} style={{ padding: '120px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="eyebrow" style={{ marginBottom: 20 }}>Logic Collapses Here</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 300, color: '#fff' }}>Paradox Collection</h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {paradoxes.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08, duration: 0.6 }}>
              <div onClick={() => setOpen(open === i ? null : i)} data-cursor
                style={{
                  background: open === i ? 'rgba(79,140,255,0.05)' : 'rgba(13,13,13,0.4)',
                  border: `1px solid ${open === i ? 'rgba(79,140,255,0.2)' : 'rgba(255,255,255,0.04)'}`,
                  borderRadius: 12, padding: '24px 28px', cursor: 'none', transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(79,140,255,0.15)' }}
                onMouseLeave={e => { if (open !== i) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'Inter', fontSize: 9, letterSpacing: '0.35em', color: '#4f8cff', textTransform: 'uppercase', marginBottom: 6 }}>Paradox {String(i + 1).padStart(2, '0')}</div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, color: '#fff', fontWeight: 400 }}>{p.title}</div>
                  </div>
                  <motion.div animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                    style={{ width: 24, height: 24, borderRadius: '50%', border: '1px solid rgba(79,140,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f8cff', fontSize: 16, flexShrink: 0 }}>+</motion.div>
                </div>

                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35 }}>
                      <div style={{ paddingTop: 20, marginTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontStyle: 'italic', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: 16 }}>{p.question}</p>
                        <div style={{ borderLeft: '2px solid #4f8cff', paddingLeft: 16 }}>
                          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, color: 'rgba(122,168,255,0.8)', lineHeight: 1.7, fontStyle: 'italic' }}>{p.insight}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
