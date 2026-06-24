'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Clock } from 'lucide-react'
import { chapterContent } from '../data/content'

function ChapterBlock({ ch, i }: { ch: typeof chapterContent[0], i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })

  return (
    <div ref={ref} id={ch.id} style={{ paddingBottom: 120, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      {/* Chapter header */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ padding: '80px 0 48px' }}>
        <div style={{ fontFamily: 'Inter', fontSize: 9, letterSpacing: '0.5em', color: 'rgba(79,140,255,0.7)', textTransform: 'uppercase', marginBottom: 16 }}>
          Chapter {ch.num}
        </div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.01em', marginBottom: 20 }}>
          {ch.title}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>
          <Clock size={11} /> {ch.readTime} baca
        </div>
      </motion.div>

      {/* Epigraph */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
        style={{ borderLeft: '2px solid rgba(79,140,255,0.5)', paddingLeft: 24, marginBottom: 56, maxWidth: 560 }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontStyle: 'italic', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
          {ch.epigraph}
        </p>
      </motion.div>

      {/* Content blocks */}
      <div className="chapter-prose">
        {ch.content.map((block, j) => (
          <motion.div key={j} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 + j * 0.06 }}>
            {block.type === 'lead' && <p className="lead">{block.text}</p>}
            {block.type === 'p' && <p>{block.text}</p>}
            {block.type === 'subhead' && (
              <span style={{ display: 'block', fontFamily: 'Inter', fontSize: 9, letterSpacing: '0.4em', color: '#4f8cff', textTransform: 'uppercase', margin: '48px 0 16px' }}>{block.text}</span>
            )}
            {block.type === 'quote' && (
              <div className="pull-quote">
                <p>{block.text}</p>
              </div>
            )}
            {block.type === 'case' && (
              <div style={{ background: 'rgba(13,13,13,0.6)', border: '1px solid rgba(79,140,255,0.08)', borderLeft: '2px solid rgba(79,140,255,0.3)', borderRadius: 12, padding: '28px 32px', margin: '40px 0', backdropFilter: 'blur(16px)' }}>
                <span style={{ fontFamily: 'Inter', fontSize: 9, letterSpacing: '0.4em', color: '#4f8cff', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>Case Study</span>
                <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, color: '#fff', marginBottom: 14 }}>{block.title}</h4>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>{block.text}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 80 }}>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, rgba(79,140,255,0.15))' }} />
        <div style={{ fontFamily: 'Inter', fontSize: 9, letterSpacing: '0.4em', color: 'rgba(79,140,255,0.4)', textTransform: 'uppercase' }}>{ch.num}</div>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, rgba(79,140,255,0.15))' }} />
      </div>
    </div>
  )
}

export default function Chapters() {
  return (
    <section style={{ padding: '0 24px' }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        {chapterContent.map((ch, i) => (
          <ChapterBlock key={ch.id} ch={ch} i={i} />
        ))}
      </div>
    </section>
  )
}
