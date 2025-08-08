import React, { useEffect, useRef, useState } from 'react'
import styles from '../style'
import { discount, robot } from '../assets'

const Hero = () => {
  const wrapRef = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, tx: 0, ty: 0 })

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width // 0..1
      const y = (e.clientY - rect.top) / rect.height // 0..1
      const max = 8
      const ry = (x - 0.5) * (max * 2)
      const rx = -(y - 0.5) * (max * 2)
      const tx = (x - 0.5) * 12
      const ty = (y - 0.5) * 12
      setTilt({ rx, ry, tx, ty })
    }
    const onLeave = () => setTilt({ rx: 0, ry: 0, tx: 0, ty: 0 })

    el.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])
  return (
    <section id='home' className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className='flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2'>
          <img
            src={discount}
            alt='trusted'
            className='w-[32px] h-[32px]'
          />
          <p className={`${styles.paragraph} ml-2`}>
            <span className='text-white'>Spotionix</span> · Engineering Intelligent Systems
          </p>
        </div>
        <div className='flex flex-row justify-between items-center w-full'>
          <h1 className='flex-1 font-poppins font-semibold ss:text-[52px] text-[36px] text-white ss:leading-[72px] leading-[52px]'>
            <span className='text-gradient'>Engineering Intelligence</span>, Delivered Reliably.
          </h1>
          <div className='hidden' />
        </div>
        <p className={`${styles.paragraph} max-w-[640px] mt-5`}>
          Spotionix is a technology engineering company specializing in embedded systems, AI/ML, computer vision, and PCB design. We turn clear specifications into production‑ready products with rigorous engineering, validation, and documentation.
        </p>
      </div>
      <div
        ref={wrapRef}
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
        style={{ perspective: '1000px' }}
      >
        <img
          src={robot}
          alt='spotionix-hero-illustration'
          className='w-[100%] h-[100%] relative z-[5] will-change-transform'
          style={{ transform: `translate3d(${tilt.tx}px, ${tilt.ty}px, 0) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
        />
        <div
          className="pointer-events-none absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient will-change-transform"
          style={{ transform: `translate3d(${-tilt.tx * 0.4}px, ${-tilt.ty * 0.6}px, 0)` }}
        />
        <div
          className="pointer-events-none absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40 will-change-transform"
          style={{ transform: `translate3d(${tilt.tx * 0.25}px, ${tilt.ty * 0.25}px, 0)` }}
        />
        <div
          className="pointer-events-none absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient will-change-transform"
          style={{ transform: `translate3d(${-tilt.tx * 0.3}px, ${-tilt.ty * 0.2}px, 0)` }}
        />
      </div>
      <div className='hidden' />
    </section>
  )
}

export default Hero
