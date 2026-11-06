import { ArrowUpRight, Check } from 'lucide-react'
import { Github } from './BrandIcons'
import type { Project } from '../data/portfolio'
import { ProjectVisual } from './Architecture'

export function ProjectCard({ project }: { project: Project }) {
  return <article className={`project-card project-${project.id}`}>
    <ProjectVisual variant={project.id} />
    <div className="project-content">
      <div className="project-category mono"><span>{project.category}</span><span className="project-number">/{project.number}</span></div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <ul className="project-features">{project.features.map(feature => <li key={feature}><Check size={15} aria-hidden="true" /><span>{feature}</span></li>)}</ul>
      <ul className="tags" aria-label={`${project.title} technologies`}>{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>
      <div className="project-link-row"><a href={project.github} target="_blank" rel="noopener noreferrer"><Github size={17} aria-hidden="true" /> View repository <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> for {project.title} (opens in a new tab)</span></a></div>
      <p className="project-note mono">{project.note}</p>
    </div>
  </article>
}
