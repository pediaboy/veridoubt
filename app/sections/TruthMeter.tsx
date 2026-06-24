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

  const handleAnswer = (i: number) => {
    setAnswered(i)
    setShown(true)
  }

  const nextQ = () => {
    setAnswered(null); setShown(false)
    setIdx(i => (i + 1) % truthMeterQuestions.length)
  }

  return (
    <section id="truthmeter" ref={ref} style={{ padding: '120px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="eyebrow" style={{ marginBottom: 20 }}>Interactive</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(30px, 4vw, 50px)', fontWeight: 300, color: '#fff' }}>
            Truth Meter
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 12 }}>
            There are no right answers. Only honest ones.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
            style={{ background: 'rgba(13,13,13,0.7)', border: '1px solid rgba(79,140,255,0.1)', borderRadius: 20, padding: '44px 40px', backdropFilter: 'blur(24px)' }}>
            {/* Progress */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 36 }}>
              {truthMeterQuestions.map((_, i) => (
                <div key={i} style={{ height: 2, flex: 1, background: i === idx ? '#4f8cff' : i < idx ? 'rgba(79,140,255,0.3)' : 'rgba(255,255,255,0.06)', borderRadius: 1, transition: 'background 0.3s' }} />
              ))}
            </div>

            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 1.5, marginBottom: 40 }}>
              {q.q}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
              {q.options.map((opt, i) => (
                <button key={i} onClick={() => !shown && handleAnswer(i)}
                  style={{
                    cursor: 'none', background: answered === i ? 'rgba(79,140,255,0.12)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${answered === i ? 'rgba(79,140,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 10, padding: '16px 24px', textAlign: 'left',
                    fontFamily: 'Cormorant Garamond, serif', fontSize: 18, color: answered === i ? '#7aa8ff' : 'rgba(255,255,255,0.6)',
                    transition: 'all 0.3s ease', fontStyle: 'italic',
                  }}
                  onMouseEnter={e => { if (!shown) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(79,140,255,0.3)'; (e.currentTarget as HTMLElement).style.color = '#fff' } }}
                  onMouseLeave={e => { if (answered !== i) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)' } }}>
                  {opt}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {shown && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ borderLeft: '2px solid #4f8cff', paddingLeft: 20, marginBottom: 28 }}>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17, fontStyle: 'italic', color: 'rgba(122,168,255,0.9)', lineHeight: 1.7 }}>
                    {q.insight}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {shown && (
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={nextQ} className="mag-btn" style={{ fontSize: 11 }}>
                Next Question
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
