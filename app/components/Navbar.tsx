'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const chapters = [
  { id: 'ch1', label: 'I. Kebenaran' },
  { id: 'ch2', label: 'II. Keyakinan' },
  { id: 'ch3', label: 'III. Logika' },
  { id: 'ch4', label: 'IV. Keraguan' },
  { id: 'ch5', label: 'V. Identitas' },
  { id: 'ch6', label: 'VI. Agama' },
  { id: 'ch7', label: 'VII. Tuhan' },
  { id: 'ch8', label: 'VIII. Sains' },
  { id: 'ch9', label: 'IX. Kebohongan' },
  { id: 'ch10', label: 'X. The Last Question' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const total = document.body.scrollHeight - window.innerHeight
      setProgress((window.scrollY / total) * 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 300, background: 'rgba(255,255,255,0.04)' }}>
        <motion.div style={{ height: '100%', background: 'linear-gradient(90deg, #4f8cff, #7aa8ff)', width: `${progress}%`, boxShadow: '0 0 8px rgba(79,140,255,0.6)' }} />
      </div>

      {/* Nav */}
      <motion.nav
        initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px',
          background: scrolled ? 'rgba(5,5,5,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(79,140,255,0.06)' : 'none',
          transition: 'all 0.4s ease',
        }}>
        <button onClick={() => scrollTo('hero')} style={{ cursor: 'none', background: 'none', border: 'none', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.4em', color: '#4f8cff', textTransform: 'uppercase' }}>
          Veridoubt
        </button>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={() => scrollTo('philosophers')} style={{ cursor: 'none', background: 'none', border: '1px solid rgba(79,140,255,0.2)', color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '6px 14px', transition: 'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#4f8cff'; (e.currentTarget as HTMLElement).style.color = '#7aa8ff' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(79,140,255,0.2)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)' }}>
            Philosophers
          </button>
          <button onClick={() => setOpen(true)} style={{ cursor: 'none', background: 'none', border: '1px solid rgba(79,140,255,0.2)', color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#4f8cff'; (e.currentTarget as HTMLElement).style.color = '#7aa8ff' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(79,140,255,0.2)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)' }}>
            <Menu size={12} /> Contents
          </button>
        </div>
      </motion.nav>

      {/* Sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 299, backdropFilter: 'blur(4px)' }} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 320, background: 'rgba(8,8,8,0.98)', border: '1px solid rgba(79,140,255,0.08)', zIndex: 300, padding: 32, display: 'flex', flexDirection: 'column', backdropFilter: 'blur(40px)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                <span style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: '0.4em', color: '#4f8cff', textTransform: 'uppercase' }}>Contents</span>
                <button onClick={() => setOpen(false)} style={{ cursor: 'none', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)' }}><X size={16} /></button>
              </div>
              {chapters.map((ch, i) => (
                <motion.button key={ch.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  onClick={() => scrollTo(ch.id)}
                  style={{ cursor: 'none', background: 'none', border: 'none', textAlign: 'left', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)', fontFamily: 'Cormorant Garamond, serif', fontSize: 17, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#7aa8ff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>
                  {ch.label}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
