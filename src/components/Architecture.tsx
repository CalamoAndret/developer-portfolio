import { Braces, CheckCheck, Database, FileText, Layers3, Server, Sparkles } from 'lucide-react'

export function Architecture() {
  return (
    <div className="architecture" aria-label="Conceptual architecture connecting a client, Python API, database, and validated output" role="img">
      <div className="architecture-grid" />
      <div className="architecture-orbit orbit-one" /><div className="architecture-orbit orbit-two" />
      <span className="diagram-caption mono">ANATOMY OF A RELIABLE SYSTEM</span>
      <svg className="architecture-lines" viewBox="0 0 500 450" fill="none" aria-hidden="true">
        <path d="M250 106V162M250 255v42H115v25m135-67v42h137v25" stroke="currentColor" strokeWidth="1.5" />
        <path d="m246 152 4 5 4-5m-143 160 4 5 4-5m264 0 4 5 4-5" stroke="currentColor" />
        <circle cx="250" cy="297" r="4" fill="#76e4d3" stroke="#0a101b" strokeWidth="3" />
      </svg>
      <div className="architecture-node client-node"><Layers3 size={18} /><span>Client interface</span><small className="mono">React / TypeScript</small></div>
      <div className="api-node"><div className="api-icon"><Server size={31} strokeWidth={1.4} /></div><div><span className="mono api-eyebrow">THE CORE</span><strong>Python API</strong><small>Clear contracts. Predictable behavior.</small></div><span className="api-bracket">{'}'}</span></div>
      <div className="architecture-node database-node"><Database size={20} /><strong>Persistent data</strong><small className="mono">PostgreSQL</small></div>
      <div className="architecture-node output-node"><CheckCheck size={20} /><strong>Validated output</strong><small className="mono">Tests + schemas</small></div>
      <span className="diagram-footer mono"><span className="tiny-square" /> DESIGNED WITH INTENTION</span>
      <span className="diagram-coordinate mono">[ x: logic, y: care ]</span>
    </div>
  )
}

export function ProjectVisual({ variant }: { variant: string }) {
  return variant === 'document' ? (
    <div className="project-visual document-visual" role="img" aria-label="Document workflow: upload, extract with a worker, validate, then produce structured JSON">
      <div className="visual-topline mono"><span><span className="tiny-square" /> DOCUMENT PIPELINE</span><span>architecture / 01</span></div>
      <div className="document-flow"><div className="paper-sheet"><FileText size={26} strokeWidth={1.3} /><i /><i /><i /><span className="mono">source.pdf</span></div><span className="flow-connector" /><div className="processor"><Sparkles size={26} /><small className="mono">EXTRACT</small></div><span className="flow-connector" /><div className="json-sheet mono"><Braces size={22} /><span><b>"type"</b>: "invoice",</span><span><b>"fields"</b>: {'{ ... }'},</span><span><b>"evidence"</b>: [ ... ]</span></div></div>
      <div className="visual-bottomline mono"><span>UPLOAD <span>→</span> EXTRACT <span>→</span> VALIDATE</span><span>typed results <CheckCheck size={13} /></span></div>
    </div>
  ) : (
    <div className="project-visual testing-visual" role="img" aria-label="Testing architecture: requests pass through FastAPI and transactions to PostgreSQL, checked with pytest and Hypothesis">
      <div className="visual-topline mono"><span><span className="tiny-square" /> CORRECTNESS BY DESIGN</span><span>architecture / 02</span></div>
      <div className="test-flow"><div className="request-pair mono"><span><i>PATCH</i> /tasks/:id</span><span><i>PATCH</i> /tasks/:id</span></div><span className="flow-connector" /><div className="transaction-box"><Layers3 size={27} /><strong>Transaction</strong><small className="mono">version = expected</small></div><span className="flow-connector" /><Database className="test-database" size={35} strokeWidth={1.3} /></div>
      <div className="test-tools mono"><span>pytest</span><span>Hypothesis</span><span>PostgreSQL</span></div>
      <div className="visual-bottomline mono"><span>RACE <span>·</span> RETRY <span>·</span> ROLLBACK</span><span>verify the boundaries <CheckCheck size={13} /></span></div>
    </div>
  )
}
