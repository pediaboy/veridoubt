'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Clock } from 'lucide-react'
import { chapterContent } from '../data/content'

function ChapterBlock({ ch }: { ch: typeof chapterContent[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.06 })

  return (
    <div ref={ref} id={ch.id} style={{ paddingBottom: 100, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ padding: '72px 0 44px' }}>
        <div style={{ fontFamily: 'Inter', fontSize: 9, letterSpacing: '0.5em', color: 'rgba(79,140,255,0.7)', textTransform: 'uppercase', marginBottom: 14 }}>
          Chapter {ch.num}
        </div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(30px, 5vw, 58px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: 18 }}>
          {ch.title}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.08em' }}>
          <Clock size={11} /> {ch.readTime} baca
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.15 }}
        style={{ borderLeft: '2px solid rgba(79,140,255,0.4)', paddingLeft: 20, marginBottom: 48 }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(16px, 2.2vw, 19px)', fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75 }}>
          {ch.epigraph}
        </p>
      </motion.div>

      <div>
        {ch.content.map((block, j) => (
          <motion.div key={j} initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 + j * 0.05 }}>
            {block.type === 'lead' && (
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(19px, 2.5vw, 23px)', fontStyle: 'italic', color: '#fff', lineHeight: 1.85, marginBottom: 26, fontWeight: 300 }}>
                {block.text}
              </p>
            )}
            {block.type === 'p' && (
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(16px, 2vw, 19px)', lineHeight: 1.9, color: 'rgba(240,240,240,0.82)', marginBottom: 24 }}>
                {block.text}
              </p>
            )}
            {block.type === 'subhead' && (
              <span style={{ display: 'block', fontFamily: 'Inter', fontSize: 9, letterSpacing: '0.4em', color: '#4f8cff', textTransform: 'uppercase', margin: '44px 0 14px' }}>
                {block.text}
              </span>
            )}
            {block.type === 'quote' && (
              <div style={{ borderLeft: '2px solid #4f8cff', paddingLeft: 20, margin: '40px 0' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(18px, 2.5vw, 24px)', fontStyle: 'italic', color: '#7aa8ff', lineHeight: 1.55 }}>
                  {block.text}
                </p>
              </div>
            )}
            {block.type === 'case' && (
              <div style={{ background: 'rgba(13,13,13,0.65)', border: '1px solid rgba(79,140,255,0.08)', borderLeft: '2px solid rgba(79,140,255,0.3)', borderRadius: 12, padding: '24px 22px', margin: '36px 0', backdropFilter: 'blur(16px)' }}>
                <span style={{ fontFamily: 'Inter', fontSize: 9, letterSpacing: '0.4em', color: '#4f8cff', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Case Study</span>
                <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(17px, 2.2vw, 20px)', color: '#fff', marginBottom: 12 }}>{block.title}</h4>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(15px, 1.8vw, 17px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>{block.text}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 72 }}>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, rgba(79,140,255,0.12))' }} />
        <div style={{ fontFamily: 'Inter', fontSize: 9, letterSpacing: '0.4em', color: 'rgba(79,140,255,0.35)', textTransform: 'uppercase' }}>{ch.num}</div>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, rgba(79,140,255,0.12))' }} />
      </div>
    </div>
  )
}

export default function Chapters() {
  return (
    <section style={{ padding: '0 20px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {chapterContent.map(ch => (
          <ChapterBlock key={ch.id} ch={ch} />
        ))}
      </div>
    </section>
  )
}
