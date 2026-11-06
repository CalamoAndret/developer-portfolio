import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import App from '../App'
import { Contact } from '../components/Contact'
import { navigation, profile, projects, resolveContact } from '../data/portfolio'

describe('portfolio navigation and grounded content', () => {
  it('connects every navigation link to its section and exposes one main heading', () => {
    render(<App />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    for (const item of navigation) {
      const link = within(nav).getByRole('link', { name: item.label })
      expect(link).toHaveAttribute('href', `#${item.id}`)
      expect(document.getElementById(item.id)).not.toBeNull()
    }
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main-content')
  })

  it('opens and dismisses the mobile menu with Escape and returns keyboard focus', async () => {
    const user = userEvent.setup()
    render(<App />)
    const button = screen.getByRole('button', { name: 'Open navigation' })
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    await user.keyboard('{Escape}')
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveFocus()
  })

  it('closes the menu after choosing a section and marks that section active', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Open navigation' }))
    const link = within(screen.getByRole('navigation', { name: 'Main navigation' })).getByRole('link', { name: 'Projects' })
    await user.click(link)
    expect(screen.getByRole('button', { name: 'Open navigation' })).toHaveAttribute('aria-expanded', 'false')
    expect(link).toHaveAttribute('aria-current', 'location')
  })

  it('links both case studies to the supplied repositories without claiming hosted demos', () => {
    render(<App />)
    projects.forEach(project => {
      const card = screen.getByRole('heading', { name: project.title }).closest('article')!
      const link = within(card).getByRole('link')
      expect(link).toHaveAttribute('href', project.github)
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
    expect(screen.queryByRole('link', { name: /live demo/i })).not.toBeInTheDocument()
    expect(screen.getByText(/Deterministic offline mock or optional real Gemini/)).toBeInTheDocument()
    expect(screen.getByText('UniEVANGÉLICA')).toBeInTheDocument()
  })

  it('has no empty, undefined, or placeholder link destinations', () => {
    render(<App />)
    for (const link of screen.getAllByRole('link')) {
      const href = link.getAttribute('href')!
      expect(href).toBeTruthy()
      expect(href).not.toBe('#')
      expect(href).not.toMatch(/undefined|example\.com/)
      if (href.startsWith('#')) expect(document.getElementById(href.slice(1))).not.toBeNull()
    }
  })
})

describe('contact configuration', () => {
  it('publishes the confirmed contact destinations in the default portfolio', () => {
    render(<App />)
    expect(profile.contact.email).toBe('calamoandret@gmail.com')
    expect(profile.contact.linkedin).toBe('https://www.linkedin.com/in/c%C3%A1lamo-andret-377481238/')
    expect(screen.getByRole('link', { name: /Email me/ })).toHaveAttribute('href', 'mailto:calamoandret@gmail.com')
    expect(screen.getByRole('link', { name: /Connect on LinkedIn/ })).toHaveAttribute('href', profile.contact.linkedin)
    expect(screen.getByRole('button', { name: 'Copy email address' })).toBeEnabled()
  })

  it('omits missing contact methods without showing placeholders', () => {
    render(<Contact contact={{}} />)
    expect(screen.queryByText('Profile not configured yet')).not.toBeInTheDocument()
    expect(screen.queryByText('Contact address not configured yet')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Copy email address' })).not.toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(1)
  })

  it('enables configured contact links and copies the real email', async () => {
    const user = userEvent.setup()
    const clipboard = vi.spyOn(navigator.clipboard, 'writeText')
    render(<Contact contact={{ email: 'engineer@example.org', linkedin: 'https://www.linkedin.com/in/test-engineer/' }} />)
    expect(screen.getByRole('link', { name: /Email me/ })).toHaveAttribute('href', 'mailto:engineer@example.org')
    expect(screen.getByRole('link', { name: /Connect on LinkedIn/ })).toHaveAttribute('href', 'https://www.linkedin.com/in/test-engineer/')
    await user.click(screen.getByRole('button', { name: 'Copy email address' }))
    expect(clipboard).toHaveBeenCalledWith('engineer@example.org')
    expect(screen.getByRole('status')).toHaveTextContent('Email address copied.')
  })

  it('gives a useful fallback when clipboard access fails', async () => {
    const user = userEvent.setup()
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValueOnce(new Error('Unavailable'))
    render(<Contact contact={{ email: 'engineer@example.org' }} />)
    await user.click(screen.getByRole('button', { name: 'Copy email address' }))
    expect(screen.getByRole('status')).toHaveTextContent('Could not copy.')
    expect(screen.getByRole('link', { name: /Email me/ })).toHaveAttribute('href', 'mailto:engineer@example.org')
  })

  it('rejects unsafe or incomplete configuration', () => {
    expect(resolveContact('', '')).toEqual({ email: undefined, linkedin: undefined })
    expect(resolveContact('bad address', 'javascript:alert(1)')).toEqual({ email: undefined, linkedin: undefined })
    expect(resolveContact(undefined, 'https://linkedin.com.evil.test/in/name').linkedin).toBeUndefined()
    expect(resolveContact(undefined, 'https://www.linkedin.com/').linkedin).toBeUndefined()
    expect(resolveContact('a@example.org?subject=unexpected', undefined).email).toBeUndefined()
    expect(resolveContact(' hello@example.org ', 'https://www.linkedin.com/in/hello/')).toEqual({ email: 'hello@example.org', linkedin: 'https://www.linkedin.com/in/hello/' })
  })
})
