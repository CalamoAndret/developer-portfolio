import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { Github, Linkedin } from './BrandIcons'
import { profile } from '../data/portfolio'
import type { ContactDetails } from '../data/portfolio'

export function Contact({ contact = profile.contact }: { contact?: ContactDetails }) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  useEffect(() => {
    if (copyStatus === 'idle') return
    const timer = window.setTimeout(() => setCopyStatus('idle'), 4000)
    return () => window.clearTimeout(timer)
  }, [copyStatus])
  async function copyEmail() {
    if (!contact.email) return
    try { await navigator.clipboard.writeText(contact.email); setCopyStatus('copied') }
    catch { setCopyStatus('failed') }
  }
  return <section id="contact" className="contact-section section-anchor" aria-labelledby="contact-title">
    <div className="contact-glow" />
    <div className="contact-intro"><span className="section-label mono"><span>05 /</span> WHAT’S NEXT</span><h2 id="contact-title">Good software starts<br />with a <span className="text-accent">conversation.</span></h2><p>Interested in my work or see a place where I could contribute?<br className="desktop-break" /> I’d be glad to connect.</p></div>
    <div className="contact-links">
      <a href={profile.github} target="_blank" rel="noopener noreferrer" className="contact-item"><span className="contact-icon"><Github size={21} aria-hidden="true" /></span><span><strong>Find me on GitHub</strong><small>@CalamoAndret</small></span><ArrowUpRight size={20} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
      {contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="contact-item"><span className="contact-icon"><Linkedin size={21} aria-hidden="true" /></span><span><strong>Connect on LinkedIn</strong><small>View profile</small></span><ArrowUpRight size={20} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>}
      {contact.email && <div className="contact-item"><span className="contact-icon"><Mail size={21} aria-hidden="true" /></span><a className="email-link" href={`mailto:${contact.email}`}><strong>Email me</strong><small>{contact.email}</small></a><button className="copy-email" onClick={copyEmail} aria-label="Copy email address">{copyStatus === 'copied' ? <Check size={18} /> : <Copy size={18} />}</button></div>}
      <p className="copy-status" role="status">{copyStatus === 'copied' ? 'Email address copied.' : copyStatus === 'failed' ? 'Could not copy. Please select the email address or use the email link.' : ''}</p>
    </div>
  </section>
}
