'use client'
import { useEffect, useRef } from 'react'

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars: { x: number; y: number; r: number; alpha: number; speed: number; twinkle: number }[] = []
    const nebula: { x: number; y: number; r: number; opacity: number }[] = []

    // Create stars
    for (let i = 0; i < 280; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5,
        alpha: Math.random() * 0.8 + 0.1,
        speed: Math.random() * 0.08 + 0.01,
        twinkle: Math.random() * Math.PI * 2,
      })
    }

    // Create nebula clouds
    for (let i = 0; i < 5; i++) {
      nebula.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 300 + 150,
        opacity: Math.random() * 0.04 + 0.01,
      })
    }

    let frame = 0
    let animId: number

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Nebula
      nebula.forEach(n => {
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r)
        grd.addColorStop(0, `rgba(79,140,255,${n.opacity})`)
        grd.addColorStop(0.5, `rgba(60,100,200,${n.opacity * 0.5})`)
        grd.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()
      })

      // Stars
      stars.forEach(s => {
        s.twinkle += 0.01
        const alpha = s.alpha * (0.6 + 0.4 * Math.sin(s.twinkle))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,220,255,${alpha})`
        ctx.fill()

        // Slow drift
        s.y += s.speed * 0.3
        if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width }
      })

      frame++
      animId = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} id="star-canvas" />
}
