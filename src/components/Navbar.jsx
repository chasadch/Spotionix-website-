import React, { useEffect, useRef, useState } from 'react'
import { close, logo, menu, wordmark } from '../assets'
import { navLinks } from '../constants'

const Navbar = () => {

  const [toggle, setToggle] = useState(false)

  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const containerRef = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  useEffect(() => {
    const handler = () => {
      // Determine which section is currently in view
      let current = ''
      navLinks.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (!el) return
        const rect = el.getBoundingClientRect()
        const threshold = Math.min(200, window.innerHeight * 0.25)
        if (rect.top <= threshold && rect.bottom >= threshold) {
          current = id
        }
      })
      setActive(current)
      setScrolled(window.scrollY > 8)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('scroll', handler)
      window.removeEventListener('resize', handler)
    }
  }, [])

  // 3D tilt handlers (lightweight)
  const onMouseMove = (e) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width // 0..1
    const y = (e.clientY - rect.top) / rect.height // 0..1
    const max = 6 // deg
    const ry = (x - 0.5) * (max * 2)
    const rx = -(y - 0.5) * (max * 2)
    setTilt({ rx, ry })
    // update CSS var for gradient accent
    el.style.setProperty('--mx', `${Math.round(x * 100)}%`)
  }

  const onMouseLeave = () => setTilt({ rx: 0, ry: 0 })

  return (
    <nav role='navigation' aria-label='Primary' className={`w-full flex px-2 sm:px-4 justify-center items-center navbar sticky top-0 z-50 transition-[padding] duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
      <div
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={`relative w-full max-w-7xl flex items-center justify-between rounded-2xl backdrop-blur-md border border-white/10 px-3 sm:px-5 transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] ${scrolled ? 'bg-[#0b1220]/85 py-2' : 'bg-[#0b1220]/70 py-3'}`}
        style={{ transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      >
        {/* gradient ring accent */}
        <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-30 bg-[radial-gradient(1200px_200px_at_var(--mx,50%)_-50%,rgba(56,189,248,0.25),transparent_60%)]" />
        <a href="#home" className='flex items-center gap-2 sm:gap-3 group outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 rounded-xl'>
          <div className='relative grid place-items-center w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/10 border border-cyan-400/30 group-hover:from-cyan-400/30 group-hover:to-blue-500/20 transition-colors'>
            <img src={logo} alt='Spotionix logo' className='w-[20px] h-[20px] select-none' draggable='false'/>
          </div>
          <img src={wordmark} alt='Spotionix' className='hidden sm:block h-[24px] select-none' draggable='false'/>
        </a>
        <ul className='list-none sm:flex hidden justify-end items-center gap-1 flex-1'>
          {navLinks.map((nav, i) => (
            <li 
              key={nav.id}
              className={`relative font-poppins font-medium cursor-pointer text-[15px] ${i === navLinks.length - 1 ? '' : ''} text-white/90`}
            >
              <a href={`#${nav.id}`} aria-current={active === nav.id ? 'page' : undefined} className={`px-3 py-2 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 transition-all duration-200 ${active === nav.id ? 'text-cyan-300' : 'hover:text-cyan-300 hover:-translate-y-[1px]'}`}>
                {nav.title}
              </a>
              <span className={`pointer-events-none absolute left-3 right-3 -bottom-[2px] h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${active === nav.id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}/>
            </li>        
          ))}
        </ul>
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <button
            type='button'
            aria-label='Toggle menu'
            aria-expanded={toggle}
            onClick={() => setToggle((previous) => !previous)}
            className='p-2 rounded-md hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-cyan-400/50'
          >
            <img
              src={toggle ? close : menu}
              alt='menu'
              className='w-[28px] h-[28px] object-contain pointer-events-none'
              draggable='false'
            />
          </button>
          <div className={`${toggle ? 'flex' : 'hidden'} p-6 bg-[#0b1220]/95 backdrop-blur-md border border-white/10 shadow-xl absolute top-20 right-3 mx-4 my-2 min-w-[220px] rounded-2xl sidebar`}> 
            <ul className='list-none flex flex-col justify-end items-stretch gap-1'>
              {navLinks.map((nav, i) => (
                <li 
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[15px] ${i === navLinks.length - 1 ? 'mb-0' : 'mb-1'} text-white/90`}
                >
                  <a 
                    href={`#${nav.id}`}
                    aria-current={active === nav.id ? 'page' : undefined}
                    className={`block w-full px-3 py-2 rounded-xl transition-colors ${active === nav.id ? 'bg-white/5 text-cyan-300' : 'hover:bg-white/5 hover:text-cyan-300'}`}
                    onClick={() => setToggle(false)}
                  >
                    {nav.title}
                  </a>
                </li>        
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
