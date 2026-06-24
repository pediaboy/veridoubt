'use client'
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { paradoxes } from '../data/content'

export default function Paradoxes() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="paradoxes" ref={ref} style={{ padding: '100px 0' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 20px' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: '0.45em', color: '#4f8cff', textTransform: 'uppercase', marginBottom: 16 }}>
            Logic Collapses Here
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 5vw, 50px)', fontWeight: 300, color: '#fff', margin: 0 }}>
            Paradox Collection
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {paradoxes.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07, duration: 0.5 }}>
              <div onClick={() => setOpen(open === i ? null : i)}
                style={{
                  background: open === i ? 'rgba(79,140,255,0.06)' : 'rgba(13,13,13,0.5)',
                  border: `1px solid ${open === i ? 'rgba(79,140,255,0.22)' : 'rgba(255,255,255,0.05)'}`,
                  borderRadius: 14, padding: '20px 22px', cursor: 'pointer', transition: 'all 0.25s ease',
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'Inter', fontSize: 9, letterSpacing: '0.35em', color: '#4f8cff', textTransform: 'uppercase', marginBottom: 5 }}>
                      Paradox {String(i + 1).padStart(2, '0')}
                    </div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, color: '#fff', fontWeight: 400 }}>
                      {p.title}
                    </div>
                  </div>
                  <motion.div animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                    style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(79,140,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f8cff', fontSize: 18, flexShrink: 0, marginLeft: 12 }}>
                    +
                  </motion.div>
                </div>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                      <div style={{ paddingTop: 18, marginTop: 18, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17, fontStyle: 'italic', color: 'rgba(255,255,255,0.8)', lineHeight: 1.75, marginBottom: 14 }}>
                          {p.question}
                        </p>
                        <div style={{ borderLeft: '2px solid #4f8cff', paddingLeft: 14 }}>
                          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 15, color: 'rgba(122,168,255,0.8)', lineHeight: 1.7, fontStyle: 'italic' }}>
                            {p.insight}
                          </p>
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
