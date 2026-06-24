'use client'
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { philosopherData } from '../data/content'

export default function Philosophers() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [selected, setSelected] = useState<typeof philosopherData[0] | null>(null)

  return (
    <section id="philosophers" ref={ref} style={{ padding: '120px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className="eyebrow" style={{ marginBottom: 20 }}>Philosophy Timeline</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.01em' }}>
            The Thinkers
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 16, letterSpacing: '0.05em' }}>
            Click to explore
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: 32 }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: 7, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, transparent, rgba(79,140,255,0.3), transparent)' }} />

          {philosopherData.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              onClick={() => setSelected(p)}
              style={{ position: 'relative', marginBottom: 24, cursor: 'none' }}
              data-cursor>
              {/* Dot */}
              <div style={{ position: 'absolute', left: -28, top: '50%', transform: 'translateY(-50%)', width: 10, height: 10, borderRadius: '50%', background: p.color, boxShadow: `0 0 12px ${p.color}60` }} />

              <div style={{
                background: 'rgba(13,13,13,0.5)', border: '1px solid rgba(79,140,255,0.08)',
                borderRadius: 12, padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'all 0.3s ease', backdropFilter: 'blur(16px)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(79,140,255,0.25)'; (e.currentTarget as HTMLElement).style.background = 'rgba(79,140,255,0.05)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(79,140,255,0.08)'; (e.currentTarget as HTMLElement).style.background = 'rgba(13,13,13,0.5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${p.color}15`, border: `1px solid ${p.color}25`, fontFamily: 'Cormorant Garamond', fontSize: 22, color: p.color, fontStyle: 'italic' }}>
                    {p.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, color: '#fff', fontWeight: 400 }}>{p.name}</div>
                    <div style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginTop: 2 }}>{p.years} · {p.era}</div>
                  </div>
                </div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 14, fontStyle: 'italic', color: p.color, maxWidth: 340, textAlign: 'right' }} className="hidden-mobile">
                  "{p.idea}"
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 400, backdropFilter: 'blur(8px)' }} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{
                position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                width: 'min(600px, 92vw)', maxHeight: '80vh', overflow: 'auto',
                background: 'rgba(8,8,8,0.98)', border: `1px solid ${selected.color}25`,
                borderTop: `2px solid ${selected.color}`,
                borderRadius: 16, padding: 40, zIndex: 401,
                backdropFilter: 'blur(40px)',
                boxShadow: `0 0 80px ${selected.color}15`,
              }}>
              <button onClick={() => setSelected(null)} style={{ cursor: 'none', position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)' }}><X size={16} /></button>
              <div style={{ fontFamily: 'Inter', fontSize: 9, letterSpacing: '0.4em', color: selected.color, textTransform: 'uppercase', marginBottom: 16 }}>{selected.era} · {selected.years}</div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 40, fontWeight: 300, color: '#fff', marginBottom: 8 }}>{selected.name}</h3>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontStyle: 'italic', color: selected.color, marginBottom: 28, lineHeight: 1.5 }}>"{selected.idea}"</div>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.9, marginBottom: 24 }}>{selected.bio}</p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20 }}>
                <div style={{ fontFamily: 'Inter', fontSize: 9, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 10 }}>Pengaruh</div>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{selected.influence}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <style>{`@media(max-width:640px){.hidden-mobile{display:none!important}}`}</style>
    </section>
  )
}
