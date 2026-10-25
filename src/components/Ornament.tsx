export function Ornament({ className = '' }: { className?: string }) {
  return (
    <svg className={`ornament ${className}`} viewBox="0 0 240 28" aria-hidden="true" focusable="false">
      <path d="M10 14h92M138 14h92" stroke="currentColor" strokeWidth=".8" />
      <g fill="none" stroke="currentColor" strokeWidth=".9">
        <path d="M120 4c5 4 5 16 0 20-5-4-5-16 0-20z" /><path d="M120 14c8-8 18-8 22-4-4 6-14 8-22 4z" />
        <path d="M120 14c-8-8-18-8-22-4 4 6 14 8 22 4z" />
      </g><circle cx="120" cy="14" r="2" fill="currentColor" />
    </svg>
  )
}
