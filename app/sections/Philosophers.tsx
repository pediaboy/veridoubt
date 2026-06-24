'use client'
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ChevronRight } from 'lucide-react'
import { philosopherData } from '../data/content'

export default function Philosophers() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.05 })
  const [selected, setSelected] = useState<typeof philosopherData[0] | null>(null)

  return (
    <section id="philosophers" ref={ref} style={{ padding: '100px 0', position: 'relative' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 20px' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 500, letterSpacing: '0.45em', color: '#4f8cff', textTransform: 'uppercase', marginBottom: 16 }}>
            Philosophy Timeline
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 6vw, 52px)', fontWeight: 300, color: '#fff', margin: '0 0 12px' }}>
            The Thinkers
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
            Tap to explore
          </p>
        </motion.div>

        {/* List — full width, NO floating quote to the right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {philosopherData.map((p, i) => (
            <motion.button key={p.id}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              onClick={() => setSelected(p)}
              style={{
                cursor: 'pointer', width: '100%', textAlign: 'left',
                background: 'rgba(13,13,13,0.65)',
                border: '1px solid rgba(79,140,255,0.09)',
                borderRadius: 14, padding: '16px 18px',
                display: 'flex', alignItems: 'center', gap: 14,
                transition: 'all 0.25s ease',
                backdropFilter: 'blur(16px)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(79,140,255,0.07)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(79,140,255,0.25)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(13,13,13,0.65)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(79,140,255,0.09)'
              }}>
              {/* Avatar */}
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `${p.color}14`, border: `1px solid ${p.color}28`,
                fontFamily: 'Cormorant Garamond', fontSize: 22, color: p.color, fontStyle: 'italic',
              }}>
                {p.name.charAt(0)}
              </div>

              {/* Name + years + idea on one column */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 19, color: '#fff', fontWeight: 400, marginBottom: 2 }}>
                  {p.name}
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em', marginBottom: 5 }}>
                  {p.years} · {p.era}
                </div>
                <div style={{
                  fontFamily: 'Cormorant Garamond, serif', fontSize: 13, fontStyle: 'italic',
                  color: p.color, lineHeight: 1.4,
                  overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                }}>
                  "{p.idea}"
                </div>
              </div>

              <ChevronRight size={14} color="rgba(79,140,255,0.3)" style={{ flexShrink: 0 }} />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal — bottom sheet on mobile, centered on desktop */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 500, backdropFilter: 'blur(6px)' }} />
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              style={{
                position: 'fixed', bottom: 0, left: 0, right: 0,
                maxHeight: '85vh', overflowY: 'auto',
                background: '#0a0a0a',
                borderTop: `2px solid ${selected.color}`,
                borderRadius: '20px 20px 0 0',
                padding: '12px 24px 56px',
                zIndex: 501,
              }}>
              {/* Handle */}
              <div style={{ width: 36, height: 4, background: 'rgba(255,255,255,0.12)', borderRadius: 2, margin: '0 auto 24px' }} />
              <button onClick={() => setSelected(null)}
                style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 8, padding: '6px 8px', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <X size={15} />
              </button>
              <div style={{ fontFamily: 'Inter', fontSize: 9, letterSpacing: '0.4em', color: selected.color, textTransform: 'uppercase', marginBottom: 8 }}>
                {selected.era} · {selected.years}
              </div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 300, color: '#fff', marginBottom: 8, lineHeight: 1.1 }}>
                {selected.name}
              </h3>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17, fontStyle: 'italic', color: selected.color, marginBottom: 22, lineHeight: 1.55 }}>
                "{selected.idea}"
              </div>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.9, marginBottom: 22 }}>
                {selected.bio}
              </p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 18 }}>
                <div style={{ fontFamily: 'Inter', fontSize: 9, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', marginBottom: 10 }}>Pengaruh</div>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, fontStyle: 'italic', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
                  {selected.influence}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
