import type React from 'react'

export interface MapsButtonProps {
  label: string
  href?: string
  ariaLabel?: string
  onClick?: () => void
}

export function MapsButton({ label, href, ariaLabel, onClick }: MapsButtonProps) {
  const isLink = Boolean(href)
  const props = isLink
    ? {
        href,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': ariaLabel || `${label} (Google Maps)`,
      }
    : {
        href: '#',
        'aria-disabled': true,
        'aria-label': ariaLabel || label,
        onClick: (e: React.MouseEvent) => {
          e.preventDefault()
          onClick?.()
        },
      }

  return (
    <a id="btn-maps-location" className="btn btn--maps" {...props}>
      <svg
        className="btn__icon"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
      <span>{label}</span>
    </a>
  )
}
