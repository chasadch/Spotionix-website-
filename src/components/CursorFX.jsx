import React, { useEffect, useRef } from 'react'

// Lightweight custom cursor with a trailing glow and subtle blend
// Automatically disables on touch devices
const CursorFX = () => {
  const dotRef = useRef(null)
  const glowRef = useRef(null)
  const rafRef = useRef(0)
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const target = useRef({ x: pos.current.x, y: pos.current.y })

  useEffect(() => {
    // Disable on touch devices to avoid interference
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return

    const onMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }

    const lerp = (a, b, t) => a + (b - a) * t

    const loop = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.18)
      pos.current.y = lerp(pos.current.y, target.current.y, 0.18)
      const x = pos.current.x
      const y = pos.current.y
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]">
      {/* Core dot */}
      <div
        ref={dotRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300/90 mix-blend-screen will-change-transform"
      />
      {/* Trailing glow */}
      <div
        ref={glowRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 blur-2xl mix-blend-screen will-change-transform"
      />
    </div>
  )
}

export default CursorFX
