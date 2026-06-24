'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = 0, my = 0
    let rx = 0, ry = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      dot.style.left = mx + 'px'; dot.style.top = my + 'px'
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const animate = () => {
      rx = lerp(rx, mx, 0.12); ry = lerp(ry, my, 0.12)
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px'
      requestAnimationFrame(animate)
    }
    animate()

    const onEnter = () => { ring.style.width = '60px'; ring.style.height = '60px'; ring.style.borderColor = 'rgba(79,140,255,0.7)' }
    const onLeave = () => { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.borderColor = 'rgba(79,140,255,0.4)' }

    document.querySelectorAll('button, a, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    document.addEventListener('mousemove', onMove)
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
