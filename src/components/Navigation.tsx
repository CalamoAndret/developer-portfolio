import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Code2, Menu, X } from 'lucide-react'
import { navigation, profile } from '../data/portfolio'
import type { SectionId } from '../data/portfolio'

export function Navigation() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<SectionId>('home')
  const toggle = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting)
      if (visible) setActive(visible.target.id as SectionId)
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 })
    navigation.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
    }
    const closeOutside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false)
    }
    const closeOnDesktop = () => { if (window.innerWidth >= 900) setOpen(false) }
    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('pointerdown', closeOutside)
    window.addEventListener('resize', closeOnDesktop)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('pointerdown', closeOutside)
      window.removeEventListener('resize', closeOnDesktop)
    }
  }, [open])

  return (
    <header className="site-header" ref={header}>
      <div className="container header-inner">
        <a className="brand" href="#home" aria-label="Cálamo Andret, home" onClick={() => setOpen(false)}>
          <span className="brand-symbol"><Code2 size={22} aria-hidden="true" /></span>
          <span>cálamo<span className="text-accent">.</span></span>
        </a>
        <button className="menu-toggle" ref={toggle} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav id="main-navigation" aria-label="Main navigation" className={`main-nav ${open ? 'is-open' : ''}`}>
          {navigation.map(({ id, label }) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => { setActive(id); setOpen(false) }}>{label}</a>)}
          <a className="nav-github" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
        </nav>
      </div>
    </header>
  )
}
