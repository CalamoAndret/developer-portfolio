import { render } from '@testing-library/react'
import axe from 'axe-core'
import { expect, it, vi } from 'vitest'
import App from '../App'

it('has no automated accessibility violations in the rendered portfolio structure', async () => {
  const { container } = render(<App />)
  // jsdom does not render layout or canvas; contrast and viewport checks need a real browser.
  const canvasContext = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
  try {
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    })
    expect(results.violations.map(({ id, impact, nodes }) => ({
      id, impact, targets: nodes.map(node => node.target),
    }))).toEqual([])
  } finally { canvasContext.mockRestore() }
}, 20000)
