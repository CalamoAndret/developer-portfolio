import type { ReactNode } from 'react'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowRight, ArrowUpRight, Braces, CheckCheck, Code2, Cpu, GraduationCap, MapPin, Network, Server, Sparkles } from 'lucide-react'
import { Github } from './components/BrandIcons'
import { Navigation } from './components/Navigation'
import { Architecture } from './components/Architecture'
import { ProjectCard } from './components/ProjectCard'
import { Contact } from './components/Contact'
import { navigation, profile, projects, responsibilities, skills } from './data/portfolio'

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  return <m.div className={className} initial={reduce ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.5, ease: 'easeOut' }}>{children}</m.div>
}

const skillIcons = { backend: Server, testing: CheckCheck, frontend: Braces, infra: Network, ai: Sparkles }

export default function App() {
  return <LazyMotion features={domAnimation} strict>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <Navigation />
    <main id="main-content">
      <section id="home" className="hero section-anchor" aria-labelledby="hero-title">
        <div className="hero-glow" />
        <div className="container hero-layout">
          <div className="hero-copy">
            <div className="hero-eyebrow mono"><span className="tiny-square" /> CURIOUS MIND. PRACTICAL APPROACH.</div>
            <h1 id="hero-title">Cálamo Andret<span>Building with<br /><span className="hero-purpose">purpose.</span></span></h1>
            <p className="hero-role">{profile.headline}</p>
            <p className="hero-description">I build reliable APIs, test beyond the happy path, and bring AI into practical workflows. Turning technical problems into software that makes sense.</p>
            <div className="hero-actions flex flex-wrap items-center gap-3"><a className="button button-primary" href="#projects">View Projects <ArrowDown size={16} aria-hidden="true" /></a><a className="button button-secondary" href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={17} aria-hidden="true" /> GitHub <span className="sr-only"> (opens in a new tab)</span></a><a className="hero-contact" href="#contact">Contact <ArrowUpRight size={16} aria-hidden="true" /></a></div>
            <div className="hero-location"><MapPin size={14} aria-hidden="true" /><span>{profile.location}</span><span className="location-divider" /><span>Building. Learning. Improving.</span></div>
          </div>
          <Architecture />
        </div>
        <div className="container hero-bottom mono"><span>THOUGHTFUL SYSTEMS, FROM THE GROUND UP.</span><a href="#about">SCROLL TO EXPLORE <ArrowDown size={13} aria-hidden="true" /></a></div>
      </section>

      <div className="container">
        <section id="about" className="section section-anchor" aria-labelledby="about-title">
          <Reveal className="about-layout"><div><span className="section-label mono"><span>01 /</span> A LITTLE CONTEXT</span><h2 id="about-title">Behind the code,<br />a problem solver.</h2><div className="about-mark"><Code2 size={26} strokeWidth={1.5} aria-hidden="true" /><span className="mono">UNDERSTAND → BUILD → VERIFY</span></div></div><div className="about-copy">{profile.about.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<a href="#experience" className="text-link">More about my background <ArrowRight size={16} aria-hidden="true" /></a></div></Reveal>
        </section>

        <section id="skills" className="section section-anchor" aria-labelledby="skills-title">
          <Reveal><div className="section-heading"><div><span className="section-label mono"><span>02 /</span> MY TOOLKIT</span><h2 id="skills-title">The right tools. A solid foundation.</h2></div><p>Technologies I’m applying in projects, building familiarity with, and continuing to explore.</p></div></Reveal>
          <Reveal className="skills-grid">{skills.map(skill => { const Icon = skillIcons[skill.icon]; return <article className={`skill-card skill-${skill.icon}`} key={skill.title}><div className="skill-card-top"><span className="skill-icon"><Icon size={22} strokeWidth={1.5} aria-hidden="true" /></span><span className="mono skill-level">{skill.level}</span></div><h3>{skill.title}</h3><p>{skill.description}</p><ul className="tags" aria-label={`${skill.title} technologies`}>{skill.items.map(item => <li key={item}>{item}</li>)}</ul></article> })}</Reveal>
          <p className="skills-footnote mono"><Cpu size={14} aria-hidden="true" /> Always learning. Skills reflect project use and practical familiarity, not a claim of mastery.</p>
        </section>

        <section id="projects" className="section section-anchor projects-section" aria-labelledby="projects-title">
          <Reveal><div className="section-heading"><div><span className="section-label mono"><span>03 /</span> SELECTED WORK</span><h2 id="projects-title">Built to learn. Engineered to work.</h2></div><a className="text-link all-projects" href={profile.github + '?tab=repositories'} target="_blank" rel="noopener noreferrer">All repositories <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a></div></Reveal>
          <div className="projects-grid">{projects.map(project => <Reveal key={project.id}><ProjectCard project={project} /></Reveal>)}</div>
        </section>

        <section id="experience" className="section section-anchor" aria-labelledby="experience-title">
          <Reveal><div className="section-heading"><div><span className="section-label mono"><span>04 /</span> EXPERIENCE & EDUCATION</span><h2 id="experience-title">A practical perspective.</h2></div><p>Real systems, real users, and the foundations to keep growing as an engineer.</p></div></Reveal>
          <div className="experience-layout"><Reveal className="experience-card"><div className="experience-card-heading"><span className="skill-icon"><Network size={22} aria-hidden="true" /></span><div><span className="mono small-label">PRACTICAL BACKGROUND</span><h3>IT Support & Infrastructure Experience</h3></div></div><div className="responsibilities">{responsibilities.map((item, index) => <div className="responsibility" key={item.title}><span className="mono">0{index + 1}</span><div><h4>{item.title}</h4><p>{item.description}</p></div></div>)}</div></Reveal><Reveal className="education-card"><GraduationCap size={30} strokeWidth={1.4} aria-hidden="true" /><span className="mono small-label">CONTINUING THE JOURNEY</span><h3>Software Engineering</h3><p className="education-university">UniEVANGÉLICA</p><span className="education-status"><span className="tiny-square" /> Currently studying</span><p>Building a stronger theoretical foundation and connecting it with hands-on software projects.</p><span className="education-location"><MapPin size={14} aria-hidden="true" /> Brazil</span><div className="education-decoration" aria-hidden="true">{'{ }'}</div></Reveal></div>
        </section>
        <Reveal><Contact /></Reveal>
      </div>
    </main>
    <footer className="site-footer"><div className="container"><div className="footer-top"><a className="brand" href="#home"><span className="brand-symbol"><Code2 size={21} aria-hidden="true" /></span><span>cálamo<span className="text-accent">.</span></span></a><p>Thoughtful code. Continuous growth.</p><a className="back-to-top mono" href="#home">BACK TO TOP <ArrowUpRight size={14} aria-hidden="true" /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {profile.name}</span><nav aria-label="Footer navigation">{navigation.filter(item => ['about', 'projects', 'contact'].includes(item.id)).map(item => <a href={`#${item.id}`} key={item.id}>{item.label}</a>)}</nav><span className="footer-credit">Built with React, TypeScript & care.</span></div></div></footer>
  </LazyMotion>
}
