export interface ContactDetails { email?: string; linkedin?: string }

export function resolveContact(email?: string, linkedin?: string): ContactDetails {
  const cleanEmail = email?.trim()
  let cleanLinkedin: string | undefined
  try {
    const url = new URL(linkedin || '')
    if (url.protocol === 'https:' && ['linkedin.com', 'www.linkedin.com'].includes(url.hostname) && url.pathname.startsWith('/in/') && url.pathname.length > 4 && !url.username && !url.password) cleanLinkedin = url.href
  } catch { /* Unconfigured or invalid URLs stay disabled. */ }
  return {
    email: cleanEmail && /^[^\s@<>?&#]+@[^\s@<>?&#]+\.[^\s@<>?&#]+$/.test(cleanEmail) ? cleanEmail : undefined,
    linkedin: cleanLinkedin,
  }
}

export const profile = {
  name: 'Cálamo Andret',
  headline: 'Software Engineering Graduate | Python Backend & AI Integration',
  github: 'https://github.com/CalamoAndret',
  location: 'Based in Brazil',
  contact: resolveContact(
    import.meta.env.VITE_CONTACT_EMAIL?.trim() || 'calamoandret@gmail.com',
    import.meta.env.VITE_LINKEDIN_URL?.trim() || 'https://www.linkedin.com/in/c%C3%A1lamo-andret-377481238/',
  ),
  about: [
    'I’m a Software Engineering graduate in Brazil, interested in what makes software dependable beyond the happy path.',
    'My practical background in IT support and infrastructure shapes how I approach development: understand the problem, make the system easier to reason about, and verify that it works. Today, I’m applying that mindset to Python backends, automated testing, and AI-powered workflows.',
  ],
}

export const navigation = [
  { id: 'home', label: 'Home' }, { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' }, { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' }, { id: 'contact', label: 'Contact' },
] as const
export type SectionId = typeof navigation[number]['id']

export const skills = [
  { icon: 'backend', title: 'Backend', level: 'Project experience', description: 'APIs with clear contracts and persistent data.', items: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL'] },
  { icon: 'testing', title: 'Testing & Quality', level: 'Project experience', description: 'Checking behavior, edge cases, and system boundaries.', items: ['pytest', 'Hypothesis', 'API testing', 'GitHub Actions'] },
  { icon: 'frontend', title: 'Frontend', level: 'Working familiarity', description: 'Interfaces that make backend workflows usable.', items: ['React', 'TypeScript', 'JavaScript'] },
  { icon: 'infra', title: 'Infrastructure & Tools', level: 'Practical experience & familiarity', description: 'Supporting people, systems, and development workflows.', items: ['Git', 'GitHub', 'Linux', 'Windows', 'Networking', 'Active Directory', 'Docker'] },
  { icon: 'ai', title: 'AI Integration', level: 'Project experience', description: 'Connecting model output to typed, validated workflows.', items: ['Gemini API', 'Document processing', 'Structured extraction'] },
] as const

export interface Project {
  id: string; number: string; category: string; title: string; description: string
  features: string[]; technologies: string[]; github: string; note: string
}
// Claims checked against the public repository READMEs on November 6, 2026.
export const projects: Project[] = [
  {
    id: 'document', number: '01', category: 'FULL-STACK · AI INTEGRATION', title: 'AI Document Intelligence',
    description: 'From uploaded documents to structured, traceable data. A full-stack workbench for analyzing PDF, TXT, and DOCX files, following background jobs, and inspecting validated results with source evidence.',
    features: ['Durable PostgreSQL job queue with leases and bounded retries', 'Typed extraction with Pydantic and source-evidence validation', 'Deterministic offline mock or optional real Gemini integration'],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'Gemini API'],
    github: 'https://github.com/CalamoAndret/ai-document-intelligence',
    note: 'Runs locally · No API key needed in offline mock mode',
  },
  {
    id: 'testing', number: '02', category: 'BACKEND · SOFTWARE QUALITY', title: 'Python Backend Testing Lab',
    description: 'A task management API built to explore a harder question: what happens when requests race, retry, or fail mid-transaction? A hands-on laboratory for backend correctness.',
    features: ['Atomic optimistic concurrency and persistent idempotency keys', 'Real PostgreSQL transactions, rollback, and database constraints', 'Property-based, state-machine, API, and race tests with CI'],
    technologies: ['Python', 'FastAPI', 'SQLAlchemy', 'pytest', 'Hypothesis'],
    github: 'https://github.com/CalamoAndret/python-backend-testing-lab',
    note: 'Runs locally · Includes a deliberate bug-detection demonstration',
  },
]

export const responsibilities = [
  { title: 'Troubleshooting & support', description: 'Working through Windows and Linux issues, helping users, and diagnosing technical problems in day-to-day operational systems.' },
  { title: 'Networks & infrastructure', description: 'Troubleshooting connectivity and DNS, supporting network environments, and understanding how services depend on each other.' },
  { title: 'Access & system administration', description: 'Supporting Active Directory users and permissions, with attention to access, configuration, and reliable operation.' },
]
