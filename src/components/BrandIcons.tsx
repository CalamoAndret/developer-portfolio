import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

// Brand marks are separate from Lucide's interface icon set.
export function Github({ size = 24, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.94.1-.73.4-1.22.71-1.5-2.5-.29-5.12-1.25-5.12-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.15a10.8 10.8 0 0 1 5.63 0c2.15-1.45 3.1-1.15 3.1-1.15.61 1.55.23 2.7.11 2.98a4.35 4.35 0 0 1 1.16 3.02c0 4.32-2.63 5.27-5.14 5.55.4.35.76 1.04.76 2.1v3.13c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" /></svg>
}

export function Linkedin({ size = 24, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M7.5 10.5v7m0-11v.1m4 10.9v-7m0 3c0-4 5-4 5 0v4" /></svg>
}
