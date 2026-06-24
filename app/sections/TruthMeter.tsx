'use client'
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { truthMeterQuestions } from '../data/content'

export default function TruthMeter() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [idx, setIdx] = useState(0)
  const [answered, setAnswered] = useState<number | null>(null)
  const [shown, setShown] = useState(false)
  const q = truthMeterQuestions[idx]

  const handleAnswer = (i: number) => { setAnswered(i); setShown(true) }
  const nextQ = () => { setAnswered(null); setShown(false); setIdx(i => (i + 1) % truthMeterQuestions.length) }

  return (
    <section id="truthmeter" ref={ref} style={{ padding: '100px 0', position: 'relative' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 20px' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: '0.45em', color: '#4f8cff', textTransform: 'uppercase', marginBottom: 16 }}>Interactive</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 5vw, 50px)', fontWeight: 300, color: '#fff', margin: 0 }}>
            Truth Meter
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 10, letterSpacing: '0.08em' }}>
            There are no right answers. Only honest ones.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}
            style={{ background: 'rgba(13,13,13,0.7)', border: '1px solid rgba(79,140,255,0.1)', borderRadius: 20, padding: '36px 28px', backdropFilter: 'blur(24px)' }}>
            {/* Progress */}
            <div style={{ display: 'flex', gap: 5, marginBottom: 32 }}>
              {truthMeterQuestions.map((_, i) => (
                <div key={i} style={{ height: 2, flex: 1, borderRadius: 1, transition: 'background 0.3s',
                  background: i === idx ? '#4f8cff' : i < idx ? 'rgba(79,140,255,0.3)' : 'rgba(255,255,255,0.07)' }} />
              ))}
            </div>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(19px, 2.8vw, 24px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 1.55, marginBottom: 32 }}>
              {q.q}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              {q.options.map((opt, i) => (
                <button key={i} onClick={() => !shown && handleAnswer(i)}
                  style={{
                    cursor: 'pointer', width: '100%', textAlign: 'left',
                    background: answered === i ? 'rgba(79,140,255,0.12)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${answered === i ? 'rgba(79,140,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 10, padding: '14px 18px',
                    fontFamily: 'Cormorant Garamond, serif', fontSize: 17, fontStyle: 'italic',
                    color: answered === i ? '#7aa8ff' : 'rgba(255,255,255,0.65)',
                    transition: 'all 0.25s ease', lineHeight: 1.4,
                  }}>
                  {opt}
                </button>
              ))}
            </div>
            <AnimatePresence>
              {shown && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ borderLeft: '2px solid #4f8cff', paddingLeft: 18, marginBottom: 24 }}>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, fontStyle: 'italic', color: 'rgba(122,168,255,0.9)', lineHeight: 1.7 }}>
                    {q.insight}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            {shown && (
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={nextQ}
                style={{ cursor: 'pointer', background: 'transparent', border: '1px solid rgba(79,140,255,0.3)', color: '#7aa8ff', fontFamily: 'Inter', fontSize: 11, fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '12px 28px', borderRadius: 6, transition: 'all 0.25s' }}>
                Next Question
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
