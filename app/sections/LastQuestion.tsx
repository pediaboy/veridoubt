'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function LastQuestion() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 0.3, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1])
  const starOpacity = useTransform(scrollYProgress, [0.5, 0.9], [1, 0])
  const [revealed, setRevealed] = useState(false)
  const inViewRef = useRef(false)

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      if (v > 0.6 && !inViewRef.current) { inViewRef.current = true; setTimeout(() => setRevealed(true), 800) }
    })
    return () => unsub()
  }, [scrollYProgress])

  return (
    <section ref={ref} id="lastquestion" style={{ minHeight: '200vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* Fading stars overlay */}
        <motion.div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(5,5,5,0) 0%, rgba(5,5,5,0.8) 100%)', opacity: starOpacity }} />

        {/* Dark overlay */}
        <motion.div style={{ position: 'absolute', inset: 0, background: '#050505', opacity: useTransform(scrollYProgress, [0.6, 1], [0, 0.95]) }} />

        <motion.div style={{ opacity, scale, position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 700, padding: '0 24px' }}>
          {!revealed ? (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                style={{ fontFamily: 'Inter', fontSize: 9, letterSpacing: '0.6em', color: 'rgba(79,140,255,0.6)', textTransform: 'uppercase', marginBottom: 40 }}>
                The Last Question
              </motion.div>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1.2 }}
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
                "Why is there something<br />rather than nothing?"
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.2 }}
                style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', marginTop: 24, textTransform: 'uppercase' }}>
                — Leibniz, 1714
              </motion.p>
            </>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: 1, height: 80, background: 'linear-gradient(to bottom, transparent, rgba(79,140,255,0.4), transparent)', margin: '0 auto 40px' }} />
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginBottom: 16 }}>
                welcome to
              </p>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 300, color: '#7aa8ff', lineHeight: 1.1, fontStyle: 'italic', letterSpacing: '-0.02em', marginBottom: 48 }}>
                the last question.
              </p>
              <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: '0.25em', color: 'rgba(79,140,255,0.5)', textTransform: 'uppercase' }}>
                @veridoubt
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
